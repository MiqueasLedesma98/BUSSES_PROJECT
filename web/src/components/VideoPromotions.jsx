import { Alert, Box, Button, LinearProgress, Typography } from "@mui/material";
import { useModalStore } from "../store";
import { useQuery } from "@tanstack/react-query";
import { getPromotion } from "../services/list.query";
import VideoPromotionCard from "./VideoPromotionCard";

const modalKey = "create-publicity";

export const VideoPromotions = ({ lang }) => {
  const openModal = useModalStore((s) => s.openModal);

  const { data, isFetching } = useQuery({
    queryKey: ["video-promotions", lang],
    queryFn: getPromotion,
    meta: { type: "video", lang, type_banner: "none", limit: 3, page: 0 },
  });

  return (
    <>
      <Box
        width={"100%"}
        height={"100px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h5" fontWeight={700} padding={3}>
          Comerciales
        </Typography>
        <Box sx={{ padding: "20px", display: "flex", gap: "15px" }}>
          <Button onClick={() => openModal(modalKey, true)} variant="contained">
            Nuevo Comercial
          </Button>
        </Box>
      </Box>
      {isFetching && <LinearProgress />}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 350px)",
          gap: "1em",
        }}
      >
        {data?.results?.length ? (
          <>
            {data.results.map((item) => (
              <VideoPromotionCard {...item} key={item.id} />
            ))}
          </>
        ) : (
          <Alert severity="info">No se han subido promociones</Alert>
        )}
      </Box>
    </>
  );
};
