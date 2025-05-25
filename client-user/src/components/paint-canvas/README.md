# Paint Canvas Component

A modular, feature-rich painting canvas component built with React, TypeScript, Redux, and Material-UI.

## Features

- 🎨 Multiple drawing tools (brush, eraser, shapes, stickers, fill bucket)
- 🎯 Undo/Redo functionality with history management
- 🔍 Zoom in/out capabilities
- 🎨 Color palette with custom color picker
- 📱 Responsive design
- 💾 Save, download, and print functionality
- 🤖 AI instructions integration
- 📐 Shape tools with resize handles
- 😊 Emoji stickers support
- 🔄 Redux state management
- 🌐 API integration for saving/loading

## Installation

1. Copy the entire `paint-canvas` folder to your project
2. Install required dependencies:

\`\`\`bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-redux @reduxjs/toolkit axios react-router-dom
\`\`\`

## Usage

\`\`\`tsx
import PaintCanvas from './paint-canvas'

function App() {
  return (
    <PaintCanvas isPainted={false} />
  )
}
\`\`\`

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isPainted` | `boolean` | Yes | Whether this is an existing painted drawing or new drawing |

## Redux Integration

The component expects the following Redux store structure:

\`\`\`tsx
interface RootStore {
  drawings: {
    drawings: Drawing[]
  }
  paintedDrawings: {
    paintedDrawings: PaintedDrawing[]
  }
  auth: {
    user: User | null
  }
}
\`\`\`

Required Redux actions:
- `fetchAllDrawings()`
- `fetchPaintedDrawingsByUserId(userId)`
- `addPaintedDrawing(drawing)`

## API Integration

The component uses the following API endpoints:
- `GET /upload/download-url/:filename` - Get image download URL
- `GET /upload/presigned-url` - Get presigned URL for upload
- `GET /AIpaintings/aiDrawingInstructions` - Get AI painting instructions
- `PUT /PaintedDrawing/:id` - Update painted drawing

## File Structure

\`\`\`
paint-canvas/
├── components/
│   ├── CanvasHeader.tsx          # Header with title and AI button
│   ├── CanvasToolbar.tsx         # Main toolbar with tools
│   ├── ColorPalette.tsx          # Color selection palette
│   ├── CanvasContainer.tsx       # Canvas wrapper with zoom
│   ├── CanvasActions.tsx         # Action buttons (save, print, etc.)
│   └── CanvasMouseHandlers.tsx   # Mouse event handling logic
├── hooks/
│   ├── useCanvasDrawing.ts       # Canvas drawing state management
│   ├── useCanvasTools.ts         # Tools state management
│   └── useCanvasOperations.ts    # File operations with API calls
├── utils/
│   └── canvasUtils.ts            # Canvas utility functions
├── types/
│   └── index.ts                  # TypeScript type definitions
├── index.tsx                     # Main component with full functionality
└── README.md                     # This file
\`\`\`

## Key Features Preserved

✅ **Redux Integration** - Full Redux state management
✅ **API Calls** - All original API endpoints
✅ **Router Integration** - useParams for drawing ID
✅ **Image Loading** - Async image fetching and loading
✅ **AI Instructions** - Pre-fetching and display
✅ **File Operations** - Upload, download, print with S3 integration
✅ **User Authentication** - User context and permissions
✅ **Drawing Management** - Create, update, save painted drawings
✅ **Error Handling** - Comprehensive error handling and user feedback

## Dependencies

- React 18+
- Material-UI 5+
- Redux Toolkit
- React Router DOM
- Axios
- TypeScript

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

עכשיו יש לך את כל הפונקציונליות המקורית עם החלוקה המודולרית! 🎨✨
