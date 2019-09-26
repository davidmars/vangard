<?php
/**
 * @var \Classiq\Models\JsonModels\ListItem $vv
 */
$vv->wysiwyg()->openConfigOnCreate();
/** @var \Classiq\Models\Film $film */
$film=$vv->targetUid(true);

?>
<?if($film):?>
    <div class="film item" <?=$vv->wysiwyg()->attr()?>>
        <a class="h0" href="<?=$film->href()?>">
            <span><?=$film->name_lang?></span>
            <i><?=$film->category_lang?></i>
            <div class="previews">
                <?foreach ($film->previews() as $p):?>
                    <?=$view->render("films-list/preview",$p)?>
                <?endforeach?>
            </div>
        </a>
    </div>
<?endif?>