import { useState, useEffect } from 'react'

const BASE_URL = 'https://api.github.com'

/**
 * Fetches a GitHub user's profile.
 * @param {string | null} username
 * @returns {{ data: object | null, loading: boolean, error: string | null }}
 */
export function useGitHubUser(username) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return

    const controller = new AbortController()

    async function fetchUser() {
      setLoading(true)
      setError(null)
      setData(null)

      try {
        const headers = {}
        const token = import.meta.env.VITE_GITHUB_TOKEN
        if (token) headers['Authorization'] = `Bearer ${token}`

        const res = await fetch(`${BASE_URL}/users/${username}`, {
          headers,
          signal: controller.signal,
        })

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
          setError('Failed to fetch user. Check your connection.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
    return () => controller.abort()
  }, [username])

  return { data, loading, error }
}
