import { Box, Pagination } from "@mui/material";
import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const CustomPagination = ({ count = 10 }) => {
  const [search, setSearch] = useSearchParams();

  const handlePageChange = (_, value) => {
    setSearch({ ...Object.fromEntries(search), page: value });
  };

  const page = useMemo(() => {
    const p = search?.get("page");
    const parsed = parseInt(p, 10);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
  }, [search]);

  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        display: "grid",
        placeContent: "center",
        placeItems: "center",
      }}
    >
      <Pagination
        page={page}
        count={count}
        onChange={handlePageChange}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default CustomPagination;
