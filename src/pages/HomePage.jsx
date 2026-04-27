import { SearchBar } from '../components/SearchBar'
import { ThemeToggle } from '../components/ThemeToggle'
import styles from './HomePage.module.css'

export default function HomePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <ThemeToggle />
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>GitHub Dashboard</h1>
        <p className={styles.subtitle}>Search for a GitHub username to get started.</p>
        <SearchBar />
      </main>
    </div>
  )
}
