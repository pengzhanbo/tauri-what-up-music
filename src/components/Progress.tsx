function Progress({ total, current }: ProgressProps) {
  const percent = (current / total) * 100
  const width = `${(percent > 100 ? 100 : percent).toFixed(4)}%`

  return (
    <div className="absolute left-0 top-0 h-2px w-full bg-gray-100">
      <div className="bg-brand h-full" style={{ width }}></div>
    </div>
  )
}

export interface ProgressProps {
  total: number
  current: number
}

export default Progress
