---
name: Git auth boundaries
description: Distinguishing GitHub API connector access from workspace Git authentication.
---

The GitHub connector's OAuth grant and the Git credential used by the workspace Git pane and command-line Git are separate. A connector can read/write a repository while workspace HTTPS Git pushes still fail with an invalid credential. A successful public `git ls-remote` does not prove push authorization; use a dry-run push for diagnosis.

**Why:** Reconnecting GitHub in Git Providers and checking organization approval did not repair the workspace Git credential, though the API connection had repository write access. No existing SSH identity was available as a fallback.

**How to apply:** Verify the exact Git stderr and remote ancestry before attributing a generic Git UI error to conflicts. Do not substitute a GitHub API commit for a Git-pane authentication fix: it can leave the local branch diverged while the original problem persists. Escalate a persistently rejected native Git-provider credential rather than storing a token in the remote URL.