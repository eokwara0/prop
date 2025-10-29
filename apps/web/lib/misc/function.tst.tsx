

function map<Input, Output>( arr : Input[] , func : (arg : Input) => Output ) : Output[]{
    const result : Output[] = [];
    arr.forEach(x => result.push( func(x)));
    return result;
} 


const parsed = map([12,3,4,5], (n) => String(n));

console.log(parsed);


function longest<T extends {length : number}>(a : T , b : T ){

}   

longest<string>("293" , "2983");