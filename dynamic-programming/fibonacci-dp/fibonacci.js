function fibMemo() {
    let cache = {};
    return function fibonacci(n) {
        if (n < 2 || cache[n]) {
            return n < 2 ? n : cache[n];
        }
        cache[n] = fibonacci(n - 1) + fibonacci(n - 2);
        return cache[n];
    }
}

const fibonacci = fibMemo();

console.log(fibonacci(10));