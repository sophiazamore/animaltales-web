import { useState } from 'react'
import './App.css'
import appLogo from './assets/App Logo.png'
import homeBgImage from './assets/Web UI Inspo/home-bg-image.png'
import bookImage from './assets/Book Selling 2.png'
import lyceImage from './assets/lyce.jpg'
import sophiaAndDocImage from './assets/sophia_and_doc.jpeg'
import appImage from './assets/app_image.png'
import { ArrowDownTrayIcon, PlayIcon, MinusIcon, PlusIcon, CheckIcon, XMarkIcon, BookOpenIcon, AcademicCapIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    shippingAddress: '',
    city: '',
    zipCode: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isContactSubmitting, setIsContactSubmitting] = useState(false)
  const [contactSubmitStatus, setContactSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const scrollToOrderBook = () => {
    const element = document.getElementById('order-book')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openVideoModal = () => {
    setIsVideoModalOpen(true)
  }

  const closeVideoModal = () => {
    setIsVideoModalOpen(false)
  }

  const scrollToAboutUs = () => {
    const element = document.getElementById('about-us')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToDownload = () => {
    const element = document.getElementById('download')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsContactSubmitting(true)
    setContactSubmitStatus('idle')

    try {
      const response = await fetch('https://formspree.io/f/mvgbdgql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactFormData.name,
          email: contactFormData.email,
          subject: contactFormData.subject,
          message: contactFormData.message,
          formType: 'contact'
        }),
      })

      if (response.ok) {
        setContactSubmitStatus('success')
        // Reset form
        setContactFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        setContactSubmitStatus('error')
      }
    } catch (error) {
      setContactSubmitStatus('error')
    } finally {
      setIsContactSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('https://formspree.io/f/mvgbdgql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          shippingAddress: formData.shippingAddress,
          city: formData.city,
          zipCode: formData.zipCode,
          quantity: quantity,
          totalPrice: `₱${(600 * quantity).toFixed(2)}`,
          message: `Order for ${quantity} copy(ies) of Animal Tales: Elli's Wilderness Explorer Adventures book. Total: ₱${(600 * quantity).toFixed(2)} + shipping fee.`
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          email: '',
          fullName: '',
          shippingAddress: '',
          city: '',
          zipCode: ''
        })
        setQuantity(1)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div>
      {/* Sticky Header */}
      <header className="bg-orange-500/90 backdrop-blur-md sticky top-0 z-50 py-4">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 text-xl font-bold text-white">
              <img src={appLogo} alt="Animal Tales Logo" className="w-10 h-10 rounded-lg" />
              <span style={{fontFamily: 'Dancing Script, Brush Script MT, Lucida Handwriting, cursive'}}>
                Animal Tales
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8">
              <button onClick={scrollToHome} className="text-white font-medium hover:text-white/90 transition-all duration-200 border-b-2 border-white">Home</button>
              <button onClick={scrollToOrderBook} className="text-white/90 font-medium hover:text-white hover:border-white transition-all duration-200 border-b-2 border-transparent">Order Book</button>
              <button onClick={scrollToAboutUs} className="text-white/90 font-medium hover:text-white hover:border-white transition-all duration-200 border-b-2 border-transparent">About Us</button>
              <button onClick={scrollToDownload} className="text-white/90 font-medium hover:text-white hover:border-white transition-all duration-200 border-b-2 border-transparent">Download</button>
              <button onClick={scrollToContact} className="text-white/90 font-medium hover:text-white hover:border-white transition-all duration-200 border-b-2 border-transparent">Contact Us</button>
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
              <button onClick={scrollToHome} className="text-white font-medium hover:text-white/90 transition-colors duration-200 py-1 border-l-2 border-white pl-3 text-left">Home</button>
              <button onClick={scrollToOrderBook} className="text-white/90 font-medium hover:text-white transition-colors duration-200 py-1 hover:border-white hover:pl-3 hover:border-l-2 text-left">Order Book</button>
              <button onClick={scrollToAboutUs} className="text-white/90 font-medium hover:text-white transition-colors duration-200 py-1 hover:border-white hover:pl-3 hover:border-l-2 text-left">About Us</button>
              <button onClick={scrollToDownload} className="text-white/90 font-medium hover:text-white transition-colors duration-200 py-1 hover:border-white hover:pl-3 hover:border-l-2 text-left">Download</button>
              <button onClick={scrollToContact} className="text-white/90 font-medium hover:text-white transition-colors duration-200 py-1 hover:border-white hover:pl-3 hover:border-l-2 text-left">Contact Us</button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section with Background */}
      <div className="min-h-screen relative" style={{backgroundImage: `url(${homeBgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30"></div>
        
        <main className="flex items-center justify-center min-h-screen relative z-5 text-center px-8">
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
            <button onClick={openVideoModal} className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-full bg-transparent text-white border-2 border-white hover:bg-white hover:text-orange-500 hover:-translate-y-0.5 transition-all duration-300">
              <PlayIcon className="w-5 h-5" />
              Watch Trailer
            </button>
          </div>
        </div>
      </main>
      </div>
      
      {/* Order Book Section */}
      <section id="order-book" className="min-h-screen bg-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-amber-800 mb-6">
              Order Your Adventure Book
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Get the physical storybook that brings Elli's adventures to life with beautiful illustrations
            </p>
          </div>
          
          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Side - Combined Book Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-fit">
              {/* Book Image */}
              <div className="p-6 pb-4">
                <img 
                  src={bookImage} 
                  alt="Animal Tales: Elli's Wilderness Explorer Adventures Book" 
                  className="w-full rounded-lg"
                />
              </div>
              
              {/* Book Details */}
              <div className="px-6 pb-6">
                <h3 className="text-xl font-bold text-amber-800 mb-3">
                  Animal Tales: Elli's Wilderness Explorer Adventures
                </h3>
                
                <p className="text-amber-700 mb-4 text-sm leading-relaxed">
                  Join Elli as she collects Animal Scout Merit Badges on her journey to earn 
                  the Wilderness Explorer Trophy.
                </p>
                
                {/* Features List */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-amber-700 text-sm">Explore lessons on animal kinds, sounds, mothers and babies</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-amber-700 text-sm">Learn about animal homes, coverings, food, and movements</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-amber-700 text-sm">Discover how animals help people through storytelling</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-amber-700 text-sm">Colorful illustrations make animal science exciting</span>
                  </div>
                </div>
                
                {/* Price */}
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-amber-800 mb-1">₱600.00</div>
                  <div className="text-xs text-amber-600">+ shipping fee</div>
                </div>
              </div>
            </div>
            
            {/* Order Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-amber-800 mb-4">Order Information</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">i</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-1">Important Note</h4>
                      <p className="text-sm text-blue-700">
                        Our team will contact you via email or phone to confirm your order details and arrange payment and shipping.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800 mb-1">Order Submitted Successfully!</h4>
                      <p className="text-sm text-green-700">
                        Thank you for your order. We'll contact you soon to confirm the details and arrange payment.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-1">Order Submission Failed</h4>
                      <p className="text-sm text-red-700">
                        There was an error submitting your order. Please try again.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-2">Email Address</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-2">Full Name</label>
                    <input 
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">Shipping Address</label>
                  <textarea
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    placeholder="Enter your complete address"
                    rows={3}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  ></textarea>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-2">City</label>
                    <input 
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-2">ZIP Code</label>
                    <input 
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="ZIP Code"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                {/* Quantity and Price */}
                <div className="flex items-center justify-between py-4 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-amber-800">Quantity:</label>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 bg-orange-100 hover:bg-orange-200 rounded-full flex items-center justify-center transition-colors"
                      >
                        <MinusIcon className="w-4 h-4 text-orange-600" />
                      </button>
                      <span className="w-12 text-center font-semibold">{quantity}</span>
                      <button 
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 bg-orange-100 hover:bg-orange-200 rounded-full flex items-center justify-center transition-colors"
                      >
                        <PlusIcon className="w-4 h-4 text-orange-600" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-amber-800">₱{(600 * quantity).toFixed(2)}</div>
                    <div className="text-sm text-stone-500">+ shipping fee</div>
                  </div>
                </div>
                
                {/* Place Order Button */}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg"
                >
                  {isSubmitting ? 'Submitting Order...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="min-h-screen bg-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-amber-800 mb-6">
              About Animal Tales
            </h2>
            <p className="text-xl text-orange-600 max-w-3xl mx-auto leading-relaxed">
              Discover the magical world of learning through Augmented Reality
            </p>
          </div>
          
          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Images */}
            <div className="space-y-6">
              <img 
                src={lyceImage} 
                alt="About Animal Tales" 
                className="w-full h-60 object-cover rounded-2xl shadow-lg"
              />
              <img 
                src={sophiaAndDocImage} 
                alt="About Animal Tales" 
                className="w-full h-60 object-cover rounded-2xl shadow-lg"
              />
            </div>
            
            {/* Right Side - Content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-amber-800 mb-6">Our Story</h3>
                
                <div className="space-y-4 text-amber-700 leading-relaxed mb-8">
                  <p>
                    We are two college students who began Animal Tales as part of our 
                    Capstone thesis. What started as an academic project quickly grew 
                    into something more personal. Inspired by our younger sisters' love 
                    for smartphones, we wanted to create an experience that was fun, 
                    engaging, and meaningful.
                  </p>
                  
                  <p>
                    With little kids in mind, we set out to blend play with learning through 
                    Augmented Reality. Focusing on the Animal Kingdom in science, we 
                    built an app that brings stories to life with 3D animated models and 
                    audio narration. Seeing our sisters enjoy and learn from it encouraged 
                    us to share Animal Tales with more children.
                  </p>
                </div>
              </div>
              
              {/* Feature Cards - Right Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <AcademicCapIcon className="w-5 h-5 text-green-600" />
                    </div>
                    
                    <h4 className="text-lg font-bold text-amber-800">Educational Content</h4>
                  </div>
                  <p className="text-sm text-amber-700">
                    Aligned with the DepEd Science curriculum on the Animal Kingdom
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <BookOpenIcon className="w-5 h-5 text-orange-600" />
                    </div>
                    <h4 className="text-lg font-bold text-amber-800">AR Experience</h4>
                  </div>
                  <p className="text-sm text-amber-700">
                    Interactive storytelling with 3D models and immersive AR experiences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="min-h-screen bg-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-amber-800 mb-6">
              Download Animal Tales
            </h2>
            <p className="text-xl text-orange-600 max-w-3xl mx-auto leading-relaxed">
              Start your wilderness adventure today! Choose from our available download options
            </p>
          </div>
          
          {/* Download Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Full Version Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-3xl font-bold text-amber-800 mb-6 text-center">Full Version</h3>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                    <span className="text-amber-700 text-sm">Augmented Reality Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                    <span className="text-amber-700 text-sm">View 3D Animated Scenes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                    <span className="text-amber-700 text-sm">Audio Playback of the Full Story</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                    <span className="text-amber-700 text-sm">Complete Lesson Plan Scenes</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = 'https://mygov-rds.s3.ap-southeast-1.amazonaws.com/AnimalTales-v0.1.apk'
                    link.download = 'AnimalTales-v0.1.apk'
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  Download APK
                </button>
              </div>
            </div>

            {/* Trial Version Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-3xl font-bold text-amber-800 mb-6 text-center">Trial Version</h3>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                    <span className="text-amber-700 text-sm">Augmented Reality Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                    <span className="text-amber-700 text-sm">View 1 Sample 3D Animated Scenes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XMarkIcon className="w-4 h-4 text-red-500" />
                    <span className="text-amber-700 text-sm">Audio Playback of the Full Story</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XMarkIcon className="w-4 h-4 text-red-500" />
                    <span className="text-amber-700 text-sm">Complete Lesson Plan Scenes</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = 'https://mygov-rds.s3.ap-southeast-1.amazonaws.com/AnimalTales-Demo-v0.2.apk'
                    link.download = 'AnimalTales-Demo-v0.2.apk'
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                  }}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  Download APK
                </button>
              </div>
            </div>

            {/* Trial Image Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-3xl font-bold text-amber-800 mb-6 text-center">Trial Image</h3>
                <div className="space-y-2 mb-6 flex-1">
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                    <span className="text-amber-700 text-sm">1 Sample Image for the Trial Version</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = '/Test Page.png'
                    link.download = 'Test Page.png'
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                  }}
                  className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 mt-auto"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  Download Image
                </button>
              </div>
            </div>
          </div>

          {/* Android Notice */}
          <div className="flex justify-center">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-lg inline-flex items-center">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-orange-700">
                  This app is only available for Android phones (Android 7.0 or higher)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="min-h-screen bg-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-amber-800 mb-6">
              Contact Us
            </h2>
            <p className="text-xl text-orange-600 max-w-3xl mx-auto leading-relaxed">
              Have questions about Animal Tales? We'd love to hear from you!
            </p>
          </div>
          
          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Contact Info */}
            <div className="space-y-8">
              {/* Hero Image with Overlay Text */}
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src={lyceImage} 
                  alt="We're Here to Help" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
                  <div className="text-white p-8">
                    <h3 className="text-2xl font-bold mb-2">We're Here to Help!</h3>
                    <p className="text-sm opacity-90">Our team is ready to assist you with any questions about Animal Tales.</p>
                  </div>
                </div>
              </div>

              {/* Contact Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Email Support Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <EnvelopeIcon className="w-5 h-5 text-orange-600" />
                    </div>
                    <h4 className="text-lg font-bold text-amber-800">Email Support</h4>
                  </div>
                  <p className="text-sm text-amber-700 mb-3">Get help via email</p>
                  <a href="mailto:animtalescorp@gmail.com" className="text-orange-600 font-semibold text-sm hover:text-orange-700 transition-colors">
                    animtalescorp@gmail.com
                  </a>
                </div>

                {/* Phone Support Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <PhoneIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="text-lg font-bold text-amber-800">Phone Support</h4>
                  </div>
                  <p className="text-sm text-amber-700 mb-3">Call us for more complex questions</p>
                  <a href="tel:09062329689" className="text-orange-600 font-semibold text-sm hover:text-orange-700 transition-colors">
                    0906-232-9689
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h4 className="text-lg font-bold text-amber-800 mb-4">Office Hours</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-orange-600 font-medium">Monday - Friday:</span>
                    <span className="text-amber-700">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-600 font-medium">Saturday:</span>
                    <span className="text-amber-700">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-600 font-medium">Sunday:</span>
                    <span className="text-amber-700">Closed</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-amber-800 mb-6">Send us a Message</h3>
              
              {/* Success Message */}
              {contactSubmitStatus === 'success' && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800 mb-1">Message Sent Successfully!</h4>
                      <p className="text-sm text-green-700">
                        Thank you for contacting us. We'll get back to you soon.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Error Message */}
              {contactSubmitStatus === 'error' && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-1">Message Failed to Send</h4>
                      <p className="text-sm text-red-700">
                        There was an error sending your message. Please try again.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleContactSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-orange-600 mb-2">Your Name</label>
                    <input 
                      type="text"
                      name="name"
                      value={contactFormData.name}
                      onChange={handleContactInputChange}
                      placeholder="Enter your name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-orange-600 mb-2">Email Address</label>
                    <input 
                      type="email"
                      name="email"
                      value={contactFormData.email}
                      onChange={handleContactInputChange}
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-orange-600 mb-2">Subject</label>
                  <input 
                    type="text"
                    name="subject"
                    value={contactFormData.subject}
                    onChange={handleContactInputChange}
                    placeholder="What's this about?"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-orange-600 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={contactFormData.message}
                    onChange={handleContactInputChange}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  ></textarea>
                  <div className="text-right mt-2">
                    <span className="text-sm text-gray-500">{contactFormData.message.length}/500 characters</span>
                  </div>
                </div>
                
                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={isContactSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg"
                >
                  {isContactSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black rounded-2xl shadow-2xl w-full max-w-4xl relative">
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute -top-4 -right-4 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-colors z-10"
            >
              <XMarkIcon className="w-6 h-6 text-gray-600" />
            </button>
            
            {/* YouTube Video */}
            <div className="aspect-video rounded-2xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/68rIQsp5KBY?autoplay=1&rel=0&modestbranding=1"
                title="Animal Tales Trailer"
                style={{ border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
