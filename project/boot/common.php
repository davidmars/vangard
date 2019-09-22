<?php
//définir la version en random pour contourner le cache
use Classiq\Classiq;
use Classiq\Models\User;
use Classiq\Wysiwyg\Wysiwyg;
use Localization\Lang;

Classiq::install();


//loged in?
if(User::connected()){
    the()->human->isAdmin = Wysiwyg::$enabled = User::connected()->isAdmin();
}

/**
 * Pour avoir des textes d'interface
 * @param string $term
 * @return string
 */
function trad($term){
    return the()->project->translation($term);
}
/**
 * Accès rapide vers les classes utilitaires
 * @return \Pov\Utils\Utils
 */
function utils(){
    return pov()->utils;
}



Lang::$flagsUrlBasePath="vendor/davidmars/localization/flags/";