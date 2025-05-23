// "use client"

// import type React from "react"
// import { useRef, useState, useEffect } from "react"
// import {
//   Button,
//   Slider,
//   Typography,
//   Box,
//   IconButton,
//   Tooltip,
//   Snackbar,
//   Alert,
//   useTheme,
//   Paper,
//   alpha,
//   Divider,
//   Chip,
// } from "@mui/material"
// import {
//   Print,
//   Delete,
//   Save,
//   Download,
//   Clear,
//   ColorLens,
//   Undo,
//   Redo,
//   ZoomIn,
//   ZoomOut,
//   AutoAwesome,
//   Brush,
//   Category,
//   EmojiEmotions,
//   Close,
//   FormatColorFill,
// } from "@mui/icons-material"
// import axios from "axios"
// import { useParams } from "react-router-dom"
// import { useDispatch, useSelector } from "react-redux"
// import type { AppDispatch, RootStore } from "./redux/Store"
// import { addPaintedDrawing, fetchPaintedDrawingsByUserId } from "./redux/PaintedDrawingsSlice"
// import type Drawing from "../types/drawing"
// import type PaintedDrawing from "../types/PaintedDrawing"
// import { fetchAllDrawings } from "./redux/DrawingSlice"
// import api from "./api"
// import AIInstructionsPanel from "./AIInstructionsPanel"
// import ShapesTool from "./ShapesTool"
// import StickersTool from "./StickersTool"
// import FillBucketTool from "./fill-bucket-tool"
// import { floodFill, drawShape, drawResizeHandles, resizeShape } from "../lib/canvas-utils"

// // Define shape type
// interface Shape {
//   id: number
//   type: string
//   x: number
//   y: number
//   width: number
//   height: number
//   color: string
//   filled: boolean
//   points?: { x: number; y: number }[]
// }

// // Define sticker type
// interface Sticker {
//   id: number
//   type: string
//   x: number
//   y: number
//   size: number
//   content: string
// }

// const PaintCanvas = ({ isPainted }: { isPainted: boolean }) => {
//   const theme = useTheme()
//   const dispatch = useDispatch<AppDispatch>()
//   const { id } = useParams()
//   const { drawings } = useSelector((state: RootStore) => state.drawings)
//   const { paintedDrawings } = useSelector((state: RootStore) => state.paintedDrawings)
//   const drawingList = isPainted ? paintedDrawings : drawings
//   const drawing = drawingList.find((x) => x.id === (id ? Number.parseInt(id, 10) : undefined))

//   const { user } = useSelector((state: RootStore) => state.auth)
//   const userId: number = user ? user.id : 1

//   const canvasRef = useRef<HTMLCanvasElement | null>(null)
//   const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
//   const canvasHistoryRef = useRef<ImageData[]>([])
//   const historyIndexRef = useRef<number>(-1)
//   const isInitialLoadRef = useRef<boolean>(true)
//   const originalImageRef = useRef<HTMLImageElement | null>(null)

//   const [color, setColor] = useState<string>("#000000")
//   const [brushSize, setBrushSize] = useState<number>(5)
//   const [isDrawing, setIsDrawing] = useState<boolean>(false)
//   const [imageUrl, setImageUrl] = useState<string>("")
//   const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
//   const [snackbarMessage, setSnackbarMessage] = useState<string>("")
//   const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")
//   const [zoom, setZoom] = useState<number>(1)
//   const [aiInstructionsOpen, setAiInstructionsOpen] = useState<boolean>(false)
//   const [shapesToolOpen, setShapesToolOpen] = useState<boolean>(false)
//   const [stickersToolOpen, setStickersToolOpen] = useState<boolean>(false)
//   const [fillBucketToolOpen, setFillBucketToolOpen] = useState<boolean>(false)
//   const [currentTool, setCurrentTool] = useState<"brush" | "eraser" | "shape" | "sticker" | "fill" | "select">("brush")
//   const [currentShape, setCurrentShape] = useState<{
//     type: string
//     size: number
//     color: string
//     filled: boolean
//   }>({ type: "circle", size: 50, color: "#000000", filled: false })
//   const [currentSticker, setCurrentSticker] = useState<{
//     id: string
//     size: number
//   }>({ id: "emoji1", size: 50 })
//   const [fillOptions, setFillOptions] = useState<{
//     color: string
//     tolerance: number
//   }>({ color: "#000000", tolerance: 30 })
//   const [shapes, setShapes] = useState<Shape[]>([])
//   const [stickers, setStickers] = useState<Sticker[]>([])
//   const [selectedShapeIndex, setSelectedShapeIndex] = useState<number>(-1)
//   const [selectedStickerIndex, setSelectedStickerIndex] = useState<number>(-1)
//   const [isDragging, setIsDragging] = useState<boolean>(false)
//   const [isResizing, setIsResizing] = useState<boolean>(false)
//   const [resizeHandleIndex, setResizeHandleIndex] = useState<number>(-1)
//   const [dragStartX, setDragStartX] = useState<number>(0)
//   const [dragStartY, setDragStartY] = useState<number>(0)
//   const [nextId, setNextId] = useState<number>(1)
//   const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({ width: 800, height: 600 })

//   const colorPalette = [
//     "#FF0000",
//     "#FF4500",
//     "#FFA500",
//     "#FFD700",
//     "#FFFF00",
//     "#9ACD32",
//     "#00FF00",
//     "#008000",
//     "#00FFFF",
//     "#1E90FF",
//     "#0000FF",
//     "#4B0082",
//     "#800080",
//     "#FF00FF",
//     "#FF69B4",
//     "#A52A2A",
//     "#8B4513",
//     "#000000",
//     "#808080",
//     "#FFFFFF",
//   ]

//   // Emoji mapping for stickers
//   const emojiMap: Record<string, string> = {
//     emoji1: "😊",
//     emoji2: "😍",
//     emoji3: "🎨",
//     emoji4: "🌟",
//     emoji5: "🌈",
//     emoji6: "🦄",
//     emoji7: "🐶",
//     emoji8: "🐱",
//     emoji9: "🌺",
//     emoji10: "🍦",
//     emoji11: "🎁",
//     emoji12: "❤️",
//     emoji13: "🔥",
//     emoji14: "✨",
//     emoji15: "🎵",
//     emoji16: "🚀",
//   }

//   useEffect(() => {
//     if (id && drawings.length > 0) {
//       // Fetch image URL if drawing exists
//     }
//   }, [id, drawings, drawing])

//   useEffect(() => {
//     const fetchImageUrl = async () => {
//       try {
//         const downloadResponse = await api.get(`/upload/download-url/${drawing?.name}`)
//         const url = downloadResponse.data
//         setImageUrl(url)

//         // Pre-fetch AI instructions when image URL is available
//         if (url && !aiInstructionsOpen) {
//           try {
//             await api.get("/AIpaintings/aiDrawingInstructions", {
//               params: { path: url },
//             })
//           } catch (error) {
//             console.error("Error pre-fetching AI instructions:", error)
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching image:", error)
//       }
//     }

//     if (drawing) {
//       fetchImageUrl()
//     }
//   }, [drawing, aiInstructionsOpen])

//   // Initialize canvas and load image - הסרתי את color ו-brushSize מה-dependencies
//   useEffect(() => {
//     if (!canvasRef.current || !imageUrl) return

//     const canvas = canvasRef.current
//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     ctxRef.current = ctx
//     ctx.lineCap = "round"
//     ctx.lineJoin = "round"

//     const img = new Image()
//     img.crossOrigin = "anonymous"
//     img.src = imageUrl

//     img.onload = () => {
//       // Store the original image for later use
//       originalImageRef.current = img

//       // Calculate the best fit for the image while maintaining aspect ratio
//       const aspectRatio = img.width / img.height
//       let newWidth = canvasSize.width
//       let newHeight = canvasSize.height

//       if (aspectRatio > 1) {
//         // Landscape image
//         newHeight = canvasSize.width / aspectRatio
//       } else {
//         // Portrait or square image
//         newWidth = canvasSize.height * aspectRatio
//       }

//       // Update canvas size to match the image aspect ratio
//       canvas.width = newWidth
//       canvas.height = newHeight
//       setCanvasSize({ width: newWidth, height: newHeight })

//       // Clear canvas and draw the image
//       ctx.clearRect(0, 0, canvas.width, canvas.height)
//       ctx.drawImage(img, 0, 0, newWidth, newHeight)

//       // Initialize history with the base image
//       if (isInitialLoadRef.current) {
//         saveToHistory()
//         isInitialLoadRef.current = false
//       }
//     }

//     img.onerror = () => {
//       console.error("Failed to load image:", imageUrl)
//       showSnackbar(`שגיאה בטעינת התמונה`, "error")
//     }
//   }, [imageUrl]) // הסרתי color ו-brushSize מכאן

//   // עדכון הגדרות המכחול כשהצבע או הגודל משתנים
//   useEffect(() => {
//     const ctx = ctxRef.current
//     if (ctx) {
//       ctx.strokeStyle = color
//       ctx.lineWidth = brushSize
//     }
//   }, [color, brushSize])

//   // Redraw canvas when shapes or stickers change
//   useEffect(() => {
//     redrawCanvas()
//   }, [shapes, stickers, selectedShapeIndex, selectedStickerIndex])

//   useEffect(() => {
//     if (drawings.length === 0) {
//       dispatch(fetchAllDrawings())
//     }
//   }, [dispatch, drawings])

//   useEffect(() => {
//     if (paintedDrawings.length === 0) {
//       dispatch(fetchPaintedDrawingsByUserId(userId))
//     }
//   }, [dispatch, userId, paintedDrawings])

//   const [canvasHistory, setCanvasHistory] = useState<
//     {
//       imageData: ImageData | null
//       shapes: Shape[]
//       stickers: Sticker[]
//     }[]
//   >([])
//   const [historyIndex, setHistoryIndex] = useState<number>(-1)

//   const redrawCanvas = () => {
//     const canvas = canvasRef.current
//     const ctx = ctxRef.current
//     if (!canvas || !ctx) return

//     // Skip redrawing during active drag or resize operations to prevent duplication
//     if (isDragging || isResizing) return

//     // Clear the canvas and redraw the base image
//     ctx.clearRect(0, 0, canvas.width, canvas.height)

//     if (originalImageRef.current) {
//       ctx.drawImage(originalImageRef.current, 0, 0, canvas.width, canvas.height)
//     }

//     // Draw all shapes
//     shapes.forEach((shape, index) => {
//       drawShape(ctx, shape)
//       if (index === selectedShapeIndex) {
//         // Draw selection outline and handles
//         ctx.strokeStyle = "#0066ff"
//         ctx.lineWidth = 2
//         ctx.setLineDash([5, 5])
//         ctx.strokeRect(shape.x - shape.width / 2, shape.y - shape.height / 2, shape.width, shape.height)
//         ctx.setLineDash([])
//         drawResizeHandles(ctx, shape)
//       }
//     })

//     // Draw all stickers
//     stickers.forEach((sticker, index) => {
//       if (sticker.type === "emoji") {
//         ctx.font = `${sticker.size}px Arial`
//         ctx.textAlign = "center"
//         ctx.textBaseline = "middle"
//         ctx.fillText(sticker.content, sticker.x, sticker.y)
//       } else if (sticker.type === "icon") {
//         // Draw icon stickers (simplified as colored circles)
//         ctx.beginPath()
//         ctx.fillStyle = sticker.content
//         ctx.arc(sticker.x, sticker.y, sticker.size / 2, 0, Math.PI * 2)
//         ctx.fill()
//       }

//       if (index === selectedStickerIndex) {
//         // Draw selection outline
//         ctx.strokeStyle = "#0066ff"
//         ctx.lineWidth = 2
//         ctx.setLineDash([5, 5])
//         ctx.strokeRect(sticker.x - sticker.size / 2, sticker.y - sticker.size / 2, sticker.size, sticker.size)
//         ctx.setLineDash([])
//         // Draw resize handles
//         drawResizeHandles(ctx, {
//           x: sticker.x,
//           y: sticker.y,
//           width: sticker.size,
//           height: sticker.size,
//         })
//       }
//     })

//     // Save to history after redrawing (but not during drag/resize)
//     if (!isDragging && !isResizing) {
//       // Use setTimeout to ensure the canvas is fully rendered before saving
//       setTimeout(() => {
//         saveToHistory()
//       }, 10)
//     }
//   }

//   const saveToHistory = () => {
//     const canvas = canvasRef.current
//     const ctx = ctxRef.current
//     if (!canvas || !ctx) return

//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

//     // Remove any states after the current one if we've gone back in history
//     const newHistory = canvasHistory.slice(0, historyIndex + 1)

//     // Add the new state
//     newHistory.push({
//       imageData,
//       shapes: [...shapes],
//       stickers: [...stickers],
//     })

//     setCanvasHistory(newHistory)
//     setHistoryIndex(newHistory.length - 1)

//     // Also update the old history system for compatibility
//     canvasHistoryRef.current = newHistory.map((h) => h.imageData).filter(Boolean) as ImageData[]
//     historyIndexRef.current = newHistory.length - 1
//   }

//   const undo = () => {
//     if (historyIndex <= 0) return

//     const newIndex = historyIndex - 1
//     const historyState = canvasHistory[newIndex]

//     if (historyState) {
//       const canvas = canvasRef.current
//       const ctx = ctxRef.current
//       if (canvas && ctx && historyState.imageData) {
//         ctx.putImageData(historyState.imageData, 0, 0)
//       }

//       setShapes(historyState.shapes)
//       setStickers(historyState.stickers)
//       setHistoryIndex(newIndex)
//       historyIndexRef.current = newIndex
//     }
//   }

//   const redo = () => {
//     if (historyIndex >= canvasHistory.length - 1) return

//     const newIndex = historyIndex + 1
//     const historyState = canvasHistory[newIndex]

//     if (historyState) {
//       const canvas = canvasRef.current
//       const ctx = ctxRef.current
//       if (canvas && ctx && historyState.imageData) {
//         ctx.putImageData(historyState.imageData, 0, 0)
//       }

//       setShapes(historyState.shapes)
//       setStickers(historyState.stickers)
//       setHistoryIndex(newIndex)
//       historyIndexRef.current = newIndex
//     }
//   }

//   const showSnackbar = (message: string, severity: "success" | "error" = "success") => {
//     setSnackbarMessage(message)
//     setSnackbarSeverity(severity)
//     setSnackbarOpen(true)
//   }

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false)
//   }

//   const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current
//     const ctx = ctxRef.current
//     if (!canvas || !ctx) return

//     const rect = canvas.getBoundingClientRect()
//     const scaleX = canvas.width / rect.width
//     const scaleY = canvas.height / rect.height
//     const x = (e.clientX - rect.left) * scaleX
//     const y = (e.clientY - rect.top) * scaleY

//     if (currentTool === "brush" || currentTool === "eraser") {
//       setIsDrawing(true)
//       ctx.beginPath()
//       ctx.moveTo(x, y)
//       draw(e)
//     } else if (currentTool === "shape") {
//       // Add a new shape
//       const newShape: Shape = {
//         id: nextId,
//         type: currentShape.type,
//         x,
//         y,
//         width: currentShape.size,
//         height: currentShape.size,
//         color: currentShape.color,
//         filled: currentShape.filled,
//       }
//       setShapes([...shapes, newShape])
//       setNextId(nextId + 1)
//     } else if (currentTool === "sticker") {
//       // Add a new sticker
//       let stickerContent = ""
//       let stickerType = "emoji"

//       if (currentSticker.id.startsWith("emoji")) {
//         stickerContent = emojiMap[currentSticker.id] || "😊"
//       } else {
//         // For icon stickers, use the appropriate emoji
//         const iconData = getIconContent(currentSticker.id)
//         stickerContent = iconData.content
//         stickerType = iconData.type
//       }

//       const newSticker: Sticker = {
//         id: nextId,
//         type: stickerType,
//         x,
//         y,
//         size: currentSticker.size,
//         content: stickerContent,
//       }

//       setStickers([...stickers, newSticker])
//       setNextId(nextId + 1)
//     } else if (currentTool === "fill") {
//       // Use the flood fill algorithm
//       floodFill(ctx, Math.floor(x), Math.floor(y), fillOptions.color, fillOptions.tolerance)
//       saveToHistory()
//     }
//   }

//   const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const rect = canvas.getBoundingClientRect()
//     const scaleX = canvas.width / rect.width
//     const scaleY = canvas.height / rect.height
//     const x = (e.clientX - rect.left) * scaleX
//     const y = (e.clientY - rect.top) * scaleY

//     if (isDragging) {
//       const dx = x - dragStartX
//       const dy = y - dragStartY

//       if (selectedShapeIndex !== -1) {
//         // Move the selected shape
//         const updatedShapes = [...shapes]
//         updatedShapes[selectedShapeIndex] = {
//           ...updatedShapes[selectedShapeIndex],
//           x: updatedShapes[selectedShapeIndex].x + dx,
//           y: updatedShapes[selectedShapeIndex].y + dy,
//         }
//         setShapes(updatedShapes)
//       } else if (selectedStickerIndex !== -1) {
//         // Move the selected sticker
//         const updatedStickers = [...stickers]
//         updatedStickers[selectedStickerIndex] = {
//           ...updatedStickers[selectedStickerIndex],
//           x: updatedStickers[selectedStickerIndex].x + dx,
//           y: updatedStickers[selectedStickerIndex].y + dy,
//         }
//         setStickers(updatedStickers)
//       }

//       setDragStartX(x)
//       setDragStartY(y)

//       // Force a redraw to show the shape in its new position
//       redrawCanvas()
//     } else if (isResizing) {
//       const dx = x - dragStartX
//       const dy = y - dragStartY

//       if (selectedShapeIndex !== -1) {
//         // Resize the selected shape
//         const updatedShapes = [...shapes]
//         const shape = { ...updatedShapes[selectedShapeIndex] }
//         resizeShape(shape, resizeHandleIndex, dx, dy)
//         updatedShapes[selectedShapeIndex] = shape
//         setShapes(updatedShapes)
//       } else if (selectedStickerIndex !== -1) {
//         // Resize the selected sticker
//         const updatedStickers = [...stickers]
//         const sticker = updatedStickers[selectedStickerIndex]
//         const stickerShape = {
//           x: sticker.x,
//           y: sticker.y,
//           width: sticker.size,
//           height: sticker.size,
//         }
//         resizeShape(stickerShape, resizeHandleIndex, dx, dy)
//         updatedStickers[selectedStickerIndex] = {
//           ...sticker,
//           x: stickerShape.x,
//           y: stickerShape.y,
//           size: stickerShape.width, // Assuming width and height are the same for stickers
//         }
//         setStickers(updatedStickers)
//       }

//       setDragStartX(x)
//       setDragStartY(y)

//       // Force a redraw
//       redrawCanvas()
//     } else if (isDrawing && (currentTool === "brush" || currentTool === "eraser")) {
//       draw(e)
//     }
//   }

//   const handleMouseUp = () => {
//     if (isDragging || isResizing) {
//       setIsDragging(false)
//       setIsResizing(false)
//       setResizeHandleIndex(-1)
//       saveToHistory()
//     } else if (isDrawing) {
//       setIsDrawing(false)
//       ctxRef.current?.beginPath()
//       saveToHistory()
//     }
//   }

//   const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current
//     const ctx = ctxRef.current
//     if (!canvas || !ctx) return

//     const rect = canvas.getBoundingClientRect()
//     const scaleX = canvas.width / rect.width
//     const scaleY = canvas.height / rect.height

//     const x = (e.clientX - rect.left) * scaleX
//     const y = (e.clientY - rect.top) * scaleY

//     ctx.strokeStyle = currentTool === "eraser" ? "#ffffff" : color
//     ctx.lineWidth = brushSize
//     ctx.lineCap = "round"
//     ctx.lineJoin = "round"

//     ctx.lineTo(x, y)
//     ctx.stroke()
//     ctx.beginPath()
//     ctx.moveTo(x, y)
//   }

//   const getIconContent = (iconId: string): { type: string; content: string } => {
//     switch (iconId) {
//       case "icon1":
//         return { type: "emoji", content: "😀" }
//       case "icon2":
//         return { type: "emoji", content: "🐶" }
//       case "icon3":
//         return { type: "emoji", content: "🌸" }
//       case "icon4":
//         return { type: "emoji", content: "🎉" }
//       case "icon5":
//         return { type: "emoji", content: "❤️" }
//       case "icon6":
//         return { type: "emoji", content: "⭐" }
//       case "icon7":
//         return { type: "emoji", content: "🌍" }
//       case "icon8":
//         return { type: "emoji", content: "⚡" }
//       case "icon9":
//         return { type: "emoji", content: "🔥" }
//       default:
//         return { type: "emoji", content: "😊" }
//     }
//   }

//   const clearCanvas = () => {
//     const canvas = canvasRef.current
//     const ctx = ctxRef.current
//     if (!canvas || !ctx) return

//     ctx.clearRect(0, 0, canvas.width, canvas.height)

//     if (originalImageRef.current) {
//       ctx.drawImage(originalImageRef.current, 0, 0, canvas.width, canvas.height)
//       setShapes([])
//       setStickers([])
//       setSelectedShapeIndex(-1)
//       setSelectedStickerIndex(-1)
//       saveToHistory()
//     } else if (imageUrl) {
//       const img = new Image()
//       img.crossOrigin = "anonymous"
//       img.src = imageUrl
//       img.onload = () => {
//         if (ctx && canvas) {
//           originalImageRef.current = img
//           ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
//           setShapes([])
//           setStickers([])
//           setSelectedShapeIndex(-1)
//           setSelectedStickerIndex(-1)
//           saveToHistory()
//         }
//       }
//     } else {
//       setShapes([])
//       setStickers([])
//       setSelectedShapeIndex(-1)
//       setSelectedStickerIndex(-1)
//       saveToHistory()
//     }
//   }

//   const printCanvas = () => {
//     const canvas = canvasRef.current
//     if (!canvas) return
//     const dataUrl = canvas.toDataURL("image/png")
//     const printWindow = window.open("", "", "height=600,width=800")
//     if (!printWindow) return

//     printWindow.document.write(`
//     <html>
//       <head>
//         <title>הדפסת ציור</title>
//         <style>
//           body { 
//             margin: 0; 
//             display: flex; 
//             justify-content: center; 
//             align-items: center; 
//             height: 100vh; 
//             background-color: #f5f5f5;
//           }
//           img { 
//             max-width: 100%; 
//             max-height: 100%; 
//             box-shadow: 0 4px 20px rgba(0,0,0,0.15); 
//             border: 10px solid white;
//           }
//         </style>
//       </head>
//       <body>
//         <img src="${dataUrl}" />
//         <script>
//           window.onload = function() {
//             setTimeout(function() {
//               window.print();
//               window.close();
//             }, 500);
//           };
//         </script>
//       </body>
//     </html>
//   `)
//     printWindow.document.close()
//   }

//   const downloadCanvas = () => {
//     const canvas = canvasRef.current
//     if (!canvas) return
//     const dataUrl = canvas.toDataURL("image/png")
//     const link = document.createElement("a")
//     link.href = dataUrl
//     link.download = `${drawing?.name || "canvas-image"}.png`
//     link.click()

//     showSnackbar("הציור הורד בהצלחה!")
//   }

//   const handleUpload = async () => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     canvas.toBlob(async (blob) => {
//       if (!blob) return

//       try {
//         const fileName = `${Date.now() || "painted_drawing"}.png`
//         const title = (drawing as Drawing)?.title || "Painted Drawing"
//         const description = (drawing as Drawing)?.description || "A painted drawing"
//         const category = (drawing as Drawing)?.category || "Uncategorized"

//         // Get Presigned URL
//         const response = await api.get("/upload/presigned-url", {
//           params: {
//             fileName: fileName,
//             title: title,
//             description: description,
//             category: category,
//           },
//         })

//         const presignedUrl = response.data.url

//         // Upload to S3
//         await axios.put(presignedUrl, blob, {
//           headers: {
//             "Content-Type": "image/png",
//           },
//         })

//         // Get download URL
//         const downloadResponse = await api.get(`/upload/download-url/${fileName}`)
//         const downloadUrl = downloadResponse.data

//         // Update Redux
//         const newDrawing = {
//           drawingId: drawing?.id || 0,
//           userId: user?.id || 0,
//           imageUrl: downloadUrl as string,
//           name: fileName,
//         }

//         dispatch(addPaintedDrawing(newDrawing))
//         showSnackbar("הציור הצבוע הועלה בהצלחה!")
//       } catch (error) {
//         console.error("Error uploading painted drawing:", error)
//         showSnackbar("שגיאה בהעלאת הציור הצבוע", "error")
//       }
//     }, "image/png")
//   }

//   const updatePaintedDrawing = async () => {
//     const canvas = canvasRef.current
//     if (!canvas || !drawing || !user) return

//     const originalDrawing = drawings.find((x) => x.id === (drawing as PaintedDrawing).drawingId)

//     canvas.toBlob(async (blob) => {
//       if (!blob) return

//       try {
//         const fileName = `${drawing.name || "painted_drawing.png"}`
//         const title = (originalDrawing as Drawing)?.title || "Painted Drawing"
//         const description = (originalDrawing as Drawing)?.description || "A painted drawing"
//         const category = (originalDrawing as Drawing)?.category || "Uncategorized"

//         // Get Presigned URL
//         const response = await api.get("/upload/presigned-url", {
//           params: {
//             fileName: fileName,
//             title: title,
//             description: description,
//             category: category,
//           },
//         })

//         const presignedUrl = response.data.url

//         // Upload to S3
//         await axios.put(presignedUrl, blob, {
//           headers: {
//             "Content-Type": "image/png",
//           },
//         })

//         // Get download URL
//         const downloadResponse = await api.get(`/upload/download-url/${fileName}`)
//         const downloadUrl = downloadResponse.data

//         // Update Painted Drawing
//         const updatedPaintedDrawing = {
//           drawingId: (drawing as PaintedDrawing).drawingId,
//           userId: user.id,
//           imageUrl: downloadUrl as string,
//           name: fileName,
//         }

//         await api.put(`/PaintedDrawing/${drawing.id}`, updatedPaintedDrawing)
//         showSnackbar("הציור הצבוע עודכן בהצלחה!")
//       } catch (error) {
//         console.error("Error updating painted drawing:", error)
//         showSnackbar("שגיאה בעדכון הציור הצבוע", "error")
//       }
//     }, "image/png")
//   }

//   const handleZoomIn = () => {
//     setZoom((prev) => Math.min(prev + 0.1, 2))
//   }

//   const handleZoomOut = () => {
//     setZoom((prev) => Math.max(prev - 0.1, 0.5))
//   }

//   const toggleAiInstructions = () => {
//     setAiInstructionsOpen(!aiInstructionsOpen)
//   }

//   const handleShapeSelect = (shape: string, size: number, color: string, filled: boolean) => {
//     setCurrentShape({ type: shape, size, color, filled })
//     setCurrentTool("shape")
//     setShapesToolOpen(false)
//   }

//   const handleStickerSelect = (sticker: string, size: number) => {
//     setCurrentSticker({ id: sticker, size })
//     setCurrentTool("sticker")
//     setStickersToolOpen(false)
//   }

//   const handleFillOptionsSelect = (color: string, tolerance: number) => {
//     setFillOptions({ color, tolerance })
//     setCurrentTool("fill")
//     setFillBucketToolOpen(false) // Close the panel when the user clicks "Apply Color"
//   }

//   const deleteSelectedItem = () => {
//     if (selectedShapeIndex !== -1) {
//       const updatedShapes = [...shapes]
//       updatedShapes.splice(selectedShapeIndex, 1)
//       setShapes(updatedShapes)
//       setSelectedShapeIndex(-1)
//       saveToHistory()
//     } else if (selectedStickerIndex !== -1) {
//       const updatedStickers = [...stickers]
//       updatedStickers.splice(selectedStickerIndex, 1)
//       setStickers(updatedStickers)
//       setSelectedStickerIndex(-1)
//       saveToHistory()
//     }
//   }

//   const handleKeyDown = (e: KeyboardEvent) => {
//     if (e.key === "Delete" || e.key === "Backspace") {
//       deleteSelectedItem()
//     }
//   }

//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown)
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown)
//     }
//   }, [selectedShapeIndex, selectedStickerIndex, shapes, stickers])

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: 3,
//         p: 3,
//         backgroundColor: "#f8f9fa",
//         borderRadius: "16px",
//         boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
//         maxWidth: "1200px",
//         margin: "0 auto",
//       }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           width: "100%",
//           p: 2,
//           borderRadius: "12px",
//           backgroundColor: alpha(theme.palette.background.paper, 0.8),
//           backdropFilter: "blur(10px)",
//           border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//         }}
//       >
//         <Box>
//           <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mb: 0.5 }}>
//             {drawing ? (drawing as Drawing)?.title || "ציור" : "ציור חדש"}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {drawing
//               ? (drawing as Drawing)?.description || "צבע את הציור בעזרת הכלים למטה"
//               : "צבע את הציור בעזרת הכלים למטה"}
//           </Typography>
//         </Box>

//         {/* AI Instructions Button */}
//         <Box>
//           {drawing && imageUrl && (
//             <Tooltip title={aiInstructionsOpen ? "סגור הנחיות AI" : "הצג הנחיות צביעה מה-AI"}>
//               <Button
//                 variant="contained"
//                 onClick={toggleAiInstructions}
//                 sx={{
//                   background: aiInstructionsOpen
//                     ? `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`
//                     : `linear-gradient(45deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.secondary.light} 100%)`,
//                   backgroundSize: "200% 100%",
//                   animation: aiInstructionsOpen ? "none" : "shimmer 3s infinite linear, float 3s infinite ease-in-out",
//                   color: "white",
//                   boxShadow: aiInstructionsOpen
//                     ? `0 6px 20px -5px ${alpha(theme.palette.primary.main, 0.5)}`
//                     : `0 6px 20px -5px ${alpha(theme.palette.secondary.main, 0.5)}`,
//                   transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
//                   "&:hover": {
//                     transform: "translateY(-3px) scale(1.05)",
//                     boxShadow: aiInstructionsOpen
//                       ? `0 10px 25px -3px ${alpha(theme.palette.primary.main, 0.6)}`
//                       : `0 10px 25px -3px ${alpha(theme.palette.secondary.main, 0.6)}`,
//                     animation: aiInstructionsOpen
//                       ? "none"
//                       : "glow 2s infinite, shimmer 1.5s infinite linear, float 3s infinite ease-in-out",
//                   },
//                   borderRadius: "16px",
//                   padding: "14px 24px",
//                   fontWeight: "bold",
//                   fontSize: "1rem",
//                   minWidth: "unset",
//                   position: "relative",
//                   overflow: "hidden",
//                   "&::before": {
//                     content: '""',
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     background: `linear-gradient(45deg, transparent 0%, ${alpha("#fff", 0.2)} 50%, transparent 100%)`,
//                     transform: "translateX(-100%)",
//                     transition: "transform 0.6s ease-in-out",
//                   },
//                   "&:hover::before": {
//                     transform: "translateX(100%)",
//                   },
//                   "@keyframes shimmer": {
//                     "0%": { backgroundPosition: "-200% 0" },
//                     "100%": { backgroundPosition: "200% 0" },
//                   },
//                   "@keyframes float": {
//                     "0%": { transform: "translateY(0px)" },
//                     "50%": { transform: "translateY(-5px)" },
//                     "100%": { transform: "translateY(0px)" },
//                   },
//                   "@keyframes glow": {
//                     "0%": {
//                       boxShadow: `0 0 5px ${alpha(theme.palette.secondary.main, 0.5)}, 0 0 10px ${alpha(theme.palette.secondary.main, 0.3)}`,
//                     },
//                     "50%": {
//                       boxShadow: `0 0 20px ${alpha(theme.palette.secondary.main, 0.8)}, 0 0 30px ${alpha(theme.palette.secondary.main, 0.5)}`,
//                     },
//                     "100%": {
//                       boxShadow: `0 0 5px ${alpha(theme.palette.secondary.main, 0.5)}, 0 0 10px ${alpha(theme.palette.secondary.main, 0.3)}`,
//                     },
//                   },
//                   "@keyframes pulse": {
//                     "0%": { transform: "scale(1)", opacity: 1 },
//                     "50%": { transform: "scale(1.2)", opacity: 0.8 },
//                     "100%": { transform: "scale(1)", opacity: 1 },
//                   },
//                   "@keyframes colorChange": {
//                     "0%": { color: "#FF5252" },
//                     "25%": { color: "#FFEB3B" },
//                     "50%": { color: "#4CAF50" },
//                     "75%": { color: "#2196F3" },
//                     "100%": { color: "#FF5252" },
//                   },
//                 }}
//                 startIcon={
//                   <Box
//                     sx={{
//                       position: "relative",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <AutoAwesome
//                       sx={{
//                         animation: aiInstructionsOpen ? "none" : "pulse 2s infinite",
//                         fontSize: "1.3rem",
//                         filter: "drop-shadow(0 0 3px rgba(255,255,255,0.5))",
//                         zIndex: 2,
//                       }}
//                     />
//                     {!aiInstructionsOpen && (
//                       <Box
//                         sx={{
//                           position: "absolute",
//                           width: "200%",
//                           height: "200%",
//                           background: `radial-gradient(circle, ${alpha(theme.palette.secondary.light, 0.8)} 0%, transparent 70%)`,
//                           animation: "glow 2s infinite",
//                           zIndex: 1,
//                         }}
//                       />
//                     )}
//                   </Box>
//                 }
//                 endIcon={
//                   aiInstructionsOpen ? (
//                     <Close />
//                   ) : (
//                     <AutoAwesome
//                       sx={{
//                         animation: "colorChange 3s infinite",
//                       }}
//                     />
//                   )
//                 }
//               >
//                 {aiInstructionsOpen ? "סגור הנחיות" : "הנחיות צביעה מה-AI"}
//               </Button>
//             </Tooltip>
//           )}
//         </Box>
//       </Paper>

//       {/* Tools Section */}
//       <Paper
//         elevation={2}
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           width: "100%",
//           p: 2,
//           borderRadius: "12px",
//           backgroundColor: theme.palette.background.paper,
//           boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
//         }}
//       >
//         {/* Left side - Painting tools */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           {/* Color Picker */}
//           <Tooltip title="בחר צבע">
//             <Box sx={{ position: "relative" }}>
//               <IconButton
//                 sx={{
//                   backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                   "&:hover": {
//                     backgroundColor: alpha(theme.palette.primary.main, 0.2),
//                   },
//                   border: `2px solid ${color}`,
//                   transition: "all 0.2s ease",
//                 }}
//               >
//                 <ColorLens sx={{ color: color }} />
//                 <input
//                   type="color"
//                   value={color}
//                   onChange={(e) => setColor(e.target.value)}
//                   style={{
//                     position: "absolute",
//                     width: "100%",
//                     height: "100%",
//                     opacity: 0,
//                     cursor: "pointer",
//                   }}
//                 />
//               </IconButton>
//             </Box>
//           </Tooltip>

//           {/* Direct Tool Buttons */}
//           <Tooltip title="מכחול">
//             <IconButton
//               onClick={() => {
//                 setCurrentTool("brush")
//                 setSelectedShapeIndex(-1)
//                 setSelectedStickerIndex(-1)
//               }}
//               sx={{
//                 backgroundColor:
//                   currentTool === "brush"
//                     ? alpha(theme.palette.primary.main, 0.2)
//                     : alpha(theme.palette.primary.main, 0.1),
//                 border: currentTool === "brush" ? `2px solid ${theme.palette.primary.main}` : "none",
//                 "&:hover": {
//                   backgroundColor: alpha(theme.palette.primary.main, 0.2),
//                 },
//               }}
//             >
//               <Brush />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="מחק">
//             <IconButton
//               onClick={() => {
//                 setCurrentTool("eraser")
//                 setSelectedShapeIndex(-1)
//                 setSelectedStickerIndex(-1)
//               }}
//               sx={{
//                 backgroundColor:
//                   currentTool === "eraser"
//                     ? alpha(theme.palette.primary.main, 0.2)
//                     : alpha(theme.palette.primary.main, 0.1),
//                 border: currentTool === "eraser" ? `2px solid ${theme.palette.primary.main}` : "none",
//                 "&:hover": {
//                   backgroundColor: alpha(theme.palette.primary.main, 0.2),
//                 },
//               }}
//             >
//               <Delete />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="דלי מילוי">
//             <IconButton
//               onClick={() => setFillBucketToolOpen(true)}
//               sx={{
//                 backgroundColor:
//                   currentTool === "fill"
//                     ? alpha(theme.palette.primary.main, 0.2)
//                     : alpha(theme.palette.primary.main, 0.1),
//                 border: currentTool === "fill" ? `2px solid ${theme.palette.primary.main}` : "none",
//                 "&:hover": {
//                   backgroundColor: alpha(theme.palette.primary.main, 0.2),
//                 },
//               }}
//             >
//               <FormatColorFill />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="צורות">
//             <IconButton
//               onClick={() => setShapesToolOpen(true)}
//               sx={{
//                 backgroundColor:
//                   currentTool === "shape"
//                     ? alpha(theme.palette.primary.main, 0.2)
//                     : alpha(theme.palette.primary.main, 0.1),
//                 border: currentTool === "shape" ? `2px solid ${theme.palette.primary.main}` : "none",
//                 "&:hover": {
//                   backgroundColor: alpha(theme.palette.primary.main, 0.2),
//                 },
//               }}
//             >
//               <Category />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="מדבקות">
//             <IconButton
//               onClick={() => setStickersToolOpen(true)}
//               sx={{
//                 backgroundColor:
//                   currentTool === "sticker"
//                     ? alpha(theme.palette.primary.main, 0.2)
//                     : alpha(theme.palette.primary.main, 0.1),
//                 border: currentTool === "sticker" ? `2px solid ${theme.palette.primary.main}` : "none",
//                 "&:hover": {
//                   backgroundColor: alpha(theme.palette.primary.main, 0.2),
//                 },
//               }}
//             >
//               <EmojiEmotions />
//             </IconButton>
//           </Tooltip>

//           <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

//           {/* Brush Size */}
//           <Box sx={{ width: 150 }}>
//             <Slider
//               value={brushSize}
//               min={1}
//               max={50}
//               onChange={(_e, newValue) => setBrushSize(newValue as number)}
//               sx={{
//                 color: theme.palette.primary.main,
//                 "& .MuiSlider-thumb": {
//                   width: 16,
//                   height: 16,
//                   "&:hover, &.Mui-focusVisible": {
//                     boxShadow: `0 0 0 8px ${alpha(theme.palette.primary.main, 0.16)}`,
//                   },
//                 },
//               }}
//             />
//             <Typography variant="caption" sx={{ display: "block", textAlign: "center" }}>
//               גודל מכחול: {brushSize}
//             </Typography>
//           </Box>
//         </Box>

//         {/* Right side - History and Zoom */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Tooltip title="בטל">
//             <IconButton
//               onClick={undo}
//               disabled={historyIndex <= 0}
//               sx={{
//                 backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                 "&:hover": {
//                   backgroundColor: alpha(theme.palette.primary.main, 0.2),
//                 },
//                 "&.Mui-disabled": {
//                   backgroundColor: alpha(theme.palette.action.disabled, 0.1),
//                 },
//               }}
//             >
//               <Undo />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="בצע שוב">
//             <IconButton
//               onClick={redo}
//               disabled={historyIndex >= canvasHistory.length - 1}
//               sx={{
//                 backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                 "&:hover": {
//                   backgroundColor: alpha(theme.palette.primary.main, 0.2),
//                 },
//                 "&.Mui-disabled": {
//                   backgroundColor: alpha(theme.palette.action.disabled, 0.1),
//                 },
//               }}
//             >
//               <Redo />
//             </IconButton>
//           </Tooltip>

//           <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

//           <Tooltip title="הגדל">
//             <IconButton
//               onClick={handleZoomIn}
//               disabled={zoom >= 2}
//               sx={{
//                 backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                 "&:hover": {
//                   backgroundColor: alpha(theme.palette.primary.main, 0.2),
//                 },
//                 "&.Mui-disabled": {
//                   backgroundColor: alpha(theme.palette.action.disabled, 0.1),
//                 },
//               }}
//             >
//               <ZoomIn />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="הקטן">
//             <IconButton
//               onClick={handleZoomOut}
//               disabled={zoom <= 0.5}
//               sx={{
//                 backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                 "&:hover": {
//                   backgroundColor: alpha(theme.palette.primary.main, 0.2),
//                 },
//                 "&.Mui-disabled": {
//                   backgroundColor: alpha(theme.palette.action.disabled, 0.1),
//                 },
//               }}
//             >
//               <ZoomOut />
//             </IconButton>
//           </Tooltip>

//           <Chip
//             label={`זום: ${Math.round(zoom * 100)}%`}
//             size="small"
//             sx={{
//               ml: 1,
//               backgroundColor: alpha(theme.palette.primary.main, 0.1),
//               borderRadius: "8px",
//               fontWeight: "bold",
//             }}
//           />
//         </Box>
//       </Paper>

//       {/* Color Palette */}
//       <Paper
//         elevation={2}
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           flexWrap: "wrap",
//           gap: 1,
//           p: 2,
//           borderRadius: "12px",
//           width: "100%",
//           backgroundColor: theme.palette.background.paper,
//           boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
//         }}
//       >
//         {colorPalette.map((colorOption) => (
//           <Tooltip key={colorOption} title={`בחר צבע ${colorOption}`}>
//             <IconButton
//               onClick={() => setColor(colorOption)}
//               sx={{
//                 backgroundColor: colorOption,
//                 width: 36,
//                 height: 36,
//                 transition: "all 0.2s ease",
//                 "&:hover": {
//                   opacity: 0.8,
//                   transform: "scale(1.1)",
//                 },
//                 border:
//                   colorOption === color
//                     ? `3px solid ${theme.palette.primary.main}`
//                     : colorOption === "#FFFFFF"
//                       ? "1px solid #ddd"
//                       : "none",
//                 boxShadow:
//                   colorOption === color
//                     ? `0 0 0 2px ${alpha(theme.palette.background.paper, 0.8)}, 0 0 0 4px ${alpha(theme.palette.primary.main, 0.3)}`
//                     : "none",
//               }}
//             />
//           </Tooltip>
//         ))}
//       </Paper>

//       {/* Main Content with Canvas and Instructions Side by Side */}
//       <Box
//         sx={{
//           display: "flex",
//           width: "100%",
//           gap: 3,
//           position: "relative",
//         }}
//       >
//         {/* Canvas Container */}
//         <Box
//           sx={{
//             flex: 1,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             position: "relative",
//             overflow: "hidden",
//             borderRadius: "12px",
//             boxShadow: `0 10px 30px ${alpha(theme.palette.common.black, 0.1)}`,
//             border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//             backgroundColor: theme.palette.background.paper,
//             p: 2,
//           }}
//         >
//           <Box
//             sx={{
//               transform: `scale(${zoom})`,
//               transition: "transform 0.3s ease",
//               boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
//               borderRadius: "8px",
//               overflow: "hidden",
//             }}
//           >
//             <canvas
//               ref={canvasRef}
//               style={{
//                 cursor:
//                   currentTool === "eraser"
//                     ? "url(/eraser-cursor.png), auto"
//                     : currentTool === "shape"
//                       ? "crosshair"
//                       : currentTool === "sticker"
//                         ? "cell"
//                         : currentTool === "fill"
//                           ? "cell"
//                           : "crosshair",
//                 backgroundColor: "#ffffff",
//                 maxWidth: "100%",
//                 height: "auto",
//                 display: "block",
//               }}
//               onMouseDown={handleMouseDown}
//               onMouseUp={handleMouseUp}
//               onMouseMove={handleMouseMove}
//               onMouseLeave={handleMouseUp}
//             />
//           </Box>
//         </Box>

//         {/* AI Instructions Panel */}
//         {drawing && imageUrl && aiInstructionsOpen && (
//           <Box sx={{ width: "320px", height: "600px" }}>
//             <AIInstructionsPanel
//               imageUrl={imageUrl}
//               isOpen={aiInstructionsOpen}
//               onClose={() => setAiInstructionsOpen(false)}
//             />
//           </Box>
//         )}

//         {/* Shapes Tool Panel */}
//         {shapesToolOpen && (
//           <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}>
//             <ShapesTool onSelectShape={handleShapeSelect} onClose={() => setShapesToolOpen(false)} />
//           </Box>
//         )}

//         {/* Stickers Tool Panel */}
//         {stickersToolOpen && (
//           <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}>
//             <StickersTool onSelectSticker={handleStickerSelect} onClose={() => setStickersToolOpen(false)} />
//           </Box>
//         )}

//         {/* Fill Bucket Tool Panel */}
//         {fillBucketToolOpen && (
//           <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}>
//             <FillBucketTool
//               onSelectFillOptions={handleFillOptionsSelect}
//               onClose={() => setFillBucketToolOpen(false)}
//               currentColor={color}
//             />
//           </Box>
//         )}
//       </Box>

//       {/* Action Buttons */}
//       <Paper
//         elevation={2}
//         sx={{
//           display: "flex",
//           gap: 2,
//           p: 2.5,
//           borderRadius: "12px",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           width: "100%",
//           backgroundColor: theme.palette.background.paper,
//           boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
//         }}
//       >
//         <Tooltip title="הדפס">
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<Print />}
//             onClick={printCanvas}
//             sx={{
//               borderRadius: "10px",
//               boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.3)}`,
//               transition: "all 0.2s ease",
//               "&:hover": {
//                 transform: "translateY(-2px)",
//                 boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
//               },
//             }}
//           >
//             הדפס
//           </Button>
//         </Tooltip>

//         <Tooltip title="הורד">
//           <Button
//             variant="contained"
//             color="secondary"
//             startIcon={<Download />}
//             onClick={downloadCanvas}
//             sx={{
//               borderRadius: "10px",
//               boxShadow: `0 4px 14px ${alpha(theme.palette.secondary.main, 0.3)}`,
//               transition: "all 0.2s ease",
//               "&:hover": {
//                 transform: "translateY(-2px)",
//                 boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.4)}`,
//               },
//             }}
//           >
//             הורד
//           </Button>
//         </Tooltip>

//         <Tooltip title="נקה">
//           <Button
//             variant="contained"
//             color="error"
//             startIcon={<Clear />}
//             onClick={clearCanvas}
//             sx={{
//               borderRadius: "10px",
//               boxShadow: `0 4px 14px ${alpha(theme.palette.error.main, 0.3)}`,
//               transition: "all 0.2s ease",
//               "&:hover": {
//                 transform: "translateY(-2px)",
//                 boxShadow: `0 6px 20px ${alpha(theme.palette.error.main, 0.4)}`,
//               },
//             }}
//           >
//             נקה
//           </Button>
//         </Tooltip>

//         <Tooltip title="שמור באזור האישי">
//           <Button
//             variant="contained"
//             color="success"
//             startIcon={<Save />}
//             onClick={() => {
//               if (isPainted) {
//                 updatePaintedDrawing()
//               } else {
//                 handleUpload()
//               }
//             }}
//             sx={{
//               borderRadius: "10px",
//               boxShadow: `0 4px 14px ${alpha(theme.palette.success.main, 0.3)}`,
//               transition: "all 0.2s ease",
//               "&:hover": {
//                 transform: "translateY(-2px)",
//                 boxShadow: `0 6px 20px ${alpha(theme.palette.success.main, 0.4)}`,
//               },
//             }}
//           >
//             שמור באזור האישי
//           </Button>
//         </Tooltip>
//       </Paper>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbarSeverity}
//           sx={{
//             width: "400px",
//             fontSize: "1.2rem",
//             justifyContent: "center",
//             textAlign: "center",
//             borderRadius: "10px",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
//           }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   )
// }

// export default PaintCanvas

"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import {
  Button,
  Slider,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Paper,
  alpha,
  Divider,
  Chip,
} from "@mui/material"
import {
  Print,
  Delete,
  Save,
  Download,
  Clear,
  ColorLens,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  AutoAwesome,
  Brush,
  Category,
  EmojiEmotions,
  Close,
  FormatColorFill,
} from "@mui/icons-material"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootStore } from "./redux/Store"
import { addPaintedDrawing, fetchPaintedDrawingsByUserId } from "./redux/PaintedDrawingsSlice"
import type Drawing from "../types/drawing"
import type PaintedDrawing from "../types/PaintedDrawing"
import { fetchAllDrawings } from "./redux/DrawingSlice"
import api from "./api"
import AIInstructionsPanel from "./AIInstructionsPanel"
import ShapesTool from "./ShapesTool"
import StickersTool from "./StickersTool"
import FillBucketTool from "./fill-bucket-tool"
import { floodFill, drawShape, drawResizeHandles, resizeShape } from "../lib/canvas-utils"

// Define shape type
interface Shape {
  id: number
  type: string
  x: number
  y: number
  width: number
  height: number
  color: string
  filled: boolean
  points?: { x: number; y: number }[]
}

// Define sticker type
interface Sticker {
  id: number
  type: string
  x: number
  y: number
  size: number
  content: string
}

// שינוי הצבעים בתחילת הקומפוננטה
const PaintCanvas = ({ isPainted }: { isPainted: boolean }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()
  const { drawings } = useSelector((state: RootStore) => state.drawings)
  const { paintedDrawings } = useSelector((state: RootStore) => state.paintedDrawings)
  const drawingList = isPainted ? paintedDrawings : drawings
  const drawing = drawingList.find((x) => x.id === (id ? Number.parseInt(id, 10) : undefined))


  const { user } = useSelector((state: RootStore) => state.auth)
  const userId: number = user ? user.id : 1

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const canvasHistoryRef = useRef<ImageData[]>([])
  const historyIndexRef = useRef<number>(-1)
  const isInitialLoadRef = useRef<boolean>(true)
  const originalImageRef = useRef<HTMLImageElement | null>(null)

  const [color, setColor] = useState<string>("#000000")
  const [brushSize, setBrushSize] = useState<number>(5)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")
  const [zoom, setZoom] = useState<number>(1)
  const [aiInstructionsOpen, setAiInstructionsOpen] = useState<boolean>(false)
  const [shapesToolOpen, setShapesToolOpen] = useState<boolean>(false)
  const [stickersToolOpen, setStickersToolOpen] = useState<boolean>(false)
  const [fillBucketToolOpen, setFillBucketToolOpen] = useState<boolean>(false)
  const [currentTool, setCurrentTool] = useState<"brush" | "eraser" | "shape" | "sticker" | "fill" | "select">("brush")
  const [currentShape, setCurrentShape] = useState<{
    type: string
    size: number
    color: string
    filled: boolean
  }>({ type: "circle", size: 50, color: "#000000", filled: false })
  const [currentSticker, setCurrentSticker] = useState<{
    id: string
    size: number
  }>({ id: "emoji1", size: 50 })
  const [fillOptions, setFillOptions] = useState<{
    color: string
    tolerance: number
  }>({ color: "#000000", tolerance: 30 })
  const [shapes, setShapes] = useState<Shape[]>([])
  const [stickers, setStickers] = useState<Sticker[]>([])
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number>(-1)
  const [selectedStickerIndex, setSelectedStickerIndex] = useState<number>(-1)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [isResizing, setIsResizing] = useState<boolean>(false)
  const [resizeHandleIndex, setResizeHandleIndex] = useState<number>(-1)
  const [dragStartX, setDragStartX] = useState<number>(0)
  const [dragStartY, setDragStartY] = useState<number>(0)
  const [nextId, setNextId] = useState<number>(1)
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({ width: 800, height: 600 })

  const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[]>([])
  const [strokes, setStrokes] = useState<
    {
      points: { x: number; y: number }[]
      color: string
      width: number
      tool: "brush" | "eraser"
    }[]
  >([])

  const [fillOperations, setFillOperations] = useState<
    {
      x: number
      y: number
      color: string
      tolerance: number
      originalImageData: ImageData
    }[]
  >([])

  const colorPalette = [
    "#12977b", // טורקיז - צבע ראשי
    "#0f7a64", // טורקיז כהה
    "#15b48f", // טורקיז בהיר
    "#333333", // שחור
    "#666666", // שחור בהיר
    "#999999", // אפור
    "#28a745", // ירוק
    "#dc3545", // אדום
    "#ffc107", // צהוב
    "#FF0000",
    "#FF4500",
    "#FFA500",
    "#FFD700",
    "#FFFF00",
    "#9ACD32",
    "#00FF00",
    "#008000",
    "#00FFFF",
    "#1E90FF",
    "#FFFFFF",
  ]

  // Emoji mapping for stickers
  const emojiMap: Record<string, string> = {
    emoji1: "😊",
    emoji2: "😍",
    emoji3: "🎨",
    emoji4: "🌟",
    emoji5: "🌈",
    emoji6: "🦄",
    emoji7: "🐶",
    emoji8: "🐱",
    emoji9: "🌺",
    emoji10: "🍦",
    emoji11: "🎁",
    emoji12: "❤️",
    emoji13: "🔥",
    emoji14: "✨",
    emoji15: "🎵",
    emoji16: "🚀",
  }

  useEffect(() => {
    if (id && drawings.length > 0) {
      // Fetch image URL if drawing exists
    }
  }, [id, drawings, drawing])

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const downloadResponse = await api.get(`/upload/download-url/${drawing?.name}`)
        const url = downloadResponse.data
        setImageUrl(url)

        // Pre-fetch AI instructions when image URL is available
        if (url && !aiInstructionsOpen) {
          try {
            await api.get("/AIpaintings/aiDrawingInstructions", {
              params: { path: url },
            })
          } catch (error) {
            console.error("Error pre-fetching AI instructions:", error)
          }
        }
      } catch (error) {
        console.error("Error fetching image:", error)
      }
    }

    if (drawing) {
      fetchImageUrl()
    }
  }, [drawing, aiInstructionsOpen])

  // Initialize canvas and load image - הסרתי את color ו-brushSize מה-dependencies
  useEffect(() => {
    if (!canvasRef.current || !imageUrl) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctxRef.current = ctx
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageUrl

    img.onload = () => {
      // Store the original image for later use
      originalImageRef.current = img

      const aspectRatio = img.width / img.height
      let newWidth = canvasSize.width
      let newHeight = canvasSize.height

      if (aspectRatio > 1) {
        newHeight = canvasSize.width / aspectRatio
      } else {
        // Portrait or square image
        newWidth = canvasSize.height * aspectRatio
      }

      // Update canvas size to match the image aspect ratio
      canvas.width = newWidth
      canvas.height = newHeight
      setCanvasSize({ width: newWidth, height: newHeight })

      // Clear canvas and draw the image
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, newWidth, newHeight)

      // Initialize history with the base image
      if (isInitialLoadRef.current) {
        saveToHistory()
        isInitialLoadRef.current = false
      }
    }

    img.onerror = () => {
      console.error("Failed to load image:", imageUrl)
      showSnackbar(`שגיאה בטעינת התמונה`, "error")
    }
  }, [imageUrl]) // הסרתי color ו-brushSize מכאן

  // עדכון הגדרות המכחול כשהצבע או הגודל משתנים
  useEffect(() => {
    const ctx = ctxRef.current
    if (ctx) {
      ctx.strokeStyle = color
      ctx.lineWidth = brushSize
    }
  }, [color, brushSize])

  // Redraw canvas when shapes or stickers change
  useEffect(() => {
    redrawCanvas()
  }, [shapes, stickers, selectedShapeIndex, selectedStickerIndex])

  useEffect(() => {
    if (drawings.length === 0) {
      dispatch(fetchAllDrawings())
    }
  }, [dispatch, drawings])

  useEffect(() => {
    if (paintedDrawings.length === 0) {
      dispatch(fetchPaintedDrawingsByUserId(userId))
    }
  }, [dispatch, userId, paintedDrawings])

  const [canvasHistory, setCanvasHistory] = useState<
    {
      imageData: ImageData | null
      shapes: Shape[]
      stickers: Sticker[]
    }[]
  >([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)

  const redrawCanvas = () => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return

    // Skip redrawing during active drag or resize operations to prevent duplication
    if (isDragging || isResizing) return

    // Clear the canvas and redraw the base image
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (originalImageRef.current) {
      ctx.drawImage(originalImageRef.current, 0, 0, canvas.width, canvas.height)
    }

    // Draw all shapes
    shapes.forEach((shape, index) => {
      drawShape(ctx, shape)
      if (index === selectedShapeIndex) {
        // Draw selection outline and handles
        ctx.strokeStyle = "#0066ff"
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.strokeRect(shape.x - shape.width / 2, shape.y - shape.height / 2, shape.width, shape.height)
        ctx.setLineDash([])
        drawResizeHandles(ctx, shape)
      }
    })

    // Draw all stickers
    stickers.forEach((sticker, index) => {
      if (sticker.type === "emoji") {
        ctx.font = `${sticker.size}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(sticker.content, sticker.x, sticker.y)
      } else if (sticker.type === "icon") {
        // Draw icon stickers (simplified as colored circles)
        ctx.beginPath()
        ctx.fillStyle = sticker.content
        ctx.arc(sticker.x, sticker.y, sticker.size / 2, 0, Math.PI * 2)
        ctx.fill()
      }

      if (index === selectedStickerIndex) {
        // Draw selection outline
        ctx.strokeStyle = "#0066ff"
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.strokeRect(sticker.x - sticker.size / 2, sticker.y - sticker.size / 2, sticker.size, sticker.size)
        ctx.setLineDash([])
        // Draw resize handles
        drawResizeHandles(ctx, {
          x: sticker.x,
          y: sticker.y,
          width: sticker.size,
          height: sticker.size,
        })
      }
    })

    // Save to history after redrawing (but not during drag/resize)
    if (!isDragging && !isResizing) {
      // Use setTimeout to ensure the canvas is fully rendered before saving
      setTimeout(() => {
        saveToHistory()
      }, 10)
    }
  }

  const saveToHistory = () => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    // Remove any states after the current one if we've gone back in history
    const newHistory = canvasHistory.slice(0, historyIndex + 1)

    // Add the new state
    newHistory.push({
      imageData,
      shapes: [...shapes],
      stickers: [...stickers],
    })

    setCanvasHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)

    // Also update the old history system for compatibility
    canvasHistoryRef.current = newHistory.map((h) => h.imageData).filter(Boolean) as ImageData[]
    historyIndexRef.current = newHistory.length - 1
  }

  const undo = () => {
    if (historyIndex <= 0) return

    // אם יש פעולות מילוי, בטל את האחרונה
    if (fillOperations.length > 0) {
      const newFillOps = [...fillOperations]
      const lastFillOp = newFillOps.pop() // הסר את פעולת המילוי האחרונה
      setFillOperations(newFillOps)

      // שחזר את מצב הקנבס לפני פעולת המילוי האחרונה
      const canvas = canvasRef.current
      const ctx = ctxRef.current
      if (canvas && ctx && lastFillOp) {
        ctx.putImageData(lastFillOp.originalImageData, 0, 0)

        // צייר מחדש את כל הפעולות שנותרו
        redrawCanvasWithAllOperations(newFillOps, strokes)
      }
      return
    }

    // אם יש משיכות מכחול, בטל את האחרונה
    if (strokes.length > 0) {
      const newStrokes = [...strokes]
      newStrokes.pop() // הסר את המשיכה האחרונה
      setStrokes(newStrokes)

      // צייר מחדש את הקנבס עם המשיכות שנותרו
      redrawCanvasWithAllOperations(fillOperations, newStrokes)
      return
    }

    const newIndex = historyIndex - 1
    const historyState = canvasHistory[newIndex]

    if (historyState) {
      const canvas = canvasRef.current
      const ctx = ctxRef.current
      if (canvas && ctx && historyState.imageData) {
        ctx.putImageData(historyState.imageData, 0, 0)
      }

      setShapes(historyState.shapes)
      setStickers(historyState.stickers)
      setHistoryIndex(newIndex)
      historyIndexRef.current = newIndex
    }
  }

  const redrawCanvasWithAllOperations = (
    fillOps: {
      x: number
      y: number
      color: string
      tolerance: number
      originalImageData: ImageData
    }[],
    strokesArray: {
      points: { x: number; y: number }[]
      color: string
      width: number
      tool: "brush" | "eraser"
    }[],
  ) => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return

    // נקה את הקנבס וצייר את התמונה הבסיסית
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (originalImageRef.current) {
      ctx.drawImage(originalImageRef.current, 0, 0, canvas.width, canvas.height)
    }

    // צייר את כל הצורות
    shapes.forEach((shape, index) => {
      drawShape(ctx, shape)
      if (index === selectedShapeIndex) {
        ctx.strokeStyle = "#0066ff"
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.strokeRect(shape.x - shape.width / 2, shape.y - shape.height / 2, shape.width, shape.height)
        ctx.setLineDash([])
        drawResizeHandles(ctx, shape)
      }
    })

    stickers.forEach((sticker, index) => {
      if (sticker.type === "emoji") {
        ctx.font = `${sticker.size}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(sticker.content, sticker.x, sticker.y)
      } else if (sticker.type === "icon") {
        ctx.beginPath()
        ctx.fillStyle = sticker.content
        ctx.arc(sticker.x, sticker.y, sticker.size / 2, 0, Math.PI * 2)
        ctx.fill()
      }

      if (index === selectedStickerIndex) {
        ctx.strokeStyle = "#0066ff"
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.strokeRect(sticker.x - sticker.size / 2, sticker.y - sticker.size / 2, sticker.size, sticker.size)
        ctx.setLineDash([])
        drawResizeHandles(ctx, {
          x: sticker.x,
          y: sticker.y,
          width: sticker.size,
          height: sticker.size,
        })
      }
    })

    fillOps.forEach((fillOp) => {
      floodFill(ctx, fillOp.x, fillOp.y, fillOp.color, fillOp.tolerance)
    })

    strokesArray.forEach((stroke) => {
      if (stroke.points.length < 2) return

      ctx.beginPath()
      ctx.strokeStyle = stroke.color
      ctx.lineWidth = stroke.width
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      ctx.moveTo(stroke.points[0].x, stroke.points[0].y)
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y)
      }
      ctx.stroke()
    })
  }

  // const redrawCanvasWithStrokes = (
  //   strokesArray: {
  //     points: { x: number; y: number }[]
  //     color: string
  //     width: number
  //     tool: "brush" | "eraser"
  //   }[],
  // ) => {
  //   const canvas = canvasRef.current
  //   const ctx = ctxRef.current
  //   if (!canvas || !ctx) return

  //   // נקה את הקנבס וצייר את התמונה הבסיסית
  //   ctx.clearRect(0, 0, canvas.width, canvas.height)
  //   if (originalImageRef.current) {
  //     ctx.drawImage(originalImageRef.current, 0, 0, canvas.width, canvas.height)
  //   }

  //   shapes.forEach((shape, index) => {
  //     drawShape(ctx, shape)
  //     if (index === selectedShapeIndex) {
  //       ctx.strokeStyle = "#0066ff"
  //       ctx.lineWidth = 2
  //       ctx.setLineDash([5, 5])
  //       ctx.strokeRect(shape.x - shape.width / 2, shape.y - shape.height / 2, shape.width, shape.height)
  //       ctx.setLineDash([])
  //       drawResizeHandles(ctx, shape)
  //     }
  //   })

  //   stickers.forEach((sticker, index) => {
  //     if (sticker.type === "emoji") {
  //       ctx.font = `${sticker.size}px Arial`
  //       ctx.textAlign = "center"
  //       ctx.textBaseline = "middle"
  //       ctx.fillText(sticker.content, sticker.x, sticker.y)
  //     } else if (sticker.type === "icon") {
  //       ctx.beginPath()
  //       ctx.fillStyle = sticker.content
  //       ctx.arc(sticker.x, sticker.y, sticker.size / 2, 0, Math.PI * 2)
  //       ctx.fill()
  //     }

  //     if (index === selectedStickerIndex) {
  //       ctx.strokeStyle = "#0066ff"
  //       ctx.lineWidth = 2
  //       ctx.setLineDash([5, 5])
  //       ctx.strokeRect(sticker.x - sticker.size / 2, sticker.y - sticker.size / 2, sticker.size, sticker.size)
  //       ctx.setLineDash([])
  //       // צייר ידיות שינוי גודל
  //       drawResizeHandles(ctx, {
  //         x: sticker.x,
  //         y: sticker.y,
  //         width: sticker.size,
  //         height: sticker.size,
  //       })
  //     }
  //   })

  //   strokesArray.forEach((stroke) => {
  //     if (stroke.points.length < 2) return

  //     ctx.beginPath()
  //     ctx.strokeStyle = stroke.color
  //     ctx.lineWidth = stroke.width
  //     ctx.lineCap = "round"
  //     ctx.lineJoin = "round"

  //     ctx.moveTo(stroke.points[0].x, stroke.points[0].y)
  //     for (let i = 1; i < stroke.points.length; i++) {
  //       ctx.lineTo(stroke.points[i].x, stroke.points[i].y)
  //     }
  //     ctx.stroke()
  //   })
  // }

  const redo = () => {
    if (historyIndex >= canvasHistory.length - 1) return

    const newIndex = historyIndex + 1
    const historyState = canvasHistory[newIndex]

    if (historyState) {
      const canvas = canvasRef.current
      const ctx = ctxRef.current
      if (canvas && ctx && historyState.imageData) {
        ctx.putImageData(historyState.imageData, 0, 0)
      }

      setShapes(historyState.shapes)
      setStickers(historyState.stickers)
      setHistoryIndex(newIndex)
      historyIndexRef.current = newIndex
    }
  }

  const showSnackbar = (message: string, severity: "success" | "error" = "success") => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    if (currentTool === "brush" || currentTool === "eraser") {
      setIsDrawing(true)
      ctx.beginPath()
      ctx.moveTo(x, y)

      // התחלת מעקב אחרי משיכת מכחול חדשה
      setCurrentStroke([{ x, y }])

      draw(e)
    } else if (currentTool === "shape") {
      // Add a new shape
      const newShape: Shape = {
        id: nextId,
        type: currentShape.type,
        x,
        y,
        width: currentShape.size,
        height: currentShape.size,
        color: currentShape.color,
        filled: currentShape.filled,
      }
      setShapes([...shapes, newShape])
      setNextId(nextId + 1)
    } else if (currentTool === "sticker") {
      // Add a new sticker
      let stickerContent = ""
      let stickerType = "emoji"

      if (currentSticker.id.startsWith("emoji")) {
        stickerContent = emojiMap[currentSticker.id] || "😊"
      } else {
        // For icon stickers, use the appropriate emoji
        const iconData = getIconContent(currentSticker.id)
        stickerContent = iconData.content
        stickerType = iconData.type
      }

      const newSticker: Sticker = {
        id: nextId,
        type: stickerType,
        x,
        y,
        size: currentSticker.size,
        content: stickerContent,
      }

      setStickers([...stickers, newSticker])
      setNextId(nextId + 1)
    } else if (currentTool === "fill") {
      // שמירת מצב הקנבס לפני המילוי
      const originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      // ביצוע המילוי
      floodFill(ctx, Math.floor(x), Math.floor(y), fillOptions.color, fillOptions.tolerance)

      // שמירת פעולת המילוי
      setFillOperations((prev) => [
        ...prev,
        {
          x: Math.floor(x),
          y: Math.floor(y),
          color: fillOptions.color,
          tolerance: fillOptions.tolerance,
          originalImageData,
        },
      ])

      saveToHistory()
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    if (isDragging) {
      const dx = x - dragStartX
      const dy = y - dragStartY

      if (selectedShapeIndex !== -1) {
        // Move the selected shape
        const updatedShapes = [...shapes]
        updatedShapes[selectedShapeIndex] = {
          ...updatedShapes[selectedShapeIndex],
          x: updatedShapes[selectedShapeIndex].x + dx,
          y: updatedShapes[selectedShapeIndex].y + dy,
        }
        setShapes(updatedShapes)
      } else if (selectedStickerIndex !== -1) {
        // Move the selected sticker
        const updatedStickers = [...stickers]
        updatedStickers[selectedStickerIndex] = {
          ...updatedStickers[selectedStickerIndex],
          x: updatedStickers[selectedStickerIndex].x + dx,
          y: updatedStickers[selectedStickerIndex].y + dy,
        }
        setStickers(updatedStickers)
      }

      setDragStartX(x)
      setDragStartY(y)

      redrawCanvas()
    } else if (isResizing) {
      const dx = x - dragStartX
      const dy = y - dragStartY

      if (selectedShapeIndex !== -1) {
        const updatedShapes = [...shapes]
        const shape = { ...updatedShapes[selectedShapeIndex] }
        resizeShape(shape, resizeHandleIndex, dx, dy)
        updatedShapes[selectedShapeIndex] = shape
        setShapes(updatedShapes)
      } else if (selectedStickerIndex !== -1) {
        const updatedStickers = [...stickers]
        const sticker = updatedStickers[selectedStickerIndex]
        const stickerShape = {
          x: sticker.x,
          y: sticker.y,
          width: sticker.size,
          height: sticker.size,
        }
        resizeShape(stickerShape, resizeHandleIndex, dx, dy)
        updatedStickers[selectedStickerIndex] = {
          ...sticker,
          x: stickerShape.x,
          y: stickerShape.y,
          size: stickerShape.width, 
        }
        setStickers(updatedStickers)
      }

      setDragStartX(x)
      setDragStartY(y)

      // Force a redraw
      redrawCanvas()
    } else if (isDrawing && (currentTool === "brush" || currentTool === "eraser")) {
      draw(e)
    }
  }

  const handleMouseUp = () => {
    if (isDragging || isResizing) {
      setIsDragging(false)
      setIsResizing(false)
      setResizeHandleIndex(-1)
      saveToHistory()
    } else if (isDrawing) {
      setIsDrawing(false)
      ctxRef.current?.beginPath()

      // שמירת המשיכה הנוכחית למערך המשיכות
      if (currentStroke.length > 0) {
        setStrokes((prev) => [
          ...prev,
          {
            points: [...currentStroke],
            color: currentTool === "eraser" ? "#ffffff" : color,
            width: brushSize,
            tool: currentTool === "eraser" ? "eraser" : "brush",
          },
        ])
        setCurrentStroke([])
        saveToHistory()
      }
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    ctx.strokeStyle = currentTool === "eraser" ? "#ffffff" : color
    ctx.lineWidth = brushSize
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    // שמירת המצב הנוכחי לפני הציור
    const currentPoint = { x, y }

    // ציור הקו
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)

    // הוספת הנקודה למערך הנקודות הנוכחי
    setCurrentStroke((prev) => [...prev, currentPoint])
  }

  const getIconContent = (iconId: string): { type: string; content: string } => {
    switch (iconId) {
      case "icon1":
        return { type: "emoji", content: "😀" }
      case "icon2":
        return { type: "emoji", content: "🐶" }
      case "icon3":
        return { type: "emoji", content: "🌸" }
      case "icon4":
        return { type: "emoji", content: "🎉" }
      case "icon5":
        return { type: "emoji", content: "❤️" }
      case "icon6":
        return { type: "emoji", content: "⭐" }
      case "icon7":
        return { type: "emoji", content: "🌍" }
      case "icon8":
        return { type: "emoji", content: "⚡" }
      case "icon9":
        return { type: "emoji", content: "🔥" }
      default:
        return { type: "emoji", content: "😊" }
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (originalImageRef.current) {
      ctx.drawImage(originalImageRef.current, 0, 0, canvas.width, canvas.height)
      setShapes([])
      setStickers([])
      setStrokes([])
      setFillOperations([])
      setSelectedShapeIndex(-1)
      setSelectedStickerIndex(-1)
      saveToHistory()
    } else if (imageUrl) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = imageUrl
      img.onload = () => {
        if (ctx && canvas) {
          originalImageRef.current = img
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          setShapes([])
          setStickers([])
          setStrokes([])
          setFillOperations([])
          setSelectedShapeIndex(-1)
          setSelectedStickerIndex(-1)
          saveToHistory()
        }
      }
    } else {
      setShapes([])
      setStickers([])
      setStrokes([])
      setFillOperations([])
      setSelectedShapeIndex(-1)
      setSelectedStickerIndex(-1)
      saveToHistory()
    }
  }

  const printCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dataUrl = canvas.toDataURL("image/png")
    const printWindow = window.open("", "", "height=600,width=800")
    if (!printWindow) return

    printWindow.document.write(`
    <html>
      <head>
        <title>הדפסת ציור</title>
        <style>
          body { 
            margin: 0; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            background-color: #f5f5f5;
          }
          img { 
            max-width: 100%; 
            max-height: 100%; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.15); 
            border: 10px solid white;
          }
        </style>
      </head>
      <body>
        <img src="${dataUrl}" />
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.close();
            }, 500);
          };
        </script>
      </body>
    </html>
  `)
    printWindow.document.close()
  }

  const downloadCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dataUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = dataUrl
    link.download = `${drawing?.name || "canvas-image"}.png`
    link.click()

    showSnackbar("הציור הורד בהצלחה!")
  }

  const handleUpload = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.toBlob(async (blob) => {
      if (!blob) return

      try {
        const fileName = `${Date.now() || "painted_drawing"}.png`
        const title = (drawing as Drawing)?.title || "Painted Drawing"
        const description = (drawing as Drawing)?.description || "A painted drawing"
        const category = (drawing as Drawing)?.category || "Uncategorized"

        const response = await api.get("/upload/presigned-url", {
          params: {
            fileName: fileName,
            title: title,
            description: description,
            category: category,
          },
        })

        const presignedUrl = response.data.url

        await axios.put(presignedUrl, blob, {
          headers: {
            "Content-Type": "image/png",
          },
        })

        const downloadResponse = await api.get(`/upload/download-url/${fileName}`)
        const downloadUrl = downloadResponse.data

        const newDrawing = {
          drawingId: drawing?.id || 0,
          userId: user?.id || 0,
          imageUrl: downloadUrl as string,
          name: fileName,
        }

        dispatch(addPaintedDrawing(newDrawing))
        showSnackbar("הציור הצבוע הועלה בהצלחה!")
      } catch (error) {
        console.error("Error uploading painted drawing:", error)
        showSnackbar("שגיאה בהעלאת הציור הצבוע", "error")
      }
    }, "image/png")
  }

  const updatePaintedDrawing = async () => {
    const canvas = canvasRef.current
    if (!canvas || !drawing || !user) return

    const originalDrawing = drawings.find((x) => x.id === (drawing as PaintedDrawing).drawingId)

    canvas.toBlob(async (blob) => {
      if (!blob) return

      try {
        const fileName = `${drawing.name || "painted_drawing.png"}`
        const title = (originalDrawing as Drawing)?.title || "Painted Drawing"
        const description = (originalDrawing as Drawing)?.description || "A painted drawing"
        const category = (originalDrawing as Drawing)?.category || "Uncategorized"

        const response = await api.get("/upload/presigned-url", {
          params: {
            fileName: fileName,
            title: title,
            description: description,
            category: category,
          },
        })

        const presignedUrl = response.data.url

        await axios.put(presignedUrl, blob, {
          headers: {
            "Content-Type": "image/png",
          },
        })

        const downloadResponse = await api.get(`/upload/download-url/${fileName}`)
        const downloadUrl = downloadResponse.data

        const updatedPaintedDrawing = {
          drawingId: (drawing as PaintedDrawing).drawingId,
          userId: user.id,
          imageUrl: downloadUrl as string,
          name: fileName,
        }

        await api.put(`/PaintedDrawing/${drawing.id}`, updatedPaintedDrawing)
        showSnackbar("הציור הצבוע עודכן בהצלחה!")
      } catch (error) {
        console.error("Error updating painted drawing:", error)
        showSnackbar("שגיאה בעדכון הציור הצבוע", "error")
      }
    }, "image/png")
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  const toggleAiInstructions = () => {
    setAiInstructionsOpen(!aiInstructionsOpen)
  }

  const handleShapeSelect = (shape: string, size: number, color: string, filled: boolean) => {
    setCurrentShape({ type: shape, size, color, filled })
    setCurrentTool("shape")
    setShapesToolOpen(false)
  }

  const handleStickerSelect = (sticker: string, size: number) => {
    setCurrentSticker({ id: sticker, size })
    setCurrentTool("sticker")
    setStickersToolOpen(false)
  }

  const handleFillOptionsSelect = (color: string, tolerance: number) => {
    setFillOptions({ color, tolerance })
    setCurrentTool("fill")
    setFillBucketToolOpen(false) // Close the panel when the user clicks "Apply Color"
  }

  const deleteSelectedItem = () => {
    if (selectedShapeIndex !== -1) {
      const updatedShapes = [...shapes]
      updatedShapes.splice(selectedShapeIndex, 1)
      setShapes(updatedShapes)
      setSelectedShapeIndex(-1)
      saveToHistory()
    } else if (selectedStickerIndex !== -1) {
      const updatedStickers = [...stickers]
      updatedStickers.splice(selectedStickerIndex, 1)
      setStickers(updatedStickers)
      setSelectedStickerIndex(-1)
      saveToHistory()
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      deleteSelectedItem()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedShapeIndex, selectedStickerIndex, shapes, stickers])

  // עדכון ה-return עם הצבעים החדשים
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        p: 3,
        backgroundColor: "#f8f9fa",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          p: 2,
          borderRadius: "12px",
          backgroundColor: alpha("#ffffff", 0.8),
          backdropFilter: "blur(10px)",
          border: `1px solid ${alpha("#12977b", 0.1)}`,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold" color="#12977b" sx={{ mb: 0.5 }}>
            {drawing ? (drawing as Drawing)?.title || "ציור" : "ציור חדש"}
          </Typography>
          <Typography variant="body2" color="#666666">
            {drawing
              ? (drawing as Drawing)?.description || "צבע את הציור בעזרת הכלים למטה"
              : "צבע את הציור בעזרת הכלים למטה"}
          </Typography>
        </Box>

        <Box>
          {drawing && imageUrl && (
            <Tooltip title={aiInstructionsOpen ? "סגור הנחיות AI" : "הצג הנחיות צביעה מה-AI"}>
              <Button
                variant="contained"
                onClick={toggleAiInstructions}
                sx={{
                  background: aiInstructionsOpen
                    ? `linear-gradient(45deg, #12977b 30%, #15b48f 90%)`
                    : `linear-gradient(45deg, #0f7a64 0%, #12977b 50%, #15b48f 100%)`,
                  backgroundSize: "200% 100%",
                  animation: aiInstructionsOpen ? "none" : "shimmer 3s infinite linear, float 3s infinite ease-in-out",
                  color: "white",
                  boxShadow: aiInstructionsOpen
                    ? `0 6px 20px -5px ${alpha("#12977b", 0.5)}`
                    : `0 6px 20px -5px ${alpha("#0f7a64", 0.5)}`,
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  "&:hover": {
                    transform: "translateY(-3px) scale(1.05)",
                    boxShadow: aiInstructionsOpen
                      ? `0 10px 25px -3px ${alpha("#12977b", 0.6)}`
                      : `0 10px 25px -3px ${alpha("#0f7a64", 0.6)}`,
                    animation: aiInstructionsOpen
                      ? "none"
                      : "glow 2s infinite, shimmer 1.5s infinite linear, float 3s infinite ease-in-out",
                  },
                  borderRadius: "16px",
                  padding: "14px 24px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  minWidth: "unset",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(45deg, transparent 0%, ${alpha("#fff", 0.2)} 50%, transparent 100%)`,
                    transform: "translateX(-100%)",
                    transition: "transform 0.6s ease-in-out",
                  },
                  "&:hover::before": {
                    transform: "translateX(100%)",
                  },
                  "@keyframes shimmer": {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                  },
                  "@keyframes float": {
                    "0%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-5px)" },
                    "100%": { transform: "translateY(0px)" },
                  },
                  "@keyframes glow": {
                    "0%": {
                      boxShadow: `0 0 5px ${alpha("#0f7a64", 0.5)}, 0 0 10px ${alpha("#0f7a64", 0.3)}`,
                    },
                    "50%": {
                      boxShadow: `0 0 20px ${alpha("#0f7a64", 0.8)}, 0 0 30px ${alpha("#0f7a64", 0.5)}`,
                    },
                    "100%": {
                      boxShadow: `0 0 5px ${alpha("#0f7a64", 0.5)}, 0 0 10px ${alpha("#0f7a64", 0.3)}`,
                    },
                  },
                  "@keyframes pulse": {
                    "0%": { transform: "scale(1)", opacity: 1 },
                    "50%": { transform: "scale(1.2)", opacity: 0.8 },
                    "100%": { transform: "scale(1)", opacity: 1 },
                  },
                  "@keyframes colorChange": {
                    "0%": { color: "#12977b" },
                    "25%": { color: "#15b48f" },
                    "50%": { color: "#0f7a64" },
                    "75%": { color: "#12977b" },
                    "100%": { color: "#15b48f" },
                  },
                }}
                startIcon={
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AutoAwesome
                      sx={{
                        animation: aiInstructionsOpen ? "none" : "pulse 2s infinite",
                        fontSize: "1.3rem",
                        filter: "drop-shadow(0 0 3px rgba(255,255,255,0.5))",
                        zIndex: 2,
                      }}
                    />
                    {!aiInstructionsOpen && (
                      <Box
                        sx={{
                          position: "absolute",
                          width: "200%",
                          height: "200%",
                          background: `radial-gradient(circle, ${alpha("#15b48f", 0.8)} 0%, transparent 70%)`,
                          animation: "glow 2s infinite",
                          zIndex: 1,
                        }}
                      />
                    )}
                  </Box>
                }
                endIcon={
                  aiInstructionsOpen ? (
                    <Close />
                  ) : (
                    <AutoAwesome
                      sx={{
                        animation: "colorChange 3s infinite",
                      }}
                    />
                  )
                }
              >
                {aiInstructionsOpen ? "סגור הנחיות" : "הנחיות צביעה מה-AI"}
              </Button>
            </Tooltip>
          )}
        </Box>
      </Paper>

      {/* Tools Section */}
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          p: 2,
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          boxShadow: `0 4px 20px ${alpha("#12977b", 0.1)}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip title="בחר צבע">
            <Box sx={{ position: "relative" }}>
              <IconButton
                sx={{
                  backgroundColor: alpha("#12977b", 0.1),
                  "&:hover": {
                    backgroundColor: alpha("#12977b", 0.2),
                  },
                  border: `2px solid ${color}`,
                  transition: "all 0.2s ease",
                }}
              >
                <ColorLens sx={{ color: color }} />
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            </Box>
          </Tooltip>

          <Tooltip title="מכחול">
            <IconButton
              onClick={() => {
                setCurrentTool("brush")
                setSelectedShapeIndex(-1)
                setSelectedStickerIndex(-1)
              }}
              sx={{
                backgroundColor: currentTool === "brush" ? alpha("#12977b", 0.2) : alpha("#12977b", 0.1),
                border: currentTool === "brush" ? `2px solid #12977b` : "none",
                "&:hover": {
                  backgroundColor: alpha("#12977b", 0.2),
                },
              }}
            >
              <Brush />
            </IconButton>
          </Tooltip>

          <Tooltip title="מחק">
            <IconButton
              onClick={() => {
                setCurrentTool("eraser")
                setSelectedShapeIndex(-1)
                setSelectedStickerIndex(-1)
              }}
              sx={{
                backgroundColor: currentTool === "eraser" ? alpha("#12977b", 0.2) : alpha("#12977b", 0.1),
                border: currentTool === "eraser" ? `2px solid #12977b` : "none",
                "&:hover": {
                  backgroundColor: alpha("#12977b", 0.2),
                },
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>

          <Tooltip title="דלי מילוי">
            <IconButton
              onClick={() => setFillBucketToolOpen(true)}
              sx={{
                backgroundColor: currentTool === "fill" ? alpha("#12977b", 0.2) : alpha("#12977b", 0.1),
                border: currentTool === "fill" ? `2px solid #12977b` : "none",
                "&:hover": {
                  backgroundColor: alpha("#12977b", 0.2),
                },
              }}
            >
              <FormatColorFill />
            </IconButton>
          </Tooltip>

          <Tooltip title="צורות">
            <IconButton
              onClick={() => setShapesToolOpen(true)}
              sx={{
                backgroundColor: currentTool === "shape" ? alpha("#12977b", 0.2) : alpha("#12977b", 0.1),
                border: currentTool === "shape" ? `2px solid #12977b` : "none",
                "&:hover": {
                  backgroundColor: alpha("#12977b", 0.2),
                },
              }}
            >
              <Category />
            </IconButton>
          </Tooltip>

          <Tooltip title="מדבקות">
            <IconButton
              onClick={() => setStickersToolOpen(true)}
              sx={{
                backgroundColor: currentTool === "sticker" ? alpha("#12977b", 0.2) : alpha("#12977b", 0.1),
                border: currentTool === "sticker" ? `2px solid #12977b` : "none",
                "&:hover": {
                  backgroundColor: alpha("#12977b", 0.2),
                },
              }}
            >
              <EmojiEmotions />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          {/* Brush Size */}
          <Box sx={{ width: 150 }}>
            <Slider
              value={brushSize}
              min={1}
              max={50}
              onChange={(_e, newValue) => setBrushSize(newValue as number)}
              sx={{
                color: "#12977b",
                "& .MuiSlider-thumb": {
                  width: 16,
                  height: 16,
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: `0 0 0 8px ${alpha("#12977b", 0.16)}`,
                  },
                },
              }}
            />
            <Typography variant="caption" sx={{ display: "block", textAlign: "center" }}>
              גודל מכחול: {brushSize}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="בטל">
            <IconButton
              onClick={undo}
              disabled={historyIndex <= 0}
              sx={{
                backgroundColor: alpha("#12977b", 0.1),
                "&:hover": {
                  backgroundColor: alpha("#12977b", 0.2),
                },
                "&.Mui-disabled": {
                  backgroundColor: alpha("#999999", 0.1),
                },
              }}
            >
              <Undo />
            </IconButton>
          </Tooltip>

          <Tooltip title="בצע שוב">
            <IconButton
              onClick={redo}
              disabled={historyIndex >= canvasHistory.length - 1}
              sx={{
                backgroundColor: alpha("#12977b", 0.1),
                "&:hover": {
                  backgroundColor: alpha("#12977b", 0.2),
                },
                "&.Mui-disabled": {
                  backgroundColor: alpha("#999999", 0.1),
                },
              }}
            >
              <Redo />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <Tooltip title="הגדל">
            <IconButton
              onClick={handleZoomIn}
              disabled={zoom >= 2}
              sx={{
                backgroundColor: alpha("#12977b", 0.1),
                "&:hover": {
                  backgroundColor: alpha("#12977b", 0.2),
                },
                "&.Mui-disabled": {
                  backgroundColor: alpha("#999999", 0.1),
                },
              }}
            >
              <ZoomIn />
            </IconButton>
          </Tooltip>

          <Tooltip title="הקטן">
            <IconButton
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
              sx={{
                backgroundColor: alpha("#12977b", 0.1),
                "&:hover": {
                  backgroundColor: alpha("#12977b", 0.2),
                },
                "&.Mui-disabled": {
                  backgroundColor: alpha("#999999", 0.1),
                },
              }}
            >
              <ZoomOut />
            </IconButton>
          </Tooltip>

          <Chip
            label={`זום: ${Math.round(zoom * 100)}%`}
            size="small"
            sx={{
              ml: 1,
              backgroundColor: alpha("#12977b", 0.1),
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          />
        </Box>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 1,
          p: 2,
          borderRadius: "12px",
          width: "100%",
          backgroundColor: "#ffffff",
          boxShadow: `0 4px 20px ${alpha("#12977b", 0.1)}`,
        }}
      >
        {colorPalette.map((colorOption) => (
          <Tooltip key={colorOption} title={`בחר צבע ${colorOption}`}>
            <IconButton
              onClick={() => setColor(colorOption)}
              sx={{
                backgroundColor: colorOption,
                width: 36,
                height: 36,
                transition: "all 0.2s ease",
                "&:hover": {
                  opacity: 0.8,
                  transform: "scale(1.1)",
                },
                border:
                  colorOption === color ? `3px solid #12977b` : colorOption === "#FFFFFF" ? "1px solid #ddd" : "none",
                boxShadow:
                  colorOption === color
                    ? `0 0 0 2px ${alpha("#ffffff", 0.8)}, 0 0 0 4px ${alpha("#12977b", 0.3)}`
                    : "none",
              }}
            />
          </Tooltip>
        ))}
      </Paper>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: 3,
          position: "relative",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            borderRadius: "12px",
            boxShadow: `0 10px 30px ${alpha("#333333", 0.1)}`,
            border: `1px solid ${alpha("#12977b", 0.1)}`,
            backgroundColor: "#ffffff",
            p: 2,
          }}
        >
          <Box
            sx={{
              transform: `scale(${zoom})`,
              transition: "transform 0.3s ease",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <canvas
              ref={canvasRef}
              style={{
                cursor:
                  currentTool === "eraser"
                    ? "url(/eraser-cursor.png), auto"
                    : currentTool === "shape"
                      ? "crosshair"
                      : currentTool === "sticker"
                        ? "cell"
                        : currentTool === "fill"
                          ? "cell"
                          : "crosshair",
                backgroundColor: "#ffffff",
                maxWidth: "100%",
                height: "auto",
                display: "block",
              }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}
            />
          </Box>
        </Box>

        {drawing && imageUrl && aiInstructionsOpen && (
          <Box sx={{ width: "320px", height: "600px" }}>
            <AIInstructionsPanel
              imageUrl={imageUrl}
              isOpen={aiInstructionsOpen}
              onClose={() => setAiInstructionsOpen(false)}
            />
          </Box>
        )}

        {shapesToolOpen && (
          <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}>
            <ShapesTool onSelectShape={handleShapeSelect} onClose={() => setShapesToolOpen(false)} />
          </Box>
        )}

        {stickersToolOpen && (
          <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}>
            <StickersTool onSelectSticker={handleStickerSelect} onClose={() => setStickersToolOpen(false)} />
          </Box>
        )}

        {fillBucketToolOpen && (
          <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}>
            <FillBucketTool
              onSelectFillOptions={handleFillOptionsSelect}
              onClose={() => setFillBucketToolOpen(false)}
              currentColor={color}
            />
          </Box>
        )}
      </Box>

      <Paper
        elevation={2}
        sx={{
          display: "flex",
          gap: 2,
          p: 2.5,
          borderRadius: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          backgroundColor: "#ffffff",
          boxShadow: `0 4px 20px ${alpha("#12977b", 0.1)}`,
        }}
      >
        <Tooltip title="הדפס">
          <Button
            variant="contained"
            color="primary"
            startIcon={<Print />}
            onClick={printCanvas}
            sx={{
              borderRadius: "10px",
              background: "linear-gradient(135deg, #12977b 0%, #0f7a64 100%)",
              boxShadow: `0 4px 14px ${alpha("#12977b", 0.3)}`,
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: `0 6px 20px ${alpha("#12977b", 0.4)}`,
              },
            }}
          >
            הדפס
          </Button>
        </Tooltip>

        <Tooltip title="הורד">
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={downloadCanvas}
            sx={{
              borderRadius: "10px",
              background: "linear-gradient(135deg, #333333 0%, #666666 100%)",
              boxShadow: `0 4px 14px ${alpha("#333333", 0.3)}`,
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: `0 6px 20px ${alpha("#333333", 0.4)}`,
              },
            }}
          >
            הורד
          </Button>
        </Tooltip>

        <Tooltip title="נקה">
          <Button
            variant="contained"
            color="error"
            startIcon={<Clear />}
            onClick={clearCanvas}
            sx={{
              borderRadius: "10px",
              background: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
              boxShadow: `0 4px 14px ${alpha("#dc3545", 0.3)}`,
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: `0 6px 20px ${alpha("#dc3545", 0.4)}`,
              },
            }}
          >
            נקה
          </Button>
        </Tooltip>

        <Tooltip title="שמור באזור האישי">
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={() => {
              if (isPainted) {
                updatePaintedDrawing()
              } else {
                handleUpload()
              }
            }}
            sx={{
              borderRadius: "10px",
              background: "linear-gradient(135deg, #15b48f 0%, #12977b 100%)",
              boxShadow: `0 4px 14px ${alpha("#15b48f", 0.3)}`,
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: `0 6px 20px ${alpha("#15b48f", 0.4)}`,
              },
            }}
          >
            שמור באזור האישי
          </Button>
        </Tooltip>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{
            width: "400px",
            fontSize: "1.2rem",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            backgroundColor: snackbarSeverity === "success" ? "#28a745" : "#dc3545",
            color: "#ffffff",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}
export default PaintCanvas