import TypeIt from 'typeit';

export default class TextMotion{
    constructor(){

    }
    apparitions(){
        let delay=0;
        let me =this;
        //$(".fs2,.fs-section-small,.ttt,.tick,.aaa,.ddd").filter(":not(.done)").each(function(){
        $(".fs2,.fs-section-small,[tm],.tick,.aaa,.ddd").filter(":not(.done)").each(function(){
            //if(Kibouj.isScrollVisible($(this))){
                delay+=0.1;
                let $el=$(this);
                $el.addClass("done");

                if($el.is(".tick")){
                    $el.css("visibility","visible");
                    TweenMax.fromTo($(this),0.5,{scaleX:0},{scaleX:1,delay:delay});
                }

                if($el.is(".fs2,.fs-section-small,[tm]")){
                    //TweenMax.delayedCall(delay,me.textMotion,[$el,true])
                    TweenMax.delayedCall(delay,me.typeText,[$el])
                }

                if($el.is(".aaa")){
                    $el.css("visibility","visible");
                    TweenMax.fromTo($(this),0.2,{opacity:0,y:50,scale:0.9},{opacity:1,y:0,scale:1,delay:delay});

                }
                if($el.is(".ddd")){
                    $el.css("visibility","visible");
                    TweenMax.fromTo($(this),0.2,{opacity:0,scale:0.9},{opacity:1,scale:1,delay:delay});
                }
            //}
        });
    };

    typeText($el){
        $el.css("visibility","visible");
        let t=$el.text();
        $el.text("");
        new TypeIt($el[0],{
            cursor:false,
            speed:50,
            startDelay:0
        })
            .type(t)
            .go();
    }

    /**
     *
     * @param {jquery} $elements
     * @param totalRandom
     */
    textMotion($elements,totalRandom){
        $elements.each(function(){
           let $el=$(this);
            let text;
            $el.css("visibility","visible");
            var possible = "abcdefghijklmnopqrstuvwxyz!?#";
            var possibleNumbers = "0123456789";
            if(!$el.attr("ttt")){
                text=$el.text();
                $el.attr("ttt",text);
            }else{
                text=$el.attr("ttt");
            }

            let ar = text.split("");
            let arFinal = text.split("");
            let idx=0;

            let endLoop;
            if(totalRandom){
                endLoop=10;
            }else{
                endLoop=ar.length;
            }

            $el.height($el.height());
            $el.width($el.width());
            $el.css("overflow","hidden");
            $el.text("");

            let loop=setInterval(function(){
                idx+=0.3;
                let ii=Math.floor(idx);
                if(idx>endLoop){
                    clearInterval(loop);
                    $el.text(arFinal.join(""));
                    $el.css("height","");
                    $el.css("width","");
                    $el.css("overflow","");

                }else{
                    let start;
                    if(totalRandom){
                        start=0;
                    }else{
                        start=ii;
                    }
                    for(var i=start;i<ar.length-1;i++){
                        if(arFinal[i]===" "){
                            ar[i]= arFinal[i];
                        }else if(isNaN(arFinal[i])===false){
                            ar[i]=possibleNumbers.charAt(Math.floor(Math.random() * possibleNumbers.length));
                        }else if(arFinal[i]===arFinal[i].toUpperCase()){
                            ar[i]=possible.charAt(Math.floor(Math.random() * possible.length)).toUpperCase();
                        }else{
                            ar[i]=possible.charAt(Math.floor(Math.random() * possible.length));
                        }

                    }
                    if(!totalRandom){
                        ar[ii]=arFinal[ii];
                    }

                    $el.text(ar.join(""));
                }
            },0.02*1000);
        });


    };
}