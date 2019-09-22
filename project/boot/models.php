<?php
if(the()->human->isAdmin){
    //conf backoffice
    \Classiq\Wysiwyg\WysiwygConfig::inst()->recordsWeCanBrowse=["page","film","preview"];
    \Classiq\Wysiwyg\WysiwygConfig::inst()->recordsWeCanCreate=["page","film","preview"];
    \Classiq\Wysiwyg\WysiwygConfig::inst()->recordsWeCanSelect=["page","film","preview"];
}

//seo
\Classiq\Seo\C_sitemap_xml::$modelTypesToIndex=["page","film"];