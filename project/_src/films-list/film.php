<?php
/**
 * @var \Classiq\Models\JsonModels\ListItem $vv
 */
$vv->wysiwyg()->openConfigOnCreate();
/** @var \Classiq\Models\Film $film */
$film=$vv->targetUid(true);

?>
<?if($film):?>
    <div class="film item paused" film-uid="<?=$film->uid()?>" <?=$vv->wysiwyg()->attr()?> poster="<?=$film->thumbnail()->href()?>">
        <div class="debug">debug</div>
        <a page-transition-click class="h0" href="<?=$film->href()?>">
            <span tm><?=$film->name_lang?></span>
            <i><?=$film->category_lang?><?=$film->id?></i>
            <div class="previews">

                <?foreach ($film->previews() as $p):?>
                    <?=$view->render("films-list/preview",$p)?>
                <?endforeach?>
            </div>
        </a>
    </div>
<?endif?>