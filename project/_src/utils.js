window.randChar=function(){
    let possible= "abcdefghijklmnoprstuvwxyz!?#";
    return possible.charAt(Math.floor(Math.random() * possible.length));
};
/**
 *
 * @param {number} inputValue
 * @param {number} inputMax
 * @param {number} outputMax
 * @param {number} inputMin
 * @param {number} outputMin
 * @returns {number}
 */
window.ratio=function(inputValue, inputMax, outputMax, inputMin=.0, outputMin=.0){
    let product = (inputValue - inputMin) / (inputMax - inputMin);
    return ((outputMax - outputMin) * product) + outputMin;
};

window.isVisible=function(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
};


let ua = window.navigator.userAgent;
window.machine={};
machine.isIos=/iPad|iPhone|iPod/.test(ua) && !window.MSStream;
machine.isWebkit = !!ua.match(/WebKit/i);
machine.isIosSafari = machine.isIos && machine.isWebkit && !ua.match(/CriOS/i);
machine.isInApp=window.matchMedia('(display-mode: standalone)').matches;
machine.isAndroid=/(android)/i.test(ua);
machine.isTouch=!!('ontouchstart' in window) || !!('msmaxtouchpoints' in window.navigator);
machine.hasHover=window.matchMedia("(hover: hover)").matches ? true : false;


window.secondsToMMSS=function(seconds){
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m=String(m).padStart(2, '0');
    s=String(s).padStart(2, '0');
    return `${m}:${s}`;
}

window.mouseIsDown=false;
window.addEventListener("mousedown", function(){
    window.mouseIsDown=true;
})
window.addEventListener("mouseup", function(){
    window.mouseIsDown=false;
})
