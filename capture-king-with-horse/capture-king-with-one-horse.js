// postion will be like A1,B2 [col,row]
class ChessBoard {
    constructor() {
        this.columnName = new Set(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
        this.rowName = new Set(['1', '2', '3', '4', '5', '6', '7', '8']);
        this.validPositionLength = 2;
        this.vistedList = new Set();
        this.debugLog = false;
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
            if (this.debugLog) console.log("Invalid Position given", position);
            return false;
        }
    }
}

class Horse extends ChessBoard {
    constructor(horsePosition, kingPosition) {
        super();
        this.initialHorsePosition = horsePosition;
        this.depthKey = 0;
        this.trace = { [this.depthKey]: { [horsePosition]: { parent: null } } };
        this.targetPosition = kingPosition;
        this.targetCaptured = false;

    }
    getValidMoves(possibleMoves, parent) {
        const validMove = {};
        for (let i = 0; i < possibleMoves.length; i++) {
            if (this.checkValidMove(possibleMoves[i])) {
                validMove[possibleMoves[i]] = { parent };
            }
        }
        return validMove;
    }
    getHVMoves(posArr, colCode, rowPos, colPos) {
        const newRowUp = +posArr[1] + rowPos;
        const newRowDown = +posArr[1] - rowPos;
        const newColHigh = String.fromCharCode(colCode + colPos);
        const newColLow = String.fromCharCode(colCode - colPos);
        const possibleMoves = [
            newColHigh + newRowUp,
            newColHigh + newRowDown,
            newColLow + newRowUp,
            newColLow + newRowDown,
        ];
        return this.getValidMoves(possibleMoves,posArr.join(''));
    }
    framePossibleMoves(position) {
        const posArr = this.getPositionArr(position);
        const colCode = String(posArr[0]).charCodeAt(0);
        const verticalMoves = this.getHVMoves(posArr, colCode, 2, 1);
        const horizontalMoves = this.getHVMoves(posArr, colCode, 1, 2);
        return { ...verticalMoves, ...horizontalMoves }
    }
    getPossibleHorseMoves(position) {
        if (this.checkValidMove(position)) {
            return this.framePossibleMoves(position);
        }
        else {
            console.log("Invalid horse position", position);
        }
    }

    captureKing() {
        while (!this.targetCaptured) {
            let moves = Object.keys(this.trace[this.depthKey]);
            let temp = {};
            for (let i = 0; i < moves.length; i++) {
                const newMoves = this.getPossibleHorseMoves(moves[i]);
                temp = { ...temp, ...newMoves };
            }
            this.targetCaptured = temp[this.targetPosition];
            this.depthKey++;
            this.trace[this.depthKey] = { ...temp };
        }

        console.log("%cTarget Captured", "color:green;font-size:18px");


        let traceBackKey = this.targetPosition;
        const path = [];
        for (let i = this.depthKey; i >= 0; i--) {
            path.push(traceBackKey);
            traceBackKey = this.trace[i][traceBackKey]['parent'];
        }
        console.log("%cFollow the steps", "color:blue;font-size:18px;");
        console.log(`%c${path.reverse().join(' -> ')}`, "color:pink;font-size:16px;");
    }

}

const horseRef = new Horse('A1', 'G7');
horseRef.captureKing();

console.log("This final trace reference", horseRef.trace);