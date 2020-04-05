<?php


namespace Classiq\Models;

use GUMP;

/**
 * Class Preview
 * @package Classiq\Models
 *
 * @property $thumbnail
 * @property $video
 * @property $videoios
 */
class Preview extends Classiqmodel
{
    use WithFieldThumbnailTrait;

    static $icon="cq-play";

    //--------------------------validations---------------------------------------

    /**
     * Renvoie les règles de validation
     * @return array ouù chaque entrée ressemble à "champ"=>"regle"
     * @see https://github.com/Wixel/GUMP#available-validators
     */
    protected function _validators(){
        $v=parent::_validators();
        if($this->id){
            $v["thumbnail"]="required";
            $v["video"]="required";
            $v["videoios"]="required";
        }
        return $v;
    }

    /**
     * @return Filerecord|null[string
     */
    public function video($asString=true,$ios=false,$mime=false){
        /** @var Filerecord $r */
        if($ios){
            $r= Filerecord::getByUid($this->videoios);
        }else{
            $r= Filerecord::getByUid($this->video);
        }

        if($r){
            if($asString){

                if($mime){
                    return $r->mime;
                }else{
                    return  $r->httpPath();
                }
            }
            return $r;
        }
        return null;
    }

    public function getErrors(){
        /** @var Filerecord $video */
        $video=$this->video(false);
        $errors=parent::getErrors();
        if($this->video){
            if(!$video){
                $errors["video"]="problème vidéo";
            }
            if($video && !strpos($video->mime,"webm")){
                $errors["video"]="Il faudrait encoder la vidéo en .webm";
            }
        }

        if($this->thumbnail && !$this->thumbnail(true)){
            $errors["thumbnail"]="problème preview";
        }

        return $errors;
    }
}