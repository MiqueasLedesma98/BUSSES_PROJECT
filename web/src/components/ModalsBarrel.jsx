import React, { Suspense, lazy } from "react";
import { useModalStore } from "../store";
import { LinearProgress } from "@mui/material";

const Success = lazy(() => import("./Success"));
const CreateMovieModal = lazy(() => import("./CreateMovieModal"));

export const ModalsBarrel = () => {
  const modals = useModalStore((store) => store.modals);

  return (
    <Suspense fallback={<LinearProgress />}>
      {modals.createMovie && <CreateMovieModal value={modals.createMovie} />}
      {modals.createMusic && <CreateMovieModal value={modals.createMusic} />}
      {true && <Success />}
    </Suspense>
  );
};
