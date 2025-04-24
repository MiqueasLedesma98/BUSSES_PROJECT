import { Box } from "@mui/material";
import { CardsContainer } from "../components/CardsContainer.jsx";
import { StickyButton } from "../components/StickyButton.jsx";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getMedia } from "../services/list.query.js";
import CustomPagination from "../components/CustomPagination.jsx";
import { useEffect } from "react";

export default function Movies() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);

  // Obtener datos de la API
  const { data, isFetching, isPlaceholderData, isPending } = useQuery({
    queryKey: ["movies", page],
    meta: { type: "movie", lang: "all", page, limit: 20 },
    placeholderData: keepPreviousData,
    queryFn: getMedia,
  });

  // Calcular total de páginas
  const totalPages = Math.ceil((data?.total || 1) / (data?.limit || 10));

  // Pre-fetch de la siguiente página si existe
  useEffect(() => {
    if (!isPlaceholderData && page < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["movies", page + 1],
        meta: { type: "movie", lang: "all", page: page + 1, limit: 20 },
        queryFn: getMedia,
      });
    }
  }, [page, queryClient, isPlaceholderData, totalPages]);

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
      <StickyButton btnText="Crear Pelicula" />
      <CardsContainer
        data={data?.results || []}
        isLoading={isFetching || isPending}
      />
      <CustomPagination count={totalPages} page={page} />
    </Box>
  );
}
