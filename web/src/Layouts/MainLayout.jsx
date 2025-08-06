import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ModalsBarrel, SideBar } from "../components";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import DetailsDrawer from "../components/DetailsDrawer";

const MainLayout = () => {
  return (
    <>
      <ModalsBarrel />
      <Box
        sx={{
          display: "grid",
          gridTemplateAreas: `
          "header header"
          "sidebar main"
          "sidebar footer"
        `,
          gridTemplateRows: "4rem 1fr 2rem",
          gridTemplateColumns: "250px 1fr",
          maxHeight: "100vh",
          minHeight: "100vh",
          overflowY: "hidden",
        }}
      >
        <MainHeader />
        <SideBar />
        <Outlet />
        <Footer />
      </Box>
      <DetailsDrawer />
    </>
  );
};

export default MainLayout;
