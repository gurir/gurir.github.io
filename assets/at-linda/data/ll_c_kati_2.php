<?php
$name = basename(__FILE__, '.php');
$arr = [
  $name => [
    "width" => 1280,
    "height" => 720,
    "parent" => "llamella_c",
    "areas" => false,
    "step" => "floor",
    "title" => "Kati 2",
    "titles" => [],
    "infos" => [],
    "prefix" => 'index.php?s=',
    "links" => [],
    "coords_3D" => [[]],
    "coords_2D" => [],
    "hotspots_3D" => [
      "a_c_1" => [
        "1" => [622, 230],
      ],
      "a_c_2" => [
        "1" => [563, 198],
      ],
      "a_c_3" => [
        "1" => [504, 239],
      ],
      "a_c_4" => [
        "1" => [420, 309],
      ],
      "a_c_5" => [
        "1" => [524, 316],
      ],
      "a_c_13" => [
        "1" => [582, 338],
      ],
      "a_c_12" => [
        "1" => [669, 361],
      ],
      "a_c_14" => [
        "1" => [737, 378],
      ],
      "a_c_11" => [
        "1" => [834, 408],
      ],
      "a_c_10" => [
        "1" => [924, 438],
      ],
      "a_c_9" => [
        "1" => [1005, 457],
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
