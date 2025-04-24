function handleList({ results, limit, page }) {
  return {
    total: results.count,
    results: results.rows,
    limit: limit ? parseInt(limit) : 0,
    page: page ? parseInt(page, 10) : 0,
  };
}

module.exports = { handleList };
