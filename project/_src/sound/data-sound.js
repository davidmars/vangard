window.createjs={};
require("soundjs/lib/soundjs.min");


window.SOUNDS={
    "tap":"tap",
    "beepGlitch":"beepGlitch",
    "swing":"swing",
    "subbass":"subbass"
};
function loadSound () {
    createjs.Sound.registerSound(`${LayoutVars.fmkHttpRoot}/project/_src/sound/tap.mp3`, window.SOUNDS.tap);
    createjs.Sound.registerSound(`${LayoutVars.fmkHttpRoot}/project/_src/sound/beep-glitchy.mp3`, window.SOUNDS.beepGlitch);
    createjs.Sound.registerSound(`${LayoutVars.fmkHttpRoot}/project/_src/sound/subbass.wav`, window.SOUNDS.subbass);
    createjs.Sound.registerSound(`${LayoutVars.fmkHttpRoot}/project/_src/sound/swing.wav`, window.SOUNDS.swing);
}
loadSound();

let lastTime=new Date().getTime();

window.playSound=function (soundId,volume=1,forcePlay=true) {
    let t=new Date().getTime();
    let timeDiff=t - lastTime;
    console.log("timeDiff",timeDiff);
    if(timeDiff > 1000 || forcePlay){
        let s=createjs.Sound.play(soundId);
        s.volume=volume;
        lastTime=t;
    }

};


