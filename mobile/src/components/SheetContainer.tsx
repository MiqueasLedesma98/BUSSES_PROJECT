import React from "react";
import MovieDetail from "./MovieDetail";
import PromotionModal from "./PromotionModal";
import SheetCountrySelect from "./SheetCountrySelect";

const SheetContainer = () => {
  return (
    <>
      <MovieDetail />
      <SheetCountrySelect />
      <PromotionModal />
    </>
  );
};

export default SheetContainer;
