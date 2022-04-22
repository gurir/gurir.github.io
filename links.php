<?php
$company = "buildinform";
if($_SERVER['SERVER_NAME'] == "demos.proview360.ch") {
  $company = "proview";
}
else if($_SERVER['SERVER_NAME'] == "demo1.immobrille.ch") {
  $company = "immobrille";
}

$lng = $_GET['lang'] ?? '';
$lang = "";

if($lng != "") {
  $lang = "&lang=".$lng;
}

?>


<style>
  body {
    font-size: 32px;
  }
</style>
<form action="" method="GET">
<select name="lang" onchange="this.form.submit()">
  <option value="">Albanian</option>
  <option value="en"<?=$lng=='en'?' selected':''?>>English</option>
  <option value="de"<?=$lng=='de'?' selected':''?>>German</option>
  <option value="fr"<?=$lng=='fr'?' selected':''?>>French</option>
</select>
</form>
<ul>
  <li><a href="/?p=<?=$company?>&s=main<?=$lang?>">DEMO</a></li>
  <li><a href="/?p=demo&s=masterplan<?=$lang?>">DEMO 2</a></li>
  <li><a href="/?s=masterplan&p=kaso1<?=$lang?>">Kaso Group</a> - Full translation</li>
  <li><a href="/?s=situacioni&p=at-linda<?=$lang?>">Al Trade - Linda Premium</a></li>
  <li><a href="/?s=building&p=ms-a<?=$lang?>">ModelSlovenia - A</a></li>
  <li><a href="/?s=building&p=ms-b<?=$lang?>">ModelSlovenia - B</a></li>
  <li><a href="/?s=building&p=ms-c<?=$lang?>">ModelSlovenia - C</a></li>
  <li><a href="/?s=building&p=ms-d<?=$lang?>">ModelSlovenia - D</a></li>
  <li><a href="/?s=building&p=ms-e<?=$lang?>">ModelSlovenia - E</a></li>
  <li><a href="http://int.buildinform.com/p/bernica-park/ground_floor">ChelseaPoint - Bernica Park - Interior</a></li>
  <li><a href="/?s=main&p=bp<?=$lang?>">ChelseaPoint - Bernica Park - Exterior</a></li>
  <li><a href="/?p=pozhegu_1&s=situacioni<?=$lang?>">Pozhegu Brothers - 1</a></li>
  <li><a href="/index.php?s=test&f=ref_floor_5&rf=floor_typical&p=test&v=spille_hotel<?=$lang?>">Spille Hotel</a></li>
  <li><a href="/real3d">Real 3D</a></li>
  <!--<li><a href=""></a></li>-->
</ul>
