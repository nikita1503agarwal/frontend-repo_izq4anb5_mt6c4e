import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" style={{background: 'radial-gradient(1200px 600px at 50% 10%, rgba(63,157,255,0.25), transparent 60%), #0B0F16'}}>
      {/* glowing particles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] opacity-70">
          <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Make your tasks ignite your flow
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }} className="mt-4 text-sky-200/90 max-w-2xl mx-auto">
          A visually stunning, blue-flame powered to‑do app with 3D accents, micro‑interactions, and a shareable public profile.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8 }} className="mt-8 flex items-center justify-center gap-3">
          <Link to="/signup" className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-[0_0_40px_rgba(37,99,235,0.65)]">Get Started</Link>
          <a href="#features" className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold">Learn More</a>
        </motion.div>
      </div>

      {/* gradient overlay to deepen contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0F16]/10 to-[#0B0F16]" />
    </section>
  )
}

export default Hero
