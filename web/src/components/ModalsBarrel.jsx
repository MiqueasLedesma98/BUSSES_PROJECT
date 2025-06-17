import { Suspense, lazy } from "react";
import { useModalStore } from "../store";
import { LinearProgress } from "@mui/material";

const Success = lazy(() => import("./Success"));
const CreateMovieModal = lazy(() => import("./CreateMovieModal"));
const CreatePromotionModal = lazy(() => import("./CreatePromotionModal"));
const CreatePublicity = lazy(() => import("./CreatePublicity"));

export const ModalsBarrel = () => {
  const modals = useModalStore((store) => store.modals);

  return (
    <Suspense fallback={<LinearProgress />}>
      {modals.createPromotion && <CreatePromotionModal />}
      {modals.createMovie && <CreateMovieModal type="movie" />}
      {modals.createMusic && <CreateMovieModal type="music" />}
      {modals["create-publicity"] && <CreatePublicity />}
      {modals.success && <Success />}
    </Suspense>
  );
};
