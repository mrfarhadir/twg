import {generate_id} from "@/utils/General";
import {getPositionFromAreaPercent} from "@/utils/Position";
import {randomInt} from "@/utils";

export class Logo {
    id = ''
    logoScale = 5
    areaPercent: Matrix = [[]]

    constructor(public svg: SVGElement, public url: string) {
        this.id = 'logo-' + generate_id()
    }

    async init() {
        this.clearIfExists()
        const logo = await this.add()
        console.dir(logo)
        const {
            xRange,
            yRange
        } = getPositionFromAreaPercent(this.areaPercent, this.logoScale * logo.naturalWidth, this.logoScale * logo.naturalHeight, this.svg.clientWidth, this.svg.clientHeight)
        const {x, y} = this.getRandomPositionByAreaRange(logo, xRange, yRange)
        this.setLogoPosition(x, y, logo)
        console.log(xRange, yRange)
    }

    setAreaPercent(areaPercent: Matrix) {
        this.areaPercent = areaPercent
    }

    async add() {
        const logo = await this.getImage()
        const base64 = this.getLogoBase64(logo)
        const tag = this.generateLogoTag(logo, base64)
        this.svg.innerHTML += tag
        return logo
    }

    getRandomPositionByAreaRange(logo: HTMLImageElement, xRange: Array<number>, yRange: Array<number>) {
        let x: number = randomInt(xRange[0], xRange[1])
        let y: number = randomInt(yRange[0], yRange[1])
        if (!isFinite(xRange[0])) {
            x = 50
        }

        if(!isFinite(yRange[0])) {
            y = 50
        }

        return {x, y}
    }

    setLogoPosition(x: number, y: number, logo: HTMLImageElement) {
        x = Math.round((this.svg.clientWidth * x) / 100) - (this.logoScale * logo.width) / 2
        y = Math.round((this.svg.clientHeight * y) / 100) - (this.logoScale * logo.height) / 2
        const g = this.getLogoTag()
        g.setAttribute('transform', `translate(${x}, ${y})`)
    }

    generateLogoTag(logo: HTMLImageElement, base64: string) {
        return `
            <g id="${this.id}">
                <image href="${base64}" />
            </g>
        `
    }

    getLogoBase64(logo: HTMLImageElement) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext("2d");
        canvas.width = this.logoScale * logo.width;
        canvas.height = this.logoScale * logo.height;
        if (ctx)
            ctx.drawImage(logo, 0, 0, this.logoScale * logo.naturalWidth, this.logoScale * logo.naturalHeight);
        return canvas.toDataURL('png', 100)
    }

    getImage(): Promise<HTMLImageElement> {
        return new Promise(resolve => {
            const logo = new Image() // create image to get height and width in order to put it exactly in center
            logo.src = this.url
            logo.onload = () => {
                resolve(logo)
            }
        })
    }

    getLogoTag(): SVGGElement {
        return this.svg.querySelector(`g#${this.id}`) || {} as SVGGElement
    }

    clearIfExists() {
        const exists = this.svg.querySelector(`g#${this.id}`)
        if (exists) {
            exists.remove()
        }
    }
}