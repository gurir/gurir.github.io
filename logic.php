<?php
if($debug) {
  $ts = time();
} else {
	$ts = "1516711127";
}
$poweredby = "Powered by BuildInform.com";
$poweredbyurl = "https://buildinform.com";

$proview = false;
$poweredby_allow = true;

$pano = false;
$v = '';
if(isset($_GET['v'])) {
  $pano = true;
  $v = $_GET['v'];
}

$section = $_GET["s"] ?? "situacioni";
$project = "at-linda";
$section_r = $section;
$ref = substr($section,0,3) == "ref" ? true:false;
if($ref){
  include("assets/".$project."/data/".$section.".php");
  $section = $r_clone;
  $section_r = $r_name;
}
if(!$pano) {
    $json = file_get_contents('assets/'.$project.'/data/'.$section.'.js');
    $json = substr($json,24,-3);
    $json = json_decode($json,true);
    $json = $json[$section];

  $mode = '2d';
  if(count($json['coords_3D']) > 0) {
    $mode = '3d';
  }

  if($json['step'] == "floor") {
    $j_building = file_get_contents('assets/'.$project.'/data/'.$json['parent'].'.js');
    $j_building = substr($j_building,24,-3);
    $j_building = json_decode($j_building,true);
    $j_building = $j_building[$json['parent']];
  }

  if(isset($_GET['rf'])) {
    $f = $_GET['rf'];
    $j_floor = file_get_contents('assets/'.$project.'/data/'.$f.'.js');
    $j_floor = substr($j_floor,24,-3);
    $j_floor = json_decode($j_floor,true);
    $j_floor = $j_floor[$f];
  }
  if(isset($r_title)) {
    $json['title'] = $r_title;
  }

  if(file_exists("assets/".$project."/".$section."_renders/1.jpg")){
    $og_img = "http://ext.buildinform.com/assets/".$project."/".$section."_renders/1.jpg";
  } else {
    $og_img = "http://ext.buildinform.com/assets/".$project."/".$section."_2d/img_ren.jpg";
  }
} else {
  $json['title'] = "Virtual Tour";
  $mode = '2d';
}
