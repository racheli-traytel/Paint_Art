import { styled, Box, Avatar, Button } from "@mui/material"
import { colorPalette } from "./theme"

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

export const FileInfo = styled(Box)(({ theme }) => ({
  backgroundColor: "#e6f7ff",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  border: `1px solid ${colorPalette.accent1}`,
}))

export const ImagePreviewBox = styled(Box)(({ theme }) => ({
  border: "2px dashed #d1d5db",
  borderRadius: theme.shape.borderRadius,
  height: 320,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  backgroundImage:
    "linear-gradient(45deg, #f6f8fb 25%, transparent 25%, transparent 50%, #f6f8fb 50%, #f6f8fb 75%, transparent 75%, transparent)",
  backgroundSize: "20px 20px",
  "&:hover": {
    borderImage: colorPalette.imageBorder,
    borderImageSlice: 1,
    borderWidth: "2px",
    borderStyle: "dashed",
  },
}))

export const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginBottom: theme.spacing(4),
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -10,
    right: 0,
    width: "100%",
    height: "4px",
    background: colorPalette.imageBorder,
    borderRadius: "2px",
  },
}))

export const ColorfulAvatar = styled(Avatar)(() => ({
  background: `linear-gradient(135deg, ${colorPalette.accent2}, ${colorPalette.accent3})`,
  width: 60,
  height: 60,
}))

export const GradientButton = styled(Button)(() => ({
  background: colorPalette.uploadBtn,
  color: "white",
  "&:hover": {
    background: colorPalette.uploadBtnHover,
  },
}))
