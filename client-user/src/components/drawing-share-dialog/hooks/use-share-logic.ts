"use client"

import { useState } from "react"
import { SHARE_PLATFORMS } from "../constants"
import type { Drawing, EmailData } from "../types"
import api from "../../api"

export const useShareLogic = () => {
  const [selectedDrawing, setSelectedDrawing] = useState<Drawing | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [emailTo, setEmailTo] = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const [sendingEmail, setSendingEmail] = useState(false)

  const user = JSON.parse(sessionStorage.getItem("user") || "null")

  const handleDrawingSelect = (drawing: Drawing) => {
    setSelectedDrawing(drawing)
  }

  const handleCopyLink = () => {
    if (selectedDrawing) {
      navigator.clipboard.writeText(selectedDrawing.imageUrl)
      setSnackbarMessage("הקישור הועתק ללוח!")
      setSnackbarOpen(true)
    }
  }

  const handleOpenEmailDialog = () => {
    if (selectedDrawing) {
      setEmailSubject(`שיתוף ציור: ${selectedDrawing.name}`)
      setEmailBody(`היי, רציתי לשתף איתך את הציור שלי: ${selectedDrawing.name}`)
      setEmailDialogOpen(true)
    }
  }

  const handleCloseEmailDialog = () => {
    setEmailDialogOpen(false)
  }

  const handleSendEmail = async () => {
    if (!selectedDrawing || !emailTo) return

    try {
      setSendingEmail(true)

      const emailData: EmailData = {
        to: emailTo,
        subject: emailSubject,
        body: emailBody,
        senderName: user?.firstName || "PaintArt",
        imageUrl: selectedDrawing.imageUrl,
        templateType: "user",
      }

      await api.post("/Mail/send-email", emailData, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      setSnackbarMessage("המייל נשלח בהצלחה!")
      setSnackbarOpen(true)
      handleCloseEmailDialog()
    } catch (error: any) {
      console.error("שגיאה בשליחת המייל:", error)
      setSnackbarMessage("שגיאה בשליחת המייל")
      setSnackbarOpen(true)
    } finally {
      setSendingEmail(false)
    }
  }

  const handleShare = (platform: string) => {
    if (!selectedDrawing) return

    let shareUrl = ""
    const text = `Check out my painting: ${selectedDrawing.name}`
    const url = encodeURIComponent(selectedDrawing.imageUrl)

    switch (platform) {
      case SHARE_PLATFORMS.WHATSAPP:
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + selectedDrawing.imageUrl)}`
        break
      case SHARE_PLATFORMS.FACEBOOK:
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(text)}`
        break
      case SHARE_PLATFORMS.TWITTER:
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`
        break
      case SHARE_PLATFORMS.EMAIL:
        handleOpenEmailDialog()
        return
      default:
        return
    }

    window.open(shareUrl, "_blank")
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return {
    selectedDrawing,
    snackbarOpen,
    snackbarMessage,
    emailDialogOpen,
    emailTo,
    emailSubject,
    emailBody,
    sendingEmail,
    handleDrawingSelect,
    handleCopyLink,
    handleShare,
    handleCloseSnackbar,
    handleOpenEmailDialog,
    handleCloseEmailDialog,
    handleSendEmail,
    setEmailTo,
    setEmailSubject,
    setEmailBody,
  }
}
