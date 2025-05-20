function handleList({ results, limit, page }) {
  return {
    total: results.count,
    results: results.rows,
    limit: limit ? parseInt(limit) : 0,
    page: page ? parseInt(page, 10) : 0,
  };
}

function formatForBarChart({ results, collection }) {
  const labelKey = collection === "promotion" ? "publicidad" : "titulo";

  return results.rows.map((item) => ({
    [labelKey]: item.title,
    vistas: item.views,
  }));
}

module.exports = { handleList, formatForBarChart };
