import Link from "next/link"
import { Globe, Palette, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-800">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="w-8 h-8 text-orange-500" />
              <span className="text-white text-xl font-bold">MapChart</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/world" className="text-white hover:text-orange-500 transition-colors">
                World
              </Link>
              <Link href="/europe" className="text-white hover:text-orange-500 transition-colors">
                Europe
              </Link>
              <Link href="/asia" className="text-white hover:text-orange-500 transition-colors">
                Asia
              </Link>
              <Link href="/americas" className="text-white hover:text-orange-500 transition-colors">
                The Americas
              </Link>
              <Link href="/africa" className="text-white hover:text-orange-500 transition-colors">
                Africa
              </Link>
              <Link href="/usa" className="text-white hover:text-orange-500 transition-colors">
                United States
              </Link>
              <Link href="/more" className="text-white hover:text-orange-500 transition-colors">
                More maps...
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/account" className="text-white hover:text-orange-500 transition-colors">
                Account
              </Link>
              <Link href="/contact" className="text-white hover:text-orange-500 transition-colors">
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">Create your own</h1>
              <h1 className="text-5xl lg:text-6xl font-bold text-orange-500 mb-8">custom map</h1>
            </div>

            <ul className="space-y-4 text-white text-lg">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
                <span>Make a map of the World, Europe, United States, and more</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
                <span>Color code countries or states on the map</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
                <span>Add a legend and download as an image file</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
                <span>Use the map in your project or share it with your friends</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
                <span>Free and easy to use</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
                <span>Plus version for advanced features</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Link href="/editor">Start Creating</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-slate-800 bg-transparent"
              >
                <Link href="/gallery">View Examples</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-slate-700 rounded-lg p-4 shadow-2xl">
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="bg-slate-800 p-2 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white text-sm ml-4">MapChart Editor</span>
                </div>
                <div className="p-4">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Map Editor Preview"
                    className="w-full h-auto rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-700 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Color an editable map</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-slate-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Multiple Map Types</h3>
              <p className="text-slate-300">
                Choose from World, Europe, Asia, Americas, Africa, and more detailed regional maps.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-slate-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Custom Colors</h3>
              <p className="text-slate-300">
                Use our color picker or enter custom hex codes to create your perfect color scheme.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-slate-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Export & Share</h3>
              <p className="text-slate-300">
                Download your maps as high-quality images or share them directly with others.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-300 text-lg mb-8">Choose from a variety of map types, including:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "World Map",
                "Europe",
                "North America",
                "South America",
                "Asia",
                "Africa",
                "Oceania",
                "United States",
              ].map((mapType) => (
                <span key={mapType} className="bg-slate-600 text-white px-4 py-2 rounded-full text-sm">
                  {mapType}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to create your map?</h2>
          <p className="text-slate-300 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who create beautiful, custom maps for presentations, education, and projects.
          </p>
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3">
            <Link href="/editor">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Globe className="w-6 h-6 text-orange-500" />
              <span className="text-white font-bold">MapChart</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/support" className="text-slate-400 hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700 text-center">
            <p className="text-slate-400">© 2024 MapChart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
