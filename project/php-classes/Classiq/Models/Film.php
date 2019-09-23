<?php


namespace Classiq\Models;

/**
 * Class Film
 * @package Classiq\Models
 *
 * @property $previews Liste des preview vidéo
 * @property $video
 *
 */
class Film extends Page
{
    static $icon="cq-tests-film-play";

    /**
     * @return Preview[]
     */
    public function previews(){
        return Preview::getByUids($this->previews);
    }

}