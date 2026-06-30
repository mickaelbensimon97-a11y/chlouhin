/**
 * Normalise une chaîne pour une comparaison insensible aux accents et à la casse.
 * Ex: "Jérusalem" et "jerusalem" deviennent tous deux "jerusalem".
 */
export function normalizeText(value: string | null | undefined): string {
  if (!value) return ''
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}
