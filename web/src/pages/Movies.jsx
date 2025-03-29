import { Box, MenuItem, Select, TextField, useTheme } from "@mui/material";
import { Card } from "../components/index.js";
import { useSearchParams } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import { useDebounce, useFetch } from "../hooks";
import { useEffect } from "react";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const { palette } = useTheme();

  const searchValue = useDebounce(searchParams?.toString(), 700);

  useEffect(() => {
    if (searchValue) console.log(searchValue);
  }, [searchValue]);

  const handleSearchChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("search", e.target.value); // Agregar o actualizar "search"
    setSearchParams(newParams);
  };

  const handleLangChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("lang", e.target.value); // Agregar o actualizar "lang"
    setSearchParams(newParams);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: "-1rem",
        zIndex: 1,
        marginBottom: "1.5rem",
        padding: "5px 0",
        display: "flex",
        justifyContent: "center",
        bgcolor: palette.grey["100"],
      }}
    >
      <TextField
        sx={{ width: "30vw" }}
        label="Buscar"
        placeholder="Titulo de la pelicula"
        onChange={handleSearchChange}
      />
      <Select
        value={searchParams.get("lang") || "all"}
        onChange={handleLangChange}
        sx={{ width: "15vw" }}
      >
        <MenuItem value="all">Todos</MenuItem>
        <MenuItem value="esp">Español</MenuItem>
        <MenuItem value="eng">Ingles</MenuItem>
      </Select>
    </Box>
  );
};

const CardsContainer = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 350px))",
        justifyContent: "space-around",
        gap: "30px",
      }}
    >
      {Array.from({ length: 20 })
        .fill({})
        .map((_, i) => (
          <Card key={i} />
        ))}
    </Box>
  );
};
