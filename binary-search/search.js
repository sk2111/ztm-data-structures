const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function search(num, start, end) {
    let middle = start + parseInt((end - start) / 2);
    if (num === arr[middle]) {
        return 'Element Found' + ' ' + num;
    }
    if (start === end) {
        
        return 'No Match Found';
    }

    return num > arr[middle] ? search(num, middle + 1, end) : search(num, start, middle - 1);
}


search(4, 0, arr.length);