import {
  Card as MuiCard,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { baseURL } from "../api";
import { useState, useRef, useEffect } from "react";

export function Card({ title, cover_path, url_path, year, type }) {
  const isMusic = type === "music";
  const [showVideo, setShowVideo] = useState(false);
  const hoverTimeout = useRef(null);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (!isMusic) {
      hoverTimeout.current = setTimeout(() => {
        setShowVideo(true);
      }, 1000);
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    setShowVideo(false);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video && showVideo) {
      const handleTimeUpdate = () => {
        if (video.currentTime >= 10) {
          video.currentTime = 0;
          video.play();
        }
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => video.removeEventListener("timeupdate", handleTimeUpdate);
    }
  }, [showVideo]);

  return (
    <MuiCard
      sx={{
        width: "350px",
        height: "260px",
        borderRadius: "20px",
        transition: "ease-in 100ms",
        ":hover": {
          cursor: "pointer",
          zIndex: 0,
          scale: { xs: "1", sm: "1.05" },
          transition: "ease-in 100ms",
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showVideo && !isMusic ? (
        <CardMedia
          ref={videoRef}
          component="video"
          src={baseURL + url_path}
          autoPlay
          muted
          loop
          height="180"
          sx={{ borderRadius: "20px 20px 0 0", objectFit: "cover" }}
        />
      ) : (
        <CardMedia
          component="img"
          height="180"
          image={baseURL + cover_path}
          alt="Cover"
          sx={{ borderRadius: "20px 20px 0 0" }}
        />
      )}

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "3px",
          paddingLeft: "15px",
        }}
      >
        <Typography variant="subtitle2" fontWeight={700}>
          {title}
        </Typography>
        <Typography variant="body2">
          {year} | {isMusic ? "Music" : "Action comedy"}
        </Typography>
      </CardContent>
    </MuiCard>
  );
}
