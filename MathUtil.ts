export default class MathUtil {
    static lerp(from: number, to: number, ratio: number) {
        return from + (to - from) * ratio;
    }
}