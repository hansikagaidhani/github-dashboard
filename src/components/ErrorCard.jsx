import styles from './ErrorCard.module.css'

const ICONS = {
  error: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  notFound: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
  rateLimit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
}

/** @param {{ message: string }} props */
export function ErrorCard({ message }) {
  const isNotFound = message.toLowerCase().includes('not found')
  const isRateLimit = message.toLowerCase().includes('rate limit')

  const icon = isNotFound ? ICONS.notFound : isRateLimit ? ICONS.rateLimit : ICONS.error
  const variant = isNotFound ? styles.notFound : isRateLimit ? styles.rateLimit : styles.error

  return (
    <div className={`${styles.card} ${variant}`}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.message}>{message}</span>
    </div>
  )
}
