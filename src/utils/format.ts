export const fmtINR = (n: number) =>
  '₹' + Math.round(n).toLocaleString('en-IN')

export const formatTimeBank = (mins: number) =>
  mins >= 60
    ? Math.floor(mins / 60) +
      ' hr ' +
      (mins % 60 ? (mins % 60) + ' min' : '')
    : mins + ' min'
