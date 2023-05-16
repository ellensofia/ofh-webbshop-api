/**
 * @param title
 * @returns Takes a string (title) as input and returns a URL-friendly slug by converting
 * it to lowercase, normalizing diacritic characters, and replacing non-alphanumeric
 * characters with hyphens while removing any leading or trailing hyphens.
 */
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
