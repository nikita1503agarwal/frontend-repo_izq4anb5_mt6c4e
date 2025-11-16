import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function PublicProfile() {
  const { username } = useParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/public/${username}`)
        const json = await res.json()
        if (!res.ok) throw new Error(json.detail || 'Failed to load')
        setData(json)
      } catch (e) {
        setError(e.message)
      }
    }
    fetchData()
  }, [username])

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B0F16] text-white grid place-items-center p-6">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold mb-2">Profile not available</h2>
          <p className="text-white/70">{error}</p>
          <Link to="/" className="mt-6 inline-block px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500">Go Home</Link>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="min-h-screen bg-[#0B0F16] text-white pt-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <img src={data.avatar_url || `https://api.dicebear.com/7.x/thumbs/svg?seed=${data.username}`} className="w-16 h-16 rounded-xl border border-white/10" />
          <div>
            <h1 className="text-2xl font-bold">{data.display_name || data.username}</h1>
            <p className="text-white/60">@{data.username}</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold mb-3">Tasks</h3>
          <ul className="space-y-3">
            <AnimatePresence>
              {data.tasks.map((t, idx) => (
                <motion.li key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-medium">{t.title}</p>
                  {t.description && <p className="text-sm text-white/70">{t.description}</p>}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PublicProfile
