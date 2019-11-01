<?php
/** @var \Classiq\Models\Nav $menu */
$menu=\Classiq\Models\Nav::getByName("menu",true);

use Pov\Utils\StringUtils; ?>
<nav id="nav">

    <div id="nav-bar" >

        <a href="#" data-nav-menu-toggle  class="unstyled logo">
            <?=$view->render("layout/hello-logo")?>
        </a>
        <a href="<?=site()->homePage()->href()?>"  burger-icon class="unstyled"></a>

    </div>

    <div id="nav-content">
        <div class="wrap container-fluid">
            <div class="row">
                <div class="col-md-4 col-lg-3 a ">
                    <?=$menu
                        ->wysiwyg()
                        ->field("vars.leftContent_lang")
                        ->string(StringUtils::FORMAT_HTML)
                        ->setMediumButtons(site()->richTextFormats)
                        ->htmlTag("div",true,true)
                        ->addClass("text-rich");
                    ?>
                </div>
                <div class="col-md-4 col-lg-7 b">
                    <?//films list placeholder?>
                </div>
                <div class="col-md-4 col-lg-2 c">
                    <?=$menu
                        ->wysiwyg()
                        ->field("vars.rightContent_lang")
                        ->string(StringUtils::FORMAT_HTML)
                        ->setMediumButtons(site()->richTextFormats)
                        ->htmlTag("div",true,true)
                        ->addClass("text-rich");
                    ?>
                </div>
            </div>
        </div>


    </div>
</nav>