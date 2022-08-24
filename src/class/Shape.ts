export interface IShape {
    logo?: {
        x: Array<number>,
        y: Array<number>,
        width: number
    }

    template(): string
}

export class Shape {
    svg: SVGElement
    screenWidth = 0
    screenHeight = 0

    logo?: {
        x: Array<number>,
        y: Array<number>,
        width: number
    }

    constructor(svg: SVGElement) {
        this.svg = svg
        this.screenWidth = svg.clientWidth
        this.screenHeight = svg.clientHeight
    }

    init(): void {
        console.log('init...')
    }

    render(template: string) {
        this.clear()
        this.svg.innerHTML = template
    }

    clear() {
        this.svg.innerHTML = ''
    }

    maxDimension(): number {
        return Math.max(this.screenWidth, this.screenHeight)
    }

    template(): string {
        return ''
    }
}

export function Shaper() {
    return function (target: typeof Shape) {

        target.prototype.init = function () {
            const template = target.prototype.template.bind(this)()
            target.prototype.render.bind(this)(template)
        }
    }
}

