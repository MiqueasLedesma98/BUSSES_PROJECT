import { Box, Stack, Typography } from "@mui/material";
import IconChat from "../assets/icon-chat.png";
import IconGraph from "../assets/icon-graph.png";
import IconHelp from "../assets/icon-help.png";
import IconMovie from "../assets/icon-movie.png";
import IconChatSelected from "../assets/icon-chat-selected.png";
import IconGraphSelected from "../assets/icon-graph-selected.png";
import IconHelpSelected from "../assets/icon-help-selected.png";
import IconMovieSelected from "../assets/icon-movie-selected.png";
import { NavLink, useLocation } from "react-router-dom";
import { useMemo } from "react";

export function SideBar() {
  const { pathname } = useLocation();

  /**
   * @typedef {Object} Route
   * @property {string} route - La ruta del enlace.
   * @property {React.ComponentType} icon - El icono que se muestra cuando la ruta no está seleccionada.
   * @property {React.ComponentType} iconSelected - El icono que se muestra cuando la ruta está seleccionada.
   * @property {String} name - El nombre que se mostrara en el enlace
   */

  /**
   * @type {Route[]}
   * Un arreglo de objetos de rutas, cada uno contiene la ruta y los iconos asociados.
   */
  const routes = useMemo(
    () => [
      {
        route: "/dashboard/content",
        icon: IconMovie,
        iconSelected: IconMovieSelected,
        name: "Contenido",
      },
      {
        route: "/dashboard/advertising",
        icon: IconChat,
        iconSelected: IconChatSelected,
        name: "Publicidad",
      },
      {
        route: "/dashboard/enterprise",
        icon: IconHelp,
        iconSelected: IconHelpSelected,
        name: "Empresa",
      },
      {
        route: "/dashboard/metrics",
        icon: IconGraph,
        iconSelected: IconGraphSelected,
        name: "Metrica",
      },
    ],
    []
  );

  return (
    <Box
      component={"aside"}
      sx={{
        padding: "3rem",
        placeContent: "flex-start",
        display: "grid",
        gridArea: "sidebar",
        gridTemplateRows: "repeat(auto-fit, minmax(2rem, 3rem))",
      }}
    >
      {routes?.map((route) => (
        <NavLink className="navlink" key={route.route} to={route.route} replace>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <img
              src={
                pathname.includes(route.route) ? route.iconSelected : route.icon
              }
              alt="error..."
            />
            <Typography>{route.name}</Typography>
          </Stack>
        </NavLink>
      ))}
    </Box>
  );
}
