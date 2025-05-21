// // Flood fill algorithm for the fill bucket tool
// export function floodFill(
//     ctx: CanvasRenderingContext2D,
//     x: number,
//     y: number,
//     fillColor: string,
//     tolerance = 30,
//   ): void {
//     // Get canvas dimensions
//     const width = ctx.canvas.width
//     const height = ctx.canvas.height
  
//     // Get image data
//     const imageData = ctx.getImageData(0, 0, width, height)
//     const data = imageData.data
  
//     // Convert fill color to RGBA
//     const tempCanvas = document.createElement("canvas")
//     const tempCtx = tempCanvas.getContext("2d")
//     if (!tempCtx) return
  
//     tempCanvas.width = 1
//     tempCanvas.height = 1
//     tempCtx.fillStyle = fillColor
//     tempCtx.fillRect(0, 0, 1, 1)
//     const fillRgba = tempCtx.getImageData(0, 0, 1, 1).data
  
//     // Get the color at the clicked position
//     const targetPos = (y * width + x) * 4
//     const targetR = data[targetPos]
//     const targetG = data[targetPos + 1]
//     const targetB = data[targetPos + 2]
//     const targetA = data[targetPos + 3]
  
//     // If the target color is the same as the fill color, return
//     if (targetR === fillRgba[0] && targetG === fillRgba[1] && targetB === fillRgba[2] && targetA === fillRgba[3]) {
//       return
//     }
  
//     // Tolerance as a value between 0 and 1
//     const toleranceValue = tolerance / 100
  
//     // Queue for the flood fill algorithm
//     const queue: [number, number][] = []
//     queue.push([x, y])
  
//     // Visited pixels
//     const visited = new Set<number>()
//     const pixelPos = y * width + x
//     visited.add(pixelPos)
  
//     // Process the queue
//     while (queue.length > 0) {
//       const [currX, currY] = queue.shift()!
//       const pos = (currY * width + currX) * 4
  
//       // Set the color
//       data[pos] = fillRgba[0]
//       data[pos + 1] = fillRgba[1]
//       data[pos + 2] = fillRgba[2]
//       data[pos + 3] = fillRgba[3]
  
//       // Check neighboring pixels
//       const directions = [
//         [1, 0],
//         [-1, 0],
//         [0, 1],
//         [0, -1],
//       ]
  
//       for (const [dx, dy] of directions) {
//         const nx = currX + dx
//         const ny = currY + dy
  
//         // Check if the pixel is within bounds
//         if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
//           continue
//         }
  
//         const newPos = (ny * width + nx) * 4
//         const newPixelPos = ny * width + nx
  
//         // Check if the pixel has been visited
//         if (visited.has(newPixelPos)) {
//           continue
//         }
  
//         // Check if the color is similar to the target color
//         const r = data[newPos]
//         const g = data[newPos + 1]
//         const b = data[newPos + 2]
//         const a = data[newPos + 3]
  
//         const colorDiff =
//           Math.abs(r - targetR) / 255 +
//           Math.abs(g - targetG) / 255 +
//           Math.abs(b - targetB) / 255 +
//           Math.abs(a - targetA) / 255
  
//         if (colorDiff / 4 <= toleranceValue) {
//           queue.push([nx, ny])
//           visited.add(newPixelPos)
//         }
//       }
//     }
  
//     // Put the modified image data back to the canvas
//     ctx.putImageData(imageData, 0, 0)
//   }
  
//   // Check if a point is inside a shape
//   export function isPointInShape(
//     x: number,
//     y: number,
//     shape: {
//       type: string
//       x: number
//       y: number
//       width: number
//       height: number
//       points?: { x: number; y: number }[]
//     },
//   ): boolean {
//     switch (shape.type) {
//       case "rectangle":
//         return (
//           x >= shape.x - shape.width / 2 &&
//           x <= shape.x + shape.width / 2 &&
//           y >= shape.y - shape.height / 2 &&
//           y <= shape.y + shape.height / 2
//         )
//       case "circle":
//         const dx = x - shape.x
//         const dy = y - shape.y
//         return dx * dx + dy * dy <= (shape.width / 2) * (shape.width / 2)
//       case "triangle":
//         // Simple triangle check
//         const points = [
//           { x: shape.x, y: shape.y - shape.height / 2 },
//           { x: shape.x - shape.width / 2, y: shape.y + shape.height / 2 },
//           { x: shape.x + shape.width / 2, y: shape.y + shape.height / 2 },
//         ]
//         return isPointInPolygon(x, y, points)
//       case "polygon":
//         return shape.points ? isPointInPolygon(x, y, shape.points) : false
//       default:
//         return false
//     }
//   }
  
//   // Check if a point is inside a polygon
//   function isPointInPolygon(x: number, y: number, points: { x: number; y: number }[]): boolean {
//     let inside = false
//     for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
//       const xi = points[i].x
//       const yi = points[i].y
//       const xj = points[j].x
//       const yj = points[j].y
  
//       const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
//       if (intersect) inside = !inside
//     }
//     return inside
//   }
  
//   // Draw a shape on the canvas
//   export function drawShape(
//     ctx: CanvasRenderingContext2D,
//     shape: {
//       type: string
//       x: number
//       y: number
//       width: number
//       height: number
//       color: string
//       filled: boolean
//       points?: { x: number; y: number }[]
//     },
//   ): void {
//     ctx.strokeStyle = shape.color
//     ctx.fillStyle = shape.color
//     ctx.lineWidth = 2
  
//     switch (shape.type) {
//       case "rectangle":
//         if (shape.filled) {
//           ctx.fillRect(shape.x - shape.width / 2, shape.y - shape.height / 2, shape.width, shape.height)
//         }
//         ctx.strokeRect(shape.x - shape.width / 2, shape.y - shape.height / 2, shape.width, shape.height)
//         break
//       case "circle":
//         ctx.beginPath()
//         ctx.arc(shape.x, shape.y, shape.width / 2, 0, Math.PI * 2)
//         if (shape.filled) ctx.fill()
//         ctx.stroke()
//         break
//       case "triangle":
//         ctx.beginPath()
//         ctx.moveTo(shape.x, shape.y - shape.height / 2)
//         ctx.lineTo(shape.x - shape.width / 2, shape.y + shape.height / 2)
//         ctx.lineTo(shape.x + shape.width / 2, shape.y + shape.height / 2)
//         ctx.closePath()
//         if (shape.filled) ctx.fill()
//         ctx.stroke()
//         break
//       case "star":
//         drawStar(ctx, shape.x, shape.y, 5, shape.width / 2, shape.width / 4, shape.filled)
//         break
//       case "heart":
//         drawHeart(ctx, shape.x, shape.y, shape.width, shape.filled)
//         break
//       case "polygon":
//         if (shape.points && shape.points.length > 2) {
//           ctx.beginPath()
//           ctx.moveTo(shape.points[0].x, shape.points[0].y)
//           for (let i = 1; i < shape.points.length; i++) {
//             ctx.lineTo(shape.points[i].x, shape.points[i].y)
//           }
//           ctx.closePath()
//           if (shape.filled) ctx.fill()
//           ctx.stroke()
//         }
//         break
//       default:
//         break
//     }
//   }
  
//   // Draw a star shape
//   export function drawStar(
//     ctx: CanvasRenderingContext2D,
//     cx: number,
//     cy: number,
//     spikes: number,
//     outerRadius: number,
//     innerRadius: number,
//     filled: boolean,
//   ): void {
//     let rot = (Math.PI / 2) * 3
//     let x = cx
//     let y = cy
//     const step = Math.PI / spikes
  
//     ctx.beginPath()
//     ctx.moveTo(cx, cy - outerRadius)
//     for (let i = 0; i < spikes; i++) {
//       x = cx + Math.cos(rot) * outerRadius
//       y = cy + Math.sin(rot) * outerRadius
//       ctx.lineTo(x, y)
//       rot += step
  
//       x = cx + Math.cos(rot) * innerRadius
//       y = cy + Math.sin(rot) * innerRadius
//       ctx.lineTo(x, y)
//       rot += step
//     }
//     ctx.lineTo(cx, cy - outerRadius)
//     ctx.closePath()
//     if (filled) ctx.fill()
//     ctx.stroke()
//   }
  
//   // Draw a heart shape
//   export function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, filled: boolean): void {
//     const width = size
//     const height = size
  
//     ctx.beginPath()
//     ctx.moveTo(x, y + height / 4)
//     ctx.bezierCurveTo(x, y, x - width / 2, y, x - width / 2, y + height / 4)
//     ctx.bezierCurveTo(x - width / 2, y + height / 2, x, y + height / 1.5, x, y + height)
//     ctx.bezierCurveTo(x, y + height / 1.5, x + width / 2, y + height / 2, x + width / 2, y + height / 4)
//     ctx.bezierCurveTo(x + width / 2, y, x, y, x, y + height / 4)
//     ctx.closePath()
//     if (filled) ctx.fill()
//     ctx.stroke()
//   }
  
//   // Draw resize handles for a shape
//   export function drawResizeHandles(
//     ctx: CanvasRenderingContext2D,
//     shape: {
//       x: number
//       y: number
//       width: number
//       height: number
//     },
//   ): void {
//     const handleSize = 8
//     const halfHandleSize = handleSize / 2
  
//     // Draw the handles
//     const handles = [
//       { x: shape.x - shape.width / 2, y: shape.y - shape.height / 2 }, // Top-left
//       { x: shape.x + shape.width / 2, y: shape.y - shape.height / 2 }, // Top-right
//       { x: shape.x + shape.width / 2, y: shape.y + shape.height / 2 }, // Bottom-right
//       { x: shape.x - shape.width / 2, y: shape.y + shape.height / 2 }, // Bottom-left
//       { x: shape.x, y: shape.y - shape.height / 2 }, // Top-center
//       { x: shape.x + shape.width / 2, y: shape.y }, // Right-center
//       { x: shape.x, y: shape.y + shape.height / 2 }, // Bottom-center
//       { x: shape.x - shape.width / 2, y: shape.y }, // Left-center
//     ]
  
//     ctx.fillStyle = "#ffffff"
//     ctx.strokeStyle = "#0066ff"
//     ctx.lineWidth = 1
  
//     handles.forEach((handle) => {
//       ctx.beginPath()
//       ctx.rect(handle.x - halfHandleSize, handle.y - halfHandleSize, handleSize, handleSize)
//       ctx.fill()
//       ctx.stroke()
//     })
  
//     return handles
//   }
  
//   // Get the resize handle index if a point is inside a handle
//   export function getResizeHandleIndex(
//     x: number,
//     y: number,
//     shape: {
//       x: number
//       y: number
//       width: number
//       height: number
//     },
//   ): number {
//     const handleSize = 8
//     const halfHandleSize = handleSize / 2
  
//     const handles = [
//       { x: shape.x - shape.width / 2, y: shape.y - shape.height / 2 }, // Top-left
//       { x: shape.x + shape.width / 2, y: shape.y - shape.height / 2 }, // Top-right
//       { x: shape.x + shape.width / 2, y: shape.y + shape.height / 2 }, // Bottom-right
//       { x: shape.x - shape.width / 2, y: shape.y + shape.height / 2 }, // Bottom-left
//       { x: shape.x, y: shape.y - shape.height / 2 }, // Top-center
//       { x: shape.x + shape.width / 2, y: shape.y }, // Right-center
//       { x: shape.x, y: shape.y + shape.height / 2 }, // Bottom-center
//       { x: shape.x - shape.width / 2, y: shape.y }, // Left-center
//     ]
  
//     for (let i = 0; i < handles.length; i++) {
//       const handle = handles[i]
//       if (
//         x >= handle.x - halfHandleSize &&
//         x <= handle.x + halfHandleSize &&
//         y >= handle.y - halfHandleSize &&
//         y <= handle.y + halfHandleSize
//       ) {
//         return i
//       }
//     }
  
//     return -1
//   }
  
//   // Get the cursor style for a resize handle
//   export function getResizeHandleCursor(handleIndex: number): string {
//     switch (handleIndex) {
//       case 0: // Top-left
//         return "nwse-resize"
//       case 1: // Top-right
//         return "nesw-resize"
//       case 2: // Bottom-right
//         return "nwse-resize"
//       case 3: // Bottom-left
//         return "nesw-resize"
//       case 4: // Top-center
//         return "ns-resize"
//       case 5: // Right-center
//         return "ew-resize"
//       case 6: // Bottom-center
//         return "ns-resize"
//       case 7: // Left-center
//         return "ew-resize"
//       default:
//         return "move"
//     }
//   }
  
//   // Resize a shape based on the handle being dragged
//   export function resizeShape(
//     shape: {
//       x: number
//       y: number
//       width: number
//       height: number
//     },
//     handleIndex: number,
//     dx: number,
//     dy: number,
//   ): void {
//     const minSize = 10 // Minimum size for the shape
  
//     switch (handleIndex) {
//       case 0: // Top-left
//         const newWidth1 = Math.max(shape.width - dx * 2, minSize)
//         const newHeight1 = Math.max(shape.height - dy * 2, minSize)
//         shape.x += (shape.width - newWidth1) / 2
//         shape.y += (shape.height - newHeight1) / 2
//         shape.width = newWidth1
//         shape.height = newHeight1
//         break
//       case 1: // Top-right
//         const newWidth2 = Math.max(shape.width + dx * 2, minSize)
//         const newHeight2 = Math.max(shape.height - dy * 2, minSize)
//         shape.x += (newWidth2 - shape.width) / 2
//         shape.y += (shape.height - newHeight2) / 2
//         shape.width = newWidth2
//         shape.height = newHeight2
//         break
//       case 2: // Bottom-right
//         const newWidth3 = Math.max(shape.width + dx * 2, minSize)
//         const newHeight3 = Math.max(shape.height + dy * 2, minSize)
//         shape.x += (newWidth3 - shape.width) / 2
//         shape.y += (newHeight3 - shape.height) / 2
//         shape.width = newWidth3
//         shape.height = newHeight3
//         break
//       case 3: // Bottom-left
//         const newWidth4 = Math.max(shape.width - dx * 2, minSize)
//         const newHeight4 = Math.max(shape.height + dy * 2, minSize)
//         shape.x += (shape.width - newWidth4) / 2
//         shape.y += (newHeight4 - shape.height) / 2
//         shape.width = newWidth4
//         shape.height = newHeight4
//         break
//       case 4: // Top-center
//         const newHeight5 = Math.max(shape.height - dy * 2, minSize)
//         shape.y += (shape.height - newHeight5) / 2
//         shape.height = newHeight5
//         break
//       case 5: // Right-center
//         const newWidth6 = Math.max(shape.width + dx * 2, minSize)
//         shape.x += (newWidth6 - shape.width) / 2
//         shape.width = newWidth6
//         break
//       case 6: // Bottom-center
//         const newHeight7 = Math.max(shape.height + dy * 2, minSize)
//         shape.y += (newHeight7 - shape.height) / 2
//         shape.height = newHeight7
//         break
//       case 7: // Left-center
//         const newWidth8 = Math.max(shape.width - dx * 2, minSize)
//         shape.x += (shape.width - newWidth8) / 2
//         shape.width = newWidth8
//         break
//     }
//   }
  

// Flood fill algorithm for the fill bucket tool
export function floodFill(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  fillColor: string,
  tolerance = 30,
): void {
  // Get canvas dimensions
  const width = ctx.canvas.width
  const height = ctx.canvas.height

  // Get image data
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data

  // Convert fill color to RGBA
  const tempCanvas = document.createElement("canvas")
  const tempCtx = tempCanvas.getContext("2d")
  if (!tempCtx) return

  tempCanvas.width = 1
  tempCanvas.height = 1
  tempCtx.fillStyle = fillColor
  tempCtx.fillRect(0, 0, 1, 1)
  const fillRgba = tempCtx.getImageData(0, 0, 1, 1).data

  // Get the color at the clicked position
  const targetPos = (y * width + x) * 4
  const targetR = data[targetPos]
  const targetG = data[targetPos + 1]
  const targetB = data[targetPos + 2]
  const targetA = data[targetPos + 3]

  // If the target color is the same as the fill color, return
  if (targetR === fillRgba[0] && targetG === fillRgba[1] && targetB === fillRgba[2] && targetA === fillRgba[3]) {
    return
  }

  // Tolerance as a value between 0 and 1
  const toleranceValue = tolerance / 100

  // Queue for the flood fill algorithm
  const queue: [number, number][] = []
  queue.push([x, y])

  // Visited pixels
  const visited = new Set<number>()
  const pixelPos = y * width + x
  visited.add(pixelPos)

  // Process the queue
  while (queue.length > 0) {
    const [currX, currY] = queue.shift()!
    const pos = (currY * width + currX) * 4

    // Set the color
    data[pos] = fillRgba[0]
    data[pos + 1] = fillRgba[1]
    data[pos + 2] = fillRgba[2]
    data[pos + 3] = fillRgba[3]

    // Check neighboring pixels
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]

    for (const [dx, dy] of directions) {
      const nx = currX + dx
      const ny = currY + dy

      // Check if the pixel is within bounds
      if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
        continue
      }

      const newPos = (ny * width + nx) * 4
      const newPixelPos = ny * width + nx

      // Check if the pixel has been visited
      if (visited.has(newPixelPos)) {
        continue
      }

      // Check if the color is similar to the target color
      const r = data[newPos]
      const g = data[newPos + 1]
      const b = data[newPos + 2]
      const a = data[newPos + 3]

      const colorDiff =
        Math.abs(r - targetR) / 255 +
        Math.abs(g - targetG) / 255 +
        Math.abs(b - targetB) / 255 +
        Math.abs(a - targetA) / 255

      if (colorDiff / 4 <= toleranceValue) {
        queue.push([nx, ny])
        visited.add(newPixelPos)
      }
    }
  }

  // Put the modified image data back to the canvas
  ctx.putImageData(imageData, 0, 0)
}

// Check if a point is inside a shape
export function isPointInShape(
  x: number,
  y: number,
  shape: {
    type: string
    x: number
    y: number
    width: number
    height: number
    points?: { x: number; y: number }[]
  },
): boolean {
  switch (shape.type) {
    case "rectangle":
      return (
        x >= shape.x - shape.width / 2 &&
        x <= shape.x + shape.width / 2 &&
        y >= shape.y - shape.height / 2 &&
        y <= shape.y + shape.height / 2
      )
    case "circle":
      const dx = x - shape.x
      const dy = y - shape.y
      return dx * dx + dy * dy <= (shape.width / 2) * (shape.width / 2)
    case "triangle":
      // Simple triangle check
      const points = [
        { x: shape.x, y: shape.y - shape.height / 2 },
        { x: shape.x - shape.width / 2, y: shape.y + shape.height / 2 },
        { x: shape.x + shape.width / 2, y: shape.y + shape.height / 2 },
      ]
      return isPointInPolygon(x, y, points)
    case "polygon":
      return shape.points ? isPointInPolygon(x, y, shape.points) : false
    default:
      return false
  }
}

// Check if a point is inside a polygon
function isPointInPolygon(x: number, y: number, points: { x: number; y: number }[]): boolean {
  let inside = false
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i].x
    const yi = points[i].y
    const xj = points[j].x
    const yj = points[j].y

    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }
  return inside
}

// Draw a shape on the canvas
export function drawShape(
  ctx: CanvasRenderingContext2D,
  shape: {
    type: string
    x: number
    y: number
    width: number
    height: number
    color: string
    filled: boolean
    points?: { x: number; y: number }[]
  },
): void {
  ctx.strokeStyle = shape.color
  ctx.fillStyle = shape.color
  ctx.lineWidth = 2

  switch (shape.type) {
    case "rectangle":
      if (shape.filled) {
        ctx.fillRect(shape.x - shape.width / 2, shape.y - shape.height / 2, shape.width, shape.height)
      }
      ctx.strokeRect(shape.x - shape.width / 2, shape.y - shape.height / 2, shape.width, shape.height)
      break
    case "circle":
      ctx.beginPath()
      ctx.arc(shape.x, shape.y, shape.width / 2, 0, Math.PI * 2)
      if (shape.filled) ctx.fill()
      ctx.stroke()
      break
    case "triangle":
      ctx.beginPath()
      ctx.moveTo(shape.x, shape.y - shape.height / 2)
      ctx.lineTo(shape.x - shape.width / 2, shape.y + shape.height / 2)
      ctx.lineTo(shape.x + shape.width / 2, shape.y + shape.height / 2)
      ctx.closePath()
      if (shape.filled) ctx.fill()
      ctx.stroke()
      break
    case "star":
      drawStar(ctx, shape.x, shape.y, 5, shape.width / 2, shape.width / 4, shape.filled)
      break
    case "heart":
      drawHeart(ctx, shape.x, shape.y, shape.width, shape.filled)
      break
    case "polygon":
      if (shape.points && shape.points.length > 2) {
        ctx.beginPath()
        ctx.moveTo(shape.points[0].x, shape.points[0].y)
        for (let i = 1; i < shape.points.length; i++) {
          ctx.lineTo(shape.points[i].x, shape.points[i].y)
        }
        ctx.closePath()
        if (shape.filled) ctx.fill()
        ctx.stroke()
      }
      break
    default:
      break
  }
}

// Draw a star shape
export function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number,
  filled: boolean,
): void {
  let rot = (Math.PI / 2) * 3
  let x = cx
  let y = cy
  const step = Math.PI / spikes

  ctx.beginPath()
  ctx.moveTo(cx, cy - outerRadius)
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius
    y = cy + Math.sin(rot) * outerRadius
    ctx.lineTo(x, y)
    rot += step

    x = cx + Math.cos(rot) * innerRadius
    y = cy + Math.sin(rot) * innerRadius
    ctx.lineTo(x, y)
    rot += step
  }
  ctx.lineTo(cx, cy - outerRadius)
  ctx.closePath()
  if (filled) ctx.fill()
  ctx.stroke()
}

// Draw a heart shape
export function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, filled: boolean): void {
  const width = size
  const height = size

  ctx.beginPath()
  ctx.moveTo(x, y + height / 4)
  ctx.bezierCurveTo(x, y, x - width / 2, y, x - width / 2, y + height / 4)
  ctx.bezierCurveTo(x - width / 2, y + height / 2, x, y + height / 1.5, x, y + height)
  ctx.bezierCurveTo(x, y + height / 1.5, x + width / 2, y + height / 2, x + width / 2, y + height / 4)
  ctx.bezierCurveTo(x + width / 2, y, x, y, x, y + height / 4)
  ctx.closePath()
  if (filled) ctx.fill()
  ctx.stroke()
}

// Draw resize handles for a shape
export function drawResizeHandles(
  ctx: CanvasRenderingContext2D,
  shape: {
    x: number
    y: number
    width: number
    height: number
  },
) {
  const handleSize = 8
  const halfHandleSize = handleSize / 2

  // Draw the handles
  const handles = [
    { x: shape.x - shape.width / 2, y: shape.y - shape.height / 2 }, // Top-left
    { x: shape.x + shape.width / 2, y: shape.y - shape.height / 2 }, // Top-right
    { x: shape.x + shape.width / 2, y: shape.y + shape.height / 2 }, // Bottom-right
    { x: shape.x - shape.width / 2, y: shape.y + shape.height / 2 }, // Bottom-left
    { x: shape.x, y: shape.y - shape.height / 2 }, // Top-center
    { x: shape.x + shape.width / 2, y: shape.y }, // Right-center
    { x: shape.x, y: shape.y + shape.height / 2 }, // Bottom-center
    { x: shape.x - shape.width / 2, y: shape.y }, // Left-center
  ]

  ctx.fillStyle = "#ffffff"
  ctx.strokeStyle = "#0066ff"
  ctx.lineWidth = 1

  handles.forEach((handle) => {
    ctx.beginPath()
    ctx.rect(handle.x - halfHandleSize, handle.y - halfHandleSize, handleSize, handleSize)
    ctx.fill()
    ctx.stroke()
  })

  return handles
}

// Get the resize handle index if a point is inside a handle
export function getResizeHandleIndex(
  x: number,
  y: number,
  shape: {
    x: number
    y: number
    width: number
    height: number
  },
): number {
  const handleSize = 8
  const halfHandleSize = handleSize / 2

  const handles = [
    { x: shape.x - shape.width / 2, y: shape.y - shape.height / 2 }, // Top-left
    { x: shape.x + shape.width / 2, y: shape.y - shape.height / 2 }, // Top-right
    { x: shape.x + shape.width / 2, y: shape.y + shape.height / 2 }, // Bottom-right
    { x: shape.x - shape.width / 2, y: shape.y + shape.height / 2 }, // Bottom-left
    { x: shape.x, y: shape.y - shape.height / 2 }, // Top-center
    { x: shape.x + shape.width / 2, y: shape.y }, // Right-center
    { x: shape.x, y: shape.y + shape.height / 2 }, // Bottom-center
    { x: shape.x - shape.width / 2, y: shape.y }, // Left-center
  ]

  for (let i = 0; i < handles.length; i++) {
    const handle = handles[i]
    if (
      x >= handle.x - halfHandleSize &&
      x <= handle.x + halfHandleSize &&
      y >= handle.y - halfHandleSize &&
      y <= handle.y + halfHandleSize
    ) {
      return i
    }
  }

  return -1
}

// Get the cursor style for a resize handle
export function getResizeHandleCursor(handleIndex: number): string {
  switch (handleIndex) {
    case 0: // Top-left
      return "nwse-resize"
    case 1: // Top-right
      return "nesw-resize"
    case 2: // Bottom-right
      return "nwse-resize"
    case 3: // Bottom-left
      return "nesw-resize"
    case 4: // Top-center
      return "ns-resize"
    case 5: // Right-center
      return "ew-resize"
    case 6: // Bottom-center
      return "ns-resize"
    case 7: // Left-center
      return "ew-resize"
    default:
      return "move"
  }
}

// Resize a shape based on the handle being dragged
export function resizeShape(
  shape: {
    x: number
    y: number
    width: number
    height: number
  },
  handleIndex: number,
  dx: number,
  dy: number,
): void {
  const minSize = 10 // Minimum size for the shape

  switch (handleIndex) {
    case 0: // Top-left
      const newWidth1 = Math.max(shape.width - dx * 2, minSize)
      const newHeight1 = Math.max(shape.height - dy * 2, minSize)
      shape.x += (shape.width - newWidth1) / 2
      shape.y += (shape.height - newHeight1) / 2
      shape.width = newWidth1
      shape.height = newHeight1
      break
    case 1: // Top-right
      const newWidth2 = Math.max(shape.width + dx * 2, minSize)
      const newHeight2 = Math.max(shape.height - dy * 2, minSize)
      shape.x += (newWidth2 - shape.width) / 2
      shape.y += (shape.height - newHeight2) / 2
      shape.width = newWidth2
      shape.height = newHeight2
      break
    case 2: // Bottom-right
      const newWidth3 = Math.max(shape.width + dx * 2, minSize)
      const newHeight3 = Math.max(shape.height + dy * 2, minSize)
      shape.x += (newWidth3 - shape.width) / 2
      shape.y += (newHeight3 - shape.height) / 2
      shape.width = newWidth3
      shape.height = newHeight3
      break
    case 3: // Bottom-left
      const newWidth4 = Math.max(shape.width - dx * 2, minSize)
      const newHeight4 = Math.max(shape.height + dy * 2, minSize)
      shape.x += (shape.width - newWidth4) / 2
      shape.y += (newHeight4 - shape.height) / 2
      shape.width = newWidth4
      shape.height = newHeight4
      break
    case 4: // Top-center
      const newHeight5 = Math.max(shape.height - dy * 2, minSize)
      shape.y += (shape.height - newHeight5) / 2
      shape.height = newHeight5
      break
    case 5: // Right-center
      const newWidth6 = Math.max(shape.width + dx * 2, minSize)
      shape.x += (newWidth6 - shape.width) / 2
      shape.width = newWidth6
      break
    case 6: // Bottom-center
      const newHeight7 = Math.max(shape.height + dy * 2, minSize)
      shape.y += (newHeight7 - shape.height) / 2
      shape.height = newHeight7
      break
    case 7: // Left-center
      const newWidth8 = Math.max(shape.width - dx * 2, minSize)
      shape.x += (shape.width - newWidth8) / 2
      shape.width = newWidth8
      break
  }
}
