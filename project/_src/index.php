<?php
/** @var Page $vv */
use Classiq\Models\Page;
the()->htmlLayout()->pageInfo->isHome=true;
the()->htmlLayout()->pageInfo->introVimeo=$vv->getValue("vars.introVimeo");
$view->inside("layout/layout", $vv);

?>

<div class="">

</div>
