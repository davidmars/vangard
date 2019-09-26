<?php
/** @var Page $vv */
use Classiq\Models\Film;
the()->htmlLayout()->pageInfo->isHome=false;
$view->inside("layout/layout",$vv);
?>
<div class="film-page">

        <div class="container">

            <div class="top">
                <iframe class="emebed"
                        src="https://player.vimeo.com/video/32352442?color=ffeb14&portrait=0"
                        frameborder="0"
                        allow="autoplay; fullscreen" allowfullscreen>
                </iframe>
            </div>

            <div class="body">
                <?=$vv->wysiwyg()
                    ->field("name_lang")
                    ->string(\Pov\Utils\StringUtils::FORMAT_NO_HTML_SINGLE_LINE)
                    ->setDefaultValue($vv->name)
                    ->htmlTag("h1")
                ?>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="text-rich">
                            <h2>subtitle here baby</h2>
                            <?=utils()->string->loremIspum(50,150)?>
                        </div>
                        <div class="text-rich">
                            <h2>Credits</h2>
                            <?=utils()->string->loremIspum(70,100)?>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="text-rich">
                            <h2>zobi</h2>
                            <?=utils()->string->loremIspum(50,50)?>
                        </div>
                    </div>
                </div>

                <?=$vv->wysiwyg()->field("blocks")
                    ->listJson(site()->blocksList)
                    ->htmlTag()
                    ->addClass("blocks");
                ?>

            </div>







        </div>







</div>
