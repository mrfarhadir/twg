import {IShape, Shape, Shaper} from "@/class/Shape";
import {randomInt} from "@/utils";

@Shaper()
export default class TickCurves extends Shape implements IShape {
    template(): string {
        let template = ''
        let j = 1
        const max = this.maxDimension()
        const step = randomInt(13, 20)
        const s = randomInt(10, 16) / 10
        for(let i = 0; i < max ; i += step ) {
            j++
            const alpha = ((j % 10) / 10) + (randomInt(3,8) / 10)
            const r = 5 //12
            const g = (j % 105) + 10 // 226 //12
            const b = 116 //145 // (j * 5 % 255) + 10
            template += `<path stroke='rgba(${r}, ${g}, ${b}, ${alpha})' stroke-width='${(i % 100) + 1}' d="M -10 ${i} ${(max / s) + i} ${s * max - i}" />`
        }
        return template
    }

}