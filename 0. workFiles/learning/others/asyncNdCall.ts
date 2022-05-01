const fin = () => {
    console.log("termine...")
}

function showChars(word: string, time: number){
    setTimeout(() => {
        let arr = word.split('');
        arr.forEach(
            (char) => {console.log(char);}
        )
    }, time);
}

showChars('hola',0);
showChars('hola',250);
showChars('hola',500);
