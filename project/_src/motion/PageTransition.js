import {Power3} from "gsap";

export default class PageTransition{
    constructor(){
        let me=this;
        this.$rect=$("#transition-rect");
        this.rectColor="#222222";
        this.transparent="rgba(0,0,0,0)";
        //fake film typo
        this.$transiFilm=$(require("./transi-film.html"));
        $(".film[poster]").each(function(){
           let $img=$("<img>");
           $img.attr("src",$(this).attr("poster"));
           me.$transiFilm.find(".images").append($img);
        });
        $body.find("#root").append(this.$transiFilm);
        /*
        $body.on("mousedown","[page-transition-click]",function(){
            pageTransition.rectToElement($(this));
        });
        */
    }

    $elements(){
        let me=this;
        return me.$elementsFilms()
            .add(me.$filmItemsSmall());
    }
    $elementsPage(){
        let me=this;
        return me.$prevNext()
            .add(me.$traits())
            .add(me.$embeds())
            .add(me.$photos())
            .add(me.$top())
            .add(me.$titres())
            .add(me.$textes());
    }
    $elementsFilms(){
        let me=this;
        return  me.$filmItems()
                .add(me.$filmItemsSmall());
    }

    $prevNext(){
        return $body.find("#main-content [data-js='PrevNext']");
    }
    $traits(){
        return $body.find("#main-content hr");
    }
    $embeds(){
        return $body.find("#main-content .embed-responsive");
    }
    $photos(){
        return $body.find("#main-content .photo-item");
    }
    $top(){
        return $body.find("#main-content .top");
    }
    $titres(){
        return $body.find("#main-content h1")
            .add("#main-content h2");
    }
    $textes(){
        return $body.find("#main-content .text-rich");
    }
    $filmItems(){
        return $body.find("#films .film span");
    }
    $filmItemsSmall(){
        return $body.find("#films .film i");
    }

    /**
     * Cache les éléments dans la page
     */
    hidePage(){
        let me=this;
        TweenMax.to(me.$textes(),1.5,{y:-50,opacity:0,ease: Power2.easeInOut})
        TweenMax.to(me.$prevNext(),1.5,{y:-80,opacity:0,ease: Power2.easeInOut})
        TweenMax.to(me.$titres(),1.5,{y:-60,opacity:0,ease: Power3.easeInOut})
        TweenMax.to(me.$embeds(),1.5,{y:-200,opacity:0,ease: Back.easeIn})
        TweenMax.to(me.$top(),1.3,{y:-220,opacity:0,ease: Power3.easeInOut})
        TweenMax.to(me.$traits(),1.5,{width:0,ease: Expo.easeOut})
        me.$photos().each(function(){
            TweenMax.to($(this),1.5,{y:-50*Math.random()-50,opacity:0,ease: Power4.easeInOut})
        });
    }

    /**
     * Cache les éléments dans la page
     */
    showPage(){
        let me=this;
        me.restorePage();
        TweenMax.from(me.$textes(),1.5,{y:50,opacity:0,ease: Power1.easeInOut});
        TweenMax.from(me.$prevNext(),1.5,{y:80,opacity:0,ease: Power2.easeInOut});
        TweenMax.from(me.$titres(),1.5,{y:60,opacity:0,ease: Power3.easeInOut});
        TweenMax.from(me.$embeds(),1.5,{y:200,opacity:0,ease: Back.easeOut});
        TweenMax.from(me.$top(),1.8,{y:120,opacity:0,ease: Expo.easeOut});
        TweenMax.from(me.$traits(),1.5,{width:0,ease: Expo.easeOut});
        me.$photos().each(function(){
            TweenMax.from($(this),1.5,{y:50*Math.random()-50,opacity:0,ease: Power4.easeInOut})
        });
    }

    /**
     * Cache les films
     */
    hideFilms(){
        let me=this;
        me.$filmItems().each(function(){
            //TweenMax.to($(this),Math.random()+0.5,{y:-50*Math.random()-50,opacity:0,ease: Back.easeIn})
            TweenMax.to($(this),1.5,{y:-500,ease: Power2.easeInOut})
        });
        me.$filmItemsSmall().each(function(){
            //TweenMax.to($(this),Math.random()+0.5,{y:-50*Math.random()-50,opacity:0,ease: Back.easeIn})
            TweenMax.to($(this),1.7,{y:-500,delay:0.2,ease:Power2.easeInOut})
        });
    }
    /**
     * Cache les films
     */
    showFilms(){
        let me=this;
        me.$filmItems().each(function(){
            //TweenMax.to($(this),Math.random()+0.5,{y:-50*Math.random()-50,opacity:0,ease: Back.easeIn})
            TweenMax.from($(this),0.5,{y:500,ease: Power2.easeInOut})
        });
        me.$filmItemsSmall().each(function(){
            //TweenMax.to($(this),Math.random()+0.5,{y:-50*Math.random()-50,opacity:0,ease: Back.easeIn})
            TweenMax.from($(this),0.7,{y:500,ease: Power2.easeInOut})
        });
    }

    clickFilm($film){
        let me=this;
        //construit...
        //le bon texte
        let $text=me.$transiFilm.find(".titre");
        let $textContainer=$text.parent();
        $text.text($film.find(".h0>span").text());
        let pos=$film.find(".h0>span")[0].getBoundingClientRect();
        //la bonne photo
        me.$transiFilm.find("img").removeClass("visible");
        me.$transiFilm.find(`img[src='${$film.attr("poster")}']`).addClass("visible");
        //la bonne position
        TweenMax.set($text,{x:pos.left,y:pos.top});
        //zoome typo et apparait

        let sc=1.6;
        let t=0.5;
        let ea=Power4.easeOut;

        TweenMax.fromTo(me.$transiFilm,t,{opacity:0},
            {opacity:1,ease:Power0.easeInOut}
        );

        TweenMax.fromTo($text,t*3,{scale:1},
            {scale:sc,ease:ea}
        );
        TweenMax.fromTo($film,t*3,{scale:1},
            {scale:sc,ease:ea}
        );

        setTimeout(function(){
            TweenMax.set($film,{scale:1,opacity:1});
            TweenMax.set(me.$transiFilm,{clearProps:"all"});
            TweenMax.set($text,{clearProps:"all"});
            TweenMax.set($textContainer,{clearProps:"all"});
        },t*10*1000);

    }

    hide(cb){
        let $elements=this.$elements();
        let $invisibles=[];
        $elements.each(function(){
            let $el=$(this);
                TweenMax.set($el, {overflow: 'hidden'});
                if(!isVisible($(this)[0])){
                    $invisibles.push($(this))
                }
        });
        for(let $el of $invisibles){
            TweenMax.set($el, {visibility: 'hidden'});
        }

        this.hidePage();
        this.hideFilms();

        setTimeout(function(){
            if(cb) {cb();}
        },1000)

    }
    show(cb){
        //alert("show");
        let me=this;
        me.restoreAll();
        me.showPage();
        me.showFilms();
        setTimeout(function(){
            if(cb) {cb();}
            me.restoreAll();
        },2000)

    }
    restoreFilms(){
        TweenMax.set(this.$elementsFilms(), {clearProps: 'all'});
    }
    restorePage(){
        TweenMax.set(this.$elementsPage(), {clearProps: 'all'});
    }
    restoreAll(){
        this.restoreFilms();
        this.restorePage();
    }

}