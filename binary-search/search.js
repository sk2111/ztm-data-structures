const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function search(num, start, end) {

    let middle = start + parseInt((end - start) / 2);
    console.log(middle);
    if (num === arr[middle]) {
        console.log("Element match found");
        return 'Element Found'
    }
    if (start === end) {
        console.log("Hitting base case", start, end);
        return null;
    }

    return num > arr[middle] ? search(num, middle + 1, end) : search(num, start, middle - 1);
}


search(4, 0, arr.length);