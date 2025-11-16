import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { SignupForm, LoginForm } from './components/Auth'
import Dashboard from './components/Dashboard'
import { motion } from 'framer-motion'

function AuthPage({ mode }) {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#0B0F16] text-white pt-24 px-4">
      <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-1">{mode === 'signup' ? 'Create account' : 'Welcome back'}</h2>
        <p className="text-white/60 mb-6">{mode === 'signup' ? 'Start your blue-flame journey.' : 'Sign in to continue.'}</p>
        {mode === 'signup' ? (
          <SignupForm onSuccess={() => navigate('/dashboard')} />
        ) : (
          <LoginForm onSuccess={() => navigate('/dashboard')} />
        )}
      </div>
    </div>
  )
}

function Home() {
  useEffect(() => {
    document.body.style.background = '#0B0F16'
  }, [])
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <Hero />
      <section id="features" className="py-20 bg-[#0B0F16]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {["3D Accents","Fluid Micro-Animations","Share Publicly"].map((title, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-white/70 mt-2">A blazing experience with electric blue energy and delightful feedbacks on every interaction.</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
