"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  Box,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert,
  Divider,
  Paper,
  Zoom,
  Dialog as EmailDialog,
  DialogTitle as EmailDialogTitle,
  DialogContent as EmailDialogContent,
  DialogActions as EmailDialogActions,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material"
import {
  Search as SearchIcon,
  Share as ShareIcon,
  ContentCopy as ContentCopyIcon,
  WhatsApp as WhatsAppIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
  Close as CloseIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material"
import { fetchPaintedDrawingsByUserId, selectPaintedDrawings } from "./redux/PaintedDrawingsSlice"
import api from "./api"

interface DrawingShareDialogProps {
  open: boolean
  onClose: () => void
  userId: number
}

export default function DrawingShareDialog({ open, onClose, userId }: DrawingShareDialogProps) {
  const dispatch = useDispatch()
  const user = JSON.parse(sessionStorage.getItem("user") || "null")

  const { paintedDrawings, status } = useSelector(selectPaintedDrawings)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDrawing, setSelectedDrawing] = useState<any>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [emailTo, setEmailTo] = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const [sendingEmail, setSendingEmail] = useState(false)

  useEffect(() => {
    if (open && userId) {
      dispatch(fetchPaintedDrawingsByUserId(userId) as any)
    }
  }, [dispatch, open, userId])

  const filteredDrawings = paintedDrawings.filter((drawing) =>
    drawing.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDrawingSelect = (drawing: any) => {
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

      const emailData = {
        to: emailTo,
        subject: emailSubject,
        body: emailBody,
        senderName: user?.firstName || "PaintArt",
        imageUrl: selectedDrawing.imageUrl,
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
      console.error("תגובה מהשרת:", error.response?.data)
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
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + selectedDrawing.imageUrl)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(text)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`
        break
      case "email":
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
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
        <TextField
          fullWidth
          variant="outlined"
          placeholder="חיפוש בציורים שלך..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            mb: 3,
            mt: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              bgcolor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 60%", minWidth: 300 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: "#333" }}>
              הציורים שלך ({filteredDrawings.length})
            </Typography>

            {status === "loading" ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
              </Box>
            ) : filteredDrawings.length === 0 ? (
              <Paper sx={{ p: 3, textAlign: "center", bgcolor: "white", borderRadius: 2 }}>
                <Typography color="text.secondary">
                  {searchTerm ? "לא נמצאו ציורים התואמים את החיפוש" : "אין לך ציורים צבועים עדיין"}
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={2}>
                {filteredDrawings.map((drawing) => (
                  <Grid item xs={12} sm={6} md={4} key={drawing.id}>
                    <Zoom in={true} style={{ transitionDelay: "100ms" }}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: 2,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          boxShadow:
                            selectedDrawing?.id === drawing.id
                              ? `0 0 0 3px #6a11cb, 0 4px 20px rgba(106, 17, 203, 0.25)`
                              : "0 2px 10px rgba(0,0,0,0.08)",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                          },
                        }}
                        onClick={() => handleDrawingSelect(drawing)}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={drawing.imageUrl}
                          alt={drawing.name}
                          sx={{ objectFit: "cover" }}
                        />
                        <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                          <Typography gutterBottom variant="subtitle1" component="div" fontWeight="bold" noWrap>
                            {drawing.name}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ p: 1, pt: 0 }}>
                          <Button
                            size="small"
                            startIcon={<ShareIcon />}
                            color="primary"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDrawingSelect(drawing)
                            }}
                          >
                            שתף
                          </Button>
                          {selectedDrawing?.id === drawing.id && (
                            <FavoriteIcon fontSize="small" color="error" sx={{ ml: "auto" }} />
                          )}
                        </CardActions>
                      </Card>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>

          <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
          <Divider sx={{ width: "100%", display: { xs: "block", md: "none" }, my: 2 }} />

          <Box sx={{ flex: "1 1 35%", minWidth: 280 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: "white",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, color: "#333" }}>
                שיתוף הציור
              </Typography>

              {selectedDrawing ? (
                <>
                  <Box
                    sx={{
                      mb: 3,
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                  >
                    <img
                      src={selectedDrawing.imageUrl || "/placeholder.svg"}
                      alt={selectedDrawing.name}
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </Box>

                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {selectedDrawing.name}
                  </Typography>

                  <Box sx={{ mt: 1, mb: 3 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={selectedDrawing.imageUrl}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="העתק קישור">
                              <IconButton edge="end" onClick={handleCopyLink} size="small">
                                <ContentCopyIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ bgcolor: "#f5f5f5", borderRadius: 1 }}
                    />
                  </Box>

                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    שתף באמצעות:
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
                    <Tooltip title="שתף בוואטסאפ">
                      <IconButton
                        onClick={() => handleShare("whatsapp")}
                        sx={{
                          background: "linear-gradient(135deg, #00b09b, #96c93d)",
                          color: "white",
                          "&:hover": {
                            background: "linear-gradient(135deg, #009688, #8BC34A)",
                          },
                        }}
                      >
                        <WhatsAppIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="שתף בפייסבוק">
                      <IconButton
                        onClick={() => handleShare("facebook")}
                        sx={{
                          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                          color: "white",
                          "&:hover": {
                            background: "linear-gradient(135deg, #5c0fb3, #1e68e0)",
                          },
                        }}
                      >
                        <FacebookIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="שתף בטוויטר">
                      <IconButton
                        onClick={() => handleShare("twitter")}
                        sx={{
                          background: "linear-gradient(135deg, #b6d0ff 0%, #cce5fc 100%)",
                          color: "#1976d2",
                          "&:hover": {
                            background: "linear-gradient(135deg, #a1c4ff, #b8dbfc)",
                          },
                        }}
                      >
                        <TwitterIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="שלח במייל">
                      <IconButton
                        onClick={() => handleShare("email")}
                        sx={{
                          background: "linear-gradient(to right, #FF8008, #FFC837)",
                          color: "white",
                          "&:hover": {
                            background: "linear-gradient(to right, #e67207, #e6b832)",
                          },
                          position: "relative",
                          overflow: "hidden",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "radial-gradient(circle, transparent 60%, rgba(255,255,255,0.15) 100%)",
                            opacity: 0,
                            transition: "opacity 0.3s",
                          },
                          "&:hover::after": {
                            opacity: 1,
                          },
                        }}
                      >
                        <EmailIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Box sx={{ mt: "auto", pt: 3 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<ShareIcon />}
                      sx={{
                        borderRadius: 2,
                        background: "linear-gradient(135deg, #00b09b, #96c93d)",
                        boxShadow: "0 3px 5px 2px rgba(150, 201, 61, .3)",
                        height: 48,
                      }}
                      onClick={handleCopyLink}
                    >
                      העתק קישור לשיתוף
                    </Button>
                  </Box>
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    py: 4,
                    color: "text.secondary",
                  }}
                >
                  <ShareIcon sx={{ fontSize: 60, color: "#ddd", mb: 2 }} />
                  <Typography variant="body1" align="center">
                    בחר ציור לשיתוף
                  </Typography>
                </Box>
              )}
            </Paper>
          </Box>
        </Box>
      </DialogContent>

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
      <EmailDialog open={emailDialogOpen} onClose={handleCloseEmailDialog} maxWidth="sm" fullWidth>
        <EmailDialogTitle
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(to right, #FF8008, #FFC837)",
            color: "white",
          }}
        >
          שלח ציור במייל
        </EmailDialogTitle>
        <EmailDialogContent sx={{ pt: 2 }}>
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel htmlFor="email-to">כתובת מייל</InputLabel>
              <OutlinedInput
                id="email-to"
                type="email"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
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
                onChange={(e) => setEmailSubject(e.target.value)}
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
                onChange={(e) => setEmailBody(e.target.value)}
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
        </EmailDialogContent>
        <EmailDialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseEmailDialog} color="inherit">
            ביטול
          </Button>
          <Button
            onClick={handleSendEmail}
            variant="contained"
            disabled={!emailTo || sendingEmail}
            startIcon={sendingEmail ? <CircularProgress size={20} color="inherit" /> : <EmailIcon />}
            sx={{
              background: "linear-gradient(to right, #FF8008, #FFC837)",
              "&:hover": {
                background: "linear-gradient(to right, #e67207, #e6b832)",
              },
            }}
          >
            {sendingEmail ? "שולח..." : "שלח מייל"}
          </Button>
        </EmailDialogActions>
      </EmailDialog>
    </Dialog>
  )
}
