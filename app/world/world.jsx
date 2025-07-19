import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Download, Home } from "lucide-react"

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
  const [svgContent, setSvgContent] = useState(null)
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLORS[0])
  const [countryColors, setCountryColors] = useState({})
  const [hoveredCountry, setHoveredCountry] = useState(null)
  const [tooltip, setTooltip] = useState({ visible: false, name: '', x: 0, y: 0 })
  const svgContainerRef = useRef(null)

  // Fetch and parse SVG
  useEffect(() => {
    fetch("/world.svg")
      .then(res => res.text())
      .then(svg => {
        // Remove XML declaration for React
        const cleaned = svg.replace(/<\?xml.*?\?>/, "")
        setSvgContent(cleaned)
      })
  }, [])

  // Helper: parse SVG string to DOM
  function parseSVG(svgString) {
    const parser = new DOMParser()
    return parser.parseFromString(svgString, "image/svg+xml").documentElement
  }

  // Helper: recursively convert SVG DOM to React elements
  function svgNodeToJSX(node) {
    if (!node) return null
    if (node.nodeType === 3) return node.textContent // text node
    const props = {}
    for (let attr of node.attributes || []) {
      if (attr.name === "class") props.className = attr.value
      else if (attr.name === "style") props.style = attr.value
      else props[attr.name] = attr.value
    }
    // Add interactivity to country paths
    if (node.tagName === "path" && node.classList.contains("land")) {
      const id = node.getAttribute("id")
      const title = node.getAttribute("title")
      props.onMouseEnter = (e) => {
        setHoveredCountry(id)
        setTooltip({
          visible: true,
          name: title,
          x: e.clientX,
          y: e.clientY,
        })
      }
      props.onMouseLeave = () => {
        setHoveredCountry(null)
        setTooltip({ visible: false, name: '', x: 0, y: 0 })
      }
      props.onClick = () => {
        setCountryColors(prev => ({ ...prev, [id]: selectedColor }))
      }
      props.style = {
        ...(props.style || {}),
        cursor: "pointer",
        transition: "fill 0.2s, stroke 0.2s",
        fill: countryColors[id] || node.getAttribute("fill") || "#CCCCCC",
        stroke: hoveredCountry === id ? "#f97316" : node.getAttribute("stroke") || "white",
        strokeWidth: node.getAttribute("stroke-width") || 0.5,
        opacity: hoveredCountry === id ? 0.85 : 1,
      }
    }
    return (
      <node.tagName key={node.getAttribute?.("id") || Math.random()} {...props}>
        {Array.from(node.childNodes || []).map((child, i) => svgNodeToJSX(child))}
      </node.tagName>
    )
  }

  // Download the colored SVG
  const downloadMap = () => {
    if (!svgContent) return
    // Create a new SVG string with updated fills
    const parser = new DOMParser()
    const svgDoc = parser.parseFromString(svgContent, "image/svg+xml")
    Object.entries(countryColors).forEach(([id, color]) => {
      const el = svgDoc.getElementById(id)
      if (el) el.setAttribute("fill", color)
    })
    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svgDoc)
    const blob = new Blob([svgString], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = `world-map-${Date.now()}.svg`
    link.href = url
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  // Render
  return (
    <div className="main-background">
      <header className="header-bar">
        <div className="header-container">
          <div className="header-flex">
            <Link href="/" className="logo-link">
              <Home className="logo-icon" />
              <span className="logo-text">MapChart</span>
            </Link>
            <button className="download-button" onClick={downloadMap}>
              <Download className="download-icon" />
              Download
            </button>
          </div>
        </div>
      </header>

      <div className="content-container">
        <div className="content-grid">
          <div className="color-panel">
            <div className="color-card">
              <div className="color-card-title">Colors</div>
              <div className="color-grid">
                {DEFAULT_COLORS.map((color) => (
                  <button
                    key={color}
                    className={`color-swatch${selectedColor === color ? " color-swatch-selected" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="map-panel">
            <div className="map-card">
              <div className="map-card-title">World Map</div>
              <div
                className="map-canvas"
                ref={svgContainerRef}
                style={{ position: "relative", width: "100%", height: "800px" }}
              >
                {svgContent && svgNodeToJSX(parseSVG(svgContent))}
                {tooltip.visible && (
                  <div
                    className="map-tooltip"
                    style={{
                      position: "fixed",
                      left: tooltip.x + 12,
                      top: tooltip.y + 12,
                      background: "#fff",
                      color: "#22223b",
                      border: "1px solid #d1d5db",
                      borderRadius: 6,
                      padding: "6px 12px",
                      fontSize: 14,
                      pointerEvents: "none",
                      zIndex: 1000,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    }}
                  >
                    {tooltip.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .main-background {
          min-height: 100vh;
          background: #f8fafc;
        }
        .header-bar {
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          box-shadow: 0 1px 2px rgba(0,0,0,0.03);
        }
        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .header-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
        }
        .logo-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }
        .logo-icon {
          width: 24px;
          height: 24px;
          color: #f97316;
        }
        .logo-text {
          font-weight: bold;
          font-size: 1.25rem;
          color: #22223b;
        }
        .download-button {
          display: flex;
          align-items: center;
          background: #f97316;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s;
          gap: 0.5rem;
        }
        .download-button:hover {
          background: #ea580c;
        }
        .download-icon {
          width: 18px;
          height: 18px;
        }
        .content-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 3fr;
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
        }
        .color-panel {
          display: flex;
          flex-direction: column;
        }
        .color-card {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
          padding: 1rem;
        }
        .color-card-title {
          font-weight: 600;
          margin-bottom: 0.75rem;
          font-size: 1.1rem;
        }
        .color-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.5rem;
        }
        .color-swatch {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #d1d5db;
          cursor: pointer;
          transition: border 0.2s;
        }
        .color-swatch-selected {
          border: 2px solid #22223b;
        }
        .map-panel {
          display: flex;
          flex-direction: column;
        }
        .map-card {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
          padding: 1rem;
        }
        .map-card-title {
          font-weight: 600;
          margin-bottom: 0.75rem;
          font-size: 1.1rem;
        }
        .map-canvas {
          width: 100%;
          height: 800px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          display: block;
          background: #bfdbfe;
          position: relative;
        }
        .map-tooltip {
          pointer-events: none;
        }
      `}</style>
    </div>
  )
} 