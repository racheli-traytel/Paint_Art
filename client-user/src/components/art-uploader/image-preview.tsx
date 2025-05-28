"use client"

import type React from "react"
import { Box, Button, IconButton, Typography } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import CloseIcon from "@mui/icons-material/Close"
import ImageIcon from "@mui/icons-material/Image"
import { ImagePreviewBox, VisuallyHiddenInput } from "./styled-components"
import { colorPalette } from "./theme"

import type { FileData } from "./types"

interface ImagePreviewProps {
  fileData: FileData
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveImage: () => void
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ fileData, onFileChange, onRemoveImage }) => {
  const { imagePreview } = fileData

  return (
    <>
      <ImagePreviewBox>
        {imagePreview ? (
          <>
            <Box
              component="img"
              src={imagePreview || "/placeholder.svg"}
              alt="תצוגה מקדימה"
              sx={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            />
            <IconButton
              onClick={onRemoveImage}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: colorPalette.secondary,
                color: "white",
                "&:hover": { bgcolor: "#e05555" },
              }}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <>
            <ImageIcon sx={{ fontSize: 64, color: "#ced4da", mb: 1 }} />
            <Typography
              sx={{
                color: "#6c757d",
                fontSize: "0.9rem",
                borderTop: `2px dashed ${colorPalette.accent1}`,
                borderBottom: `2px dashed ${colorPalette.accent1}`,
                py: 1,
                px: 3,
                mt: 2,
                borderRadius: 1,
              }}
            >
              תצוגה מקדימה
            </Typography>
          </>
        )}
      </ImagePreviewBox>

      <Button
        component="label"
        fullWidth
        variant="outlined"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "left",
          py: 1.5,
          mt: 2,
          borderWidth: 2,
          borderColor: colorPalette.accent1,
          color: colorPalette.accent1,
          "&:hover": {
            borderColor: colorPalette.primary,
            borderWidth: 2,
            backgroundColor: "rgba(67, 97, 238, 0.05)",
          },
        }}
      >
        <CloudUploadIcon />
        <span>בחר קובץ להעלאה *</span>
        <VisuallyHiddenInput type="file" onChange={onFileChange} accept="image/*" />
      </Button>
    </>
  )
}

export default ImagePreview
