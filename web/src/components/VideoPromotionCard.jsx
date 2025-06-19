import { useState, useRef, useEffect } from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import { baseURL } from "../api";
import {
  PauseCircle,
  PlayCircle,
  ErrorOutline,
  Delete,
} from "@mui/icons-material";

const VideoPromotionCard = ({ title, path }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);

  const videoUrl = `${baseURL}${path}`;

  useEffect(() => {
    setHasError(false);
  }, [path]);

  const handlePlayPause = () => {
    if (hasError || !videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => {
          console.error("Error al reproducir:", e);
          setHasError(true);
        });
    }
  };

  const handleVideoError = () => {
    setHasError(true);
  };

  return (
    <Card sx={{ borderRadius: 5, maxWidth: 345, m: 2 }}>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          cursor: "pointer",
          overflow: "hidden",
        }}
        onClick={handlePlayPause}
      >
        {/* Video siempre montado */}
        <video
          ref={videoRef}
          src={videoUrl}
          onError={handleVideoError}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: hasError ? "none" : "block",
          }}
          loop
          preload="metadata"
        />

        {/* Overlay cuando está detenido o con error */}
        {(!isPlaying || hasError) && (
          <Box
            sx={{
              position: "absolute",
              zIndex: 1,
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.7)",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{ fontSize: 60 }}
              color={hasError ? "error" : "primary"}
            >
              {hasError ? (
                <ErrorOutline fontSize="inherit" />
              ) : (
                <PlayCircle fontSize="inherit" />
              )}
            </IconButton>
            {hasError && (
              <Typography color="error" variant="caption">
                Error al cargar el video
              </Typography>
            )}
          </Box>
        )}
      </Box>

      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          Ruta: {path}
        </Typography>

        <IconButton>
          <Delete />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default VideoPromotionCard;
