<?php
use Classiq\Classiq;
use Classiq\Models\User;
use Classiq\Wysiwyg\Wysiwyg;
use Classiq\Wysiwyg\WysiwygConfig;
use Localization\Lang;



//les messages d'erreur sur les modèles
include_once __DIR__ . "/gump.php";
//load la bdd
include_once __DIR__ . "/db.php";
//les events...
include_once __DIR__ . "/events.php";
//logged in ou pas
include_once __DIR__ . "/common.php";
//définition des modèles / admin / seo
include_once __DIR__ . "/models.php";
//email config
include_once __DIR__ . "/mail-config.php";

the()->version(date("Y-m-d-His"));
//the()->version(); //TODO mettre en fixe (pour avoir un cache css js etc...)
/**
 * Accès rapide vers methodes et variables propres au site
 * @return \Startup\Site
 */
function site(){
    return \Startup\Site::inst();
}




