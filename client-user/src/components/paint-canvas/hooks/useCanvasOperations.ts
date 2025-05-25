"use client"

import type React from "react"

import { useCallback } from "react"
import type { Drawing, PaintedDrawing, User, AppDispatch } from "../types"

interface UseCanvasOperationsProps {
  canvasRef: React.RefObject<HTMLCanvasElement|null>
  drawing: Drawing | PaintedDrawing | undefined
  user: User | null
  isPainted: boolean
  dispatch: AppDispatch
  api: any
  axios: any
  addPaintedDrawing: (drawing: any) => any
  onShowSnackbar: (message: string, severity?: "success" | "error") => void
  drawings: Drawing[]
}

export const useCanvasOperations = ({
  canvasRef,
  drawing,
  user,
  isPainted,
  dispatch,
  api,
  axios,
  addPaintedDrawing,
  onShowSnackbar,
  drawings,
}: UseCanvasOperationsProps) => {
  const printCanvas = useCallback(() => {
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
  }, [canvasRef])

  const downloadCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dataUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = dataUrl
    link.download = `${drawing?.name || "canvas-image"}.png`
    link.click()

    onShowSnackbar("הציור הורד בהצלחה!")
  }, [canvasRef, drawing, onShowSnackbar])

  const handleUpload = useCallback(async () => {
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
          params: { fileName, title, description, category },
        })

        const presignedUrl = response.data.url

        await axios.put(presignedUrl, blob, {
          headers: { "Content-Type": "image/png" },
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
        onShowSnackbar("הציור הצבוע הועלה בהצלחה!")
      } catch (error) {
        console.error("Error uploading painted drawing:", error)
        onShowSnackbar("שגיאה בהעלאת הציור הצבוע", "error")
      }
    }, "image/png")
  }, [canvasRef, drawing, user, dispatch, api, axios, addPaintedDrawing, onShowSnackbar])

  const updatePaintedDrawing = useCallback(async () => {
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
          params: { fileName, title, description, category },
        })

        const presignedUrl = response.data.url

        await axios.put(presignedUrl, blob, {
          headers: { "Content-Type": "image/png" },
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
        onShowSnackbar("הציור הצבוע עודכן בהצלחה!")
      } catch (error) {
        console.error("Error updating painted drawing:", error)
        onShowSnackbar("שגיאה בעדכון הציור הצבוע", "error")
      }
    }, "image/png")
  }, [canvasRef, drawing, user, drawings, api, axios, onShowSnackbar])

  const handleSave = useCallback(() => {
    if (isPainted) {
      updatePaintedDrawing()
    } else {
      handleUpload()
    }
  }, [isPainted, updatePaintedDrawing, handleUpload])

  return {
    printCanvas,
    downloadCanvas,
    handleSave,
  }
}
