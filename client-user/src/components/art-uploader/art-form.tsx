"use client"

import type React from "react"
import { TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment, Box } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { colorPalette } from "./theme"
import type { ArtFormData } from "./types"

interface Category {
  id: number
  name: string
}

interface ArtFormProps {
  formData: ArtFormData
  categories: Category[]
  onFormChange: (field: keyof ArtFormData, value: string | number) => void
}

const ArtForm: React.FC<ArtFormProps> = ({ formData, categories, onFormChange }) => {
  return (
    <>
      <TextField
        fullWidth
        required
        id="title"
        label="כותרת היצירה"
        value={formData.title}
        onChange={(e) => onFormChange("title", e.target.value)}
        sx={{
          mb: 3,
          direction: "ltr",
          "& label": { left: 14, right: "unset" },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: colorPalette.accent2,
            },
          },
        }}
        InputProps={{
          sx: { textAlign: "left" },
          startAdornment: (
            <InputAdornment position="start">
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: colorPalette.accent2,
                }}
              />
            </InputAdornment>
          ),
        }}
      />

      <FormControl fullWidth required sx={{ mb: 3 }}>
        <InputLabel id="category-label" sx={{ right: 14, left: "unset" }}>
          קטגוריה
        </InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={formData.category}
          onChange={(e) => onFormChange("category", e.target.value as number)}
          sx={{
            textAlign: "left",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: colorPalette.accent3,
            },
          }}
          IconComponent={KeyboardArrowDownIcon}
        >
          <MenuItem value={0} disabled>
            בחר קטגוריה
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        id="description"
        label="תיאור היצירה"
        value={formData.description}
        onChange={(e) => onFormChange("description", e.target.value)}
        multiline
        minRows={4}
        sx={{
          mb: 3,
          direction: "ltr",
          "& label": { left: 14, right: "unset" },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: colorPalette.accent4,
            },
          },
        }}
        InputProps={{ sx: { textAlign: "left" } }}
      />
    </>
  )
}

export default ArtForm
