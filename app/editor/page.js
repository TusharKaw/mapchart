"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Home className="w-6 h-6 text-orange-500" />
                <span className="font-bold text-xl">MapChart</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-lg font-semibold">Map Editor</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={clearMap}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear
              </Button>
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button size="sm" onClick={downloadMap} className="bg-orange-500 hover:bg-orange-600">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Map Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Map Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedMap} onValueChange={setSelectedMap}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(MAP_TYPES).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Color Picker */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-5 gap-2">
                  {DEFAULT_COLORS.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded border-2 ${
                        selectedColor === color ? "border-gray-800" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="custom-color">Custom Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="custom-color"
                      type="color"
                      value={customColor}
                      onChange={(e) => {
                        setCustomColor(e.target.value)
                        setSelectedColor(e.target.value)
                      }}
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={customColor}
                      onChange={(e) => {
                        setCustomColor(e.target.value)
                        setSelectedColor(e.target.value)
                      }}
                      className="flex-1"
                      placeholder="#FF6B6B"
                    />
                  </div>
                </div>
                <Button onClick={addToLegend} variant="outline" className="w-full bg-transparent">
                  <Palette className="w-4 h-4 mr-2" />
                  Add to Legend
                </Button>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Legend</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-2">
                  <p>1. Select a color from the palette</p>
                  <p>2. Click on regions to color them</p>
                  <p>3. Add colors to legend for reference</p>
                  <p>4. Download your finished map</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Canvas */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  {MAP_TYPES[selectedMap]}
                  {hoveredState && (
                    <span className="text-sm font-normal text-gray-600">
                      Hovering: {US_STATES.find((s) => s.id === hoveredState)?.name}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden bg-white">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={500}
                    className="w-full h-auto cursor-crosshair"
                    onClick={handleCanvasClick}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseLeave={() => setHoveredState(null)}
                  />
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Click on any region to color it with the selected color. Hover over regions to see their names.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
