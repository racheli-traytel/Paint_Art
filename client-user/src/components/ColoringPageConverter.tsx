"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button, Box, Paper, Typography, Slider, Tabs, Tab, CircularProgress, styled, Stack } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import ImageIcon from "@mui/icons-material/Image"
import CreateIcon from "@mui/icons-material/Create"
import LineStyleIcon from "@mui/icons-material/LineStyle"
import DownloadIcon from "@mui/icons-material/Download"
import PrintIcon from "@mui/icons-material/Print"

// Custom styled components
const UploadPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  border: "2px dashed #ccc",
  cursor: "pointer",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
}))

const TabPanel = (props: { children?: React.ReactNode; value: number; index: number }) => {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  )
}

export default function ColoringPageConverter() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [coloringPage, setColoringPage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [edgeSensitivity, setEdgeSensitivity] = useState<number>(50)
  const [detailLevel, setDetailLevel] = useState<number>(50)
  const [contrastLevel, setContrastLevel] = useState<number>(50)
  const [tabValue, setTabValue] = useState(0)
  const effectTypes = ["sketch", "contour", "cartoon"]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setOriginalImage(result)
      setColoringPage(null)
    }
    reader.readAsDataURL(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  useEffect(() => {
    if (originalImage && !isProcessing && coloringPage) {
      // Auto-convert when tab changes and we have an image
      convertToColoringPage()
    }
  }, [tabValue])

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

      let processedImageData

      // Apply the selected effect
      switch (effectTypes[tabValue]) {
        case "sketch":
          processedImageData = applySketchEffect(imageData, width, height)
          break
        case "contour":
          processedImageData = applyContourEffect(imageData, width, height)
          break
        case "cartoon":
          processedImageData = applyCartoonEffect(imageData, width, height)
          break
        default:
          processedImageData = applySketchEffect(imageData, width, height)
      }

      // Draw the result on the visible canvas
      ctx.putImageData(processedImageData, 0, 0)

      // Convert canvas to image
      setColoringPage(canvas.toDataURL("image/png"))
      setIsProcessing(false)
    }

    img.src = originalImage
  }

  // Sketch effect - creates a pencil-like drawing
  const applySketchEffect = (imageData: ImageData, width: number, height: number) => {
    const data = imageData.data
    const result = new ImageData(width, height)
    const resultData = result.data

    // Convert to grayscale and apply contrast
    const contrastFactor = (259 * (contrastLevel + 255)) / (255 * (259 - contrastLevel))
    for (let i = 0; i < data.length; i += 4) {
      // Weighted grayscale conversion
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]

      // Apply contrast
      let adjusted = contrastFactor * (gray - 128) + 128
      adjusted = Math.max(0, Math.min(255, adjusted))

      // Invert for sketch effect (darker areas become lighter)
      const inverted = 255 - adjusted

      resultData[i] = inverted
      resultData[i + 1] = inverted
      resultData[i + 2] = inverted
      resultData[i + 3] = 255
    }

    // Apply edge detection to enhance lines
    const edgeData = detectEdges(imageData, width, height, edgeSensitivity, detailLevel)

    // Blend the edge data with the grayscale inverted image
    for (let i = 0; i < resultData.length; i += 4) {
      // If there's a strong edge, make it darker
      if (edgeData.data[i] < 100) {
        resultData[i] = 0
        resultData[i + 1] = 0
        resultData[i + 2] = 0
      }
    }

    return result
  }

  // Contour effect - focuses on outlines
  const applyContourEffect = (imageData: ImageData, width: number, height: number) => {
    // First, create a white background
    const result = new ImageData(width, height)
    const resultData = result.data

    for (let i = 0; i < resultData.length; i += 4) {
      resultData[i] = 255
      resultData[i + 1] = 255
      resultData[i + 2] = 255
      resultData[i + 3] = 255
    }

    // Apply edge detection with sensitivity based on user settings
    const edgeThreshold = 255 - edgeSensitivity * 2
    const detailThreshold = 100 - detailLevel

    // Apply Gaussian blur to reduce noise
    const blurredData = applyGaussianBlur(imageData, width, height)

    // Compute gradients (Sobel operator)
    const { gradientMagnitude } = computeGradients(blurredData, width, height)

    // Apply thresholding for edges
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4
        const gradIdx = y * width + x

        // If gradient magnitude is above threshold, draw a black pixel
        if (gradientMagnitude[gradIdx] > edgeThreshold - detailThreshold) {
          resultData[idx] = 0
          resultData[idx + 1] = 0
          resultData[idx + 2] = 0
        }
      }
    }

    return result
  }

  // Cartoon effect - simplifies and enhances edges
  const applyCartoonEffect = (imageData: ImageData, width: number, height: number) => {
    const data = imageData.data
    const result = new ImageData(width, height)
    const resultData = result.data

    // First, apply bilateral filter to smooth colors while preserving edges
    const smoothedData = applyBilateralFilter(imageData, width, height)

    // Then, apply edge detection
    const edgeData = detectEdges(imageData, width, height, edgeSensitivity, detailLevel)

    // Combine smoothed colors with edges
    for (let i = 0; i < data.length; i += 4) {
      // Get smoothed color
      const r = smoothedData.data[i]
      const g = smoothedData.data[i + 1]
      const b = smoothedData.data[i + 2]

      // If there's an edge, make it black
      if (edgeData.data[i] < 100) {
        resultData[i] = 0
        resultData[i + 1] = 0
        resultData[i + 2] = 0
      } else {
        // Otherwise, use the smoothed color
        resultData[i] = r
        resultData[i + 1] = g
        resultData[i + 2] = b
      }

      resultData[i + 3] = 255
    }

    return result
  }

  // Improved edge detection
  const detectEdges = (imageData: ImageData, width: number, height: number, sensitivity = 50, detail = 50) => {
    // Apply Gaussian blur to reduce noise
    const blurredData = applyGaussianBlur(imageData, width, height)

    // Compute gradients (Sobel operator)
    const { gradientMagnitude } = computeGradients(blurredData, width, height)

    // Apply double threshold to identify strong and weak edges
    const result = new ImageData(width, height)
    const resultData = result.data

    // Fill with white background
    for (let i = 0; i < resultData.length; i += 4) {
      resultData[i] = 255
      resultData[i + 1] = 255
      resultData[i + 2] = 255
      resultData[i + 3] = 255
    }

    // Adjust thresholds based on sensitivity and detail
    const highThreshold = 150 + sensitivity
    const lowThreshold = 50 + detail / 2

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
            // Use average of RGB for grayscale value
            const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3

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

  // Bilateral filter for cartoon effect
  const applyBilateralFilter = (imageData: ImageData, width: number, height: number) => {
    const data = imageData.data
    const result = new Uint8ClampedArray(data.length)

    // Copy alpha channel
    for (let i = 3; i < data.length; i += 4) {
      result[i] = 255
    }

    const sigmaSpace = 3.0
    const sigmaColor = 50.0
    const radius = Math.ceil(sigmaSpace * 2)

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4

        let sumR = 0,
          sumG = 0,
          sumB = 0
        let totalWeight = 0

        // Center pixel values
        const centerR = data[idx]
        const centerG = data[idx + 1]
        const centerB = data[idx + 2]

        // Process neighborhood
        for (let ny = Math.max(0, y - radius); ny <= Math.min(height - 1, y + radius); ny++) {
          for (let nx = Math.max(0, x - radius); nx <= Math.min(width - 1, x + radius); nx++) {
            const nidx = (ny * width + nx) * 4

            // Spatial distance
            const spatialDist = Math.sqrt((nx - x) ** 2 + (ny - y) ** 2)

            // Color distance
            const colorDist = Math.sqrt(
              (centerR - data[nidx]) ** 2 + (centerG - data[nidx + 1]) ** 2 + (centerB - data[nidx + 2]) ** 2,
            )

            // Calculate weight
            const spatialWeight = Math.exp(-(spatialDist ** 2) / (2 * sigmaSpace ** 2))
            const colorWeight = Math.exp(-(colorDist ** 2) / (2 * sigmaColor ** 2))
            const weight = spatialWeight * colorWeight

            // Accumulate weighted values
            sumR += data[nidx] * weight
            sumG += data[nidx + 1] * weight
            sumB += data[nidx + 2] * weight
            totalWeight += weight
          }
        }

        // Normalize and set result
        result[idx] = Math.round(sumR / totalWeight)
        result[idx + 1] = Math.round(sumG / totalWeight)
        result[idx + 2] = Math.round(sumB / totalWeight)
      }
    }

    return new ImageData(result, width, height)
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        הפוך תמונה לדף צביעה
      </Typography>

      <UploadPaper
        elevation={3}
        sx={{
          backgroundColor: originalImage ? "transparent" : "#f8f8f8",
        }}
        onClick={triggerFileInput}
      >
        <input type="file" accept="image/*" hidden onChange={handleImageUpload} ref={fileInputRef} />

        {!originalImage ? (
          <Box sx={{ py: 5 }}>
            <CloudUploadIcon sx={{ fontSize: 48, color: "text.secondary" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              לחץ כאן להעלאת תמונה
            </Typography>
            <Typography variant="body2" color="textSecondary">
              או גרור תמונה לכאן
            </Typography>
          </Box>
        ) : (
          <Box sx={{ width: "100%" }}>
            <Typography variant="subtitle1" gutterBottom>
              התמונה המקורית
            </Typography>
            <img
              src={originalImage || "/placeholder.svg"}
              alt="Original"
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          </Box>
        )}
      </UploadPaper>

      {originalImage && (
        <Box sx={{ mb: 3 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              aria-label="effect tabs"
            >
              <Tab
                icon={<CreateIcon />}
                label="סקיצה"
                id="tab-0"
                aria-controls="tabpanel-0"
                sx={{ flexDirection: "row", gap: 1 }}
              />
              <Tab
                icon={<LineStyleIcon />}
                label="קווי מתאר"
                id="tab-1"
                aria-controls="tabpanel-1"
                sx={{ flexDirection: "row", gap: 1 }}
              />
              <Tab
                icon={<ImageIcon />}
                label="קומיקס"
                id="tab-2"
                aria-controls="tabpanel-2"
                sx={{ flexDirection: "row", gap: 1 }}
              />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography id="edge-sensitivity-label" variant="body2">
                    רגישות קווים
                  </Typography>
                  <Typography variant="body2">{edgeSensitivity}</Typography>
                </Box>
                <Slider
                  aria-labelledby="edge-sensitivity-label"
                  min={10}
                  max={100}
                  value={edgeSensitivity}
                  onChange={(_, value) => setEdgeSensitivity(value as number)}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography id="detail-level-label" variant="body2">
                    רמת פירוט
                  </Typography>
                  <Typography variant="body2">{detailLevel}</Typography>
                </Box>
                <Slider
                  aria-labelledby="detail-level-label"
                  min={10}
                  max={100}
                  value={detailLevel}
                  onChange={(_, value) => setDetailLevel(value as number)}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography id="contrast-level-label" variant="body2">
                    ניגודיות
                  </Typography>
                  <Typography variant="body2">{contrastLevel}</Typography>
                </Box>
                <Slider
                  aria-labelledby="contrast-level-label"
                  min={0}
                  max={100}
                  value={contrastLevel}
                  onChange={(_, value) => setContrastLevel(value as number)}
                />
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography id="edge-sensitivity-contour-label" variant="body2">
                    רגישות קווים
                  </Typography>
                  <Typography variant="body2">{edgeSensitivity}</Typography>
                </Box>
                <Slider
                  aria-labelledby="edge-sensitivity-contour-label"
                  min={10}
                  max={100}
                  value={edgeSensitivity}
                  onChange={(_, value) => setEdgeSensitivity(value as number)}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography id="detail-level-contour-label" variant="body2">
                    רמת פירוט
                  </Typography>
                  <Typography variant="body2">{detailLevel}</Typography>
                </Box>
                <Slider
                  aria-labelledby="detail-level-contour-label"
                  min={10}
                  max={100}
                  value={detailLevel}
                  onChange={(_, value) => setDetailLevel(value as number)}
                />
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography id="edge-sensitivity-cartoon-label" variant="body2">
                    עובי קווים
                  </Typography>
                  <Typography variant="body2">{edgeSensitivity}</Typography>
                </Box>
                <Slider
                  aria-labelledby="edge-sensitivity-cartoon-label"
                  min={10}
                  max={100}
                  value={edgeSensitivity}
                  onChange={(_, value) => setEdgeSensitivity(value as number)}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography id="detail-level-cartoon-label" variant="body2">
                    רמת פירוט
                  </Typography>
                  <Typography variant="body2">{detailLevel}</Typography>
                </Box>
                <Slider
                  aria-labelledby="detail-level-cartoon-label"
                  min={10}
                  max={100}
                  value={detailLevel}
                  onChange={(_, value) => setDetailLevel(value as number)}
                />
              </Box>
            </TabPanel>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={convertToColoringPage}
                disabled={isProcessing}
                sx={{ minWidth: 200 }}
                startIcon={isProcessing ? <CircularProgress size={24} color="inherit" /> : null}
              >
                {isProcessing ? "מעבד..." : "צור דף צביעה"}
              </Button>
            </Box>
          </Paper>
        </Box>
      )}

      {coloringPage && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom align="center">
            דף הצביעה
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <img
              src={coloringPage || "/placeholder.svg"}
              alt="Coloring Page"
              style={{ maxWidth: "100%", maxHeight: "400px" }}
            />
          </Box>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              component="a"
              href={coloringPage}
              download="coloring-page.png"
              startIcon={<DownloadIcon />}
            >
              הורד
            </Button>
            <Button variant="outlined" onClick={() => window.print()} startIcon={<PrintIcon />}>
              הדפס
            </Button>
          </Stack>
        </Paper>
      )}

      {/* Hidden canvas elements for image processing */}
      <Box sx={{ display: "none" }}>
        <canvas ref={canvasRef}></canvas>
        <canvas ref={hiddenCanvasRef}></canvas>
      </Box>
    </Box>
  )
}
