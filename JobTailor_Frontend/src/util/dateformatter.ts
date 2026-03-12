/**
 * Shared date/display formatting for records (e.g. work experience chips).
 */

export function formatDateDisplay(v: unknown): string {
  if (v == null || v === "") return "";
  const s = String(v).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
    const d = new Date(s);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  }
  return s;
}

/**
 * Format a single field value for display; uses formatDateDisplay for date keys.
 * end_date empty + is_current → "Present".
 */
export function formatScalar(
  key: string,
  value: unknown,
  item: Record<string, unknown>,
): string {
  if (
    key === "end_date" &&
    (value == null || value === "") &&
    item.is_current === true
  ) {
    return "Present";
  }
  if (value == null || value === "") return "";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (key.includes("date") || key === "start_date" || key === "end_date") {
    return formatDateDisplay(value) || String(value);
  }
  return String(value);
}
