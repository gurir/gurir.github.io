<?php
$name = "ll_h_kati_4";
$arr = [
    $name => [
        "width" => 1280,
        "height" => 720,
        "areas" => false,
        "parent" => "llamella_h",
        "step" => "floor",
        "title" => "Kati 4",
        "titles" => [
          "area_1" => 'Text',
        ],
        "infos" => [
          "area_1" => [
            "Text"
          ],
        ],
        "prefix" => 'index.php?s=',
        "links" => [
          "area_1" => "building_1",
        ],
        "coords_3D" => [
            "area_1" => [],
        ],
        "coords_2D" => []
    ]
];

$json = json_encode($arr);
$myfile = fopen($name.".js", "w");
fwrite($myfile, "var  data = JSON.parse('".$json."');");
fclose($myfile);
echo "<pre>";
echo $json;
