"use client"

import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootStore } from "../redux/Store"
import { Box, Typography, Button, LinearProgress, Paper, Grid, Alert, CircularProgress } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import PaletteIcon from "@mui/icons-material/Palette"
import { CacheProvider } from "@emotion/react"
import { ThemeProvider } from "@mui/material/styles"

import { fetchCategories } from "../redux/CategorySlice"
import { addDrawing } from "../redux/DrawingSlice"
import api from "../api"

import { cacheRtl, rtlTheme, colorPalette } from "./theme"
import { FileInfo, HeaderBox, ColorfulAvatar, GradientButton } from "./styled-components"
import ImagePreview from "./image-preview"
import ArtForm from "./art-form"
import type { ArtFormData, FileData, UploadState } from "./types"

const ArtUploader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = JSON.parse(sessionStorage.getItem("user") || "null")
  const { items } = useSelector((state: RootStore) => state.categories)

  // File state
  const [fileData, setFileData] = useState<FileData>({
    file: null,
    fileName: "",
    fileSize: "",
    imagePreview: null,
  })

  // Form state
  const [formData, setFormData] = useState<ArtFormData>({
    title: "",
    description: "",
    category: 0,
  })

  // Upload state
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    uploadComplete: false,
  })

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      const reader = new FileReader()
      reader.onload = (e) => {
        setFileData({
          file: selectedFile,
          fileName: selectedFile.name,
          fileSize: (selectedFile.size / (1024 * 1024)).toFixed(2),
          imagePreview: e.target?.result as string,
        })
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleRemoveImage = () => {
    setFileData({
      file: null,
      fileName: "",
      fileSize: "",
      imagePreview: null,
    })
  }

  const handleFormChange = (field: keyof ArtFormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleClearForm = () => {
    setFileData({
      file: null,
      fileName: "",
      fileSize: "",
      imagePreview: null,
    })
    setFormData({
      title: "",
      description: "",
      category: 0,
    })
    setUploadState({
      isUploading: false,
      progress: 0,
      uploadComplete: false,
    })
  }

  const handleUpload = async () => {
    if (!fileData.file || !formData.title || !formData.category) {
      alert("נא למלא את כל השדות החובה (קובץ, כותרת וקטגוריה)")
      return
    }

    setUploadState((prev) => ({ ...prev, isUploading: true, progress: 0 }))

    try {
      const response = await api.get("/upload/presigned-url", {
        params: {
          fileName: fileData.file.name,
          title: formData.title,
          description: formData.description,
          category: formData.category,
        },
      })

      const presignedUrl = response.data.url

      await axios.put(presignedUrl, fileData.file, {
        headers: {
          "Content-Type": fileData.file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
          setUploadState((prev) => ({ ...prev, progress: percent }))
        },
      })

      const downloadResponse = await api.get(`/upload/download-url/${fileData.file.name}`)
      const downloadUrl = downloadResponse.data

      setUploadState((prev) => ({ ...prev, uploadComplete: true }))

      const newDrawing = {
        name: fileData.fileName,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        imageUrl: downloadUrl,
        userId: user?.id || 1,
        isGeneratedByAI: false,
      }

      dispatch(addDrawing(newDrawing))

      setTimeout(() => {
        handleClearForm()
      }, 3000)
    } catch (error) {
      console.error("שגיאה בהעלאה:", error)
      alert("שגיאה בהעלאת הקובץ")
    } finally {
      setUploadState((prev) => ({ ...prev, isUploading: false }))
    }
  }

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={rtlTheme}>
        <Paper
          elevation={3}
          sx={{
            maxWidth: 1000,
            mx: "auto",
            p: 13,
            my: 19,
            background: `linear-gradient(to bottom, ${colorPalette.cardBg} 0%, ${colorPalette.background} 100%)`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <HeaderBox sx={{ display: "flex", flexDirection: "row-reverse", alignItems: "center" }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                ml: 2,
                background: `linear-gradient(45deg, ${colorPalette.accent3}, ${colorPalette.primary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              העלאת יצירת אמנות
            </Typography>
            <ColorfulAvatar>
              <PaletteIcon sx={{ color: "white", fontSize: 32 }} />
            </ColorfulAvatar>
          </HeaderBox>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <ImagePreview fileData={fileData} onFileChange={handleFileChange} onRemoveImage={handleRemoveImage} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ArtForm formData={formData} categories={items} onFormChange={handleFormChange} />
            </Grid>
          </Grid>

          {fileData.fileName && (
            <FileInfo>
              <Typography variant="body2" sx={{ color: colorPalette.accent4, fontWeight: "bold" }}>
                {fileData.fileSize} MB :גודל
              </Typography>
              <Typography variant="body2" sx={{ color: colorPalette.primary, fontWeight: "bold" }}>
                {fileData.fileName} :קובץ
              </Typography>
            </FileInfo>
          )}

          <Box sx={{ mt: 3, mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row-reverse", mb: 0.5 }}>
              <Typography variant="body2" sx={{ color: colorPalette.accent3, fontWeight: "bold" }}>
                {uploadState.progress}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ...מעלה קובץ
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={uploadState.progress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: "rgba(76, 201, 240, 0.1)",
                "& .MuiLinearProgress-bar": {
                  background: colorPalette.uploadBtn,
                },
              }}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              variant="outlined"
              sx={{
                px: 4,
                borderColor: colorPalette.secondary,
                color: colorPalette.secondary,
                "&:hover": {
                  borderColor: colorPalette.secondary,
                  backgroundColor: "rgba(255, 107, 107, 0.05)",
                },
              }}
              onClick={handleClearForm}
            >
              נקה טופס
            </Button>
            <GradientButton
              variant="contained"
              disabled={uploadState.isUploading || !fileData.file}
              onClick={handleUpload}
              startIcon={uploadState.isUploading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
              sx={{
                px: 4,
                "&.Mui-disabled": {
                  background: "#e0e0e0",
                },
              }}
            >
              {uploadState.isUploading ? "...מעלה" : "העלאה"}
            </GradientButton>
          </Box>

          {uploadState.uploadComplete && (
            <Alert
              severity="success"
              sx={{
                mt: 2,
                border: `1px solid ${colorPalette.success}`,
                "& .MuiAlert-icon": {
                  color: colorPalette.success,
                },
              }}
            >
              היצירה הועלתה בהצלחה!
            </Alert>
          )}
        </Paper>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default ArtUploader
