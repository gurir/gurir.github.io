<?php
$name = basename(__FILE__, '.php');
$arr = [
    $name => [
        "width" => 1280,
        "height" => 720,
        "step" => "floor",
        "title" => "Kati 4",
        "titles" => [
          "area_1" => 'Apartamenti 1',
        ],
        "infos" => [
          "area_1" => [
            "Foo:Bar"
          ],
        ],
        "prefix" => 'index.php?s=',
        "links" => [
          "area_1" => "building_1",
        ],
        "coords_3D" => [
            "area_1" => [
              "1" => [],
              "2" => [],
              "3" => [],
              "4" => [],
              "5" => [],
              "6" => [],
              "7" => [],
              "8" => [],
              "9" => [],
              "10" => [],
              "11" => [],
              "12" => [],
              "13" => [],
              "14" => [],
              "15" => [],
              "16" => [],
              "17" => [],
              "18" => [],
              "19" => [],
              "20" => [],
              "21" => [],
              "22" => [],
              "23" => [],
              "24" => [],
              "25" => [],
              "26" => [],
              "27" => [],
              "28" => [],
              "29" => [],
              "30" => [],
              "31" => [],
              "32" => [],
              "33" => [],
              "34" => [],
              "35" => [],
              "36" => []
            ],
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
