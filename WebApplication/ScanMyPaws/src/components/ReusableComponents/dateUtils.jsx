/**
 * Formats an ISO date string into a human-readable format.
 * @param {string | null} isoDate - The ISO date string to format.
 * @param {Object} options - Formatting options (optional).
 * @returns {string} - Formatted date string or "N/A" if invalid.
 */
export const formatDate = (isoDate, options = { year: "numeric", month: "long", day: "numeric" }) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, options);
  };
  