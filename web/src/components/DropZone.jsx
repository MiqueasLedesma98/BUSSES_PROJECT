import { Delete } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

export const DropZone = ({ file, setFieldValue }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFieldValue("media", acceptedFiles[0]); // Guardamos el archivo en el estado
    }
  }, []);

  const { getRootProps } = useDropzone({
    accept: { "video/mp4": [] },
    onDrop,
  });

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
          <video
            src={URL.createObjectURL(file)}
            controls
            style={{ width: "100%", borderRadius: 8, marginBottom: 8 }}
          />
          <CardContent>
            <Button
              variant="contained"
              endIcon={<Delete />}
              onClick={() => setFieldValue("media", null)}
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
