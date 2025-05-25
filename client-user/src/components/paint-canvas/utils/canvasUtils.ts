// Utility functions for canvas operations
export const floodFill = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  fillColor: string,
  tolerance: number,
) => {
  const canvas = ctx.canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data
  const width = canvas.width
  const height = canvas.height

  // Convert hex color to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : null
  }

  const fillRgb = hexToRgb(fillColor)
  if (!fillRgb) return

  const startIndex = (y * width + x) * 4
  const startR = data[startIndex]
  const startG = data[startIndex + 1]
  const startB = data[startIndex + 2]

  // Check if the clicked pixel is already the fill color
  if (
    Math.abs(startR - fillRgb.r) <= tolerance &&
    Math.abs(startG - fillRgb.g) <= tolerance &&
    Math.abs(startB - fillRgb.b) <= tolerance
  ) {
    return
  }

  const stack = [{ x, y }]
  const visited = new Set<string>()

  while (stack.length > 0) {
    const { x: currentX, y: currentY } = stack.pop()!
    const key = `${currentX},${currentY}`

    if (visited.has(key)) continue
    if (currentX < 0 || currentX >= width || currentY < 0 || currentY >= height) continue

    const currentIndex = (currentY * width + currentX) * 4
    const currentR = data[currentIndex]
    const currentG = data[currentIndex + 1]
    const currentB = data[currentIndex + 2]

    // Check if current pixel matches the start pixel within tolerance
    if (
      Math.abs(currentR - startR) > tolerance ||
      Math.abs(currentG - startG) > tolerance ||
      Math.abs(currentB - startB) > tolerance
    ) {
      continue
    }

    visited.add(key)

    // Fill the pixel
    data[currentIndex] = fillRgb.r
    data[currentIndex + 1] = fillRgb.g
    data[currentIndex + 2] = fillRgb.b
    data[currentIndex + 3] = 255

    // Add neighboring pixels to stack
    stack.push({ x: currentX + 1, y: currentY })
    stack.push({ x: currentX - 1, y: currentY })
    stack.push({ x: currentX, y: currentY + 1 })
    stack.push({ x: currentX, y: currentY - 1 })
  }

  ctx.putImageData(imageData, 0, 0)
}

export const drawShape = (ctx: CanvasRenderingContext2D, shape: any) => {
  ctx.save()
  ctx.fillStyle = shape.color
  ctx.strokeStyle = shape.color
  ctx.lineWidth = 2

  switch (shape.type) {
    case "circle":
      ctx.beginPath()
      ctx.arc(shape.x, shape.y, shape.width / 2, 0, Math.PI * 2)
      if (shape.filled) {
        ctx.fill()
      } else {
        ctx.stroke()
      }
      break
    case "rectangle":
      if (shape.filled) {
        ctx.fillRect(shape.x - shape.width / 2, shape.y - shape.height / 2, shape.width, shape.height)
      } else {
        ctx.strokeRect(shape.x - shape.width / 2, shape.y - shape.height / 2, shape.width, shape.height)
      }
      break
    case "triangle":
      ctx.beginPath()
      ctx.moveTo(shape.x, shape.y - shape.height / 2)
      ctx.lineTo(shape.x - shape.width / 2, shape.y + shape.height / 2)
      ctx.lineTo(shape.x + shape.width / 2, shape.y + shape.height / 2)
      ctx.closePath()
      if (shape.filled) {
        ctx.fill()
      } else {
        ctx.stroke()
      }
      break
  }
  ctx.restore()
}

export const drawResizeHandles = (ctx: CanvasRenderingContext2D, shape: any) => {
  const handleSize = 8
  const handles = [
    { x: shape.x - shape.width / 2, y: shape.y - shape.height / 2 }, // Top-left
    { x: shape.x + shape.width / 2, y: shape.y - shape.height / 2 }, // Top-right
    { x: shape.x - shape.width / 2, y: shape.y + shape.height / 2 }, // Bottom-left
    { x: shape.x + shape.width / 2, y: shape.y + shape.height / 2 }, // Bottom-right
  ]

  ctx.fillStyle = "#1976D2"
  handles.forEach((handle) => {
    ctx.fillRect(handle.x - handleSize / 2, handle.y - handleSize / 2, handleSize, handleSize)
  })
}

export const resizeShape = (shape: any, handleIndex: number, dx: number, dy: number) => {
  // Simplified resize logic
  switch (handleIndex) {
    case 0: // Top-left
      shape.width -= dx
      shape.height -= dy
      shape.x += dx / 2
      shape.y += dy / 2
      break
    case 1: // Top-right
      shape.width += dx
      shape.height -= dy
      shape.x += dx / 2
      shape.y += dy / 2
      break
    case 2: // Bottom-left
      shape.width -= dx
      shape.height += dy
      shape.x += dx / 2
      shape.y += dy / 2
      break
    case 3: // Bottom-right
      shape.width += dx
      shape.height += dy
      shape.x += dx / 2
      shape.y += dy / 2
      break
  }

  // Ensure minimum size
  shape.width = Math.max(10, shape.width)
  shape.height = Math.max(10, shape.height)
}
