export const formatDate = (date: string | null | undefined) => {
  if (!date) return ''

  return new Intl.DateTimeFormat('en-Us', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}
