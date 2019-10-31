<?php
use Classiq\Models\JsonModels\ListItem;
/**
 * Permet de définir le style de titre
 * @var Classiq\Models\JsonModels\ListItem $vv
 */
?>
<?=$vv->wysiwyg()
    ->field("cols")
    ->string()
    ->onSavedRefreshListItem($vv)
    ->buttonValueSetter("1")
    ->addClass("wide")
    ->setInnerHTML(pov()->svg->use(
        "cq-table")
    )
?>
<?=$vv->wysiwyg()
    ->field("cols")
    ->string()
    ->onSavedRefreshListItem($vv)
    ->buttonValueSetter("2")
    ->addClass("wide")
    ->setInnerHTML(pov()->svg->use(
        "cq-block-texte-texte")
    )
?>

