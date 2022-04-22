<?php
$name = basename(__FILE__, '.php');
$arr = [
  $name => [
    "width" => 1280,
    "height" => 720,
    "parent" => "llamella_c",
    "areas" => false,
    "step" => "floor",
    "title" => "Kati 1",
    "titles" => [],
    "infos" => [],
    "prefix" => 'index.php?s=',
    "links" => [],
    "coords_3D" => [[]],
    "coords_2D" => [],
    "hotspots_3D" => [
      "a_c_1" => [
        "1" => [626, 233],
      ],
      "a_c_2" => [
        "1" => [567, 200],
      ],
      "a_c_3" => [
        "1" => [508, 243],
      ],
      "a_c_4" => [
        "1" => [424, 310],
      ],
      "a_c_5" => [
        "1" => [527, 319],
      ],
      "a_c_12" => [
        "1" => [695, 294],
      ],
      "a_c_13" => [
        "1" => [630, 284],
      ],
      "a_c_6" => [
        "1" => [582, 336],
      ],
      "a_c_7" => [
        "1" => [732, 390],
      ],
      "a_c_8" => [
        "1" => [1021, 474],
      ],
      "a_c_9" => [
        "1" => [1056, 379],
      ],
      "a_c_10" => [
        "1" => [919, 350],
      ],
      "a_c_11" => [
        "1" => [829, 331],
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
