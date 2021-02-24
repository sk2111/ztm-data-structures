// postion will be like A1,B2 [col,row]
class ChessBoard {
    constructor() {
        this.columnName = new Set(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
        this.rowName = new Set(['1', '2', '3', '4', '5', '6', '7', '8']);
        this.validPositionLength = 2;
    }
    getPositionArr(position) {
        return String(position).toUpperCase().split('');
    }
    checkValidMove(position) {
        const posArr = this.getPositionArr(position);
        if (posArr.length === this.validPositionLength) {
            return this.columnName.has(posArr[0]) && this.rowName.has(posArr[1]);
        }
        else {
            console.log("Invalid Position given", position);
            return false;
        }
    }
}

class Horse extends ChessBoard {
    constructor(horsePosition) {
        super();
        this.initialHorsePosition = String(horsePosition).toUpperCase();
    }
    getValidMoves(newColHigh, newColLow, newRowUp, newRowDown) {
        const validMove = {};
        const possibleMoves = [newColHigh + newRowUp, newColHigh + newRowDown,
        newColLow + newRowUp, newColLow + newRowDown,];
        for (let i = 0; i < possibleMoves.length; i++) {
            if (this.checkValidMove(possibleMoves[i])) {
                validMove[possibleMoves[i]] = {};
            }
        }
        return validMove;
    }
    getPossibleVerticalMove(posArr, colCode) {
        const newRowUp = +posArr[1] + 2;
        const newRowDown = +posArr[1] - 2;
        const newColHigh = String.fromCharCode(colCode + 1);
        const newColLow = String.fromCharCode(colCode - 1);
        return this.getValidMoves(newColHigh, newColLow, newRowUp, newRowDown);
    }
    getPossibleHorzontalMove(posArr, colCode) {
        const newColHigh = String.fromCharCode(colCode + 2);
        const newColLow = String.fromCharCode(colCode - 2);
        const newRowUp = +posArr[1] + 1;
        const newRowDown = +posArr[1] - 1;
        return this.getValidMoves(newColHigh, newColLow, newRowUp, newRowDown);
    }

    getPossibleHorseMoves(position) {
        if (this.checkValidMove(position)) {
            const posArr = this.getPositionArr(position);
            const colCode = String(posArr[0]).charCodeAt(0);
            const verticalMoves = this.getPossibleVerticalMove(posArr, colCode);
            console.log(verticalMoves);
        }
        else {
            console.log("Invalid horse position", position);
        }
    }
}

const horseRef = new Horse('a1');
console.log(horseRef.getPossibleHorseMoves(horseRef.initialHorsePosition));