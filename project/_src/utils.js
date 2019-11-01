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