import {randomInt} from "@/utils";

export class Formulas {
    activeIndex = 0;

    items: Array<Formula<number>> = [
        {
            toleranceRange: [10, 15],
            handler: (input: number) => (Math.abs((input / .5) * Math.cos(input * input))) / 9,
            template: (max: number) => {
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
        },
        {
            toleranceRange: [25, 50],
            handler: (input: number) => input / 4,
            template: (max: number) => {
                const color = '#05e273'
                let template = ''
                const lineGap = randomInt(26, 40)
                let j = 0
                const handler = (input: number) => input / 4
                for(let i = -max; i < max; i+= lineGap ) {
                    j++
                    const m = handler(j)
                    const t = `<path class="${this.constructor.name}" d="m -15 ${i} ${max + 5} ${max + 5}" stroke="${color}" stroke-width="${m}" fill="red" />`
                    template += t
                }
                return template
            }
        },
        {
            toleranceRange: [20, 20],
            handler: (input: number) => (7 * input) + Math.cos( 1.5 *  input ) + Math.acos(input),
            template: (max: number) => {
                const color = '#05e273'
                let template = ''
                const lineGap = randomInt(4, 60)
                let j = 0
                const s = (randomInt(10, 13))/ 10
                const handler = (input: number) => (7 * input) + Math.cos( 1.5 *  input )
                for(let i = -max / 5; i < max / 5; i+= lineGap ) {
                    j++
                    const m = handler(j)
                    const t = `<path class="${this.constructor.name}" d="m -15 ${i} ${max + 5} ${max + 5}" stroke="${color}" stroke-width="${m}" fill="red" />`
                    template += t
                }
                return template
            }
        },
        {
            toleranceRange: [11, 13],
            handler: (input: number) => (input + Math.sin(input)) / 20,
            template: (max: number) => {
                const color = '#05e273'
                let template = ''
                const lineGap = randomInt(20, 33)
                const t = randomInt(20, 80)
                const handler = (input: number) => (input + Math.sin(input)) / t
                const s = (randomInt(10, 13))/ 10
                for(let i = -max; i < max; i+= lineGap ) {
                    const m = handler(i)
                    const t = `<path class="${this.constructor.name}" d="m ${i} -10 ${(max * s) + 15} ${max + 15}" stroke="${color}" stroke-width="${m}" fill="red" />`
                    template += t
                }
                return template
            }
        },
        {
            toleranceRange: [10, 20],
            handler: (input: number) => input,
            template: (max: number) => {
                let template = ''
                let j = 1
                const step = randomInt(10, 25)
                const s = (randomInt(10, 13))/ 10
                for(let i = 0; i < max ; i += step ) {
                    j++
                    const alpha = 1
                    const r = 5 //12
                    const g = 226 //12
                    const b = 116 //145 // (j * 5 % 255) + 10
                    template += `<path stroke='rgba(${r}, ${g}, ${b}, ${alpha})' stroke-width='1' d="M ${-10} ${i} ${(max / 1.5) + i} ${(max/ s) - i}" />`
                }
                return template
            }
        },
        {
            toleranceRange: [10, 20],
            handler: (input: number) => input,
            template: (max: number) => {
                let template = ''
                let j = 1
                const step = randomInt(10, 20)
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
    ]

    set(activeIndex: number) {
        this.activeIndex = activeIndex
    }


    getActiveItem() {
        return this.items[this.activeIndex]
    }
}