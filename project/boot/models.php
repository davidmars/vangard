<?php
if(the()->human->isAdmin){
    //conf backoffice
    \Classiq\Wysiwyg\WysiwygConfig::inst()->recordsWeCanBrowse=["Page","Film","Preview"];
    \Classiq\Wysiwyg\WysiwygConfig::inst()->recordsWeCanCreate=["Page","Film","Preview"];
    \Classiq\Wysiwyg\WysiwygConfig::inst()->recordsWeCanSelect=["Page","Film","Preview"];
}

//seo
\Classiq\Seo\C_sitemap_xml::$modelTypesToIndex=["page","film"];