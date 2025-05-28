import { createTheme } from "@mui/material/styles"
import rtlPlugin from "stylis-plugin-rtl"
import createCache from "@emotion/cache"

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
})

export const colorPalette = {
  primary: "#5038BC",
  secondary: "#FF8C38",
  accent1: "#7A5FEC",
  accent2: "#FF6B00",
  accent3: "#3A2A96",
  accent4: "#FFB27A",
  background: "#f8f9fa",
  cardBg: "#ffffff",
  success: "#4BB543",
  warning: "#FFC107",
  uploadBtn: "linear-gradient(45deg, #5038BC 30%, #7A5FEC 90%)",
  uploadBtnHover: "linear-gradient(45deg, #3A2A96 30%, #5038BC 90%)",
  imageBorder: "linear-gradient(135deg, #FF8C38, #FF6B00, #5038BC, #7A5FEC)",
}

export const rtlTheme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Rubik, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: colorPalette.primary,
    },
    secondary: {
      main: colorPalette.secondary,
    },
    success: {
      main: colorPalette.success,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: "bold",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: colorPalette.accent1,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
})
