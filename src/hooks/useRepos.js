import { useState, useEffect } from 'react'

const BASE_URL = 'https://api.github.com'

/**
 * Fetches all public repos for a GitHub user (up to 100, sorted by last updated).
 * @param {string | null} username
 * @returns {{ data: object[] | null, loading: boolean, error: string | null }}
 */
export function useRepos(username) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return

    const controller = new AbortController()

    async function fetchRepos() {
      setLoading(true)
      setError(null)
      setData(null)

      try {
        const headers = {}
        const token = import.meta.env.VITE_GITHUB_TOKEN
        if (token) headers['Authorization'] = `Bearer ${token}`

        const res = await fetch(
          `${BASE_URL}/users/${username}/repos?per_page=100&sort=updated`,
          { headers, signal: controller.signal },
        )

        if (res.status === 404) {
          setError('User not found.')
          return
        }
        if (res.status === 403) {
          setError('GitHub rate limit hit — try again later.')
          return
        }
        if (!res.ok) {
          setError(`Unexpected error (${res.status}).`)
          return
        }

        const json = await res.json()
        setData(json)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Failed to fetch repos. Check your connection.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
    return () => controller.abort()
  }, [username])

  return { data, loading, error }
}
