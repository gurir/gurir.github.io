<?php
$name = basename(__FILE__, '.php');
$arr = [
  $name => [
    "width" => 1280,
    "height" => 720,
    "parent" => "llamella_c",
    "areas" => false,
    "step" => "floor",
    "title" => "Kati 6",
    "titles" => [],
    "infos" => [],
    "prefix" => 'index.php?s=',
    "links" => [],
    "coords_3D" => [[]],
    "coords_2D" => [],
    "hotspots_3D" => [
      "a_c_1" => [
        "1" => [719, 207],
      ],
      "a_c_2" => [
        "1" => [612, 164],
      ],
      "a_c_3" => [
        "1" => [543, 222],
      ],
      "a_c_4" => [
        "1" => [439, 324],
      ],
      "a_c_5" => [
        "1" => [572, 360],
      ],
      "a_c_31" => [
        "1" => [815, 424],
      ],
      "a_c_30" => [
        "1" => [864, 342],
      ],
    ]
  ]
];

$json = json_encode($arr);
$myfile = fopen($name . ".js", "w");
fwrite($myfile, "var  data = JSON.parse('" . $json . "');");
fclose($myfile);
echo "<pre>";
echo $json;
