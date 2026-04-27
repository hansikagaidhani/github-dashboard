import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import { useTheme } from '../context/ThemeContext'
import styles from './StarBarChart.module.css'

const COLOR = '#7F77DD'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const { name, stars } = payload[0].payload
  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipName}>{name}</span>
      <span className={styles.tooltipValue}>⭐ {stars.toLocaleString()}</span>
    </div>
  )
}

/**
 * Bar chart of the top 8 repos by star count.
 * @param {{ repos: object[] }} props
 */
export function StarBarChart({ repos }) {
  const { theme } = useTheme()
  const gridColor = theme === 'dark' ? '#334155' : '#f3f4f6'
  const tickColor = theme === 'dark' ? '#94a3b8' : '#6b7280'
  const cursorFill = theme === 'dark' ? '#2d2a4a' : '#f5f3ff'

  const data = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 8)
    .map(r => ({ name: r.name, stars: r.stargazers_count }))

  if (data.every(r => r.stars === 0)) {
    return <p className={styles.empty}>No starred repositories yet.</p>
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Top Repositories by Stars</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 48 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: tickColor }}
            tickLine={false}
            axisLine={false}
            angle={-35}
            textAnchor="end"
            interval={0}
            tickFormatter={v => (v.length > 14 ? v.slice(0, 13) + '…' : v)}
          />
          <YAxis
            tick={{ fontSize: 12, fill: tickColor }}
            tickLine={false}
            axisLine={false}
            width={36}
            tickFormatter={v => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v)}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: cursorFill }} />
          <Bar dataKey="stars" fill={COLOR} radius={[6, 6, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
