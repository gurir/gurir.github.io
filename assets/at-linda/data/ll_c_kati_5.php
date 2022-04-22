<?php
$name = basename(__FILE__, '.php');
$arr = [
  $name => [
    "width" => 1280,
    "height" => 720,
    "parent" => "llamella_c",
    "areas" => false,
    "step" => "floor",
    "title" => "Kati 5",
    "titles" => [],
    "infos" => [],
    "prefix" => 'index.php?s=',
    "links" => [],
    "coords_3D" => [[]],
    "coords_2D" => [],
    "hotspots_3D" => [
      "a_c_24" => [
        "1" => [683, 238],
      ],
      "a_c_25" => [
        "1" => [606, 205],
      ],
      "a_c_3" => [
        "1" => [547, 247],
      ],
      "a_c_4" => [
        "1" => [462, 316],
      ],
      "a_c_29" => [
        "1" => [584, 341],
      ],
      "a_c_28" => [
        "1" => [674, 377],
      ],
      "a_c_27" => [
        "1" => [853, 395],
      ],
      "a_c_26" => [
        "1" => [843, 344],
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
