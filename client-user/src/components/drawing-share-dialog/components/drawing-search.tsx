"use client"

import type React from "react"
import { TextField, InputAdornment } from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"

interface DrawingSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

const DrawingSearch: React.FC<DrawingSearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="חיפוש בציורים שלך..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
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
  )
}

export default DrawingSearch
