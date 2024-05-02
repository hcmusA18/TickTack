export const convertTime = (time: string) => {
  const date = new Date(parseInt(time) * 1000)
  const diff = Date.now() - date.getTime()
  const times = {
    year: 365 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000
  }
  if (diff < times.minute) return 'Just now'
  if (diff < times.hour) return `${Math.floor(diff / times.minute)}m`
  if (diff < times.day) return `${Math.floor(diff / times.hour)}h`
  if (diff < times.month) return `${Math.floor(diff / times.day)}d`
  if (diff < times.year) return `${Math.floor(diff / times.month)}mo`

  return date.toLocaleString()
}
