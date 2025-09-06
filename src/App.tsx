import { useState } from 'react'
import './App.css'
import appLogo from './assets/App Logo.png'
import homeBgImage from './assets/Web UI Inspo/home-bg-image.jpeg'
import { ArrowDownTrayIcon, PlayIcon } from '@heroicons/react/24/solid'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <div className="min-h-screen relative" style={{backgroundImage: `url(${homeBgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30"></div>
      
      <header className="bg-orange-500/90 backdrop-blur-md relative z-10 py-4">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 text-xl font-bold text-white">
              <img src={appLogo} alt="Animal Tales Logo" className="w-10 h-10 rounded-lg" />
              Animal Tales
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8">
              <a href="#" className="text-white font-medium hover:text-white/90 transition-all duration-200 border-b-2 border-white">Home</a>
              <a href="#" className="text-white/90 font-medium hover:text-white hover:border-white transition-all duration-200 border-b-2 border-transparent">Order Book</a>
              <a href="#" className="text-white/90 font-medium hover:text-white hover:border-white transition-all duration-200 border-b-2 border-transparent">About Us</a>
              <a href="#" className="text-white/90 font-medium hover:text-white hover:border-white transition-all duration-200 border-b-2 border-transparent">Download</a>
              <a href="#" className="text-white/90 font-medium hover:text-white hover:border-white transition-all duration-200 border-b-2 border-transparent">Contact Us</a>
            </nav>
            
            {/* Burger Menu Button */}
            <button
              className="md:hidden flex flex-col gap-1 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
          
          {/* Mobile Navigation */}
          <nav className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
            <div className="flex flex-col gap-4 py-4 border-t border-white/20">
              <a href="#" className="text-white font-medium hover:text-white/90 transition-colors duration-200 py-1 border-l-2 border-white pl-3">Home</a>
              <a href="#" className="text-white/90 font-medium hover:text-white transition-colors duration-200 py-1 hover:border-white hover:pl-3 hover:border-l-2">Order Book</a>
              <a href="#" className="text-white/90 font-medium hover:text-white transition-colors duration-200 py-1 hover:border-white hover:pl-3 hover:border-l-2">About Us</a>
              <a href="#" className="text-white/90 font-medium hover:text-white transition-colors duration-200 py-1 hover:border-white hover:pl-3 hover:border-l-2">Download</a>
              <a href="#" className="text-white/90 font-medium hover:text-white transition-colors duration-200 py-1 hover:border-white hover:pl-3 hover:border-l-2">Contact Us</a>
            </div>
          </nav>
        </div>
      </header>
      
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] relative z-5 text-center px-8">
        <div className="max-w-4xl text-white">
          <h1 className="text-5xl md:text-7xl font-normal mb-2 text-white drop-shadow-md" style={{fontFamily: 'Dancing Script, Brush Script MT, Lucida Handwriting, cursive'}}>
            Animal Tales
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white drop-shadow-sm">
            E-Learning App
          </h2>
          <p className="text-lg md:text-xl leading-relaxed mb-10 opacity-95 drop-shadow-sm max-w-2xl mx-auto">
            Join Elli on a magical wilderness adventures and discover the amazing world of 
            animals through interactive stories and fun learning experiences!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/40 hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/60 transition-all duration-300">
              <ArrowDownTrayIcon className="w-5 h-5" />
              Download Now
            </button>
            <button className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-full bg-transparent text-white border-2 border-white hover:bg-white hover:text-orange-500 hover:-translate-y-0.5 transition-all duration-300">
              <PlayIcon className="w-5 h-5" />
              Watch Trailer
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
