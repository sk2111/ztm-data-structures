function add(num,isGreaterThan9){
    if(num <= 9){
        return num;
    }
    const result = num%10 + add(parseInt(num/10),false);
    console.log("first call",isGreaterThan9,result)
    return isGreaterThan9? add(result,result>9): result;
}


console.log(add(999999999999999,true));