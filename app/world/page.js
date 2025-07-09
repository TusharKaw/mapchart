"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Home } from "lucide-react"
import Link from "next/link"

const WORLD_COUNTRIES = [
  { id: "US", name: "United States", path: "M 100 150 L 200 150 L 200 200 L 100 200 Z" },
  { id: "CA", name: "Canada", path: "M 100 100 L 200 100 L 200 150 L 100 150 Z" },
  { id: "MX", name: "Mexico", path: "M 100 200 L 180 200 L 180 250 L 100 250 Z" },
  { id: "BR", name: "Brazil", path: "M 150 300 L 250 300 L 250 400 L 150 400 Z" },
  { id: "RU", name: "Russia", path: "M 300 80 L 500 80 L 500 180 L 300 180 Z" },
  { id: "CN", name: "China", path: "M 400 150 L 500 150 L 500 220 L 400 220 Z" },
  { id: "IN", name: "India", path: "M 380 220 L 450 220 L 450 280 L 380 280 Z" },
  { id: "AU", name: "Australia", path: "M 450 350 L 550 350 L 550 420 L 450 420 Z" },
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

export default function WorldMap() {
  const canvasRef = useRef(null)
  const [selectedColor, setSelectedColor] = useState("#FF6B6B")
  const [countryColors, setCountryColors] = useState({})
  const [hoveredCountry, setHoveredCountry] = useState(null)

  useEffect(() => {
    drawMap()
  }, [countryColors, hoveredCountry])

  const drawMap = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw ocean background
    ctx.fillStyle = "#bfdbfe"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw countries
    WORLD_COUNTRIES.forEach((country) => {
      const path = new Path2D(country.path)

      // Fill country
      ctx.fillStyle = countryColors[country.id] || "#e5e7eb"
      ctx.fill(path)

      // Stroke country
      ctx.strokeStyle = hoveredCountry === country.id ? "#1e40af" : "#6b7280"
      ctx.lineWidth = hoveredCountry === country.id ? 2 : 1
      ctx.stroke(path)

      // Add country label
      ctx.fillStyle = "#1f2937"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      const bounds = { x: 200, y: 150, width: 100, height: 50 } // Simplified bounds
      ctx.fillText(country.id, bounds.x, bounds.y)
    })
  }

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const ctx = canvas.getContext("2d")

    // Check which country was clicked
    WORLD_COUNTRIES.forEach((country) => {
      const path = new Path2D(country.path)
      if (ctx.isPointInPath(path, x, y)) {
        setCountryColors((prev) => ({
          ...prev,
          [country.id]: selectedColor,
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
    let foundCountry = null

    // Check which country is being hovered
    WORLD_COUNTRIES.forEach((country) => {
      const path = new Path2D(country.path)
      if (ctx.isPointInPath(path, x, y)) {
        foundCountry = country.id
      }
    })

    setHoveredCountry(foundCountry)
    canvas.style.cursor = foundCountry ? "pointer" : "default"
  }

  const downloadMap = () => {
    const canvas = canvasRef.current
    const link = document.createElement("a")
    link.download = `world-map-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="w-6 h-6 text-orange-500" />
              <span className="font-bold text-xl">MapChart</span>
            </Link>
            <Button size="sm" onClick={downloadMap} className="bg-orange-500 hover:bg-orange-600">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Colors</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>World Map</CardTitle>
              </CardHeader>
              <CardContent>
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={400}
                  className="w-full h-auto border rounded cursor-pointer"
                  onClick={handleCanvasClick}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseLeave={() => setHoveredCountry(null)}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
