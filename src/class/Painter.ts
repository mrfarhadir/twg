import {Shape} from "@/class/Shape";

export class Painter {
    shapes: Array<Shape> = []

    constructor(public svg: SVGElement, public shapesName: Array<string>) {}

    async init() {
        await this.loadShapes()
    }

    async loadShapes() {
        for (let i = 0; i < this.shapesName.length; i++) {
            const name = this.shapesName[i]
            const classObj: any = await this.loadShape(name)
            this.shapes.push(new classObj(this.svg))
        }
    }

    loadShape(name: string) {
        return new Promise((resolve, reject) => {
            import(`@/class/shapes/${name}`)
                .then(module => {
                    resolve(module.default)
                })
                .catch(e => reject(e))
        })
    }

    paint(shapeIndex: number) {
        this.shapes[shapeIndex].init()
    }

    logoPositionPercent(shapeIndex: number) {
        return this.shapes[shapeIndex].logo
    }

    logoWidth(shapeIndex: number): number | undefined {
        const shape = this.shapes[shapeIndex]
        if (shape.logo) {
            return shape.logo.width
        }
        return undefined
    }
}