import {EventEmitter} from "@/utils/EventEmitter";
import {ImageProcessEvents} from "@/class/enums";

export class ImageProcessor extends EventEmitter {
    canvas: HTMLCanvasElement | undefined
    context: CanvasRenderingContext2D | undefined
    image: HTMLImageElement | undefined
    colorMatrix: Array<Array<ColorCode>> = []
    areaDividePortion = 3
    constructor() {
        super()
    }

    findSuitableAreaForLogo(svg: SVGElement) {
        this.generateCanvasFromSvg(svg)
        this.on<ImageData>(ImageProcessEvents.IMAGE_DATA_IS_READY, (imageData) => {
            // yep! finally we converted svg into image and draw that image in canvas by the way now we have image data
            this.generateColorMatrix(imageData)
            // let's see which color tone is happening the most
            const result = this.getTheMostColor(imageData)
            // ok generate a zero one matrix we need it for calculations
            const zeroOneMatrix = this.generateColorZeroOneMatrix(result.color, this.colorMatrix)
            // we divide image into 9 parts so let's see in which area color population is the most
            const area = this.getColorPopulationArea(zeroOneMatrix)
            // cool we found area populations but these big numbers does not make sense so convert it to percent
            const percentArea = this.getAreaPercent(area, zeroOneMatrix.length)
            // ok we are ready to emit the percent matrix we have found a suitable place to land the logo :)
            // console.log({percentArea})
            this.emit(ImageProcessEvents.LOGO_AREA_FOUND, JSON.stringify(percentArea))
        })
    }

    getAreaPercent(matrix: Matrix, n: number) {
        // console.log({matrix})
        n = Math.floor(n / 3)
        // console.log({n})
        const temp = []
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                const p = parseFloat((matrix[i][j] / (n * n)).toFixed(2)) * 100
                temp.push(p)
            }
        }
        return temp.join(',')
    }

    getColorPopulationArea(matrix: ZeroOneMatrix) {
        const p = Math.floor(matrix.length / this.areaDividePortion)
        const summations = []
        for(let i = 0; i < matrix.length; i += p) {
            for(let j = 0; j < matrix.length; j += p) {
                let sum = 0
                for(let r = 0; r < p; r++) {
                    for (let s = 0; s < p; s++) {
                        if (matrix[i +r] && matrix[i + r][j + s] === 1) {
                            sum++
                        }
                    }
                }
                summations.push(sum)
            }
        }
        const sum = []
        for (let i = 0; i < summations.length; i += this.areaDividePortion) {
            sum.push(summations.slice(i, i + this.areaDividePortion))
        }
        return sum
    }

    generateColorZeroOneMatrix(color: string, colors: Array<Array<ColorCode>>): ZeroOneMatrix {
        const maxColorMatrix: ZeroOneMatrix = []
        for(let i = 0; i < colors.length; i++) {
            for (let j = 0; j < colors[i].length; j++) {
                const item = colors[i][j]
                if (!maxColorMatrix[i]) maxColorMatrix[i] = []
                if (color === `${item.r},${item.g},${item.b}`) {
                    maxColorMatrix[i][j] = 1
                } else maxColorMatrix[i][j] = 0
            }
        }
        return maxColorMatrix
    }

    getTheMostColor(imageData: ImageData): {color: string, percent: number} {
        const colors: {
            [key: string]: number
        } = {}
        for (let i = 0; i < imageData.data.length; i += 4) {
            const key = `${imageData.data[i]},${imageData.data[i+1]},${imageData.data[i+2]}`
            if (!colors[key]) colors[key] = 1
            else colors[key] += 1
        }
        const percentages = Object.keys(colors).map((item) => {
            const percent = parseFloat((colors[item] / (imageData.data.length / 4) * 100).toFixed(2))
            return { color: item, percent}
        })
        const percents = percentages.map(item => item.percent)
        const maxPercent = Math.max(...percents)
        const maxColor = percentages.find(item => item.percent === maxPercent)
        return maxColor || { color: '', percent: 0 }
    }

    generateColorMatrix(imageData: ImageData) {
        for (let i = 0; i < imageData.data.length ; i += 4) {
            const row = Math.floor(i / imageData.width / 4)
            if (!this.colorMatrix[row]) {
                this.colorMatrix[row] = []
            }
            this.colorMatrix[row].push({
                r: imageData.data[i],
                g: imageData.data[i + 1],
                b: imageData.data[i + 2],
                a: imageData.data[i + 3]
            })
        }
    }

    generateCanvasFromSvg(svg: SVGElement) {
        const svgCopy = svg.cloneNode(true)
        const data = (new XMLSerializer()).serializeToString(svgCopy)
        const svgBlob = new Blob([data], {type: "image/svg+xml;charset=utf-8"});

        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d') || undefined

        this.canvas.height = svg.clientHeight
        this.canvas.width = svg.clientWidth

        const url = URL.createObjectURL(svgBlob)
        this.image = new Image()
        this.image.src = url

        this.image.onload = this.drawImageOnCanvas.bind(this)
    }

    drawImageOnCanvas() {
        if (this.context && this.canvas && this.image) {
            this.context.drawImage(this.image, 0, 0)
            const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
            this.emit<ImageData>(ImageProcessEvents.IMAGE_DATA_IS_READY, imageData)
        }
    }
}