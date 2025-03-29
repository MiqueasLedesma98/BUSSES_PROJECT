import React, { Suspense, lazy } from "react";
import { useModalStore } from "../store";
import { LinearProgress } from "@mui/material";

const CreateMovieModal = lazy(() => import("./CreateMovieModal"));

export const ModalsBarrel = () => {
  const modals = useModalStore((store) => store.modals);

  return (
    <Suspense fallback={<LinearProgress />}>
      {modals.createMovie && <CreateMovieModal value={modals.createMovie} />}
    </Suspense>
  );
};
