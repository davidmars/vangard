<?php
/**
 * @var \Classiq\Models\JsonModels\ListItem $vv
 */
$vv->wysiwyg()->openConfigOnCreate();
/** @var \Classiq\Models\Film $page */
$film=$vv->targetUid(true);

?>
<?if($film):?>
    <div class="film item" <?=$vv->wysiwyg()->attr()?>>
        <a class="h0" href="<?=$film->href()?>">
            <?=$film->name_lang?>
        </a>
    </div>
<?endif?>