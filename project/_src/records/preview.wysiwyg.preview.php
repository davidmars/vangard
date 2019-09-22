<?php
/**
 * @var Preview $vv
 */

use Classiq\Models\Classiqmodel;
use Classiq\Models\Page;

?>
<div class="preview-record" <?=$view->attrRefresh($vv->uid())?>>
    <?if($vv->id):?>

        <span class="icon image">
            <i style="background-image: url('<?=$vv->thumbnail()->sizeMax(200,200)->bgColor("EEEEEE")->jpg()->href()?>')"></i>
            <?=pov()->svg->use($vv::$icon)?>
        </span>
        <?=$view->render("./tip-errors")?>
        <div>
            <div class="title" title="<?=$vv->name?>"><?=$vv->name?></div>
        </div>
    <?else:?>
        ...
    <?endif?>
</div>