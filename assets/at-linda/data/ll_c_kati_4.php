<?php
$name = basename(__FILE__, '.php');
$arr = [
  $name => [
    "width" => 1280,
    "height" => 720,
    "parent" => "llamella_c",
    "areas" => false,
    "step" => "floor",
    "title" => "Kati 4",
    "titles" => [],
    "infos" => [],
    "prefix" => 'index.php?s=',
    "links" => [],
    "coords_3D" => [[]],
    "coords_2D" => [],
    "hotspots_3D" => [
      "a_c_1" => [
        "1" => [665, 236],
      ],
      "a_c_2" => [
        "1" => [606, 204],
      ],
      "a_c_3" => [
        "1" => [546, 247],
      ],
      "a_c_4" => [
        "1" => [463, 315],
      ],
      "a_c_5" => [
        "1" => [566, 322],
      ],
      "a_c_13" => [
        "1" => [639, 347],
      ],
      "a_c_12" => [
        "1" => [720, 369],
      ],
      "a_c_22" => [
        "1" => [895, 415],
      ],
      "a_c_23" => [
        "1" => [914, 366],
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
