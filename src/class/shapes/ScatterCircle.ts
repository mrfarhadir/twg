import {IShape, Shape, Shaper} from "@/class/Shape";
import {randomInt} from "@/utils";

@Shaper()
export default class ScatterCircle extends Shape implements IShape {

    template(): string {
        let template = ''
        const max = this.maxDimension()
        for (let i = 0; i < max / 10; i++) {
            const alpha = ((i % 10) / 10)
            const r = 5 //12
            const g = (i % 105) + 150 // 226 //12
            const b = 116 // 145 // (j * 5 % 255) + 10
            const edgeRate = this.screenWidth > 768 ? 0.1 : 0.2
            const h =  i % 2 ? (edgeRate * this.screenHeight) : ((1 - edgeRate) * this.screenHeight)
            const x = ((i * 20) % this.screenWidth)
            const y = ((edgeRate * 10) * i) * Math.cos(i / 3) + h
            template += `<circle fill="transparent" stroke='rgba(${r}, ${g}, ${b}, ${alpha})' stroke-width="${(i % 5)}" 
                    cx="${x}" cy="${y}" r="${randomInt(max / (max / 20), max / (max / 1.1))}" />`
        }
        return template;
    }

}