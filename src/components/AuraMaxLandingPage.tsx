import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Plus,
  Minus,
  Check,
  ChevronRight,
  Headphones,
  Volume2,
  BatteryCharging,
  Sliders,
  ShieldCheck,
  Radio,
  Star,
  Send,
  ArrowRight,
  Menu,
  X,
  Disc,
  ArrowUpRight,
  Maximize2
} from 'lucide-react';

interface AuraMaxLandingPageProps {
  onSwitchToDashboard?: () => void;
}

export const AuraMaxLandingPage: React.FC<AuraMaxLandingPageProps> = ({ onSwitchToDashboard }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<'graphite' | 'mint' | 'white' | 'blue'>('graphite');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Color Swatches Configuration
  const colorSwatches = [
    {
      id: 'graphite' as const,
      name: 'Graphite Black',
      hex: '#18181b',
      img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      glow: 'rgba(24, 24, 27, 0.4)'
    },
    {
      id: 'mint' as const,
      name: 'Mint Edition',
      hex: '#2dd4bf',
      img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80',
      glow: 'rgba(45, 212, 191, 0.3)'
    },
    {
      id: 'white' as const,
      name: 'Cyber White',
      hex: '#f4f4f5',
      img: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80',
      glow: 'rgba(244, 244, 245, 0.25)'
    },
    {
      id: 'blue' as const,
      name: 'Midnight Blue',
      hex: '#1e3a8a',
      img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80',
      glow: 'rgba(30, 58, 138, 0.35)'
    }
  ];

  const currentColor = colorSwatches.find((c) => c.id === selectedColor) || colorSwatches[0];

  // Tech Specs Data
  const techSpecs = [
    { label: 'Driver Unit', value: '40mm Custom Titanium Composite Acoustic Drivers' },
    { label: 'Active Noise Cancellation', value: 'Hybrid ANC up to -45dB with Smart Transparency Mode' },
    { label: 'Battery & Charging', value: '40 Hours Playback (ANC On) / 10 Min Charge = 5 Hours' },
    { label: 'Wireless Connectivity', value: 'Bluetooth 5.4, Multipoint Dual-Device, LC3 / LDAC' },
    { label: 'Microphones', value: 'Dual Beamforming Mics with AI ENC Wind Suppression' },
    { label: 'Weight & Materials', value: '260g Premium Anodized Aluminum & Memory Foam Cushions' },
    { label: 'Frequency Response', value: '10 Hz – 45,000 Hz (Hi-Res Audio Wireless Certified)' }
  ];

  // Testimonials Data
  const testimonials = [
    {
      quote: "The spatial staging and noise cancellation rival monitors three times the price. AuraMax completely redefined my studio focus sessions.",
      name: 'Marcus Vance',
      handle: '@marcus_vance_audio',
      role: 'Grammy-Nominated Producer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    {
      quote: "Minimalist craftsmanship meets breathtaking clarity. The 40-hour battery life keeps me in flow state all week without charging.",
      name: 'Elena Rostova',
      handle: '@elena_design',
      role: 'Lead Product Designer',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80'
    },
    {
      quote: "The mint accent detailing is pure art. But more importantly, the low-latency Bluetooth 5.4 makes it flawless for live spatial audio.",
      name: 'Devon Wright',
      handle: '@devon_creates',
      role: 'Creative Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    }
  ];

  // FAQ Data
  const faqs = [
    {
      q: 'When will Pre-Order units ship?',
      a: 'Pre-order units are scheduled to ship within 2 to 3 weeks. You will receive real-time tracking updates as soon as your unit leaves our precision assembly facility.'
    },
    {
      q: 'Does AuraMax support dual-device multipoint pairing?',
      a: 'Yes! AuraMax seamlessly connects to both your laptop and smartphone simultaneously, automatically switching audio feeds when a call arrives.'
    },
    {
      q: 'What is included in the box?',
      a: 'Every AuraMax package includes the flagship headphones, a magnetic hardshell travel case, a braided USB-C fast-charging cable, a 3.5mm Hi-Fi auxiliary cable, and a 2-year warranty card.'
    },
    {
      q: 'Can I use AuraMax wired without battery power?',
      a: 'Yes. Connecting via the included 3.5mm audio cable allows passive high-fidelity listening even if the battery is completely depleted.'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#ffffff] font-sans antialiased selection:bg-[#2dd4bf] selection:text-[#050505] overflow-x-hidden">
      {/* 1. Sticky Nav Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 transition-all">
        <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center group-hover:border-[#2dd4bf] transition-colors">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2dd4bf] shadow-[0_0_10px_#2dd4bf]" />
            </div>
            <span className="text-xl font-black tracking-tight text-white uppercase">
              Aura<span className="text-[#2dd4bf]">Max</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#colors" className="hover:text-white transition-colors">Colors</a>
            <a href="#specs" className="hover:text-white transition-colors">Specs</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {onSwitchToDashboard && (
              <button
                onClick={onSwitchToDashboard}
                className="px-4 py-2 rounded-full bg-[#18181b] hover:bg-[#27272a] border border-white/10 text-xs font-bold text-gray-300 transition-all flex items-center gap-1.5"
              >
                <Disc className="w-3.5 h-3.5 text-[#2dd4bf]" /> Smart Campus OS
              </button>
            )}

            <a
              href="#pricing"
              className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-extrabold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Pre-Order $349
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a0a0a] border-b border-white/10 px-6 py-6 space-y-4"
            >
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-white">Features</a>
              <a href="#colors" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-white">Colors</a>
              <a href="#specs" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-white">Specs</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-white">Reviews</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-white">FAQ</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-white">Pricing</a>

              {onSwitchToDashboard && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSwitchToDashboard();
                  }}
                  className="w-full py-3 rounded-full bg-[#18181b] border border-white/10 text-xs font-bold text-gray-300 flex items-center justify-center gap-2"
                >
                  <Disc className="w-4 h-4 text-[#2dd4bf]" /> Switch to CampusOS Dashboard
                </button>
              )}

              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-3 rounded-full bg-white text-black font-extrabold text-sm"
              >
                Pre-Order $349
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. Hero Section */}
      <section id="hero" className="relative pt-36 pb-24 md:pt-48 md:pb-36 max-w-[1280px] mx-auto px-6 overflow-hidden">
        {/* Soft Radial Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#2dd4bf]/15 via-indigo-500/10 to-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0a0a] border border-white/10 text-[11px] font-mono tracking-widest text-[#2dd4bf] uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Flagship Wireless ANC Acoustics
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-white">
              Sound Transcended.<br />
              Silence Perfected.
            </h1>

            <p className="text-lg md:text-xl text-[#9ca3af] max-w-xl leading-relaxed">
              Designed with custom titanium drivers and active spatial head-tracking. Experience absolute studio transparency anywhere.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#pricing"
                className="px-8 py-4 rounded-full bg-white text-black font-black text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.25)]"
              >
                Pre-Order Now <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#colors"
                className="px-8 py-4 rounded-full bg-[#0a0a0a] border border-white/10 hover:border-white/30 text-white font-bold text-sm transition-all flex items-center gap-2"
              >
                Explore Colors
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 text-left">
              <div>
                <p className="text-2xl font-black text-white">-45dB</p>
                <p className="text-xs text-[#9ca3af] mt-0.5">Hybrid Active ANC</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">40 Hrs</p>
                <p className="text-xs text-[#9ca3af] mt-0.5">Continuous Playback</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">260g</p>
                <p className="text-xs text-[#9ca3af] mt-0.5">Featherweight Comfort</p>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-[32px] bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
                alt="AuraMax Headphone Showcase"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Scrim & Status Badge Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent p-8 flex flex-col justify-end">
                <span className="self-start px-3 py-1 rounded-full bg-[#2dd4bf] text-black text-[10px] font-black uppercase tracking-wider mb-2">
                  48kHz Hi-Res Certified
                </span>
                <p className="text-xl font-black text-white">AuraMax One — Graphite Black</p>
                <p className="text-xs text-[#9ca3af] mt-1">Anodized aluminum earcups with memory foam isolators</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Features Intro */}
      <section id="features" className="py-24 max-w-[1280px] mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-[#2dd4bf] uppercase">
            FEATURES
          </span>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Engineered for Pure Acoustic Mastery
          </h2>

          <p className="text-lg text-[#9ca3af] leading-relaxed">
            Every curve and component is optimized to deliver{' '}
            <span className="text-[#2dd4bf] font-medium">unmatched spatial clarity</span>,{' '}
            <span className="text-[#2dd4bf] font-medium">45dB active noise cancellation</span>, and{' '}
            <span className="text-[#2dd4bf] font-medium">lossless studio fidelity</span>.
          </p>
        </div>
      </section>

      {/* 4. Features Bento Grid */}
      <section className="pb-24 max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Card 1 (2/3 width) */}
          <div className="md:col-span-8 relative aspect-[16/10] md:aspect-auto md:h-[420px] rounded-[32px] bg-[#0a0a0a] border border-white/10 overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80"
              alt="Active Noise Cancellation"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent p-8 flex flex-col justify-end">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050505]/80 border border-white/10 text-[#2dd4bf] text-[10px] font-mono font-bold uppercase w-max mb-3">
                <Radio className="w-3 h-3 animate-pulse text-[#2dd4bf]" /> ACTIVE -45dB
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">Adaptive Active Noise Cancellation</h3>
              <p className="text-sm text-[#9ca3af] mt-1 max-w-lg">
                Six exterior beamforming microphones sample ambient noise 48,000 times per second, generating an inverted wave that erases distractions instantly.
              </p>
            </div>
          </div>

          {/* Bento Card 2 (1/3 width) */}
          <div className="md:col-span-4 relative aspect-square md:aspect-auto md:h-[420px] rounded-[32px] bg-[#0a0a0a] border border-white/10 overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
              alt="Battery Life"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent p-8 flex flex-col justify-end">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050505]/80 border border-white/10 text-[#2dd4bf] text-[10px] font-mono font-bold uppercase w-max mb-3">
                <BatteryCharging className="w-3 h-3 text-[#2dd4bf]" /> FAST CHARGE
              </div>
              <h3 className="text-2xl font-black text-white">40-Hour Battery</h3>
              <p className="text-xs text-[#9ca3af] mt-1">
                A 10-minute USB-C charge yields 5 hours of full-volume playback with ANC enabled.
              </p>
            </div>
          </div>

          {/* Bento Card 3 (1/3 width) */}
          <div className="md:col-span-4 relative aspect-square md:aspect-auto md:h-[420px] rounded-[32px] bg-[#0a0a0a] border border-white/10 overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80"
              alt="Hi-Res Audio Drivers"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent p-8 flex flex-col justify-end">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050505]/80 border border-white/10 text-[#2dd4bf] text-[10px] font-mono font-bold uppercase w-max mb-3">
                <Sliders className="w-3 h-3 text-[#2dd4bf]" /> 40MM TITANIUM
              </div>
              <h3 className="text-2xl font-black text-white">Hi-Res Drivers</h3>
              <p className="text-xs text-[#9ca3af] mt-1">
                Custom titanium diaphragm architecture delivers distortion-free response from 10Hz to 45kHz.
              </p>
            </div>
          </div>

          {/* Bento Card 4 (2/3 width) */}
          <div className="md:col-span-8 relative aspect-[16/10] md:aspect-auto md:h-[420px] rounded-[32px] bg-[#0a0a0a] border border-white/10 overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80"
              alt="Spatial Audio & Head Tracking"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent p-8 flex flex-col justify-end">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050505]/80 border border-white/10 text-[#2dd4bf] text-[10px] font-mono font-bold uppercase w-max mb-3">
                <Headphones className="w-3 h-3 text-[#2dd4bf]" /> IMMERSIVE 3D
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">Spatial Audio with Head Tracking</h3>
              <p className="text-sm text-[#9ca3af] mt-1 max-w-lg">
                Built-in gyroscopes and accelerometers recalculate soundstage positioning in real-time, locking vocals and instruments in 3D space around you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Color Customizer */}
      <section id="colors" className="py-24 max-w-[1280px] mx-auto px-6 text-center">
        <div className="max-w-xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-mono font-bold tracking-widest text-[#2dd4bf] uppercase">
            COLOR CUSTOMIZER
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Personalize Your Atmosphere
          </h2>
          <p className="text-sm text-[#9ca3af]">
            Select a finish crafted from precision anodized aluminum and satin glass.
          </p>
        </div>

        {/* Product Showcase Canvas */}
        <div className="relative max-w-2xl mx-auto p-8 rounded-[32px] bg-[#0a0a0a] border border-white/10 shadow-2xl space-y-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden flex items-center justify-center">
            {/* Color Glow Backdrop */}
            <div
              className="absolute inset-0 transition-all duration-700 blur-3xl opacity-30"
              style={{ backgroundColor: currentColor.hex }}
            />

            <AnimatePresence mode="wait">
              <motion.img
                key={selectedColor}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                src={currentColor.img}
                alt={currentColor.name}
                className="w-full h-full object-cover rounded-2xl relative z-10"
              />
            </AnimatePresence>
          </div>

          <div className="space-y-4 relative z-10">
            <p className="text-lg font-black text-white uppercase tracking-wide">
              {currentColor.name}
            </p>

            {/* Color Swatch Circle Buttons */}
            <div className="flex items-center justify-center gap-5">
              {colorSwatches.map((swatch) => {
                const isSelected = selectedColor === swatch.id;
                return (
                  <button
                    key={swatch.id}
                    onClick={() => setSelectedColor(swatch.id)}
                    className={`w-9 h-9 rounded-full transition-all flex items-center justify-center ${
                      isSelected ? 'ring-2 ring-white ring-offset-4 ring-offset-[#050505] scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                    aria-label={`Select ${swatch.name}`}
                  >
                    {isSelected && <Check className={`w-4 h-4 ${swatch.id === 'white' ? 'text-black' : 'text-white'}`} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Tech Specs Table */}
      <section id="specs" className="py-24 max-w-[1280px] mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-[#2dd4bf] uppercase">
            TECHNICAL SPECIFICATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Uncompromising Acoustic Engineering
          </h2>
        </div>

        <div className="max-w-4xl mx-auto rounded-[32px] bg-[#0a0a0a] border border-white/10 p-8 sm:p-12 shadow-2xl">
          <div className="divide-y divide-white/10">
            {techSpecs.map((spec, idx) => (
              <div key={idx} className="py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-sm font-medium text-[#9ca3af]">{spec.label}</span>
                <span className="text-sm font-bold text-white text-left sm:text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section id="testimonials" className="py-24 max-w-[1280px] mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#2dd4bf] uppercase">
            REVIEWS & PRAISE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Loved by Audiophiles & Creators
          </h2>
          <p className="text-sm text-[#9ca3af]">
            Hear how industry professionals describe the AuraMax soundstage experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="rounded-[32px] bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all shadow-xl"
            >
              <div className="space-y-4">
                <div className="text-[#2dd4bf]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <p className="text-sm text-gray-200 italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-xs text-[#9ca3af]">{item.role} • {item.handle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ Accordion */}
      <section id="faq" className="py-24 max-w-[1280px] mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-[#2dd4bf] uppercase">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Got Questions? We've Got Answers.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto rounded-[32px] bg-[#0a0a0a] border border-white/10 p-6 sm:p-10 divide-y divide-white/10">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-base font-bold text-white gap-4 focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <div className={`p-2 rounded-full bg-white/5 text-[#2dd4bf] transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    <Plus className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-[#9ca3af] mt-3 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Pricing / Waitlist */}
      <section id="pricing" className="py-24 max-w-[1280px] mx-auto px-6">
        <div className="max-w-3xl mx-auto rounded-[32px] bg-gradient-to-tr from-[#0a0a0a] via-[#121215] to-[#0a0a0a] border border-white/10 p-10 sm:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#2dd4bf]/10 rounded-full blur-3xl pointer-events-none" />

          <span className="text-xs font-mono font-bold tracking-widest text-[#2dd4bf] uppercase">
            PRICING & PRE-ORDER
          </span>

          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Pre-order Opens Soon
          </h2>

          <p className="text-base text-[#9ca3af] max-w-lg mx-auto">
            Reserve your flagship AuraMax wireless headphones today. Includes free express global shipping and 2-year warranty.
          </p>

          <div className="py-4">
            <span className="text-5xl font-black text-white">$349</span>
            <span className="text-sm text-[#9ca3af] ml-2">USD (Retail $449)</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-black text-sm hover:opacity-90 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              Contact Sales / Reserve
            </a>
          </div>
        </div>
      </section>

      {/* 10. Contact Form */}
      <section id="contact" className="py-24 max-w-[1280px] mx-auto px-6">
        <div className="max-w-xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#2dd4bf] uppercase">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl font-black text-white">Contact AuraMax Team</h2>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-[32px] bg-[#0a0a0a] border border-[#2dd4bf]/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#2dd4bf]/20 text-[#2dd4bf] flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Message Received!</h3>
              <p className="text-xs text-[#9ca3af]">Our acoustic support specialists will get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full rounded-full bg-[#0a0a0a] border border-white/10 text-white placeholder-gray-500 px-6 py-4 text-sm focus:outline-none focus:border-[#2dd4bf] transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-full bg-[#0a0a0a] border border-white/10 text-white placeholder-gray-500 px-6 py-4 text-sm focus:outline-none focus:border-[#2dd4bf] transition-colors"
                />
              </div>

              <div>
                <textarea
                  required
                  rows={4}
                  placeholder="Your Message..."
                  className="w-full rounded-[24px] bg-[#0a0a0a] border border-white/10 text-white placeholder-gray-500 px-6 py-4 text-sm focus:outline-none focus:border-[#2dd4bf] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-white text-black font-extrabold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="pt-24 pb-12 border-t border-white/10 bg-[#050505] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Top Left Brand Info */}
            <div className="md:col-span-6 space-y-3">
              <a href="#hero" className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#2dd4bf]" />
                </div>
                <span className="text-lg font-black tracking-tight text-white uppercase">AuraMax</span>
              </a>
              <p className="text-sm text-[#9ca3af]">Designed to Move You. Precision Wireless Acoustic Systems.</p>
            </div>

            {/* Top Right Navigation Columns */}
            <div className="md:col-span-3 space-y-3">
              <h5 className="text-xs font-mono font-bold text-[#2dd4bf] uppercase">Quick Links</h5>
              <ul className="space-y-2 text-xs text-[#9ca3af]">
                <li><a href="#features" className="hover:text-white transition-colors">Features & ANC</a></li>
                <li><a href="#colors" className="hover:text-white transition-colors">Color Finishes</a></li>
                <li><a href="#specs" className="hover:text-white transition-colors">Technical Specs</a></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h5 className="text-xs font-mono font-bold text-[#2dd4bf] uppercase">Pages</h5>
              <ul className="space-y-2 text-xs text-[#9ca3af]">
                <li><a href="#testimonials" className="hover:text-white transition-colors">User Reviews</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Support FAQ</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pre-Order Reserve</a></li>
              </ul>
            </div>
          </div>

          {/* Enormous Faded Wordmark */}
          <div className="relative pt-12 pb-6 text-center select-none overflow-hidden">
            <div className="absolute inset-0 bg-radial from-[#2dd4bf]/20 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />
            <span className="text-[14vw] font-black tracking-tighter leading-none text-white/5 uppercase block pointer-events-none">
              AURAMAX
            </span>
          </div>

          {/* Copyright Divider */}
          <div className="pt-8 border-t border-white/5 text-center text-xs text-[#9ca3af]">
            © 2026 AuraMax Audio Technologies Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
