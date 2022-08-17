
export class Shape {
    template = ''
    color = ''
    constructor(public base: BaseSvg, private svg: SVGElement) {
        this.clear()
    }

    clear() {
        this.svg.querySelectorAll(`.${this.constructor.name}`)
            .forEach(element => {
                element.remove()
            })
    }

    append() {
        this.svg.innerHTML += this.template
    }

    setColor(color: string) {
        this.color = color
    }

    generate_id(): string {
        return Math.random().toString(24).slice(2)
    }
}