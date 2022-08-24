import {IShape, Shape, Shaper} from "@/class/Shape";
import {randomInt} from "@/utils";

@Shaper()
export default class StrangeLines extends Shape implements IShape{
    constructor(svg: SVGElement) {
        super(svg);
    }

    template(): string {
        const max = this.maxDimension()
        const color = '#05e273'
        let template = ''
        const lineGap = randomInt(28, 36)
        const handler = (input: number) => (Math.abs((input / .5) * Math.cos(input * input))) / 9
        for(let i = -max; i < max; i+= lineGap ) {
            const m = handler(i)
            const t = `<path class="${this.constructor.name}" d="m -15 ${i} ${max + 15} ${max + 5}" stroke="${color}" stroke-width="${m}" fill="red" />`
            template += t
        }
        return template
    }

}