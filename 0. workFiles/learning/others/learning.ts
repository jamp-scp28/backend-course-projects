/* 
function sum(num1:number,num2:number){
    return num1 + num2;
}

let variable = () =>{
    return sum(1,2);
} 

let dos = variable();

console.log(dos); */

function showList(myList: number[]){
    console.log(myList);
    
    if (myList.length > 1){
        for (let i=0;i<myList.length;i++){
            console.log(myList[i]);
        }
    }else{
        console.log("List is empty...")
    }
}

showList([1,2,3,4])