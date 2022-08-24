import {Shape} from "@/class/Shape";
import {randomInt} from "@/utils";
import {Formulas} from "@/class/stripe/Formulas";

export class Stripe {
    template = ''
    constructor(public base: BaseSvg, public svg: SVGElement, public style: number) {
    }

    render() {
        const formulaFactory = new Formulas()
        formulaFactory.set(this.style)
        const formula = formulaFactory.getActiveItem()
        const max = Math.max(this.base.width, this.base.height)
        this.template = formula.template(max, {
            screenWidth: this.base.width,
            screenHeight: this.base.height
        })
        this.append()
    }

    append() {
        this.svg.innerHTML += this.template
    }
}