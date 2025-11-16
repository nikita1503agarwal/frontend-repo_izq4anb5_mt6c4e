import { useState } from 'react'
import { motion } from 'framer-motion'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export function SignupForm({ onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '', username: '', display_name: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Signup failed')
      localStorage.setItem('token', data.access_token)
      onSuccess?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form onSubmit={submit} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <input required placeholder="Email" className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg outline-none focus:ring-2 ring-blue-500" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
      <input required placeholder="Username" className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg outline-none focus:ring-2 ring-blue-500" value={form.username} onChange={e=>setForm({...form, username: e.target.value})} />
      <input required placeholder="Display name" className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg outline-none focus:ring-2 ring-blue-500" value={form.display_name} onChange={e=>setForm({...form, display_name: e.target.value})} />
      <input required type="password" placeholder="Password" className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg outline-none focus:ring-2 ring-blue-500" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button disabled={loading} className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-[0_0_30px_rgba(37,99,235,0.6)]">{loading ? 'Creating...' : 'Create Account'}</button>
    </motion.form>
  )
}

export function LoginForm({ onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      params.append('username', form.email)
      params.append('password', form.password)
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Login failed')
      localStorage.setItem('token', data.access_token)
      onSuccess?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form onSubmit={submit} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <input required placeholder="Email" className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg outline-none focus:ring-2 ring-blue-500" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
      <input required type="password" placeholder="Password" className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg outline-none focus:ring-2 ring-blue-500" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button disabled={loading} className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-[0_0_30px_rgba(37,99,235,0.6)]">{loading ? 'Signing in...' : 'Login'}</button>
    </motion.form>
  )
}
