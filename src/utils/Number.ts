export function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function maximalRectangle(matrix: Array<Array<number | string>>) {
    let m; // iterator for columns
    let n; // iterator for rows
    const M = matrix[0].length; // number of columns;
    const N = matrix.length; // number of rows
    const c = []; // linear cache
    const s = []; // stack of {col, row} pairs
    let best_ll = {col: 0, row: 0}; // lower-left corner
    let best_ur = {col: -1, row: -1}; // upper-right corner
    let best_area = 0; // int. Superfluous, since you can compute it from `best_ll` and `best_ur`

    for (m = 0; m != M + 1; ++m) {
        c[m] = 0;
        s[m] = {col: 0, row: 0};
    }
    for (n = 0; n != N; ++n) {
        for (m = 0; m != M; ++m) {
            c[m] = matrix[n][m] ? (c[m] + 1) : 0; // update cache
        }
        let open_width = 0;
        for (m = 0; m != M + 1; ++m) {
            if (c[m] > open_width) { /* Open new rectangle? */
                s.push({col: m, row: open_width});
                open_width = c[m];
            } else if (c[m] < open_width) { /* Close rectangle(s)? */
                let m0;
                let n0;
                let area;
                do {
                    const cell = s.pop();
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    m0 = cell.col;
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    n0 = cell.row;
                    area = open_width * (m - m0);
                    if (area > best_area) {
                        best_area = area;
                        best_ll = {col: m0, row: n};
                        best_ur = {col: m - 1, row: n - open_width + 1};
                    }
                    open_width = n0;
                } while (c[m] < open_width);
                open_width = c[m];
                if (open_width != 0) {
                    s.push({col: m0, row: n0});
                }
            }
        }
    }
    return {
        best_area: best_area,
        i: best_ll.row,
        j: best_ll.col,
        m: best_ur.row,
        n: best_ur.col
    }
}


export function chooseAreaByNeighboorhood(area: Matrix, logoWidth: number, logoHeight: number, width: number, height: number, tolerance = 80) {
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

            // console.log({i, j})
            // console.log({neighbors})

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

    // console.log({logoWidth, logoHeight, logoWidthPercent, logoHeightPercent, width, height})

    return {xRange, yRange}
}