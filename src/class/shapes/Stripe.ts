import {IShape, Shape, Shaper} from "@/class/Shape";
import {randomInt} from "@/utils";

@Shaper()
export default class Stripe extends Shape implements IShape {
    constructor(svg: SVGElement) {
        super(svg);
    }

    template(): string {
        const max = this.maxDimension()
        const color = '#05e273'
        let template = ''
        const lineGap = randomInt(20, 33)
        const r = randomInt(this.screenWidth / 10, this.screenWidth / 2)
        const handler = (input: number) => (input + Math.sin(input)) / r
        const s = (randomInt(10, 13))/ 10
        for(let i = -max; i < max; i+= lineGap ) {
            const m = handler(i)
            const t = `<path class="${this.constructor.name}" d="m ${i} -10 ${(max * s) + 15} ${max + 15}" stroke="${color}" stroke-width="${m}" fill="red" />`
            template += t
        }
        return template
    }
}