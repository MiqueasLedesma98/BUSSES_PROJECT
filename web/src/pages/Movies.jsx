import { Box, Button, useTheme } from "@mui/material";
import { Card } from "../components/index.js";
import CustomPagination from "../components/CustomPagination.jsx";
import { useModalStore } from "../store/index.js";

export default function Movies() {
  return (
    <Box
      sx={{
        gridArea: "main",
        padding: "1rem 2rem 2rem 2rem",
        display: "grid",
        backgroundColor: "#f8f8f8",
        overflow: "auto",
      }}
    >
      <SearchBar />
      <CardsContainer />
    </Box>
  );
}

const SearchBar = () => {
  const { palette } = useTheme();

  const openModal = useModalStore((store) => store.openModal);

  return (
    <Box
      sx={{
        position: "sticky",
        top: "-1rem",
        zIndex: 1,
        marginBottom: "1.5rem",
        padding: "5px 0",
        display: "flex",
        justifyContent: "flex-end",
        bgcolor: palette.grey["100"],
      }}
    >
      <Button
        sx={{ ml: 2 }}
        variant="contained"
        onClick={() => openModal("createMovie", true)}
      >
        Nueva película
      </Button>
    </Box>
  );
};

const CardsContainer = () => {
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 350px))",
          justifyContent: "space-around",
          gap: "2rem",
        }}
      >
        {Array.from({ length: 20 })
          .fill({})
          .map((_, i) => (
            <Card key={i} />
          ))}
      </Box>
      <CustomPagination count={10} page={1} />
    </>
  );
};
