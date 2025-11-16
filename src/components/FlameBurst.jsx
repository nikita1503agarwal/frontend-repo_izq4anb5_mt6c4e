import { motion } from 'framer-motion'

export default function FlameBurst({ triggerKey }) {
  // Renders a brief flame burst animation when triggerKey changes
  return (
    <motion.div
      key={triggerKey}
      initial={{ scale: 0.6, opacity: 0.6, filter: 'blur(6px)' }}
      animate={{ scale: [0.6, 1.2, 1], opacity: [0.6, 1, 0], filter: ['blur(6px)', 'blur(2px)', 'blur(8px)'] }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background: 'radial-gradient(600px 300px at 50% 50%, rgba(63,157,255,0.35), transparent 60%)'
      }}
    />
  )
}
