function add(num,combineSumAgain){
    if(num <= 9){
        return num;
    }
    const result = num%10 + add(parseInt(num/10),false);
    console.log("first call",combineSumAgain,result)
    return combineSumAgain? add(result,result>9): result;
}


console.log(add(999999999999999,true));