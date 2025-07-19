"use client"
import dynamic from "next/dynamic"

const WorldMap = dynamic(() => import("./world.jsx"), { ssr: false })

export default function WorldMapClient() {
  return <WorldMap />
} 