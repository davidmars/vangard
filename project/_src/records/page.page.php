<?php
/** @var Page $vv */
use Classiq\Models\Page;
the()->htmlLayout()->pageInfo->isHome=false;
$view->inside("layout/layout",$vv);
?>
<div class="page-page">

        <div class="container-page">
            <?=$vv->wysiwyg()
                ->field("name_lang")
                ->string(\Pov\Utils\StringUtils::FORMAT_NO_HTML_SINGLE_LINE)
                ->setDefaultValue($vv->name)
                ->htmlTag("h1")
                ->addClass("mb-big titre")
            ?>
        </div>
        <div class="container-page">
        <?=$vv->wysiwyg()->field("blocks")
            ->listJson(site()->blocksList)
            ->htmlTag()
            ->addClass("blocks");
        ?>
        </div>





</div>
