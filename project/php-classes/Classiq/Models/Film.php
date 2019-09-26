<?php


namespace Classiq\Models;

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

    }


}