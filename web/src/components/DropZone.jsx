import { Delete } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

export const DropZone = ({
  fieldKey = "media",
  file,
  setFieldValue,
  accept = { "video/mp4": [] },
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFieldValue(fieldKey, acceptedFiles[0]);
    }
  }, []);

  const { getRootProps } = useDropzone({
    accept,
    onDrop,
  });

  const url = file && URL.createObjectURL(file);
  const isImage = file?.type?.startsWith("image/");

  const renderFile = useMemo(
    () =>
      file ? (
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
          }}
        >
          {isImage ? (
            <img
              src={url}
              alt="preview"
              style={{
                maxWidth: "100%",
                maxHeight: 250,
                borderRadius: 8,
                marginBottom: 8,
                objectFit: "contain",
              }}
            />
          ) : (
            <video
              src={url}
              controls
              style={{
                width: "100%",
                borderRadius: 8,
                marginBottom: 8,
              }}
            />
          )}
          <CardContent>
            <Button
              variant="contained"
              endIcon={<Delete />}
              onClick={() => setFieldValue(fieldKey, null)}
            >
              {file.name}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Typography>Suelta aquí los archivos</Typography>
      ),
    [file]
  );

  return (
    <Box
      {...getRootProps({ className: "dropzone" })}
      sx={{
        border: "2px dashed #aaa",
        borderRadius: 2,
        minHeight: 180,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#aaa",
        textAlign: "center",
        mb: 3,
      }}
    >
      {renderFile}
    </Box>
  );
};
