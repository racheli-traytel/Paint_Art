// // // // "use client"

// // // // import type React from "react"
// // // // import { useState } from "react"
// // // // import { Box, Paper, Typography, IconButton, Tooltip, useTheme, alpha, Divider, Slider, Grid } from "@mui/material"
// // // // import {
// // // //   Circle,
// // // //   Square,
// // // //   ChangeHistory,
// // // //   Star,
// // // //   FavoriteBorder,
// // // //   PentagonOutlined,
// // // //   HexagonOutlined,
// // // //   Close,
// // // // } from "@mui/icons-material"

// // // // interface ShapesToolProps {
// // // //   onSelectShape: (shape: string, size: number, color: string, filled: boolean) => void
// // // //   onClose: () => void
// // // // }

// // // // const ShapesTool: React.FC<ShapesToolProps> = ({ onSelectShape, onClose }) => {
// // // //   const theme = useTheme()
// // // //   const [selectedShape, setSelectedShape] = useState<string>("circle")
// // // //   const [shapeSize, setShapeSize] = useState<number>(50)
// // // //   const [shapeColor, setShapeColor] = useState<string>("#000000")
// // // //   const [filled, setFilled] = useState<boolean>(false)

// // // //   const shapes = [
// // // //     { id: "circle", icon: <Circle />, label: "עיגול" },
// // // //     { id: "square", icon: <Square />, label: "ריבוע" },
// // // //     { id: "triangle", icon: <ChangeHistory />, label: "משולש" },
// // // //     { id: "star", icon: <Star />, label: "כוכב" },
// // // //     { id: "heart", icon: <FavoriteBorder />, label: "לב" },
// // // //     { id: "pentagon", icon: <PentagonOutlined />, label: "מחומש" },
// // // //     { id: "hexagon", icon: <HexagonOutlined />, label: "משושה" },
// // // //   ]

// // // //   const colorPalette = [
// // // //     "#FF0000",
// // // //     "#FF4500",
// // // //     "#FFA500",
// // // //     "#FFD700",
// // // //     "#FFFF00",
// // // //     "#9ACD32",
// // // //     "#00FF00",
// // // //     "#008000",
// // // //     "#00FFFF",
// // // //     "#1E90FF",
// // // //     "#0000FF",
// // // //     "#4B0082",
// // // //     "#800080",
// // // //     "#FF00FF",
// // // //     "#FF69B4",
// // // //     "#A52A2A",
// // // //     "#000000",
// // // //     "#808080",
// // // //     "#FFFFFF",
// // // //   ]

// // // //   const handleShapeSelect = (shape: string) => {
// // // //     setSelectedShape(shape)
// // // //     onSelectShape(shape, shapeSize, shapeColor, filled)
// // // //   }

// // // //   const handleSizeChange = (_event: Event, newValue: number | number[]) => {
// // // //     const size = newValue as number
// // // //     setShapeSize(size)
// // // //     onSelectShape(selectedShape, size, shapeColor, filled)
// // // //   }

// // // //   const handleColorSelect = (color: string) => {
// // // //     setShapeColor(color)
// // // //     onSelectShape(selectedShape, shapeSize, color, filled)
// // // //   }

// // // //   const toggleFilled = () => {
// // // //     setFilled(!filled)
// // // //     onSelectShape(selectedShape, shapeSize, shapeColor, !filled)
// // // //   }

// // // //   return (
// // // //     <Paper
// // // //       elevation={3}
// // // //       sx={{
// // // //         width: "300px",
// // // //         p: 2,
// // // //         borderRadius: "12px",
// // // //         background: "linear-gradient(135deg, #f8f9fa 0%, #e2e6ea 100%)",
// // // //         border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
// // // //       }}
// // // //     >
// // // //       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
// // // //         <Typography variant="h6" fontWeight="bold" color="primary">
// // // //           צורות
// // // //         </Typography>
// // // //         <IconButton size="small" onClick={onClose}>
// // // //           <Close />
// // // //         </IconButton>
// // // //       </Box>

// // // //       <Divider sx={{ mb: 2 }} />

// // // //       <Typography variant="subtitle2" gutterBottom>
// // // //         בחר צורה:
// // // //       </Typography>
// // // //       <Grid container spacing={1} sx={{ mb: 2 }}>
// // // //         {shapes.map((shape) => (
// // // //           <Grid item key={shape.id}>
// // // //             <Tooltip title={shape.label}>
// // // //               <IconButton
// // // //                 onClick={() => handleShapeSelect(shape.id)}
// // // //                 sx={{
// // // //                   backgroundColor: selectedShape === shape.id ? alpha(theme.palette.primary.main, 0.2) : "transparent",
// // // //                   border: selectedShape === shape.id ? `2px solid ${theme.palette.primary.main}` : "none",
// // // //                   color: shapeColor,
// // // //                   transition: "all 0.2s",
// // // //                   "&:hover": {
// // // //                     backgroundColor: alpha(theme.palette.primary.main, 0.1),
// // // //                   },
// // // //                 }}
// // // //               >
// // // //                 {shape.icon}
// // // //               </IconButton>
// // // //             </Tooltip>
// // // //           </Grid>
// // // //         ))}
// // // //       </Grid>

// // // //       <Typography variant="subtitle2" gutterBottom>
// // // //         גודל: {shapeSize}px
// // // //       </Typography>
// // // //       <Slider value={shapeSize} min={10} max={200} onChange={handleSizeChange} sx={{ mb: 2 }} color="primary" />

// // // //       <Typography variant="subtitle2" gutterBottom>
// // // //         צבע:
// // // //       </Typography>
// // // //       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
// // // //         {colorPalette.map((color) => (
// // // //           <Tooltip key={color} title={color}>
// // // //             <Box
// // // //               onClick={() => handleColorSelect(color)}
// // // //               sx={{
// // // //                 width: 24,
// // // //                 height: 24,
// // // //                 backgroundColor: color,
// // // //                 borderRadius: "4px",
// // // //                 cursor: "pointer",
// // // //                 border:
// // // //                   shapeColor === color
// // // //                     ? `2px solid ${theme.palette.primary.main}`
// // // //                     : color === "#FFFFFF"
// // // //                       ? "1px solid #ddd"
// // // //                       : "none",
// // // //                 transition: "transform 0.2s",
// // // //                 "&:hover": {
// // // //                   transform: "scale(1.1)",
// // // //                 },
// // // //               }}
// // // //             />
// // // //           </Tooltip>
// // // //         ))}
// // // //       </Box>

// // // //       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// // // //         <Typography variant="subtitle2">מילוי:</Typography>
// // // //         <IconButton
// // // //           onClick={toggleFilled}
// // // //           sx={{
// // // //             backgroundColor: filled ? alpha(theme.palette.primary.main, 0.2) : "transparent",
// // // //             border: filled
// // // //               ? `2px solid ${theme.palette.primary.main}`
// // // //               : `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
// // // //           }}
// // // //         >
// // // //           {selectedShape === "circle" ? (
// // // //             <Circle sx={{ color: filled ? shapeColor : "transparent", stroke: shapeColor, strokeWidth: 1 }} />
// // // //           ) : selectedShape === "square" ? (
// // // //             <Square sx={{ color: filled ? shapeColor : "transparent", stroke: shapeColor, strokeWidth: 1 }} />
// // // //           ) : (
// // // //             <Circle sx={{ color: filled ? shapeColor : "transparent", stroke: shapeColor, strokeWidth: 1 }} />
// // // //           )}
// // // //         </IconButton>
// // // //       </Box>
// // // //     </Paper>
// // // //   )
// // // // }

// // // // export default ShapesTool


// // // "use client"

// // // import type React from "react"
// // // import { useState } from "react"
// // // import { Box, Paper, Typography, IconButton, Tooltip, useTheme, alpha, Divider, Slider, Grid } from "@mui/material"
// // // import {
// // //   Circle,
// // //   Square,
// // //   ChangeHistory,
// // //   Star,
// // //   FavoriteBorder,
// // //   PentagonOutlined,
// // //   HexagonOutlined,
// // //   Close,
// // // } from "@mui/icons-material"

// // // interface ShapesToolProps {
// // //   onSelectShape: (shape: string, size: number, color: string, filled: boolean) => void
// // //   onClose: () => void
// // // }

// // // const ShapesTool: React.FC<ShapesToolProps> = ({ onSelectShape, onClose }) => {
// // //   const theme = useTheme()
// // //   const [selectedShape, setSelectedShape] = useState<string>("circle")
// // //   const [shapeSize, setShapeSize] = useState<number>(50)
// // //   const [shapeColor, setShapeColor] = useState<string>("#000000")
// // //   const [filled, setFilled] = useState<boolean>(false)

// // //   const shapes = [
// // //     { id: "circle", icon: <Circle />, label: "עיגול" },
// // //     { id: "square", icon: <Square />, label: "ריבוע" },
// // //     { id: "triangle", icon: <ChangeHistory />, label: "משולש" },
// // //     { id: "star", icon: <Star />, label: "כוכב" },
// // //     { id: "heart", icon: <FavoriteBorder />, label: "לב" },
// // //     { id: "pentagon", icon: <PentagonOutlined />, label: "מחומש" },
// // //     { id: "hexagon", icon: <HexagonOutlined />, label: "משושה" },
// // //   ]

// // //   const colorPalette = [
// // //     "#FF0000",
// // //     "#FF4500",
// // //     "#FFA500",
// // //     "#FFD700",
// // //     "#FFFF00",
// // //     "#9ACD32",
// // //     "#00FF00",
// // //     "#008000",
// // //     "#00FFFF",
// // //     "#1E90FF",
// // //     "#0000FF",
// // //     "#4B0082",
// // //     "#800080",
// // //     "#FF00FF",
// // //     "#FF69B4",
// // //     "#A52A2A",
// // //     "#000000",
// // //     "#808080",
// // //     "#FFFFFF",
// // //   ]

// // //   const handleShapeSelect = (shape: string) => {
// // //     setSelectedShape(shape)
// // //     onSelectShape(shape, shapeSize, shapeColor, filled)
// // //   }

// // //   const handleSizeChange = (_event: Event, newValue: number | number[]) => {
// // //     const size = newValue as number
// // //     setShapeSize(size)
// // //     onSelectShape(selectedShape, size, shapeColor, filled)
// // //   }

// // //   const handleColorSelect = (color: string) => {
// // //     setShapeColor(color)
// // //     onSelectShape(selectedShape, shapeSize, color, filled)
// // //   }

// // //   const toggleFilled = () => {
// // //     setFilled(!filled)
// // //     onSelectShape(selectedShape, shapeSize, shapeColor, !filled)
// // //   }

// // //   return (
// // //     <Paper
// // //       elevation={3}
// // //       sx={{
// // //         width: "300px",
// // //         p: 2,
// // //         borderRadius: "12px",
// // //         background: "linear-gradient(135deg, #f8f9fa 0%, #e2e6ea 100%)",
// // //         border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
// // //       }}
// // //     >
// // //       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
// // //         <Typography variant="h6" fontWeight="bold" color="primary">
// // //           צורות
// // //         </Typography>
// // //         <IconButton size="small" onClick={onClose}>
// // //           <Close />
// // //         </IconButton>
// // //       </Box>

// // //       <Divider sx={{ mb: 2 }} />

// // //       <Typography variant="subtitle2" gutterBottom>
// // //         בחר צורה:
// // //       </Typography>
// // //       <Grid container spacing={1} sx={{ mb: 2 }}>
// // //         {shapes.map((shape) => (
// // //           <Grid item key={shape.id}>
// // //             <Tooltip title={shape.label}>
// // //               <IconButton
// // //                 onClick={() => handleShapeSelect(shape.id)}
// // //                 sx={{
// // //                   backgroundColor: selectedShape === shape.id ? alpha(theme.palette.primary.main, 0.2) : "transparent",
// // //                   border: selectedShape === shape.id ? `2px solid ${theme.palette.primary.main}` : "none",
// // //                   color: shapeColor,
// // //                   transition: "all 0.2s",
// // //                   "&:hover": {
// // //                     backgroundColor: alpha(theme.palette.primary.main, 0.1),
// // //                   },
// // //                 }}
// // //               >
// // //                 {shape.icon}
// // //               </IconButton>
// // //             </Tooltip>
// // //           </Grid>
// // //         ))}
// // //       </Grid>

// // //       <Typography variant="subtitle2" gutterBottom>
// // //         גודל: {shapeSize}px
// // //       </Typography>
// // //       <Slider value={shapeSize} min={10} max={200} onChange={handleSizeChange} sx={{ mb: 2 }} color="primary" />

// // //       <Typography variant="subtitle2" gutterBottom>
// // //         צבע:
// // //       </Typography>
// // //       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
// // //         {colorPalette.map((color) => (
// // //           <Tooltip key={color} title={color}>
// // //             <Box
// // //               onClick={() => handleColorSelect(color)}
// // //               sx={{
// // //                 width: 24,
// // //                 height: 24,
// // //                 backgroundColor: color,
// // //                 borderRadius: "4px",
// // //                 cursor: "pointer",
// // //                 border:
// // //                   shapeColor === color
// // //                     ? `2px solid ${theme.palette.primary.main}`
// // //                     : color === "#FFFFFF"
// // //                       ? "1px solid #ddd"
// // //                       : "none",
// // //                 transition: "transform 0.2s",
// // //                 "&:hover": {
// // //                   transform: "scale(1.1)",
// // //                 },
// // //               }}
// // //             />
// // //           </Tooltip>
// // //         ))}
// // //       </Box>

// // //       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// // //         <Typography variant="subtitle2">מילוי:</Typography>
// // //         <IconButton
// // //           onClick={toggleFilled}
// // //           sx={{
// // //             backgroundColor: filled ? alpha(theme.palette.primary.main, 0.2) : "transparent",
// // //             border: filled
// // //               ? `2px solid ${theme.palette.primary.main}`
// // //               : `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
// // //           }}
// // //         >
// // //           {selectedShape === "circle" ? (
// // //             <Circle sx={{ color: filled ? shapeColor : "transparent", stroke: shapeColor, strokeWidth: 1 }} />
// // //           ) : selectedShape === "square" ? (
// // //             <Square sx={{ color: filled ? shapeColor : "transparent", stroke: shapeColor, strokeWidth: 1 }} />
// // //           ) : (
// // //             <Circle sx={{ color: filled ? shapeColor : "transparent", stroke: shapeColor, strokeWidth: 1 }} />
// // //           )}
// // //         </IconButton>
// // //       </Box>
// // //     </Paper>
// // //   )
// // // }

// // // export default ShapesTool


// // "use client"

// // import type React from "react"
// // import { useState } from "react"
// // import { Box, Paper, Typography, IconButton, Tooltip, useTheme, alpha, Divider, Slider, Grid } from "@mui/material"
// // import {
// //   Circle,
// //   Square,
// //   ChangeHistory,
// //   Star,
// //   FavoriteBorder,
// //   PentagonOutlined,
// //   HexagonOutlined,
// //   Close,
// // } from "@mui/icons-material"

// // interface ShapesToolProps {
// //   onSelectShape: (shape: string, size: number, color: string, filled: boolean) => void
// //   onClose: () => void
// // }

// // const ShapesTool: React.FC<ShapesToolProps> = ({ onSelectShape, onClose }) => {
// //   const theme = useTheme()
// //   const [selectedShape, setSelectedShape] = useState<string>("circle")
// //   const [shapeSize, setShapeSize] = useState<number>(50)
// //   const [shapeColor, setShapeColor] = useState<string>("#000000")
// //   const [filled, setFilled] = useState<boolean>(false)

// //   const shapes = [
// //     { id: "circle", icon: <Circle />, label: "עיגול" },
// //     { id: "square", icon: <Square />, label: "ריבוע" },
// //     { id: "triangle", icon: <ChangeHistory />, label: "משולש" },
// //     { id: "star", icon: <Star />, label: "כוכב" },
// //     { id: "heart", icon: <FavoriteBorder />, label: "לב" },
// //     { id: "pentagon", icon: <PentagonOutlined />, label: "מחומש" },
// //     { id: "hexagon", icon: <HexagonOutlined />, label: "משושה" },
// //   ]

// //   const colorPalette = [
// //     "#FF0000",
// //     "#FF4500",
// //     "#FFA500",
// //     "#FFD700",
// //     "#FFFF00",
// //     "#9ACD32",
// //     "#00FF00",
// //     "#008000",
// //     "#00FFFF",
// //     "#1E90FF",
// //     "#0000FF",
// //     "#4B0082",
// //     "#800080",
// //     "#FF00FF",
// //     "#FF69B4",
// //     "#A52A2A",
// //     "#000000",
// //     "#808080",
// //     "#FFFFFF",
// //   ]

// //   const handleShapeSelect = (shape: string) => {
// //     setSelectedShape(shape)
// //     onSelectShape(shape, shapeSize, shapeColor, filled)
// //   }

// //   const handleSizeChange = (_event: Event, newValue: number | number[]) => {
// //     const size = newValue as number
// //     setShapeSize(size)
// //     onSelectShape(selectedShape, size, shapeColor, filled)
// //   }

// //   const handleColorSelect = (color: string) => {
// //     setShapeColor(color)
// //     onSelectShape(selectedShape, shapeSize, color, filled)
// //   }

// //   const toggleFilled = () => {
// //     setFilled(!filled)
// //     onSelectShape(selectedShape, shapeSize, shapeColor, !filled)
// //   }

// //   return (
// //     <Paper
// //       elevation={3}
// //       sx={{
// //         width: "300px",
// //         p: 2,
// //         borderRadius: "12px",
// //         background: "linear-gradient(135deg, #f8f9fa 0%, #e2e6ea 100%)",
// //         border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
// //       }}
// //     >
// //       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
// //         <Typography variant="h6" fontWeight="bold" color="primary">
// //           צורות
// //         </Typography>
// //         <IconButton size="small" onClick={onClose}>
// //           <Close />
// //         </IconButton>
// //       </Box>

// //       <Divider sx={{ mb: 2 }} />

// //       <Typography variant="subtitle2" gutterBottom>
// //         בחר צורה:
// //       </Typography>
// //       <Grid container spacing={1} sx={{ mb: 2 }}>
// //         {shapes.map((shape) => (
// //           <Grid item key={shape.id}>
// //             <Tooltip title={shape.label}>
// //               <IconButton
// //                 onClick={() => handleShapeSelect(shape.id)}
// //                 sx={{
// //                   backgroundColor: selectedShape === shape.id ? alpha(theme.palette.primary.main, 0.2) : "transparent",
// //                   border: selectedShape === shape.id ? `2px solid ${theme.palette.primary.main}` : "none",
// //                   color: shapeColor,
// //                   transition: "all 0.2s",
// //                   "&:hover": {
// //                     backgroundColor: alpha(theme.palette.primary.main, 0.1),
// //                   },
// //                 }}
// //               >
// //                 {shape.icon}
// //               </IconButton>
// //             </Tooltip>
// //           </Grid>
// //         ))}
// //       </Grid>

// //       <Typography variant="subtitle2" gutterBottom>
// //         גודל: {shapeSize}px
// //       </Typography>
// //       <Slider value={shapeSize} min={10} max={200} onChange={handleSizeChange} sx={{ mb: 2 }} color="primary" />

// //       <Typography variant="subtitle2" gutterBottom>
// //         צבע:
// //       </Typography>
// //       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
// //         {colorPalette.map((color) => (
// //           <Tooltip key={color} title={color}>
// //             <Box
// //               onClick={() => handleColorSelect(color)}
// //               sx={{
// //                 width: 24,
// //                 height: 24,
// //                 backgroundColor: color,
// //                 borderRadius: "4px",
// //                 cursor: "pointer",
// //                 border:
// //                   shapeColor === color
// //                     ? `2px solid ${theme.palette.primary.main}`
// //                     : color === "#FFFFFF"
// //                       ? "1px solid #ddd"
// //                       : "none",
// //                 transition: "transform 0.2s",
// //                 "&:hover": {
// //                   transform: "scale(1.1)",
// //                 },
// //               }}
// //             />
// //           </Tooltip>
// //         ))}
// //       </Box>

// //       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// //         <Typography variant="subtitle2">מילוי:</Typography>
// //         <IconButton
// //           onClick={toggleFilled}
// //           sx={{
// //             backgroundColor: filled ? alpha(theme.palette.primary.main, 0.2) : "transparent",
// //             border: filled
// //               ? `2px solid ${theme.palette.primary.main}`
// //               : `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
// //           }}
// //         >
// //           {selectedShape === "circle" ? (
// //             <Circle sx={{ color: filled ? shapeColor : "transparent", stroke: shapeColor, strokeWidth: 1 }} />
// //           ) : selectedShape === "square" ? (
// //             <Square sx={{ color: filled ? shapeColor : "transparent", stroke: shapeColor, strokeWidth: 1 }} />
// //           ) : (
// //             <Circle sx={{ color: filled ? shapeColor : "transparent", stroke: shapeColor, strokeWidth: 1 }} />
// //           )}
// //         </IconButton>
// //       </Box>
// //     </Paper>
// //   )
// // }

// // export default ShapesTool




// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Box, Paper, Typography, IconButton, Tooltip, useTheme, alpha, Divider, Slider, Grid } from "@mui/material"
// import {
//   Circle,
//   Square,
//   ChangeHistory,
//   Star,
//   FavoriteBorder,
//   PentagonOutlined,
//   HexagonOutlined,
//   Close,
// } from "@mui/icons-material"

// interface ShapesToolProps {
//   onSelectShape: (shape: string, size: number, color: string, filled: boolean) => void
//   onClose: () => void
// }

// const ShapesTool: React.FC<ShapesToolProps> = ({ onSelectShape, onClose }) => {
//   const theme = useTheme()
//   const [selectedShape, setSelectedShape] = useState<string>("circle")
//   const [shapeSize, setShapeSize] = useState<number>(50)
//   const [shapeColor, setShapeColor] = useState<string>("#000000")
//   const [filled, setFilled] = useState<boolean>(false)

//   const shapes = [
//     { id: "circle", icon: <Circle />, label: "עיגול" },
//     { id: "square", icon: <Square />, label: "ריבוע" },
//     { id: "triangle", icon: <ChangeHistory />, label: "משולש" },
//     { id: "star", icon: <Star />, label: "כוכב" },
//     { id: "heart", icon: <FavoriteBorder />, label: "לב" },
//     { id: "pentagon", icon: <PentagonOutlined />, label: "מחומש" },
//     { id: "hexagon", icon: <HexagonOutlined />, label: "משושה" },
//   ]

//   const colorPalette = [
//     "#FF0000",
//     "#FF4500",
//     "#FFA500",
//     "#FFD700",
//     "#FFFF00",
//     "#9ACD32",
//     "#00FF00",
//     "#008000",
//     "#00FFFF",
//     "#1E90FF",
//     "#0000FF",
//     "#4B0082",
//     "#800080",
//     "#FF00FF",
//     "#FF69B4",
//     "#A52A2A",
//     "#000000",
//     "#808080",
//     "#FFFFFF",
//   ]

//   const handleShapeSelect = (shape: string) => {
//     setSelectedShape(shape)
//     onSelectShape(shape, shapeSize, shapeColor, filled)
//   }

//   const handleSizeChange = (_event: Event, newValue: number | number[]) => {
//     const size = newValue as number
//     setShapeSize(size)
//     onSelectShape(selectedShape, size, shapeColor, filled)
//   }

//   const handleColorSelect = (color: string) => {
//     setShapeColor(color)
//     onSelectShape(selectedShape, shapeSize, color, filled)
//   }

//   const toggleFilled = () => {
//     setFilled(!filled)
//     onSelectShape(selectedShape, shapeSize, shapeColor, !filled)
//   }

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         width: "300px",
//         p: 2,
//         borderRadius: "12px",
//         background: "linear-gradient(135deg, #f8f9fa 0%, #e2e6ea 100%)",
//         border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
//       }}
//     >
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//         <Typography variant="h6" fontWeight="bold" color="primary">
//           צורות
//         </Typography>
//         <IconButton size="small" onClick={onClose}>
//           <Close />
//         </IconButton>
//       </Box>

//       <Divider sx={{ mb: 2 }} />

//       <Typography variant="subtitle2" gutterBottom>
//         בחר צורה:
//       </Typography>
//       <Grid container spacing={1} sx={{ mb: 2 }}>
//         {shapes.map((shape) => (
//           <Grid item key={shape.id}>
//             <Tooltip title={shape.label}>
//               <IconButton
//                 onClick={() => handleShapeSelect(shape.id)}
//                 sx={{
//                   backgroundColor: selectedShape === shape.id ? alpha(theme.palette.primary.main, 0.2) : "transparent",
//                   border: selectedShape === shape.id ? `2px solid ${theme.palette.primary.main}` : "none",
//                   color: shapeColor,
//                   transition: "all 0.2s",
//                   "&:hover": {
//                     backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                   },
//                 }}
//               >
//                 {shape.icon}
//               </IconButton>
//             </Tooltip>
//           </Grid>
//         ))}
//       </Grid>

//       <Typography variant="subtitle2" gutterBottom>
//         גודל: {shapeSize}px
//       </Typography>
//       <Slider value={shapeSize} min={10} max={200} onChange={handleSizeChange} sx={{ mb: 2 }} color="primary" />

//       <Typography variant="subtitle2" gutterBottom>
//         צבע:
//       </Typography>
//       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
//         {colorPalette.map((color) => (
//           <Tooltip key={color} title={color}>
//             <Box
//               onClick={() => handleColorSelect(color)}
//               sx={{
//                 width: 24,
//                 height: 24,
//                 backgroundColor: color,
//                 borderRadius: "4px",
//                 cursor: "pointer",
//                 border:
//                   shapeColor === color
//                     ? `2px solid ${theme.palette.primary.main}`
//                     : color === "#FFFFFF"
//                       ? "1px solid #ddd"
//                       : "none",
//                 transition: "transform 0.2s",
//                 "&:hover": {
//                   transform: "scale(1.1)",
//                 },
//               }}
//             />
//           </Tooltip>
//         ))}
//       </Box>

//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//         <Typography variant="subtitle2">מילוי:</Typography>
//         <IconButton
//           onClick={toggleFilled}
//           sx={{
//             backgroundColor: filled ? alpha(theme.palette.primary.main, 0.2) : "transparent",
//             border: filled
//               ? `2px solid ${theme.palette.primary.main}`
//               : `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
//           }}
//         >
//           {selectedShape === "circle" ? (
//             <Circle sx={{ color: filled ? shapeColor : "transparent", stroke: shapeColor, strokeWidth: 1 }} />
//           ) : selectedShape === "square" ? (
//             <Square sx={{ color: filled ? shapeColor : "transparent", stroke: shapeColor, strokeWidth: 1 }} />
//           ) : (
//             <Circle sx={{ color: filled ? shapeColor : "transparent", stroke: shapeColor, strokeWidth: 1 }} />
//           )}
//         </IconButton>
//       </Box>
//     </Paper>
//   )
// }

// export default ShapesTool





"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  Divider,
  Slider,
  Grid,
  Button,
} from "@mui/material"
import {
  Circle,
  Square,
  ChangeHistory,
  Star,
  FavoriteBorder,
  PentagonOutlined,
  HexagonOutlined,
  Close,
} from "@mui/icons-material"

interface ShapesToolProps {
  onSelectShape: (shape: string, size: number, color: string, filled: boolean) => void
  onClose: () => void
}

const ShapesTool: React.FC<ShapesToolProps> = ({ onSelectShape, onClose }) => {
  const theme = useTheme()
  const [selectedShape, setSelectedShape] = useState<string>("circle")
  const [shapeSize, setShapeSize] = useState<number>(50)
  const [shapeColor, setShapeColor] = useState<string>("#000000")
  const [filled, setFilled] = useState<boolean>(false)

  const shapes = [
    { id: "circle", icon: <Circle />, label: "עיגול" },
    { id: "square", icon: <Square />, label: "ריבוע" },
    { id: "triangle", icon: <ChangeHistory />, label: "משולש" },
    { id: "star", icon: <Star />, label: "כוכב" },
    { id: "heart", icon: <FavoriteBorder />, label: "לב" },
    { id: "pentagon", icon: <PentagonOutlined />, label: "מחומש" },
    { id: "hexagon", icon: <HexagonOutlined />, label: "משושה" },
  ]

  const colorPalette = [
    "#FF0000",
    "#FF4500",
    "#FFA500",
    "#FFD700",
    "#FFFF00",
    "#9ACD32",
    "#00FF00",
    "#008000",
    "#00FFFF",
    "#1E90FF",
    "#0000FF",
    "#4B0082",
    "#800080",
    "#FF00FF",
    "#FF69B4",
    "#A52A2A",
    "#000000",
    "#808080",
    "#FFFFFF",
  ]

  const handleShapeSelect = (shape: string) => {
    setSelectedShape(shape)
    // הסרנו את הקריאה ל-onSelectShape כאן
  }

  const handleSizeChange = (_event: Event, newValue: number | number[]) => {
    const size = newValue as number
    setShapeSize(size)
    // הסרנו את הקריאה ל-onSelectShape כאן
  }

  const handleColorSelect = (color: string) => {
    setShapeColor(color)
    // הסרנו את הקריאה ל-onSelectShape כאן
  }

  const toggleFilled = () => {
    setFilled(!filled)
    onSelectShape(selectedShape, shapeSize, shapeColor, !filled)
  }

  return (
    <Paper
      elevation={3}
      sx={{
        width: "300px",
        p: 2,
        borderRadius: "12px",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e2e6ea 100%)",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          צורות
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle2" gutterBottom>
        בחר צורה:
      </Typography>
      <Grid container spacing={1} sx={{ mb: 2 }}>
        {shapes.map((shape) => (
          <Grid item key={shape.id}>
            <Tooltip title={shape.label}>
              <IconButton
                onClick={() => handleShapeSelect(shape.id)}
                sx={{
                  backgroundColor: selectedShape === shape.id ? alpha(theme.palette.primary.main, 0.2) : "transparent",
                  border: selectedShape === shape.id ? `2px solid ${theme.palette.primary.main}` : "none",
                  color: shapeColor,
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                {shape.icon}
              </IconButton>
            </Tooltip>
          </Grid>
        ))}
      </Grid>

      <Typography variant="subtitle2" gutterBottom>
        גודל: {shapeSize}px
      </Typography>
      <Slider value={shapeSize} min={10} max={200} onChange={handleSizeChange} sx={{ mb: 2 }} color="primary" />

      <Typography variant="subtitle2" gutterBottom>
        צבע:
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        {colorPalette.map((color) => (
          <Tooltip key={color} title={color}>
            <Box
              onClick={() => handleColorSelect(color)}
              sx={{
                width: 24,
                height: 24,
                backgroundColor: color,
                borderRadius: "4px",
                cursor: "pointer",
                border:
                  shapeColor === color
                    ? `2px solid ${theme.palette.primary.main}`
                    : color === "#FFFFFF"
                      ? "1px solid #ddd"
                      : "none",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            />
          </Tooltip>
        ))}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="subtitle2">מילוי:</Typography>
        <IconButton
          onClick={toggleFilled}
          sx={{
            backgroundColor: filled ? alpha(theme.palette.primary.main, 0.2) : "transparent",
            border: filled
              ? `2px solid ${theme.palette.primary.main}`
              : `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          }}
        >
          {selectedShape === "circle" ? (
            <Circle sx={{ color: filled ? shapeColor : "transparent", stroke: shapeColor, strokeWidth: 1 }} />
          ) : selectedShape === "square" ? (
            <Square sx={{ color: filled ? shapeColor : "transparent", stroke: shapeColor, strokeWidth: 1 }} />
          ) : (
            <Circle sx={{ color: filled ? shapeColor : "transparent", stroke: shapeColor, strokeWidth: 1 }} />
          )}
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" color="primary" onClick={onClose} sx={{ borderRadius: "8px" }}>
          סגור
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSelectShape(selectedShape, shapeSize, shapeColor, filled)}
          sx={{ borderRadius: "8px" }}
        >
          הוסף צורה
        </Button>
      </Box>
    </Paper>
  )
}

export default ShapesTool
