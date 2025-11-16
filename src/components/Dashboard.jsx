import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react'
import ProfilePanel from './ProfilePanel'
import FlameBurst from './FlameBurst'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <motion.li layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="group relative bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors overflow-hidden">
      <FlameBurst triggerKey={`${task.id}-${task.completed}`} />
      <div className="flex items-center gap-3">
        <button onClick={() => onToggle(task)} className="w-6 h-6 rounded-full grid place-items-center bg-white/10 hover:bg-white/20">
          {task.completed ? <CheckCircle2 className="w-5 h-5 text-sky-400" /> : <Circle className="w-5 h-5 text-white/70" />}
        </button>
        <div>
          <p className={`font-medium ${task.completed ? 'line-through text-white/60' : 'text-white'}`}>{task.title}</p>
          {task.description && <p className="text-sm text-white/70">{task.description}</p>}
        </div>
      </div>
      <button onClick={() => onDelete(task)} className="opacity-0 group-hover:opacity-100 transition-opacity text-red-300 hover:text-red-200">
        <Trash2 className="w-5 h-5" />
      </button>
    </motion.li>
  )
}

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [profile, setProfile] = useState(null)
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

  const loadTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks`, { headers: { 'Content-Type': 'application/json', ...authHeader }})
      if (res.ok) {
        const data = await res.json()
        setTasks(data)
      }
    } catch {}
  }

  useEffect(() => {
    loadProfile()
    loadTasks()
  }, [])

  const addTask = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    const res = await fetch(`${API_URL}/tasks`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader }, body: JSON.stringify({ title, description }) })
    if (res.ok) {
      const data = await res.json()
      setTasks(prev => [data, ...prev])
      setTitle(''); setDescription('')
    }
  }

  const toggleTask = async (task) => {
    const res = await fetch(`${API_URL}/tasks/${task.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', ...authHeader }, body: JSON.stringify({ completed: !task.completed }) })
    if (res.ok) {
      const updated = await res.json()
      setTasks(prev => prev.map(t => t.id === updated.id ? updated : t))
    }
  }

  const deleteTask = async (task) => {
    const res = await fetch(`${API_URL}/tasks/${task.id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', ...authHeader } })
    if (res.ok) setTasks(prev => prev.filter(t => t.id !== task.id))
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0B0F16] text-white grid place-items-center p-6">
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-bold">Please sign in</h2>
          <p className="text-white/70 mt-2">Create an account or log in to manage your tasks.</p>
          <div className="mt-6 flex gap-3 justify-center">
            <a href="/login" className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500">Login</a>
            <a href="/signup" className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20">Create account</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0F16] text-white pt-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Welcome{profile?.display_name ? `, ${profile.display_name}` : ''}</h2>
          <p className="text-white/60">Your tasks live here. Toggle, add, reorder soon ✨</p>
        </div>

        <form onSubmit={addTask} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-3">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="What do you need to do?" className="flex-1 bg-transparent border border-white/10 rounded-lg px-4 py-3 outline-none focus:ring-2 ring-blue-500" />
          <input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Optional details" className="flex-1 bg-transparent border border-white/10 rounded-lg px-4 py-3 outline-none focus:ring-2 ring-blue-500" />
          <button className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 flex items-center gap-2 self-start md:self-auto"><Plus className="w-4 h-4" /> Add</button>
        </form>

        <ul className="mt-6 space-y-3">
          <AnimatePresence>
            {tasks.map(t => (
              <TaskItem key={t.id} task={t} onToggle={toggleTask} onDelete={deleteTask} />
            ))}
          </AnimatePresence>
        </ul>

        {profile && (
          <div id="profile" className="mt-10">
            <ProfilePanel />
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
