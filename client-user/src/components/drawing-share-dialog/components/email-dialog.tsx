"use client"

import type React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material"
import { Email as EmailIcon } from "@mui/icons-material"
import { DIALOG_STYLES } from "../constants"
import type { Drawing } from "../types"

interface EmailDialogProps {
  open: boolean
  onClose: () => void
  selectedDrawing: Drawing | null
  emailTo: string
  emailSubject: string
  emailBody: string
  sendingEmail: boolean
  onEmailToChange: (value: string) => void
  onEmailSubjectChange: (value: string) => void
  onEmailBodyChange: (value: string) => void
  onSendEmail: () => void
}

const EmailDialog: React.FC<EmailDialogProps> = ({
  open,
  onClose,
  selectedDrawing,
  emailTo,
  emailSubject,
  emailBody,
  sendingEmail,
  onEmailToChange,
  onEmailSubjectChange,
  onEmailBodyChange,
  onSendEmail,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: "bold",
          background: DIALOG_STYLES.emailGradient,
          color: "white",
        }}
      >
        שלח ציור במייל
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel htmlFor="email-to">כתובת מייל</InputLabel>
            <OutlinedInput
              id="email-to"
              type="email"
              value={emailTo}
              onChange={(e) => onEmailToChange(e.target.value)}
              label="כתובת מייל"
              dir="rtl"
            />
          </FormControl>
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel htmlFor="email-subject">נושא</InputLabel>
            <OutlinedInput
              id="email-subject"
              value={emailSubject}
              onChange={(e) => onEmailSubjectChange(e.target.value)}
              label="נושא"
              dir="rtl"
            />
          </FormControl>
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel htmlFor="email-body">תוכן ההודעה</InputLabel>
            <OutlinedInput
              id="email-body"
              value={emailBody}
              onChange={(e) => onEmailBodyChange(e.target.value)}
              label="תוכן ההודעה"
              multiline
              rows={4}
              dir="rtl"
            />
          </FormControl>
        </Box>

        {selectedDrawing && (
          <Box sx={{ mt: 2, p: 2, border: "1px solid #eee", borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              תצוגה מקדימה:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <img
                src={selectedDrawing.imageUrl || "/placeholder.svg"}
                alt={selectedDrawing.name}
                style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
              />
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  {selectedDrawing.name}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          ביטול
        </Button>
        <Button
          onClick={onSendEmail}
          variant="contained"
          disabled={!emailTo || sendingEmail}
          startIcon={sendingEmail ? <CircularProgress size={20} color="inherit" /> : <EmailIcon />}
          sx={{
            background: DIALOG_STYLES.emailGradient,
            "&:hover": {
              background: "linear-gradient(to right, #e67207, #e6b832)",
            },
          }}
        >
          {sendingEmail ? "שולח..." : "שלח מייל"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EmailDialog
