import {
  PieChart, Pie, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts'
import styles from './LanguagePieChart.module.css'

const COLORS = ['#7F77DD', '#1D9E75', '#D85A30', '#378ADD', '#BA7517', '#D4537E', '#639922']

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const { name, value, percent } = payload[0]
  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipName}>{name}</span>
      <span className={styles.tooltipValue}>
        {value} repo{value === 1 ? '' : 's'} · {(percent * 100).toFixed(1)}%
      </span>
    </div>
  )
}

/** Only label slices that are large enough to be readable. */
function renderLabel({ percent }) {
  return percent >= 0.05 ? `${(percent * 100).toFixed(0)}%` : ''
}

/**
 * Pie chart of language distribution. Languages under 3% are grouped into "Other".
 * @param {{ repos: object[] }} props
 */
export function LanguagePieChart({ repos }) {
  const counts = {}
  for (const repo of repos) {
    if (repo.language) counts[repo.language] = (counts[repo.language] ?? 0) + 1
  }

  const total = Object.values(counts).reduce((s, n) => s + n, 0)

  if (total === 0) {
    return <p className={styles.empty}>No language data available.</p>
  }

  let otherCount = 0
  const slices = []
  for (const [lang, count] of Object.entries(counts)) {
    if (count / total < 0.03) {
      otherCount += count
    } else {
      slices.push({ name: lang, value: count })
    }
  }
  if (otherCount > 0) slices.push({ name: 'Other', value: otherCount })
  slices.sort((a, b) => b.value - a.value)

  const coloredSlices = slices.map((s, i) => ({ ...s, fill: COLORS[i % COLORS.length] }))

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Language Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={coloredSlices}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            outerRadius={100}
            innerRadius={48}
            paddingAngle={2}
            label={renderLabel}
            labelLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" iconSize={8} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
