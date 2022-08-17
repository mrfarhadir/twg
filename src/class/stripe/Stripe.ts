import {Shape} from "@/class/Shape";
import {randomInt} from "@/utils";
import {Formulas} from "@/class/stripe/Formulas";

export class Stripe extends Shape {
    constructor(base: BaseSvg, svg: SVGElement, public style: number) {
        super(base, svg);
    }

    render() {
        const formulaFactory = new Formulas()
        formulaFactory.set(this.style)
        const formula = formulaFactory.getActiveItem()
        const lineGap = randomInt(formula.toleranceRange[0], formula.toleranceRange[1])
        const max = Math.max(this.base.width, this.base.height)
        this.template = formula.template(max)
        // for(let i = -max; i < max; i+= lineGap ) {
        //     j++
        //     // j = (j + 2) / Math.cos( 0.3 * j  ) + (0.5 * j + Math.tan(j))
        //     // const m = (7 * j) + Math.cos( 1.5 *  j ) + Math.acos(j)
        //     // const m = (j + Math.sin(j)) / 25 // Good
        //     // const m = (Math.abs((j / .5) * Math.sin(j * j))) / 10
        //     const m = formula.handler(j)
        //     const t = `<path class="${this.constructor.name}" d="m -5 ${i} ${max + 5} ${max + 5}" stroke="${this.color}" stroke-width="${m}" fill="red" />`
        //     this.template += t
        // }
        console.log('max')
        console.log({max})
        this.append()
    }

}