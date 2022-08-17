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
    toleranceRange: [number, number]
    handler(input: T): number
    template(params: number): string
}
