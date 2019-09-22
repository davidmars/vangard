<?php


namespace Classiq\Models;

/**
 * Class Preview
 * @package Classiq\Models
 *
 * @property $thumbnail
 * @property $video
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
        }
        return $v;
    }
}