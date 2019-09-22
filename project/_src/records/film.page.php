<?php
/** @var Page $vv */
use Classiq\Models\Film;
the()->htmlLayout()->pageInfo->isHome=false;
$view->inside("layout/layout",$vv);
?>
<div class="py-big">

        <div class="container">
            <?=$vv->wysiwyg()
                ->field("name_lang")
                ->string(\Pov\Utils\StringUtils::FORMAT_NO_HTML_SINGLE_LINE)
                ->setDefaultValue($vv->name)
                ->htmlTag("h1")
            ?>
        </div>

        <?=$vv->wysiwyg()->field("blocks")
            ->listJson(site()->blocksList)
            ->htmlTag()
            ->addClass("blocks");
        ?>





</div>
