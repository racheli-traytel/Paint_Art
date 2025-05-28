"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"

import { fetchPaintedDrawingsByUserId, selectPaintedDrawings } from "../redux/PaintedDrawingsSlice"
import { useShareLogic } from "./hooks/use-share-logic"
import { DIALOG_STYLES } from "./constants"
import type { ShareDialogProps } from "./types"

import DrawingSearch from "./components/drawing-search"
import DrawingGrid from "./components/drawing-grid"
import SharePanel from "./components/share-panel"
import EmailDialog from "./components/email-dialog"

const DrawingShareDialog: React.FC<ShareDialogProps> = ({ open, onClose, userId }) => {
  const dispatch = useDispatch()
  const { paintedDrawings, status } = useSelector(selectPaintedDrawings)
  const [searchTerm, setSearchTerm] = useState("")

  const {
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
    handleCloseEmailDialog,
    handleSendEmail,
    setEmailTo,
    setEmailSubject,
    setEmailBody,
  } = useShareLogic()

  useEffect(() => {
    if (open && userId) {
      dispatch(fetchPaintedDrawingsByUserId(userId) as any)
    }
  }, [dispatch, open, userId])

  const filteredDrawings = paintedDrawings.filter((drawing) =>
    drawing.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: DIALOG_STYLES.borderRadius,
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: DIALOG_STYLES.gradient,
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            שיתוף הציורים שלך
          </Typography>
          <IconButton onClick={onClose} color="inherit">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3, bgcolor: "rgba(245, 247, 250, 0.7)" }}>
          <DrawingSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            <Box sx={{ flex: "1 1 60%", minWidth: 300 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: "#333" }}>
                הציורים שלך ({filteredDrawings.length})
              </Typography>

              <DrawingGrid
                drawings={filteredDrawings}
                selectedDrawing={selectedDrawing}
                isLoading={status === "loading"}
                searchTerm={searchTerm}
                onDrawingSelect={handleDrawingSelect}
              />
            </Box>

            <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
            <Divider sx={{ width: "100%", display: { xs: "block", md: "none" }, my: 2 }} />

            <Box sx={{ flex: "1 1 35%", minWidth: 280 }}>
              <SharePanel selectedDrawing={selectedDrawing} onCopyLink={handleCopyLink} onShare={handleShare} />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <EmailDialog
        open={emailDialogOpen}
        onClose={handleCloseEmailDialog}
        selectedDrawing={selectedDrawing}
        emailTo={emailTo}
        emailSubject={emailSubject}
        emailBody={emailBody}
        sendingEmail={sendingEmail}
        onEmailToChange={setEmailTo}
        onEmailSubjectChange={setEmailSubject}
        onEmailBodyChange={setEmailBody}
        onSendEmail={handleSendEmail}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default DrawingShareDialog
