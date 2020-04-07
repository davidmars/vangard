<?php
/** @var Page $vv */
use Classiq\Models\Page;
the()->htmlLayout()->pageInfo->isHome=true;
$view->inside("layout/layout", $vv);

?>

<div class="cq-box">
    <fieldset>
        <label>Vidéo d'intro</label>
        <?=$vv->wysiwyg()->field("vars.introMuted")
            ->bool()
            ->checkbox("Couper le son sur la vidéo")
            ?>
        <?=$vv->wysiwyg()->field("vars.introVimeo")
            ->string()
            ->textarea("url vimeo")
        ?>
    </fieldset>
</div>
