import {generate_id} from "@/utils/General";
import {randomInt} from "@/utils";

export class Logo {
    id = ''
    logoScale = 5
    areaPercent = ''
    xRange: Array<number> = []
    yRange: Array<number> = []
    element: HTMLImageElement = {} as HTMLImageElement

    constructor(public svg: SVGElement, public url: string) {
        this.id = 'logo-' + generate_id()
    }

    async init(logoWidth?: number) {
        this.clearIfExists()
        this.element = await this.add(logoWidth)
        const {x, y} = this.getRandomPositionByAreaRange(this.element, this.xRange, this.yRange)
        this.setLogoPosition(x, y, this.element)
    }

    setLogoScale(logo: HTMLImageElement, logoWidth?: number) {
        const screen = this.svg.clientWidth
        const ratio = screen >= 768 ? 3.2 : 1.95
        this.logoScale = (screen / (ratio * logo.naturalWidth))
        if (logoWidth) {
            this.logoScale = (logoWidth) / (logo.naturalWidth)
        }

        console.log('logoscale: ', this.logoScale, ' logoWidth', logo.naturalWidth)
        console.dir(logo)
    }

    setAreaPercent(areaPercent: string) {
        console.log({areaPercent})
        this.areaPercent = areaPercent
    }

    async add(logoWidth?: number) {
        const logo = await this.getImage()
        this.setLogoScale(logo, logoWidth)
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
                <image href="${base64}" width="${this.logoScale * logo.width}px" height="${this.logoScale * logo.height}px" />
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
        return canvas.toDataURL('jpeg', 100)
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
        const exists = document.querySelector(`g#${this.id}`)
        if (exists) {
            exists.remove()
        }
    }
}