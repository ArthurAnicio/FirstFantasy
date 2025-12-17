export function xpNeededForNextLevel(level: number): number {
  const base = 100
  return base * (level + 1)
}

export function levelFromXp(xp: number): number {
  let level = 1
  let remaining = xp

  while (true) {
    const needed = xpNeededForNextLevel(level)
    if (remaining < needed) break
    remaining -= needed
    level++
  }

  return level
}