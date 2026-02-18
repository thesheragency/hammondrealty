function shouldUseNginxBasicAuth(): boolean {
  const enabled = process.env.WP_BASIC_AUTH_ENABLED;
  if (enabled === 'false' || enabled === '0') {
    return false;
  }
  return !!(process.env.WP_AUTH_USER && process.env.WP_AUTH_PASSWORD);
}

export function getNginxBasicAuthHeaders(): Record<string, string> {
  if (!shouldUseNginxBasicAuth()) {
    return {};
  }
  const credentials = Buffer.from(
    `${process.env.WP_AUTH_USER}:${process.env.WP_AUTH_PASSWORD}`
  ).toString('base64');
  return { Authorization: `Basic ${credentials}` };
}

export function getWpAppPasswordHeaders(): Record<string, string> {
  const user = process.env.WP_USER;
  const pass = process.env.WP_APPLIC_PASS;
  if (!user || !pass) {
    return {};
  }
  const credentials = Buffer.from(`${user}:${pass}`).toString('base64');
  return { Authorization: `Basic ${credentials}` };
}

export function getWpAuthHeaders(): Record<string, string> {
  const appHeaders = getWpAppPasswordHeaders();
  if (appHeaders.Authorization) {
    return appHeaders;
  }
  return getNginxBasicAuthHeaders();
}

export function getWordPressBaseUrl(): string {
  const wpApiUrl = process.env.WP_API_URL || '';
  return wpApiUrl.replace(/\/graphql\/?$/, '');
}
