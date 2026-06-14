import { useState } from 'react'

const box: React.CSSProperties = {
  border: '1px solid var(--color-main)',
  borderRadius: 'var(--radius-l)',
  padding: 'var(--space-l)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-m)',
}

const area: React.CSSProperties = {
  width: '100%',
  minHeight: '8rem',
  resize: 'vertical',
  border: 'none',
  outline: 'none',
  background: 'transparent',
  color: 'inherit',
  font: 'inherit',
}

const stats: React.CSSProperties = {
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-main-50)',
}

export default function Scratchpad() {
  const [text, setText] = useState('')
  const words = text.trim() ? text.trim().split(/\s+/).length : 0

  return (
    <div style={box}>
      <textarea
        style={area}
        placeholder="type here…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div style={stats}>
        {words} words · {text.length} chars
      </div>
    </div>
  )
}
