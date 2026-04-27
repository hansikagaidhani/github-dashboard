import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SearchBar.module.css'

/** Username search input — navigates to /user/:username on Enter. */
export function SearchBar({ initialValue = '' }) {
  const [value, setValue] = useState(initialValue)
  const navigate = useNavigate()

  function handleKeyDown(e) {
    if (e.key !== 'Enter') return
    const trimmed = value.trim()
    if (trimmed) navigate(`/user/${trimmed}`)
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        className={styles.input}
        type="text"
        placeholder="Search a GitHub username…"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="GitHub username"
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  )
}
