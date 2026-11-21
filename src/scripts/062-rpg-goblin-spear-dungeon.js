
/* Goblin Spear appears as a regular random enemy in the Goblin Warren. */
try {
  const dg = DG.find(d => d.id === 'goblin');
  if (dg && !dg.mons.includes('Goblin Spear')) dg.mons.push('Goblin Spear');
} catch (e) {
  console.warn('Goblin Spear not added to Goblin Warren', e);
}
