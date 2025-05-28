"use client"

import type React from "react"
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  CircularProgress,
  Paper,
  Zoom,
} from "@mui/material"
import { Share as ShareIcon, Favorite as FavoriteIcon } from "@mui/icons-material"
import type { Drawing } from "../types"

interface DrawingGridProps {
  drawings: Drawing[]
  selectedDrawing: Drawing | null
  isLoading: boolean
  searchTerm: string
  onDrawingSelect: (drawing: Drawing) => void
}

const DrawingGrid: React.FC<DrawingGridProps> = ({
  drawings,
  selectedDrawing,
  isLoading,
  searchTerm,
  onDrawingSelect,
}) => {
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (drawings.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: "center", bgcolor: "white", borderRadius: 2 }}>
        <Typography color="text.secondary">
          {searchTerm ? "לא נמצאו ציורים התואמים את החיפוש" : "אין לך ציורים צבועים עדיין"}
        </Typography>
      </Paper>
    )
  }

  return (
    <Grid container spacing={2}>
      {drawings.map((drawing) => (
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
              onClick={() => onDrawingSelect(drawing)}
            >
              <CardMedia
                component="img"
                height="140"
                image={drawing.imageUrl || "/placeholder.svg"}
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
                    onDrawingSelect(drawing)
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
  )
}

export default DrawingGrid
