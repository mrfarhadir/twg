import {IShape, Shape, Shaper} from "@/class/Shape";
import {randomInt} from "@/utils";

@Shaper()
export default class Circles extends Shape implements IShape {
    logo = {
        x: [50, 50],
        y: [50, 50],
        width: 0
    }
    constructor(svg: SVGElement) {
        super(svg);
    }

    template(): string {
        const max = this.maxDimension()
        let template = ''
        const baseCircleWidth = this.screenWidth * (this.screenWidth > 768 ? 0.15 : 0.25)
        this.logo.width = baseCircleWidth * 1.7
        console.log(this.logo.width)
        for (let i = 0; i < (max / 5); i++) {
            const s = randomInt(1, 10)
            const alpha = ((i % 10) / 10) + (randomInt(3,8) / 10)
            const r = 5 //12
            const g = (i % 105) + 150 // 226 //12
            const b = 116 // 145 // (j * 5 % 255) + 10
            template += `<circle fill="transparent" stroke='rgba(${r}, ${g}, ${b}, ${alpha})' stroke-width="${(i % 5) + s}" 
                    cx="${this.screenWidth/2}" cy="${this.screenHeight/2}" r="${(i * 18) + baseCircleWidth}" />`
        }
        return template
    }

}
