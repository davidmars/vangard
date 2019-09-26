<?php


namespace Classiq\Models;

use Classiq\Models\JsonModels\ListItem;

/**
 * Class Film
 * @package Classiq\Models
 *
 * @property $previews Liste des preview vidéo
 * @property string $video L'url Vimeo de la video
 * @property string $subtitle_lang le sous titre
 *
 */
class Film extends Page
{
    static $icon="cq-tests-film-play";

    /**
     * Les previews du film
     * @return Preview[]
     */
    public function previews(){
        return Preview::getByUids($this->previews);
    }
    public function getVideoEmbed(){

        $iframe=$this->video;
        $service_id="";
        $service="";
        $iframeTag="";
        if($iframe){
            $serviceUrl=utils()->iFrame->srcFromServiceUrl($iframe);
            if($serviceUrl){
                $serviceUrl=utils()->iFrame->vimeoSrcPlayerParams($serviceUrl,"2AA1DB",0,0,0,0,0);
                $serviceUrl=utils()->iFrame->youtubeSrcPlayerParams($serviceUrl,"2AA1DB",0,0,0,0,0);
            }
            if($serviceUrl){
                return $serviceUrl;
            }
        }

        return "https://player.vimeo.com/video/262031813?title=0&byline=0&portrait=0&auoplay=true";

    }


    /**
     * La liste des films
     * @return Page[]
     */
    private static $_list;
    /**
     * La liste des films
     * @return Film[]
     */
    private static function listFilms(){
        if(!self::$_list){
            self::$_list=[];
            $items=ListItem::getList("vars.films",Nav::getByName("liste de films", true));
            foreach ($items as $i){
                $film=$i->targetUid(true);
                if($film){
                    self::$_list[]=$film;
                }
            }
        }
        return self::$_list;
    }


    /**
     * @return Film
     */
    public function previous(){
        $list=array_reverse(self::listFilms());
        $f=false;
        foreach ($list as $film){
            if($f){
                return $film;
            }
            if($film->uid()===$this->uid()){
                $f=true;
            }
        }
        return $list[0];
    }

    /**
     * @return Film
     */
    public function next(){
        $list=self::listFilms();
        //array_reverse($list);
        $f=false;
        foreach ($list as $film){
            if($f){
                return $film;
            }
            if($film->uid()===$this->uid()){
                $f=true;
            }
        }
        return $list[0];
    }


}