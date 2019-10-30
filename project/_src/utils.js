window.randChar=function(){
    let possible= "abcdefghijklmnoprstuvwxyz!?#";
    return possible.charAt(Math.floor(Math.random() * possible.length));
}