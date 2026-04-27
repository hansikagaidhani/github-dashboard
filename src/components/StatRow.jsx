import styles from './StatRow.module.css'

const ICONS = {
  repos: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
    </svg>
  ),
  stars: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  language: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  forks: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
}

const ACCENT = ['#7F77DD', '#1D9E75', '#D85A30', '#378ADD']

/** @param {object[]} repos */
function computeTopLanguage(repos) {
  const counts = {}
  for (const repo of repos) {
    if (repo.language) counts[repo.language] = (counts[repo.language] ?? 0) + 1
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'
}

function StatCard({ label, value, iconKey, accent }) {
  return (
    <div className={styles.card}>
      <span className={styles.icon} style={{ color: accent }}>
        {ICONS[iconKey]}
      </span>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  )
}

/**
 * Four summary metric cards derived from a repos array.
 * @param {{ repos: object[] }} props
 */
export function StatRow({ repos }) {
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0)
  const topLanguage = computeTopLanguage(repos)

  const cards = [
    { label: 'Repositories', value: repos.length.toLocaleString(), iconKey: 'repos' },
    { label: 'Total Stars', value: totalStars.toLocaleString(), iconKey: 'stars' },
    { label: 'Top Language', value: topLanguage, iconKey: 'language' },
    { label: 'Total Forks', value: totalForks.toLocaleString(), iconKey: 'forks' },
  ]

  return (
    <div className={styles.row}>
      {cards.map((card, i) => (
        <StatCard key={card.label} accent={ACCENT[i]} {...card} />
      ))}
    </div>
  )
}
