import { useState } from "react"
import { Box, Button, Tooltip, Typography, useTheme } from "@mui/material"
import { Brush, Palette, ArrowLeft } from "@mui/icons-material"
import { alpha, keyframes } from "@mui/system"

const glowAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`

const AIPaintButton = () => {
  const [instructionsOpen, setInstructionsOpen] = useState(false)
  const theme = useTheme()

  const handleClick = () => {
    setInstructionsOpen(!instructionsOpen)
  }

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <Tooltip title="קבל הנחיות לצביעה מה-AI" arrow>
        <Button
          onClick={handleClick}
          variant="contained"
          color="secondary"
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: "999px",
            fontWeight: "bold",
            position: "relative",
            overflow: "hidden",
            textTransform: "none",
            boxShadow: theme.shadows[3],
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
              {!instructionsOpen && (
                <Box
                  sx={{
                    position: "absolute",
                    width: "200%",
                    height: "200%",
                    background: `radial-gradient(circle, ${alpha(
                      theme.palette.secondary.light,
                      0.8
                    )} 0%, transparent 70%)`,
                    animation: `${glowAnimation} 2s infinite`,
                    zIndex: 1,
                  }}
                />
              )}
              <Palette
                sx={{
                  animation: !instructionsOpen
                    ? "colorChange 3s infinite"
                    : "none",
                  "@keyframes colorChange": {
                    "0%": { color: "#FF5252" },
                    "25%": { color: "#FFEB3B" },
                    "50%": { color: "#4CAF50" },
                    "75%": { color: "#2196F3" },
                    "100%": { color: "#FF5252" },
                  },
                  zIndex: 2,
                }}
              />
            </Box>
          }
          endIcon={instructionsOpen ? <ArrowLeft /> : null}
        >
          {instructionsOpen ? "סגור הנחיות" : "הנחיות צביעה מה-AI"}
        </Button>
      </Tooltip>

      {!instructionsOpen && (
        <Box
          sx={{
            position: "absolute",
            bottom: -35,
            right: 0,
            left: 0,
            textAlign: "center",
            opacity: 0.8,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.75rem",
              color: theme.palette.text.secondary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
            }}
          >
            <Brush fontSize="small" />
            ה-AI ינחה אותך כיצד לצבוע את הציור
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default AIPaintButton
