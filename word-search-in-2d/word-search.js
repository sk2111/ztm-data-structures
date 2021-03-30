// possible way iterative solution;


const userMatrix = [
    ['A', 'B', 'C', 'D'],
    ['E', 'F', 'G', 'H'],
    ['I', 'J', 'K', 'L'],
    ['M', 'N', 'O', 'I'],
];
const wordToFind = 'IJKL';


function iterativeCheck(matrix, i, j, rowIncrementor, colIncrementor, wordToFind) {
    let wordIdx = 0;
    while (matrix[i] && matrix[i][j] && wordIdx < wordToFind.length) {
        if (matrix[i][j] != wordToFind[wordIdx]) {
            return false;
        }
        wordIdx++;
        i += rowIncrementor;
        j += colIncrementor;
    }
    return wordIdx === wordToFind.length ? true : false;
}

function performSearch(matrix, row, col, wordToFind) {

    const lA1 = iterativeCheck(matrix, row, col, 0, 1, wordToFind);
    const lA2 = iterativeCheck(matrix, row, col, 0, -1, wordToFind);
    const lA3 = iterativeCheck(matrix, row, col, 1, 0, wordToFind);
    const lA4 = iterativeCheck(matrix, row, col, -1, 0, wordToFind);

    const dA1 = iterativeCheck(matrix, row, col, 1, 1, wordToFind);
    const dA2 = iterativeCheck(matrix, row, col, 1, -1, wordToFind);
    const dA3 = iterativeCheck(matrix, row, col, -1, 1, wordToFind);
    const dA4 = iterativeCheck(matrix, row, col, -1, -1, wordToFind);

    return lA1 || lA2 || lA3 || lA4 || dA1 || dA2 || dA3 || dA4;
}

function findPosition(matrix, N, M, wordToFind) {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (matrix[i][j] === wordToFind[0]) {
                const result = performSearch(matrix, i, j, wordToFind);
                if(result){
                    console.log("Match found at", i, j);
                }
                else{
                    console.log("Match Not found for", i, j);
                }
            }
        }
    }
}

findPosition(userMatrix, 4, 4, wordToFind);