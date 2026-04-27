import { useParams } from 'react-router-dom'
import { useGitHubUser } from '../hooks/useGitHubUser'
import { useRepos } from '../hooks/useRepos'
import { SearchBar } from '../components/SearchBar'
import { ThemeToggle } from '../components/ThemeToggle'
import { ProfileCard } from '../components/ProfileCard'
import { StatRow } from '../components/StatRow'
import { RepoTable } from '../components/RepoTable'
import { StarBarChart } from '../components/StarBarChart'
import { LanguagePieChart } from '../components/LanguagePieChart'
import { RepoTimelineChart } from '../components/RepoTimelineChart'
import { ErrorCard } from '../components/ErrorCard'
import {
  SkeletonProfileCard,
  SkeletonStatRow,
  SkeletonCharts,
  SkeletonRepoTable,
} from '../components/Skeleton'
import styles from './UserPage.module.css'

export default function UserPage() {
  const { username } = useParams()
  const { data: user, loading: userLoading, error: userError } = useGitHubUser(username)
  const { data: repos, loading: reposLoading, error: reposError } = useRepos(username)

  const loading = userLoading || reposLoading

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <SearchBar initialValue={username} />
          <ThemeToggle />
        </div>
      </header>

      <main className={styles.content}>
        {loading && (
          <>
            <SkeletonProfileCard />
            <SkeletonStatRow />
            <SkeletonCharts />
            <SkeletonRepoTable />
          </>
        )}

        {!loading && (userError || reposError) && (
          <div className={styles.errors}>
            {userError && <ErrorCard message={userError} />}
            {reposError && <ErrorCard message={reposError} />}
          </div>
        )}

        {!loading && user && (
          <ProfileCard user={user} />
        )}

        {!loading && repos && (
          <>
            <StatRow repos={repos} />
            <div className={styles.charts}>
              <StarBarChart repos={repos} />
              <LanguagePieChart repos={repos} />
              <RepoTimelineChart repos={repos} />
            </div>
            <RepoTable repos={repos} />
          </>
        )}
      </main>
    </div>
  )
}
