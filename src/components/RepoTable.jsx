import { useState } from 'react'
import styles from './RepoTable.module.css'

const COLUMNS = [
  { key: 'name', label: 'Repository', sortable: false },
  { key: 'language', label: 'Language', sortable: false },
  { key: 'stargazers_count', label: 'Stars', sortable: true },
  { key: 'forks_count', label: 'Forks', sortable: true },
  { key: 'updated_at', label: 'Updated', sortable: true },
]

/** @param {string} iso */
function formatDate(iso) {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(
    new Date(iso),
  )
}

function SortIcon({ direction }) {
  return (
    <span className={styles.sortIcon} aria-hidden="true">
      {direction === 'asc' ? '▲' : '▼'}
    </span>
  )
}

/**
 * Sortable table of repos. Defaults to sorting by last updated descending.
 * @param {{ repos: object[] }} props
 */
export function RepoTable({ repos }) {
  const [sortKey, setSortKey] = useState('updated_at')
  const [sortDir, setSortDir] = useState('desc')

  function handleSort(key) {
    if (key === sortKey) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const sorted = [...repos].sort((a, b) => {
    const av = a[sortKey]
    const bv = b[sortKey]
    let cmp = 0
    if (typeof av === 'number') {
      cmp = av - bv
    } else {
      cmp = av < bv ? -1 : av > bv ? 1 : 0
    }
    return sortDir === 'asc' ? cmp : -cmp
  })

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {COLUMNS.map(col => (
              <th
                key={col.key}
                className={`${styles.th} ${col.sortable ? styles.sortable : ''} ${sortKey === col.key ? styles.active : ''}`}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
                aria-sort={
                  col.sortable && sortKey === col.key
                    ? sortDir === 'asc' ? 'ascending' : 'descending'
                    : undefined
                }
              >
                {col.label}
                {col.sortable && sortKey === col.key && <SortIcon direction={sortDir} />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map(repo => (
            <tr key={repo.id} className={styles.row}>
              <td className={styles.td}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.repoLink}
                >
                  {repo.name}
                </a>
                {repo.description && (
                  <span className={styles.description}>{repo.description}</span>
                )}
              </td>
              <td className={styles.td}>
                {repo.language ? (
                  <span className={styles.lang}>{repo.language}</span>
                ) : (
                  <span className={styles.empty}>—</span>
                )}
              </td>
              <td className={`${styles.td} ${styles.num}`}>{repo.stargazers_count.toLocaleString()}</td>
              <td className={`${styles.td} ${styles.num}`}>{repo.forks_count.toLocaleString()}</td>
              <td className={`${styles.td} ${styles.date}`}>{formatDate(repo.updated_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
