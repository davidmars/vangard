<?php
/**
 * Une image avec différents formats
 * @var Classiq\Models\JsonModels\ListItem $vv
 *
 *
 *
 */

?>

<label>Image</label>
<?=$vv->wysiwyg()->field("targetUid")
    ->file()
    ->onSavedRefreshListItem($vv)
    ->button()
    ->render()
?>
<label>Position de l'image</label>
<?=$vv->wysiwyg()->field("background-position")
    ->string()
    ->onSavedRefreshListItem($vv)
    ->setDefaultValue("center")
    ->select([
        "center",
        "top",
        "right",
        "bottom",
        "left",
        "top left",
        "top right",
        "bottom left",
        "bottom right"
    ])
?>
