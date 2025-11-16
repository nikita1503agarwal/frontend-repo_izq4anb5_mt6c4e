import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Flame, LogOut, User, CheckCircle2 } from 'lucide-react'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('profile')
    navigate('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md/60">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white">
          <span className="p-2 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 shadow-[0_0_30px_rgba(59,130,246,0.6)]">
            <Flame className="w-5 h-5 text-white" />
          </span>
          <span className="font-semibold tracking-wide">BlueFlame Tasks</span>
        </Link>
        <nav className="flex items-center gap-3">
          {!token && (
            <>
              <Link to="/login" className={`px-3 py-2 text-sm rounded-md hover:bg-white/10 ${location.pathname === '/login' ? 'bg-white/10' : ''}`}>Login</Link>
              <Link to="/signup" className="px-3 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.6)]">Get Started</Link>
            </>
          )}
          {token && (
            <>
              <Link to="/dashboard" className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-white/10 ${location.pathname === '/dashboard' ? 'bg-white/10' : ''}`}>
                <CheckCircle2 className="w-4 h-4" />
                Dashboard
              </Link>
              <Link to="/dashboard#profile" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-white/10">
                <User className="w-4 h-4" />
                Profile
              </Link>
              <button onClick={logout} className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-white/10">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
