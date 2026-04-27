import styles from './ProfileCard.module.css'

/**
 * Displays a GitHub user's profile summary.
 * @param {{ user: object }} props — user object from the GitHub API
 */
export function ProfileCard({ user }) {
  const joinDate = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
    new Date(user.created_at),
  )

  return (
    <div className={styles.card}>
      <img
        className={styles.avatar}
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        width={96}
        height={96}
      />

      <div className={styles.info}>
        <div className={styles.names}>
          {user.name && <h2 className={styles.name}>{user.name}</h2>}
          <a
            className={styles.login}
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
          >
            @{user.login}
          </a>
        </div>

        {user.bio && <p className={styles.bio}>{user.bio}</p>}

        <div className={styles.stats}>
          <span>
            <strong>{user.followers.toLocaleString()}</strong> followers
          </span>
          <span className={styles.dot} aria-hidden="true" />
          <span>
            <strong>{user.following.toLocaleString()}</strong> following
          </span>
        </div>

        <div className={styles.meta}>
          {user.location && (
            <span className={styles.metaItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              {user.location}
            </span>
          )}
          <span className={styles.metaItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Joined {joinDate}
          </span>
        </div>
      </div>
    </div>
  )
}
