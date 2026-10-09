import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

/**
 * Scan Next route entries and their local runtime imports, rather than every
 * unused component or backend file. Include lazy imports and CMS renderers:
 * their classes must still exist when an interactive section loads.
 */
export function tailwindContentFiles(root = process.cwd()): string[] {
  const visited = new Set<string>();
  const extensions = [".tsx", ".ts", ".jsx", ".js", ".mjs", ".cjs"];
  const entry = /^(page|layout|template|loading|error|global-error|not-found|default|route)\.(tsx?|jsx?)$/;

  function visit(file: string) {
    if (visited.has(file)) return;
    visited.add(file);
    const source = ts.createSourceFile(
      file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true,
      file.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );

    function dependency(specifier: string) {
      if (!specifier.startsWith("@/") && !specifier.startsWith(".")) return;
      const base = specifier.startsWith("@/")
        ? path.join(root, specifier.slice(2))
        : path.resolve(path.dirname(file), specifier);
      if (/\.(css|json|svg|png|jpe?g|webp|avif|woff2?)$/.test(base)) return;
      const candidates = [
        base,
        ...extensions.map(ext => base + ext),
        ...extensions.map(ext => path.join(base, "index" + ext)),
      ];
      const target = candidates.find(candidate =>
        fs.existsSync(candidate) && fs.statSync(candidate).isFile(),
      );
      if (!target) throw new Error(`Cannot resolve Tailwind source: ${specifier} from ${file}`);
      if (extensions.some(ext => target.endsWith(ext))) visit(target);
    }

    function walk(node: ts.Node) {
      if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
        const clause = node.importClause;
        const bindings = clause?.namedBindings;
        const onlyTypes = clause?.isTypeOnly ||
          (clause && !clause.name && bindings && ts.isNamedImports(bindings) &&
            bindings.elements.every(binding => binding.isTypeOnly));
        if (!onlyTypes) dependency(node.moduleSpecifier.text);
      } else if (ts.isExportDeclaration(node) && !node.isTypeOnly &&
        node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        dependency(node.moduleSpecifier.text);
      } else if (ts.isCallExpression(node) &&
        (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
          (ts.isIdentifier(node.expression) && node.expression.text === "require")) &&
        node.arguments[0] && ts.isStringLiteral(node.arguments[0])) {
        dependency(node.arguments[0].text);
      }
      ts.forEachChild(node, walk);
    }
    walk(source);
  }

  function entries(directory: string) {
    for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, item.name);
      if (item.isDirectory()) entries(file);
      else if (entry.test(item.name)) visit(file);
    }
  }

  entries(path.join(root, "app"));
  return [...visited].sort();
}
