import {h} from "vue";

export function getPositionFromAreaPercent(area: Matrix, logoWidth: number, logoHeight: number, width: number, height: number, tolerance = 80) {
    const x: Array<number> = []
    const y = []
    for (let i = 0; i < area.length; i++) {
        for (let j = 0; j < area[i].length; j++) {
            const percent = area[i][j]

            const neighbors = []

            if (area[i][j - 1])
                neighbors.push([i, j - 1])

            if (area[i][j + 1])
                neighbors.push([i, j + 1])

            if (area[i - 1])
                neighbors.push([i - 1, j])

            if (area[i + 1])
                neighbors.push([i + 1, j])

            console.log({i, j})
            console.log({neighbors})

            const isNeighborsMeetTolerance = neighbors
                .every(neighbor => area[neighbor[0]][neighbor[1]] > tolerance)

            if (percent > tolerance && isNeighborsMeetTolerance) {
                x.push(
                    Math.floor(100 / (3 / j)),
                    Math.floor(100 / (3 / (j + 1)))
                )
                y.push(
                    Math.floor(100 / (3 / i)),
                    Math.floor(100 / (3 / (i + 1)))
                )
            }
        }
    }
    const logoWidthPercent = Math.ceil((logoWidth * 100) / width)
    const logoHeightPercent = Math.ceil((logoHeight * 100) / height)
    const xRange = [Math.min(...x), Math.max(...x)]
    const yRange = [Math.min(...y), Math.max(...y)]

    if (xRange[0] < logoWidthPercent) xRange[0] += logoWidthPercent
    if (xRange[1] === 100) xRange[1] -= logoWidthPercent

    if (yRange[0] < logoHeightPercent) yRange[0] += logoHeightPercent
    if (yRange[1] === 100) yRange[1] -= logoHeightPercent

    console.log({logoWidth, logoHeight, logoWidthPercent, logoHeightPercent, width, height})

    return {xRange, yRange}
}