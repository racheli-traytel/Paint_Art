"use client"

import { Box, Typography, Button } from "@mui/material"
import DownloadIcon from "@mui/icons-material/Download"
import PrintIcon from "@mui/icons-material/Print"
import BrushIcon from "@mui/icons-material/Brush"
import { StyledPaper, OutlineButton } from "./utils"

interface ResultsDisplayProps {
  coloringPage: string
}

export function ResultsDisplay({ coloringPage }: ResultsDisplayProps) {
  return (
    <StyledPaper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography
        variant="h6"
        gutterBottom
        align="center"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          fontWeight: "bold",
          color: "#6a11cb",
          mb: 3,
        }}
      >
        <BrushIcon />
        דף הצביעה שלך מוכן!
      </Typography>
      <Box
        sx={{
          textAlign: "center",
          bgcolor: "white",
          p: 2,
          borderRadius: 2,
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
        }}
      >
        <Box
          component="img"
          src={coloringPage}
          alt="Coloring Page"
          sx={{
            maxWidth: "100%",
            maxHeight: "500px",
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
        <Button
          variant="outlined"
          component="a"
          href={coloringPage}
          download="coloring-page.png"
          startIcon={<DownloadIcon />}
          sx={{ borderRadius: 8, px: 3 }}
        >
          הורד
        </Button>

        <OutlineButton
          variant="outlined"
          onClick={() => window.print()}
          startIcon={<PrintIcon />}
          sx={{ borderRadius: 8, px: 3 }}
        >
          הדפס
        </OutlineButton>
      </Box>
    </StyledPaper>
  )
}
