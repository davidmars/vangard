<?php
/** @var \Classiq\Models\Preview[] $previews */
$previews=db()->find("preview","order by name ASC");
?>
<body style="text-align: center">
    <select id="select" onchange="changeVideo(this)">
        <?foreach ($previews as $p):?>
            <option video1="<?=$p->video(true,false)?>"
                    video2="<?=$p->video(true,true)?>"
                    mime1="<?=$p->video(true,false,true)?>"
                    mime2="<?=$p->video(true,true,true)?>"
            >
                <?=$p->name?> | <?=$p->video(true,false,true)?> | <?=$p->video(true,true,true)?>
            </option>
        <?endforeach?>
    </select>
    <br><br>

    <pre id="test"></pre>
    <br><br>

    <div id="videowrap"></div>

    <script>
        function changeVideo(e){
            var url=e.options[e.selectedIndex].value;
            console.log(url);
            //document.getElementById("video").setAttribute("src",url)
            playVideo(e.options[e.selectedIndex]);
        }
        function playVideo(option){
            var $video=document.createElement("video");
            $video.setAttribute("controls","controls");
            $video.setAttribute("muted","muted");
            $video.setAttribute("autoplay","autoplay");
            var src1=option.getAttribute("video1");
            var src2=option.getAttribute("video2");
            var mime1=option.getAttribute("mime1");
            var mime2=option.getAttribute("mime2");

            document.getElementById("test").innerText = src1+" \n "+mime1+"\n\n-----\n\n"+src2+" \n "+mime2;

            let $src1=document.createElement("source");
            $src1.setAttribute("src",src1);
            $src1.setAttribute("type",mime1);
            $video.append($src1);
            if(src2){
                let $src2=document.createElement("source");
                $src2.setAttribute("src",src2);
                $src2.setAttribute("type",mime2);
                $video.append($src2);
            }

            document.getElementById("videowrap").innerHTML="";
            document.getElementById("videowrap").append($video);








        }
        playVideo(document.getElementById("select").options[0]);

        //document.getElementById("video").setAttribute("src", document.getElementById("select").options[0].getAttribute("video1"));
    </script>

</body>

<style type="text/css">
    video{
        border: 1px solid red;width:90vw;height:45vw;
    }
</style>