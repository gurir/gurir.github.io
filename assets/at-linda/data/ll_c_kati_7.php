<?php
$name = basename(__FILE__, '.php');
$arr = [
  $name => [
    "width" => 1280,
    "height" => 720,
    "parent" => "llamella_c",
    "areas" => false,
    "step" => "floor",
    "title" => "Kati 7",
    "titles" => [],
    "infos" => [],
    "prefix" => 'index.php?s=',
    "links" => [],
    "coords_3D" => [[]],
    "coords_2D" => [],
    "hotspots_3D" => [
      "a_c_1" => [
        "1" => [713, 201],
      ],
      "a_c_2" => [
        "1" => [616, 161],
      ],
      "a_c_3" => [
        "1" => [546, 212],
      ],
      "a_c_4" => [
        "1" => [436, 317],
      ],
      "a_c_5" => [
        "1" => [581, 351],
      ],
      "a_c_32" => [
        "1" => [748, 288],
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
