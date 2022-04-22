<?php
$name = basename(__FILE__, '.php');
$arr = [
  $name => [
    "width" => 1280,
    "height" => 720,
    "parent" => "llamella_c",
    "areas" => false,
    "step" => "floor",
    "title" => "Kati 3",
    "titles" => [],
    "infos" => [],
    "prefix" => 'index.php?s=',
    "links" => [],
    "coords_3D" => [[]],
    "coords_2D" => [],
    "hotspots_3D" => [
      "a_c_19" => [
        "1" => [625, 234],
      ],
      "a_c_20" => [
        "1" => [659, 203],
      ],
      "a_c_21" => [
        "1" => [579, 194],
      ],
      "a_c_3" => [
        "1" => [507, 242],
      ],
      "a_c_4" => [
        "1" => [421, 308],
      ],
      "a_c_5" => [
        "1" => [525, 321],
      ],
      "a_c_12" => [
        "1" => [728, 302],
      ],
      "a_c_13" => [
        "1" => [667, 284],
      ],
      "a_c_6" => [
        "1" => [578, 332],
      ],
      "a_c_15" => [
        "1" => [761, 401],
      ],
      "a_c_16" => [
        "1" => [931, 449],
      ],
      "a_c_17" => [
        "1" => [960, 381],
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
