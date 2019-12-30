<?php
use Classiq\Models\JsonModels\ListItem;
/** @var ListItem $vv */

/** @var \Classiq\Models\Filerecord $img */
$img=$vv->targetUid(true);

$imgSrc=$small=pov()
    ->img("")
    ->bgColor("EEEEEE")
    ->displayIfEmpty(true)
    ->sizeMax(1200,1200)
    ->jpg()->href();

if($img && $img->isImage()){
    $small=$img->image()->sizeMax(500,500)->jpg(90)->href();
    //$imgSrc=$img->image()->sizeMax(1200,1200)->jpg()->href();
    $imgSrc=$img->httpPath();
}
$bgPositionCss=$vv->getData("background-position","center");
?>
<div <?=$vv->wysiwyg()->attr()?> data-zoom-img="<?=$imgSrc?>" class="photo-item col-6 col-md-3">
    <div>
        <img    style="object-position: <?=$bgPositionCss?>;"
                class="lazyload" data-src="<?=$imgSrc?>" alt="Vangard Paris">
    </div>

</div>
