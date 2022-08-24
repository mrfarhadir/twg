export function getPositionFromAreaPercent(areaString: string, logoWidth: number, logoHeight: number, width: number, height: number, tolerance = 89) {

    const area: Array<number | string> = areaString.split(',')

    let xRange = []
    let yRange = []
    let i = -1
    let j = -1

    for (let k = 0; k < area.length; k++) {
        if (parseInt(area[k].toString()) > tolerance) {
            i = Math.floor(k / 3)
            j = k % 3
            break;
        }
    }
    // console.log(area)
    // console.log({i, j})
    xRange.push(
        Math.floor(100 / (3 / j)),
        Math.floor(100 / (3 / (j + 1)))
    )
    yRange.push(
        Math.floor(100 / (3 / i)),
        Math.floor(100 / (3 / (i + 1)))
    )



    const logoWidthPercent = Math.ceil((logoWidth * 100) / width)
    const logoHeightPercent = Math.ceil((logoHeight * 100) / height)

    // if (xRange[0] < logoWidthPercent) xRange[0] += logoWidthPercent
    // if (xRange[1] === 100) xRange[1] -= logoWidthPercent
    //
    // if (yRange[0] < logoHeightPercent) yRange[0] += logoHeightPercent
    // if (yRange[1] === 100) yRange[1] -= logoHeightPercent

    if (i === -1) xRange = [50, 50]
    if (j === -1) yRange = [50, 50]

    xRange = [50, 50]
    yRange = [50, 50]

    return {xRange, yRange}
}