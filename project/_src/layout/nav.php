<?php
/** @var \Classiq\Models\Nav $menu */
$menu=\Classiq\Models\Nav::getByName("menu",true);

use Pov\Utils\StringUtils; ?>
<nav id="nav">

    <div id="nav-bar" >

        <button data-nav-menu-toggle class="unstyled logo">
            <?=$view->render("layout/hello-logo")?>
        </button>

    </div>

    <div id="nav-content" class="container-fluid">
        <div class="row">
            <div class="col-sm-3">
                <?=$menu
                    ->wysiwyg()
                    ->field("vars.leftContent_lang")
                    ->string(StringUtils::FORMAT_HTML)
                    ->setMediumButtons(["h2","bold","h5","anchor","select-record","removeFormat"])
                    ->htmlTag("div",true,true)
                    ->addClass("text-rich");
                ?>
            </div>
            <div class="col-sm-7">
                <?//films list placeholder?>
            </div>
            <div class="col-sm-2">
                <?=$menu
                    ->wysiwyg()
                    ->field("vars.rightContent_lang")
                    ->string(StringUtils::FORMAT_HTML)
                    ->setMediumButtons(["h2","bold","h5","anchor","select-record","removeFormat"])
                    ->htmlTag("div",true,true)
                    ->addClass("text-rich");
                ?>
            </div>
        </div>

    </div>
</nav>