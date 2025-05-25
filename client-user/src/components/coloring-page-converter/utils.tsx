"use client"

import { Paper, Button, Slider, styled } from "@mui/material"

// Custom styled components
export const UploadPaper = styled(Paper)(({ theme }) => ({
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

export const StyledPaper = styled(Paper)(({ theme }) => ({
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

export const GradientButton = styled(Button)(() => ({
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

export const OutlineButton = styled(Button)(() => ({
  borderColor: "#6a11cb",
  color: "#6a11cb",
  "&:hover": {
    backgroundColor: "rgba(106, 17, 203, 0.05)",
    borderColor: "#6a11cb",
  },
}))

export const StyledSlider = styled(Slider)(() => ({
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
export const Bubble = styled("div")<{ size: number; x: number; y: number; delay: number }>(({ size, x, y, delay }) => ({
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

// Image processing functions
export const processImageToColoringPage = (
  originalImage: string,
  canvas: HTMLCanvasElement,
  hiddenCanvas: HTMLCanvasElement,
  edgeSensitivity: number,
  onComplete: (result: string) => void,
) => {
  const img = new Image()
  img.crossOrigin = "anonymous"
  img.onload = () => {
    // Set up the visible canvas
    const ctx = canvas.getContext("2d")!

    // Set up the hidden canvas for processing
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
    onComplete(canvas.toDataURL("image/png"))
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
