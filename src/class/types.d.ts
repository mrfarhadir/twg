type BaseSvg = {
    height: number
    width: number
}

type Matrix =  Array<Array<number>>

type ZeroOneMatrix = Array<Array<0 | 1>>

type ColorCode = {
    r: number
    g: number
    b: number
    a: number
}

type Formula<T> = {
    template(max: number, details?: {
        screenWidth: number,
        screenHeight: number
    }): string
}
