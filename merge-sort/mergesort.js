const a = [3, 5, 1, 2, 8, 7, 9, 10, 5, 4];



function divide(arr) {

    console.log("Test", arr);
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);

    const left = divide(arr.slice(0, middle));
    const right = divide(arr.slice(middle));

    return sort(left, right);

}

function sort(leftArr, rightArr) {

    const returnArr = [];
    let leftIdx = 0;
    let rightIdx = 0;

    console.log("Sorter", leftArr, rightArr);
    while (leftIdx < leftArr.length && rightIdx < rightArr.length) {
        if (leftArr[leftIdx] < rightArr[rightIdx]) {
            returnArr.push(leftArr[leftIdx]);
            leftIdx++;
        }
        else {
            returnArr.push(rightArr[rightIdx]);
            rightIdx++;
        }
    }

    const result = [...returnArr, ...leftArr.slice(leftIdx), ...rightArr.slice(rightIdx)];
    console.log("Return result",result)

    return result;

}

divide(a);