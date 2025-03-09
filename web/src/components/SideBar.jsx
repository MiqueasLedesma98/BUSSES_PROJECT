import { Box, Stack, Typography } from "@mui/material";
import LogoImg from "../assets/veotrans-logo.png";
import IconChat from "../assets/icon-chat.png";
import IconGraph from "../assets/icon-graph.png";
import IconHelp from "../assets/icon-help.png";
import IconMovie from "../assets/icon-movie.png";
import IconChatSelected from "../assets/icon-chat-selected.png";
import IconGraphSelected from "../assets/icon-graph-selected.png";
import IconHelpSelected from "../assets/icon-help-selected.png";
import IconMovieSelected from "../assets/icon-movie-selected.png";
import { NavLink, useLocation } from "react-router-dom";
export function SideBar() {
  const { pathname } = useLocation();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        paddingTop: "50px",
      }}
    >
      <img src={LogoImg} style={{ width: "127px", height: "35px" }} />
      <Stack
        sx={{
          width: "100%",
          paddingTop: "50px",
          paddingLeft: "50px",
          gap: "30px",
        }}
      >
        <Box display={"flex"} gap={2} alignItems={"center"} width={"100%"}>
          <img
            src={
              pathname === "/dashboard" ||
              pathname === "/dashboard/movies" ||
              pathname === "/dashboard/musics"
                ? IconMovieSelected
                : IconMovie
            }
            alt="icon_movie"
            style={{ width: "25px" }}
          />
          <NavLink to={"/dashboard"}>
            <Typography fontSize={"18px"} sx={{ cursor: "pointer" }}>
              Contenidos
            </Typography>
          </NavLink>
        </Box>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <img
            src={
              pathname === "/dashboard/advertising"
                ? IconChatSelected
                : IconChat
            }
            alt="icon_movie"
            style={{ width: "25px" }}
          />
          <NavLink to={"/dashboard/advertising"}>
            <Typography fontSize={"18px"} sx={{ cursor: "pointer" }}>
              Publicidad
            </Typography>
          </NavLink>
        </Box>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <img
            src={
              pathname === "/dashboard/enterprise" ? IconHelpSelected : IconHelp
            }
            alt="icon_movie"
            style={{ width: "25px" }}
          />
          <NavLink to={"/dashboard/enterprise"}>
            <Typography fontSize={"18px"} sx={{ cursor: "pointer" }}>
              Empresa
            </Typography>
          </NavLink>
        </Box>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <img
            src={
              pathname === "/dashboard/metrics" ? IconGraphSelected : IconGraph
            }
            alt="icon_movie"
            style={{ width: "25px" }}
          />
          <NavLink to={"/dashboard/metrics"}>
            <Typography fontSize={"18px"} sx={{ cursor: "pointer" }}>
              Métricas
            </Typography>
          </NavLink>
        </Box>
      </Stack>
    </Box>
  );
}
