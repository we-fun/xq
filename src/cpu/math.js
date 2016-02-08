export const { abs, round } = Math

export function sign(v){
  return v > 0 ? 1 :
    v < 0 ? -1 : 0
}
