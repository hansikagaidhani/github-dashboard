import styles from './Skeleton.module.css'

export function SkeletonProfileCard() {
  return (
    <div className={styles.profileCard}>
      <div className={styles.avatar} />
      <div className={styles.profileInfo}>
        <div className={`${styles.block} ${styles.nameLarge}`} />
        <div className={`${styles.block} ${styles.nameSmall}`} />
        <div className={`${styles.block} ${styles.bio}`} />
        <div className={`${styles.block} ${styles.bio} ${styles.bioShort}`} />
        <div className={styles.metaRow}>
          <div className={`${styles.block} ${styles.metaChip}`} />
          <div className={`${styles.block} ${styles.metaChip}`} />
        </div>
      </div>
    </div>
  )
}

export function SkeletonStatRow() {
  return (
    <div className={styles.statRow}>
      {[0, 1, 2, 3].map(i => (
        <div key={i} className={styles.statCard}>
          <div className={`${styles.block} ${styles.statIcon}`} />
          <div className={`${styles.block} ${styles.statValue}`} />
          <div className={`${styles.block} ${styles.statLabel}`} />
        </div>
      ))}
    </div>
  )
}

export function SkeletonCharts() {
  return (
    <div className={styles.charts}>
      {[0, 1, 2].map(i => (
        <div key={i} className={styles.chartCard}>
          <div className={`${styles.block} ${styles.chartTitle}`} />
          <div className={`${styles.block} ${styles.chartBody}`} />
        </div>
      ))}
    </div>
  )
}

export function SkeletonRepoTable() {
  return (
    <div className={styles.tableCard}>
      <div className={styles.tableHead}>
        {[40, 15, 10, 10, 15].map((w, i) => (
          <div key={i} className={`${styles.block} ${styles.tableHeadCell}`} style={{ width: `${w}%` }} />
        ))}
      </div>
      {[0, 1, 2, 3, 4, 5].map(i => (
        <div key={i} className={styles.tableRow}>
          <div className={`${styles.block} ${styles.rowName}`} />
          <div className={`${styles.block} ${styles.rowChip}`} />
          <div className={`${styles.block} ${styles.rowNum}`} />
          <div className={`${styles.block} ${styles.rowNum}`} />
          <div className={`${styles.block} ${styles.rowDate}`} />
        </div>
      ))}
    </div>
  )
}
