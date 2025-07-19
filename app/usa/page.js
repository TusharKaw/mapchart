"use client"

import { useState, useRef, useEffect } from "react"
import { Download, Home } from "lucide-react"
import Link from "next/link"

const US_STATES_DETAILED = [
  { id: "AL", name: "Alabama", path: "M 280 320 L 320 320 L 320 380 L 280 380 Z" },
  { id: "AK", name: "Alaska", path: "M 50 400 L 120 400 L 120 450 L 50 450 Z" },
  { id: "AZ", name: "Arizona", path: "M 120 280 L 180 280 L 180 340 L 120 340 Z" },
  { id: "AR", name: "Arkansas", path: "M 220 300 L 270 300 L 270 340 L 220 340 Z" },
  { id: "CA", name: "California", path: "M 40 220 L 100 220 L 100 380 L 40 380 Z" },
  { id: "CO", name: "Colorado", path: "M 160 240 L 220 240 L 220 300 L 160 300 Z" },
  { id: "CT", name: "Connecticut", path: "M 380 200 L 400 200 L 400 220 L 380 220 Z" },
  { id: "DE", name: "Delaware", path: "M 360 240 L 375 240 L 375 260 L 360 260 Z" },
  { id: "FL", name: "Florida", path: "M 320 380 L 380 380 L 400 430 L 320 410 Z" },
  { id: "GA", name: "Georgia", path: "M 320 340 L 360 340 L 360 390 L 320 390 Z" },
  { id: "HI", name: "Hawaii", path: "M 150 420 L 180 420 L 180 440 L 150 440 Z" },
  { id: "ID", name: "Idaho", path: "M 120 160 L 160 160 L 160 240 L 120 240 Z" },
  { id: "IL", name: "Illinois", path: "M 260 220 L 290 220 L 290 300 L 260 300 Z" },
  { id: "IN", name: "Indiana", path: "M 290 220 L 320 220 L 320 300 L 290 300 Z" },
  { id: "IA", name: "Iowa", path: "M 220 200 L 270 200 L 270 240 L 220 240 Z" },
  { id: "KS", name: "Kansas", path: "M 180 260 L 240 260 L 240 300 L 180 300 Z" },
  { id: "KY", name: "Kentucky", path: "M 280 280 L 340 280 L 340 320 L 280 320 Z" },
  { id: "LA", name: "Louisiana", path: "M 220 340 L 280 340 L 280 380 L 220 380 Z" },
  { id: "ME", name: "Maine", path: "M 380 140 L 400 140 L 400 200 L 380 200 Z" },
  { id: "MD", name: "Maryland", path: "M 340 240 L 370 240 L 370 260 L 340 260 Z" },
  { id: "MA", name: "Massachusetts", path: "M 360 180 L 400 180 L 400 200 L 360 200 Z" },
  { id: "MI", name: "Michigan", path: "M 300 180 L 340 180 L 340 240 L 300 240 Z" },
  { id: "MN", name: "Minnesota", path: "M 220 140 L 270 140 L 270 200 L 220 200 Z" },
  { id: "MS", name: "Mississippi", path: "M 260 320 L 290 320 L 290 380 L 260 380 Z" },
  { id: "MO", name: "Missouri", path: "M 220 240 L 280 240 L 280 300 L 220 300 Z" },
  { id: "MT", name: "Montana", path: "M 120 120 L 220 120 L 220 180 L 120 180 Z" },
  { id: "NE", name: "Nebraska", path: "M 160 200 L 220 200 L 220 240 L 160 240 Z" },
  { id: "NV", name: "Nevada", path: "M 80 200 L 120 200 L 120 280 L 80 280 Z" },
  { id: "NH", name: "New Hampshire", path: "M 370 160 L 385 160 L 385 200 L 370 200 Z" },
  { id: "NJ", name: "New Jersey", path: "M 350 220 L 370 220 L 370 260 L 350 260 Z" },
  { id: "NM", name: "New Mexico", path: "M 140 300 L 200 300 L 200 360 L 140 360 Z" },
  { id: "NY", name: "New York", path: "M 320 160 L 380 160 L 380 220 L 320 220 Z" },
  { id: "NC", name: "North Carolina", path: "M 320 300 L 380 300 L 380 340 L 320 340 Z" },
  { id: "ND", name: "North Dakota", path: "M 180 120 L 240 120 L 240 160 L 180 160 Z" },
  { id: "OH", name: "Ohio", path: "M 320 200 L 360 200 L 360 260 L 320 260 Z" },
  { id: "OK", name: "Oklahoma", path: "M 180 300 L 260 300 L 260 340 L 180 340 Z" },
  { id: "OR", name: "Oregon", path: "M 40 160 L 120 160 L 120 220 L 40 220 Z" },
  { id: "PA", name: "Pennsylvania", path: "M 320 200 L 380 200 L 380 240 L 320 240 Z" },
  { id: "RI", name: "Rhode Island", path: "M 385 190 L 395 190 L 395 205 L 385 205 Z" },
  { id: "SC", name: "South Carolina", path: "M 340 320 L 370 320 L 370 350 L 340 350 Z" },
  { id: "SD", name: "South Dakota", path: "M 180 160 L 240 160 L 240 200 L 180 200 Z" },
  { id: "TN", name: "Tennessee", path: "M 260 280 L 340 280 L 340 320 L 260 320 Z" },
  { id: "TX", name: "Texas", path: "M 140 320 L 240 320 L 240 420 L 140 420 Z" },
  { id: "UT", name: "Utah", path: "M 120 220 L 160 220 L 160 300 L 120 300 Z" },
  { id: "VT", name: "Vermont", path: "M 360 160 L 375 160 L 375 200 L 360 200 Z" },
  { id: "VA", name: "Virginia", path: "M 320 260 L 380 260 L 380 300 L 320 300 Z" },
  { id: "WA", name: "Washington", path: "M 40 100 L 120 100 L 120 160 L 40 160 Z" },
  { id: "WV", name: "West Virginia", path: "M 320 240 L 360 240 L 360 280 L 320 280 Z" },
  { id: "WI", name: "Wisconsin", path: "M 260 160 L 300 160 L 300 220 L 260 220 Z" },
  { id: "WY", name: "Wyoming", path: "M 120 180 L 180 180 L 180 240 L 120 240 Z" },
]

const DEFAULT_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E9",
]

export default function USAMap() {
  const canvasRef = useRef(null)
  const [selectedColor, setSelectedColor] = useState("#FF6B6B")
  const [stateColors, setStateColors] = useState({})
  const [hoveredState, setHoveredState] = useState(null)

  useEffect(() => {
    drawMap()
  }, [stateColors, hoveredState])

  const drawMap = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    ctx.fillStyle = "#f8fafc"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw states
    US_STATES_DETAILED.forEach((state) => {
      const path = new Path2D(state.path)

      // Fill state
      ctx.fillStyle = stateColors[state.id] || "#e2e8f0"
      ctx.fill(path)

      // Stroke state
      ctx.strokeStyle = hoveredState === state.id ? "#1e40af" : "#64748b"
      ctx.lineWidth = hoveredState === state.id ? 2 : 1
      ctx.stroke(path)

      // Add state label
      ctx.fillStyle = "#1e293b"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      // Simplified bounds calculation
      const centerX = 200
      const centerY = 200
      ctx.fillText(state.id, centerX, centerY)
    })
  }

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const ctx = canvas.getContext("2d")

    // Check which state was clicked
    US_STATES_DETAILED.forEach((state) => {
      const path = new Path2D(state.path)
      if (ctx.isPointInPath(path, x, y)) {
        setStateColors((prev) => ({
          ...prev,
          [state.id]: selectedColor,
        }))
      }
    })
  }

  const handleCanvasMouseMove = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const ctx = canvas.getContext("2d")
    let foundState = null

    // Check which state is being hovered
    US_STATES_DETAILED.forEach((state) => {
      const path = new Path2D(state.path)
      if (ctx.isPointInPath(path, x, y)) {
        foundState = state.id
      }
    })

    setHoveredState(foundState)
    canvas.style.cursor = foundState ? "pointer" : "default"
  }

  const downloadMap = () => {
    const canvas = canvasRef.current
    const link = document.createElement("a")
    link.download = `usa-map-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="usa-bg">
      <header className="usa-header">
        <div className="usa-header-container">
          <div className="usa-header-flex">
            <Link href="/" className="usa-logo-link">
              <Home className="usa-logo-icon" />
              <span className="usa-logo-text">MapChart</span>
            </Link>
            <button className="usa-download-btn" onClick={downloadMap}>
              <Download className="usa-download-icon" />
              Download
            </button>
          </div>
        </div>
      </header>

      <div className="usa-content-container">
        <div className="usa-content-grid">
          <div className="usa-color-panel">
            <div className="usa-color-card">
              <div className="usa-color-card-title">Colors</div>
              <div className="usa-color-grid">
                {DEFAULT_COLORS.map((color) => (
                  <button
                    key={color}
                    className={`usa-color-swatch${selectedColor === color ? " usa-color-swatch-selected" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="usa-map-panel">
            <div className="usa-map-card">
              <div className="usa-map-card-title">
                United States Map
                {hoveredState && (
                  <span className="usa-map-hovered-state">
                    {US_STATES_DETAILED.find((s) => s.id === hoveredState)?.name}
                  </span>
                )}
              </div>
              <canvas
                ref={canvasRef}
                width={450}
                height={300}
                className="usa-map-canvas"
                onClick={handleCanvasClick}
                onMouseMove={handleCanvasMouseMove}
                onMouseLeave={() => setHoveredState(null)}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .usa-bg { min-height: 100vh; background: #f8fafc; }
        .usa-header { background: #fff; border-bottom: 1px solid #e5e7eb; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }
        .usa-header-container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .usa-header-flex { display: flex; align-items: center; justify-content: space-between; height: 60px; }
        .usa-logo-link { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; }
        .usa-logo-icon { width: 24px; height: 24px; color: #f97316; }
        .usa-logo-text { font-weight: bold; font-size: 1.25rem; color: #22223b; }
        .usa-download-btn { display: flex; align-items: center; background: #f97316; color: #fff; border: none; border-radius: 4px; padding: 0.5rem 1rem; font-size: 1rem; cursor: pointer; transition: background 0.2s; gap: 0.5rem; }
        .usa-download-btn:hover { background: #ea580c; }
        .usa-download-icon { width: 18px; height: 18px; }
        .usa-content-container { max-width: 1200px; margin: 0 auto; padding: 2rem 1rem; }
        .usa-content-grid { display: grid; grid-template-columns: 1fr 3fr; gap: 1.5rem; }
        @media (max-width: 1024px) { .usa-content-grid { grid-template-columns: 1fr; } }
        .usa-color-panel { display: flex; flex-direction: column; }
        .usa-color-card { background: #fff; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); padding: 1rem; }
        .usa-color-card-title { font-weight: 600; margin-bottom: 0.75rem; font-size: 1.1rem; }
        .usa-color-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.5rem; }
        .usa-color-swatch { width: 32px; height: 32px; border-radius: 50%; border: 2px solid #d1d5db; cursor: pointer; transition: border 0.2s; }
        .usa-color-swatch-selected { border: 2px solid #22223b; }
        .usa-map-panel { display: flex; flex-direction: column; }
        .usa-map-card { background: #fff; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); padding: 1rem; }
        .usa-map-card-title { font-weight: 600; margin-bottom: 0.75rem; font-size: 1.1rem; display: flex; align-items: center; justify-content: space-between; }
        .usa-map-hovered-state { font-size: 0.95rem; font-weight: 400; color: #64748b; margin-left: 1rem; }
        .usa-map-canvas { width: 100%; height: auto; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer; display: block; }
      `}</style>
    </div>
  )
}
