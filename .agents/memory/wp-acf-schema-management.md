---
name: WordPress ACF schema management
description: Where the remote ACF field registrations live and how to access them without SSH.
---

The CMS registers page ACF field groups in active PHP through the Code Snippets plugin, not workspace PHP or ACF JSON. Its authenticated REST API at `/wp-json/code-snippets/v1/snippets` can read and update the existing registration. Discover the correct snippet by name and the group by its registration title; do not assume IDs.

**Why:** WordPress's normal REST types expose no ACF field-group creation endpoint, but the existing Code Snippets API provides access to the actual schema registration.

**How to apply:** For an authorized new field, narrowly extend the correct existing registration, preserve all other PHP and group settings, and read back the active snippet. Inherit the group's REST exposure, enable field GraphQL exposure, then verify the REST schema and GraphQL field before updating frontend selections.
