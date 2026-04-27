import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Dot,
} from 'recharts'
import { useTheme } from '../context/ThemeContext'
import styles from './RepoTimelineChart.module.css'

const COLOR = '#1D9E75'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const count = payload[0].value
  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipName}>{label}</span>
      <span className={styles.tooltipValue}>
        {count} repo{count === 1 ? '' : 's'} created
      </span>
    </div>
  )
}

/**
 * Line chart of repos created per year, derived from each repo's created_at field.
 * @param {{ repos: object[] }} props
 */
export function RepoTimelineChart({ repos }) {
  const { theme } = useTheme()
  const gridColor  = theme === 'dark' ? '#334155' : '#f3f4f6'
  const tickColor  = theme === 'dark' ? '#94a3b8' : '#6b7280'
  const dotStroke  = theme === 'dark' ? '#1e293b' : '#fff'

  const yearCounts = {}
  for (const repo of repos) {
    const year = new Date(repo.created_at).getFullYear()
    yearCounts[year] = (yearCounts[year] ?? 0) + 1
  }

  const data = Object.entries(yearCounts)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([year, count]) => ({ year, count }))

  if (data.length < 2) {
    return <p className={styles.empty}>Not enough data to show a timeline.</p>
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Repositories Created per Year</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: tickColor }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: tickColor }}
            tickLine={false}
            axisLine={false}
            width={28}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: gridColor }} />
          <Line
            type="monotone"
            dataKey="count"
            stroke={COLOR}
            strokeWidth={2.5}
            dot={<Dot r={4} fill={COLOR} stroke={dotStroke} strokeWidth={2} />}
            activeDot={{ r: 6, fill: COLOR, stroke: dotStroke, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
