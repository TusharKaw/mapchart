"use client"

import { useState, useRef, useEffect } from "react"
import { Download, Palette, RotateCcw, Save, Share, Home } from "lucide-react"
import Link from "next/link"

const MAP_TYPES = {
  world: "World Map",
  usa: "United States",
  europe: "Europe",
  asia: "Asia",
  africa: "Africa",
  americas: "The Americas",
}

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

const US_STATES = [
  { id: "AL", name: "Alabama", path: "M 200 300 L 250 300 L 250 350 L 200 350 Z" },
  { id: "AK", name: "Alaska", path: "M 50 400 L 100 400 L 100 450 L 50 450 Z" },
  { id: "AZ", name: "Arizona", path: "M 100 250 L 150 250 L 150 300 L 100 300 Z" },
  { id: "AR", name: "Arkansas", path: "M 180 280 L 220 280 L 220 320 L 180 320 Z" },
  { id: "CA", name: "California", path: "M 20 200 L 80 200 L 80 350 L 20 350 Z" },
  { id: "CO", name: "Colorado", path: "M 120 220 L 170 220 L 170 270 L 120 270 Z" },
  { id: "CT", name: "Connecticut", path: "M 320 180 L 340 180 L 340 200 L 320 200 Z" },
  { id: "DE", name: "Delaware", path: "M 310 220 L 320 220 L 320 240 L 310 240 Z" },
  { id: "FL", name: "Florida", path: "M 250 350 L 300 350 L 320 400 L 250 380 Z" },
  { id: "GA", name: "Georgia", path: "M 250 320 L 290 320 L 290 370 L 250 370 Z" },
]

export default function MapEditor() {
  const canvasRef = useRef(null)
  const [selectedMap, setSelectedMap] = useState("usa")
  const [selectedColor, setSelectedColor] = useState("#FF6B6B")
  const [customColor, setCustomColor] = useState("#FF6B6B")
  const [stateColors, setStateColors] = useState({})
  const [legend, setLegend] = useState([])
  const [hoveredState, setHoveredState] = useState(null)
  const [selectedTool, setSelectedTool] = useState("color")

  useEffect(() => {
    drawMap()
  }, [selectedMap, stateColors, hoveredState])

  const drawMap = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    ctx.fillStyle = "#f8fafc"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw states
    US_STATES.forEach((state) => {
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
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      const bounds = path.getBounds ? path.getBounds() : { x: 100, y: 100, width: 50, height: 50 }
      ctx.fillText(state.id, bounds.x + bounds.width / 2, bounds.y + bounds.height / 2)
    })
  }

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const ctx = canvas.getContext("2d")

    // Check which state was clicked
    US_STATES.forEach((state) => {
      const path = new Path2D(state.path)
      if (ctx.isPointInPath(path, x, y)) {
        if (selectedTool === "color") {
          setStateColors((prev) => ({
            ...prev,
            [state.id]: selectedColor,
          }))
        }
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
    US_STATES.forEach((state) => {
      const path = new Path2D(state.path)
      if (ctx.isPointInPath(path, x, y)) {
        foundState = state.id
      }
    })

    setHoveredState(foundState)
    canvas.style.cursor = foundState ? "pointer" : "default"
  }

  const addToLegend = () => {
    const colorName = prompt("Enter a name for this color:")
    if (colorName) {
      setLegend((prev) => [...prev, { color: selectedColor, name: colorName }])
    }
  }

  const clearMap = () => {
    setStateColors({})
    setLegend([])
  }

  const downloadMap = () => {
    const canvas = canvasRef.current
    const link = document.createElement("a")
    link.download = `map-${selectedMap}-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="editor-bg">
      {/* Header */}
      <header className="editor-header">
        <div className="editor-header-container">
          <div className="editor-header-flex">
            <div className="editor-header-left">
              <Link href="/" className="editor-logo-link">
                <Home className="editor-logo-icon" />
                <span className="editor-logo-text">MapChart</span>
              </Link>
              <div className="editor-header-divider"></div>
              <h1 className="editor-header-title">Map Editor</h1>
            </div>
            <div className="editor-header-actions">
              <button className="editor-action-btn" onClick={clearMap}>
                <RotateCcw className="editor-action-icon" />
                Clear
              </button>
              <button className="editor-action-btn">
                <Save className="editor-action-icon" />
                Save
              </button>
              <button className="editor-action-btn">
                <Share className="editor-action-icon" />
                Share
              </button>
              <button className="editor-download-btn" onClick={downloadMap}>
                <Download className="editor-action-icon" />
                Download
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="editor-content-container">
        <div className="editor-content-grid">
          {/* Sidebar */}
          <div className="editor-sidebar">
            {/* Map Selection */}
            <div className="editor-card">
              <div className="editor-card-title">Map Type</div>
              <div className="editor-card-content">
                <select
                  className="editor-select"
                  value={selectedMap}
                  onChange={(e) => setSelectedMap(e.target.value)}
                >
                  {Object.entries(MAP_TYPES).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Color Picker */}
            <div className="editor-card">
              <div className="editor-card-title">Colors</div>
              <div className="editor-card-content">
                <div className="editor-color-grid">
                  {DEFAULT_COLORS.map((color) => (
                    <button
                      key={color}
                      className={`editor-color-swatch${selectedColor === color ? " editor-color-swatch-selected" : ""}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
                <div className="editor-custom-color-wrap">
                  <label htmlFor="custom-color" className="editor-label">Custom Color</label>
                  <div className="editor-custom-color-inputs">
                    <input
                      id="custom-color"
                      type="color"
                      value={customColor}
                      onChange={(e) => {
                        setCustomColor(e.target.value)
                        setSelectedColor(e.target.value)
                      }}
                      className="editor-color-input"
                    />
                    <input
                      type="text"
                      value={customColor}
                      onChange={(e) => {
                        setCustomColor(e.target.value)
                        setSelectedColor(e.target.value)
                      }}
                      className="editor-text-input"
                      placeholder="#FF6B6B"
                    />
                  </div>
                </div>
                <button className="editor-legend-btn" onClick={addToLegend}>
                  <Palette className="editor-action-icon" />
                  Add to Legend
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="editor-card">
              <div className="editor-card-title">Legend</div>
              <div className="editor-card-content">
                {legend.length === 0 ? (
                  <p className="text-gray-500 text-sm">No legend items yet</p>
                ) : (
                  <div className="space-y-2">
                    {legend.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded border" style={{ backgroundColor: item.color }} />
                        <span className="text-sm">{item.name}</span>
                        <button
                          onClick={() => setLegend((prev) => prev.filter((_, i) => i !== index))}
                          className="text-red-500 hover:text-red-700 text-xs ml-auto"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="editor-card">
              <div className="editor-card-title">Instructions</div>
              <div className="editor-card-content">
                <div className="text-sm space-y-2">
                  <p>1. Select a color from the palette</p>
                  <p>2. Click on regions to color them</p>
                  <p>3. Add colors to legend for reference</p>
                  <p>4. Download your finished map</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Canvas */}
          <div className="editor-main-panel">
            <div className="editor-map-card">
              <div className="editor-map-card-title">
                {MAP_TYPES[selectedMap]}
                {hoveredState && (
                  <span className="editor-map-hovered-state">
                    Hovering: {US_STATES.find((s) => s.id === hoveredState)?.name}
                  </span>
                )}
              </div>
              <div className="editor-map-canvas-wrap">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={500}
                  className="editor-map-canvas"
                  onClick={handleCanvasClick}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseLeave={() => setHoveredState(null)}
                />
              </div>
              <div className="editor-map-desc">
                <p>Click on any region to color it with the selected color. Hover over regions to see their names.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .editor-bg { min-height: 100vh; background: #f8fafc; }
        .editor-header { background: #fff; border-bottom: 1px solid #e5e7eb; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }
        .editor-header-container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .editor-header-flex { display: flex; align-items: center; justify-content: space-between; height: 60px; }
        .editor-header-left { display: flex; align-items: center; gap: 1rem; }
        .editor-logo-link { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; }
        .editor-logo-icon { width: 24px; height: 24px; color: #f97316; }
        .editor-logo-text { font-weight: bold; font-size: 1.25rem; color: #22223b; }
        .editor-header-divider { height: 24px; width: 2px; background: #e5e7eb; margin: 0 1rem; }
        .editor-header-title { font-size: 1.1rem; font-weight: 600; color: #22223b; }
        .editor-header-actions { display: flex; align-items: center; gap: 0.5rem; }
        .editor-action-btn { display: flex; align-items: center; background: #fff; color: #22223b; border: 1px solid #e5e7eb; border-radius: 4px; padding: 0.4rem 1rem; font-size: 1rem; cursor: pointer; transition: background 0.2s, color 0.2s; gap: 0.5rem; }
        .editor-action-btn:hover { background: #f1f5f9; color: #f97316; }
        .editor-download-btn { display: flex; align-items: center; background: #f97316; color: #fff; border: none; border-radius: 4px; padding: 0.4rem 1rem; font-size: 1rem; cursor: pointer; transition: background 0.2s; gap: 0.5rem; }
        .editor-download-btn:hover { background: #ea580c; }
        .editor-action-icon { width: 18px; height: 18px; }
        .editor-content-container { max-width: 1200px; margin: 0 auto; padding: 2rem 1rem; }
        .editor-content-grid { display: grid; grid-template-columns: 1fr 3fr; gap: 1.5rem; }
        @media (max-width: 1024px) { .editor-content-grid { grid-template-columns: 1fr; } }
        .editor-sidebar { display: flex; flex-direction: column; gap: 1.5rem; }
        .editor-card { background: #fff; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); padding: 1rem; }
        .editor-card-title { font-weight: 600; margin-bottom: 0.75rem; font-size: 1.1rem; }
        .editor-card-content { display: flex; flex-direction: column; gap: 1rem; }
        .editor-select { width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px; font-size: 1rem; }
        .editor-color-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.5rem; }
        .editor-color-swatch { width: 32px; height: 32px; border-radius: 50%; border: 2px solid #d1d5db; cursor: pointer; transition: border 0.2s; }
        .editor-color-swatch-selected { border: 2px solid #22223b; }
        .editor-custom-color-wrap { margin-top: 1rem; }
        .editor-label { font-size: 0.95rem; font-weight: 500; color: #22223b; margin-bottom: 0.25rem; display: block; }
        .editor-custom-color-inputs { display: flex; gap: 0.5rem; }
        .editor-color-input { width: 48px; height: 40px; border: 1px solid #d1d5db; border-radius: 4px; padding: 0.25rem; }
        .editor-text-input { flex: 1; border: 1px solid #d1d5db; border-radius: 4px; padding: 0.25rem 0.5rem; font-size: 1rem; }
        .editor-legend-btn { width: 100%; display: flex; align-items: center; justify-content: center; background: #fff; color: #22223b; border: 1px solid #e5e7eb; border-radius: 4px; padding: 0.5rem 0; font-size: 1rem; cursor: pointer; transition: background 0.2s, color 0.2s; gap: 0.5rem; margin-top: 1rem; }
        .editor-legend-btn:hover { background: #f1f5f9; color: #f97316; }
        .editor-main-panel { display: flex; flex-direction: column; }
        .editor-map-card { background: #fff; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); padding: 1rem; }
        .editor-map-card-title { font-weight: 600; margin-bottom: 0.75rem; font-size: 1.1rem; display: flex; align-items: center; justify-content: space-between; }
        .editor-map-hovered-state { font-size: 0.95rem; font-weight: 400; color: #64748b; margin-left: 1rem; }
        .editor-map-canvas-wrap { background: #fff; border-radius: 8px; overflow: hidden; margin-bottom: 1rem; }
        .editor-map-canvas { width: 100%; height: auto; border: 1px solid #d1d5db; border-radius: 6px; cursor: crosshair; display: block; }
        .editor-map-desc { margin-top: 1rem; font-size: 0.95rem; color: #64748b; }
      `}</style>
    </div>
  )
}
