class ColorMatrix {
    constructor() {

    }

    getRandomValue(range) {
        const { start, end } = range;
        const randValue = start + (Math.random() * (end - start));
        return parseInt(randValue);
    }

    generateMatrix(n, m, range) {
        const matrix = [];

        for (let i = 0; i < n; i++) {
            const temp = [];
            for (let j = 0; j < m; j++) {
                temp.push(this.getRandomValue(range))
            }
            matrix.push(temp);
        }

        return matrix;
    }

    printMatrix(matrix, n, m) {
        for (let i = 0; i < n; i++) {
            const temp = [];
            for (let j = 0; j < m; j++) {
                temp.push(matrix[i][j])
            }
            console.log(temp.join(' '));
        }
    }

    recursiveColor(matrix, colorCode, newColorCode, posX, posY) {
        if (matrix[posX] === undefined || matrix[posX][posY] !== colorCode) {
            return null;
        }
        if (matrix[posX][posY] === colorCode) {
            matrix[posX][posY] = newColorCode;
        }

        this.recursiveColor(matrix, colorCode, newColorCode, posX + 1, posY - 1);
        this.recursiveColor(matrix, colorCode, newColorCode, posX + 1, posY);
        this.recursiveColor(matrix, colorCode, newColorCode, posX + 1, posY + 1);
        this.recursiveColor(matrix, colorCode, newColorCode, posX, posY + 1);
        this.recursiveColor(matrix, colorCode, newColorCode, posX, posY - 1);
        this.recursiveColor(matrix, colorCode, newColorCode, posX - 1, posY - 1);
        this.recursiveColor(matrix, colorCode, newColorCode, posX - 1, posY);
        this.recursiveColor(matrix, colorCode, newColorCode, posX - 1, posY + 1);
    }


    colorMe(colorCode, newColorCode, posX, posY, n, m, range) {
        const matrix = this.generateMatrix(n, m, range);
        this.printMatrix(matrix,n,m);
        this.recursiveColor(matrix, colorCode, newColorCode, posX, posY);

        console.log("Print the matrix", matrix);
    }
}

const colorMatrix = new ColorMatrix();

colorMatrix.colorMe(1, 3, 0, 0, 4, 4, { start: 0, end: 4 });