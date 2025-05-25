"use client"

import type React from "react"
import { useState, useRef } from "react"
import {
  Button,
  Box,
  Paper,
  Typography,
  Slider,
  CircularProgress,
  styled,
  Container,
  Grid,
  Divider,
  IconButton,
  Tooltip,
  Zoom,
} from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import DownloadIcon from "@mui/icons-material/Download"
import PrintIcon from "@mui/icons-material/Print"
import DeleteIcon from "@mui/icons-material/Delete"
import TuneIcon from "@mui/icons-material/Tune"
import BrushIcon from "@mui/icons-material/Brush"
import ImageIcon from "@mui/icons-material/Image"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"

// Custom styled components
const UploadPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  border: "2px dashed rgba(106, 17, 203, 0.3)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  borderRadius: 16,
  "&:hover": {
    backgroundColor: "rgba(106, 17, 203, 0.05)",
    borderColor: "rgba(106, 17, 203, 0.5)",
    transform: "translateY(-4px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
  },
}))

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: 16,
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
  },
}))

const GradientButton = styled(Button)(({ }) => ({
  background: "linear-gradient(to right, #FF8008, #FFC837)",
  color: "white",
  boxShadow: "0 4px 10px rgba(255, 128, 8, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 15px rgba(255, 128, 8, 0.4)",
    transform: "translateY(-2px)",
  },
  "&.Mui-disabled": {
    background: "linear-gradient(to right, #FFB74D, #FFE082)",
    color: "rgba(255, 255, 255, 0.7)",
  },
}))

const OutlineButton = styled(Button)(({ }) => ({
  borderColor: "#6a11cb",
  color: "#6a11cb",
  "&:hover": {
    backgroundColor: "rgba(106, 17, 203, 0.05)",
    borderColor: "#6a11cb",
  },
}))

const StyledSlider = styled(Slider)(({ }) => ({
  color: "#6a11cb",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid #6a11cb",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "0 0 0 8px rgba(106, 17, 203, 0.16)",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#6a11cb",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
}))

// Decorative bubble component
const Bubble = styled("div")<{ size: number; x: number; y: number; delay: number }>(({ size, x, y, delay }) => ({
  position: "absolute",
  width: `${size}px`,
  height: `${size}px`,
  borderRadius: "50%",
  background: "linear-gradient(135deg, rgba(106, 17, 203, 0.1), rgba(37, 117, 252, 0.05))",
  top: `${y}%`,
  left: `${x}%`,
  zIndex: -1,
  animation: `float 8s ease-in-out ${delay}s infinite`,
  "@keyframes float": {
    "0%, 100%": {
      transform: "translateY(0px)",
    },
    "50%": {
      transform: "translateY(-20px)",
    },
  },
}))

export default function ColoringPageConverter() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [coloringPage, setColoringPage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [edgeSensitivity, setEdgeSensitivity] = useState<number>(50)
  const [dragActive, setDragActive] = useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    console.log("file",file);
    
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setOriginalImage(result)
      setColoringPage(null)
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
        setOriginalImage(result)
        setColoringPage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const resetImages = () => {
    setOriginalImage(null)
    setColoringPage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const convertToColoringPage = () => {
    if (!originalImage || !canvasRef.current || !hiddenCanvasRef.current) return

    setIsProcessing(true)

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      // Set up the visible canvas
      const canvas = canvasRef.current!
      const ctx = canvas.getContext("2d")!

      // Set up the hidden canvas for processing
      const hiddenCanvas = hiddenCanvasRef.current!
      const hiddenCtx = hiddenCanvas.getContext("2d")!

      // Set canvas dimensions to match image
      const width = img.width
      const height = img.height
      canvas.width = width
      canvas.height = height
      hiddenCanvas.width = width
      hiddenCanvas.height = height

      // Draw original image on hidden canvas
      hiddenCtx.drawImage(img, 0, 0, width, height)

      // Get image data for processing
      const imageData = hiddenCtx.getImageData(0, 0, width, height)
      const data = imageData.data

      // Convert to grayscale
      for (let i = 0; i < data.length; i += 4) {
        const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2]
        data[i] = gray
        data[i + 1] = gray
        data[i + 2] = gray
      }

      // Apply edge detection with user-defined sensitivity
      const edges = detectEdges(imageData, width, height, edgeSensitivity)

      // Draw the result on the visible canvas
      ctx.fillStyle = "white"
      ctx.fillRect(0, 0, width, height)
      ctx.putImageData(edges, 0, 0)

      // Convert canvas to image
      setColoringPage(canvas.toDataURL("image/png"))
      setIsProcessing(false)
    }

    img.src = originalImage
  }

  // Improved edge detection with Canny-inspired approach
  const detectEdges = (imageData: ImageData, width: number, height: number, sensitivity = 50) => {
    // Step 1: Apply Gaussian blur to reduce noise
    const blurredData = applyGaussianBlur(imageData, width, height)

    // Step 2: Compute gradients (Sobel operator)
    const { gradientMagnitude } = computeGradients(blurredData, width, height)

    // Step 3: Apply double threshold to identify strong and weak edges
    const result = new ImageData(width, height)
    const resultData = result.data

    // Fill with white background
    for (let i = 0; i < resultData.length; i += 4) {
      resultData[i] = 255
      resultData[i + 1] = 255
      resultData[i + 2] = 255
      resultData[i + 3] = 255
    }

    // Apply thresholding for edges
    const highThreshold = sensitivity * 1.6
    const lowThreshold = sensitivity * 0.6

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4
        const gradIdx = y * width + x

        // Strong edge
        if (gradientMagnitude[gradIdx] > highThreshold) {
          resultData[idx] = 0
          resultData[idx + 1] = 0
          resultData[idx + 2] = 0
        }
        // Weak edge, connected to strong edge
        else if (gradientMagnitude[gradIdx] > lowThreshold) {
          // Check if connected to strong edge
          let isConnected = false
          for (let ny = Math.max(0, y - 1); ny <= Math.min(height - 1, y + 1); ny++) {
            for (let nx = Math.max(0, x - 1); nx <= Math.min(width - 1, x + 1); nx++) {
              if (gradientMagnitude[ny * width + nx] > highThreshold) {
                isConnected = true
                break
              }
            }
            if (isConnected) break
          }

          if (isConnected) {
            resultData[idx] = 0
            resultData[idx + 1] = 0
            resultData[idx + 2] = 0
          }
        }
      }
    }

    return result
  }

  // Helper function to apply Gaussian blur
  const applyGaussianBlur = (imageData: ImageData, width: number, height: number) => {
    const kernel = [
      [1, 2, 1],
      [2, 4, 2],
      [1, 2, 1],
    ]
    const kernelSum = 16
    const data = imageData.data
    const result = new Uint8ClampedArray(data.length)

    // Copy alpha channel
    for (let i = 3; i < data.length; i += 4) {
      result[i] = 255
    }

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4

        let r = 0,
          g = 0,
          b = 0

        // Apply kernel
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const currentIdx = ((y + ky) * width + (x + kx)) * 4
            const weight = kernel[ky + 1][kx + 1]

            r += data[currentIdx] * weight
            g += data[currentIdx + 1] * weight
            b += data[currentIdx + 2] * weight
          }
        }

        result[idx] = r / kernelSum
        result[idx + 1] = g / kernelSum
        result[idx + 2] = b / kernelSum
      }
    }

    const blurredData = new ImageData(result, width, height)
    return blurredData
  }

  // Helper function to compute gradients
  const computeGradients = (imageData: ImageData, width: number, height: number) => {
    const data = imageData.data
    const gradientMagnitude = new Array(width * height)
    const gradientDirection = new Array(width * height)

    // Sobel kernels
    const sobelX = [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1],
    ]

    const sobelY = [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1],
    ]

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let gx = 0
        let gy = 0

        // Apply Sobel operators
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = ((y + ky) * width + (x + kx)) * 4
            const gray = data[idx] // Already grayscale

            gx += gray * sobelX[ky + 1][kx + 1]
            gy += gray * sobelY[ky + 1][kx + 1]
          }
        }

        const gradIdx = y * width + x
        gradientMagnitude[gradIdx] = Math.sqrt(gx * gx + gy * gy)
        gradientDirection[gradIdx] = Math.atan2(gy, gx)
      }
    }

    return { gradientMagnitude, gradientDirection }
  }

  return (
    <Container maxWidth="lg" sx={{ position: "relative", overflow: "hidden", py: 4 }}>
      {/* Decorative bubbles */}
      <Bubble size={120} x={10} y={20} delay={1} />
      <Bubble size={80} x={80} y={60} delay={2} />
      <Bubble size={150} x={70} y={25} delay={0} />
      <Bubble size={60} x={20} y={70} delay={3} />

      <Box sx={{ textAlign: "center", mb: 4, position: "relative" }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            mb: 1,
            background: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          המרת תמונות לדפי צביעה
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          העלה תמונה והפוך אותה לדף צביעה מותאם אישית בקלות
        </Typography>
        <Divider
          sx={{
            width: "100px",
            mx: "auto",
            borderColor: "rgba(106, 17, 203, 0.2)",
            borderWidth: 2,
            borderRadius: 2,
          }}
        />
      </Box>

      <Grid container spacing={4}>
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
                        resetImages()
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
                  src={originalImage || "/placeholder.svg"}
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

        <Grid item xs={12} md={6}>
          {originalImage ? (
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
          ) : (
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
          )}
        </Grid>
      </Grid>

      {coloringPage && (
        <StyledPaper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            align="center"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              fontWeight: "bold",
              color: "#6a11cb",
              mb: 3,
            }}
          >
            <BrushIcon />
            דף הצביעה שלך מוכן!
          </Typography>
          <Box
            sx={{
              textAlign: "center",
              bgcolor: "white",
              p: 2,
              borderRadius: 2,
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
            }}
          >
            <Box
              component="img"
              src={coloringPage || "/placeholder.svg"}
              alt="Coloring Page"
              sx={{
                maxWidth: "100%",
                maxHeight: "500px",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>

            <Button
              variant="outlined"
              component="a"
              href={coloringPage}
              download="coloring-page.png"
              startIcon={<DownloadIcon />}
              sx={{ borderRadius: 8, px: 3 }}
            >
              הורד
            </Button>

            <OutlineButton
              variant="outlined"
              onClick={() => window.print()}
              startIcon={<PrintIcon />}
              sx={{ borderRadius: 8, px: 3 }}
            >
              הדפס
            </OutlineButton>
          </Box>
        </StyledPaper>
      )}

      <Box sx={{ display: "none" }}>
        <canvas ref={canvasRef}></canvas>
        <canvas ref={hiddenCanvasRef}></canvas>
      </Box>
    </Container>
  )
}
