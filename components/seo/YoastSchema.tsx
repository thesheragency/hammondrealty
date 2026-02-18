import { fetchYoastSchema } from '@/lib/yoast-schema';

interface YoastSchemaProps {
  path: string;
}

export async function YoastSchema({ path }: YoastSchemaProps) {
  const jsonLdBlocks = await fetchYoastSchema(path);

  if (!jsonLdBlocks || jsonLdBlocks.length === 0) {
    return null;
  }

  return (
    <>
      {jsonLdBlocks.map((block, index) => (
        <script
          key={`yoast-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: block }}
        />
      ))}
    </>
  );
}
