<?php
/** @var Page $vv */
use Classiq\Models\Page;
the()->htmlLayout()->pageInfo->isHome=true;
$view->inside("layout/layout", $vv);
?>

<div class="">
    Home
</div>
