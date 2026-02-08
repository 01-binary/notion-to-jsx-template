type EnvVarName = 'NOTION_TOKEN' | 'NOTION_DATABASE_ID' | 'BLOG_URL';

function getEnvVar(name: EnvVarName, required = true): string {
  const value = process.env[name];

  if (!value && required) {
    throw new Error(`Environment variable ${name} is not defined`);
  }

  return value ?? '';
}

export const env = {
  notionToken: getEnvVar('NOTION_TOKEN'),
  notionDatabaseId: getEnvVar('NOTION_DATABASE_ID'),
  blogUrl: getEnvVar('BLOG_URL', false),
} as const;
