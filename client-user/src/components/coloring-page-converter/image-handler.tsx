"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Box, Typography, IconButton, Tooltip, CircularProgress, Grid, Zoom } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import DeleteIcon from "@mui/icons-material/Delete"
import ImageIcon from "@mui/icons-material/Image"
import TuneIcon from "@mui/icons-material/Tune"
import BrushIcon from "@mui/icons-material/Brush"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { UploadPaper, StyledPaper, GradientButton, StyledSlider, processImageToColoringPage } from "./utils"

interface ImageHandlerProps {
  originalImage: string | null
  isProcessing: boolean
  setIsProcessing: (processing: boolean) => void
  onImageUpload: (imageData: string) => void
  onReset: () => void
  onColoringPageGenerated: (pageData: string) => void
}

export function ImageHandler({
  originalImage,
  isProcessing,
  setIsProcessing,
  onImageUpload,
  onReset,
  onColoringPageGenerated,
}: ImageHandlerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [edgeSensitivity, setEdgeSensitivity] = useState<number>(50)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      onImageUpload(result)
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onImageUpload(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleReset = () => {
    onReset()
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const convertToColoringPage = () => {
    if (!originalImage || !canvasRef.current || !hiddenCanvasRef.current) return

    setIsProcessing(true)

    processImageToColoringPage(
      originalImage,
      canvasRef.current,
      hiddenCanvasRef.current,
      edgeSensitivity,
      onColoringPageGenerated,
    )
  }

  return (
    <>
      <Grid container spacing={4}>
        {/* Image Upload Section */}
        <Grid item xs={12} md={6}>
          <UploadPaper
            elevation={3}
            sx={{
              backgroundColor: originalImage ? "transparent" : "rgba(245, 247, 250, 0.7)",
              borderStyle: dragActive ? "solid" : "dashed",
              borderColor: dragActive ? "#6a11cb" : "rgba(106, 17, 203, 0.3)",
              height: "100%",
            }}
            onClick={triggerFileInput}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input type="file" accept="image/*" hidden onChange={handleImageUpload} ref={fileInputRef} />

            {!originalImage ? (
              <Box sx={{ py: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, rgba(106, 17, 203, 0.1), rgba(37, 117, 252, 0.05))",
                    mb: 2,
                  }}
                >
                  <CloudUploadIcon sx={{ fontSize: 40, color: "#6a11cb" }} />
                </Box>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold", color: "#333" }}>
                  לחץ כאן להעלאת תמונה
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  או גרור תמונה לכאן
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 3, maxWidth: "80%" }}>
                  תומך בפורמטים: JPG, PNG, GIF
                </Typography>
              </Box>
            ) : (
              <Box sx={{ width: "100%", position: "relative" }}>
                <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}>
                  <Tooltip title="הסר תמונה">
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        handleReset()
                      }}
                      sx={{
                        bgcolor: "rgba(255,255,255,0.8)",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    color: "#6a11cb",
                    fontWeight: "bold",
                  }}
                >
                  <ImageIcon fontSize="small" />
                  התמונה המקורית
                </Typography>
                <Box
                  component="img"
                  src={originalImage}
                  alt="Original"
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
              </Box>
            )}
          </UploadPaper>
        </Grid>

        {/* Processing Controls Section */}
        <Grid item xs={12} md={6}>
          {!originalImage ? (
            <StyledPaper
              elevation={3}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "rgba(245, 247, 250, 0.7)",
              }}
            >
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, rgba(106, 17, 203, 0.1), rgba(37, 117, 252, 0.05))",
                  mb: 3,
                }}
              >
                <ImageIcon sx={{ fontSize: 50, color: "#6a11cb" }} />
              </Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                העלה תמונה להתחלה
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", maxWidth: "80%" }}>
                העלה תמונה מהמחשב שלך כדי להתחיל בתהליך ההמרה לדף צביעה
              </Typography>
            </StyledPaper>
          ) : (
            <StyledPaper elevation={3} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    id="edge-sensitivity-label"
                    variant="subtitle2"
                    sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: "bold" }}
                  >
                    <TuneIcon fontSize="small" sx={{ color: "#6a11cb" }} />
                    רגישות קווי מתאר
                    <Tooltip
                      title="ערך גבוה יותר יוצר קווי מתאר חדים יותר, ערך נמוך יותר יוצר קווים עדינים יותר"
                      placement="top"
                      TransitionComponent={Zoom}
                    >
                      <InfoOutlinedIcon fontSize="small" sx={{ color: "text.secondary", ml: 0.5 }} />
                    </Tooltip>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      color: "#6a11cb",
                      bgcolor: "rgba(106, 17, 203, 0.1)",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 10,
                    }}
                  >
                    {edgeSensitivity}
                  </Typography>
                </Box>
                <StyledSlider
                  aria-labelledby="edge-sensitivity-label"
                  min={10}
                  max={100}
                  value={edgeSensitivity}
                  onChange={(_, value) => setEdgeSensitivity(value as number)}
                  valueLabelDisplay="auto"
                />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    עדין
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    חד
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  textAlign: "center",
                  mt: 2,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, rgba(255, 128, 8, 0.1), rgba(255, 200, 55, 0.05))",
                    mb: 3,
                  }}
                >
                  <BrushIcon sx={{ fontSize: 50, color: "#FF8008" }} />
                </Box>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  מוכן להפוך את התמונה לדף צביעה?
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: "80%", mx: "auto" }}>
                  התאם את רגישות קווי המתאר לפי הצורך ולחץ על הכפתור למטה
                </Typography>

                <GradientButton
                  variant="contained"
                  onClick={convertToColoringPage}
                  disabled={isProcessing}
                  sx={{ minWidth: 200, borderRadius: 8, py: 1.5 }}
                  startIcon={isProcessing ? <CircularProgress size={24} color="inherit" /> : null}
                >
                  {isProcessing ? "מעבד..." : "הפוך לדף צביעה"}
                </GradientButton>
              </Box>
            </StyledPaper>
          )}
        </Grid>
      </Grid>

      <Box sx={{ display: "none" }}>
        <canvas ref={canvasRef}></canvas>
        <canvas ref={hiddenCanvasRef}></canvas>
      </Box>
    </>
  )
}
