import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Globe2, UserCircle2, Save, Copy, Check } from 'lucide-react'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ProfilePanel() {
  const [profile, setProfile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)
  const token = localStorage.getItem('token')

  const authHeader = token ? { Authorization: `Bearer ${token}` } : {}

  const loadProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/user/profile`, { headers: { 'Content-Type': 'application/json', ...authHeader }})
      if (res.ok) {
        const data = await res.json()
        setProfile(data)
        localStorage.setItem('profile', JSON.stringify(data))
      }
    } catch {}
  }

  useEffect(() => { loadProfile() }, [])

  const update = async (patch) => {
    if (!profile) return
    setSaving(true)
    try {
      const res = await fetch(`${API_URL}/user/profile`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader }, body: JSON.stringify(patch) })
      if (res.ok) {
        setProfile(prev => ({ ...prev, ...patch }))
        const merged = { ...profile, ...patch }
        localStorage.setItem('profile', JSON.stringify(merged))
      }
    } finally {
      setSaving(false)
    }
  }

  const copyLink = async () => {
    if (!profile?.username) return
    const url = `${window.location.origin}/@${profile.username}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  if (!profile) return null

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2"><UserCircle2 className="w-5 h-5" /> Profile</h3>
        <span className="text-xs text-white/60">Theme: {profile.theme || 'blueflame'}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-white/70">Display name</label>
          <input defaultValue={profile.display_name} onBlur={(e)=>update({ display_name: e.target.value })} placeholder="Your display name" className="w-full mt-1 bg-transparent border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 ring-blue-500" />
        </div>
        <div>
          <label className="text-sm text-white/70">Avatar URL</label>
          <input defaultValue={profile.avatar_url || ''} onBlur={(e)=>update({ avatar_url: e.target.value })} placeholder="https://..." className="w-full mt-1 bg-transparent border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 ring-blue-500" />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-white/70">Bio</label>
          <textarea defaultValue={profile.bio || ''} onBlur={(e)=>update({ bio: e.target.value })} rows={3} placeholder="A short description" className="w-full mt-1 bg-transparent border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 ring-blue-500" />
        </div>
      </div>

      <div className="mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button onClick={()=>update({ is_public: !profile.is_public })} className={`px-3 py-2 rounded-lg border ${profile.is_public ? 'bg-blue-600 border-blue-500' : 'bg-white/10 border-white/10'} transition-colors flex items-center gap-2`}>
            <Globe2 className="w-4 h-4" /> {profile.is_public ? 'Public' : 'Private'}
          </button>
          {saving && <span className="text-xs text-white/60">Saving...</span>}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-white/70">Public link:</div>
          <Link to={`/@${profile.username}`} className="text-sky-400 hover:text-sky-300">/@{profile.username}</Link>
          <button onClick={copyLink} className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20">
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}
