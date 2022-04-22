<?php
$name = "llamella_c";

include("llamella_c/kati_1.php");
include("llamella_c/kati_2.php");
include("llamella_c/kati_3.php");
include("llamella_c/kati_4.php");
include("llamella_c/kati_5.php");
include("llamella_c/kati_6.php");
include("llamella_c/kati_7.php");
include("llamella_c/kati_8.php");

$arr = [
  $name => [
    "width" => 1280,
    "height" => 720,
    "step" => "building",
    "title" => "Llamella C",
    "def_frame" => 5,
    "titles" => [
      "area_1" => 'Kati 1',
      "area_2" => 'Kati 2',
      "area_3" => 'Kati 3',
      "area_4" => 'Kati 4',
      "area_5" => 'Kati 5',
      "area_6" => 'Kati 6',
      "area_7" => 'Kati 7',
      "area_8" => 'Kati 8'
    ],
    "infos" => [
      "area_1" => [
        "Sipërfaqja e katit:- m<sup>2</sup>",
        "Sipërfaqja totale: - m<sup>2</sup>",
      ],
      "area_2" => [
        "Sipërfaqja e katit:- m<sup>2</sup>",
        "Sipërfaqja totale: - m<sup>2</sup>",
      ],
      "area_3" => [
        "Sipërfaqja e katit:- m<sup>2</sup>",
        "Sipërfaqja totale: - m<sup>2</sup>",
      ],
      "area_4" => [
        "Sipërfaqja e katit:- m<sup>2</sup>",
        "Sipërfaqja totale: - m<sup>2</sup>",
      ],
      "area_5" => [
        "Sipërfaqja e katit:- m<sup>2</sup>",
        "Sipërfaqja totale: - m<sup>2</sup>",
      ],
      "area_6" => [
        "Sipërfaqja e katit:- m<sup>2</sup>",
        "Sipërfaqja totale: - m<sup>2</sup>",
      ],
      "area_7" => [
        "Sipërfaqja e katit:- m<sup>2</sup>",
        "Sipërfaqja totale: - m<sup>2</sup>",
      ],
      "area_8" => [
        "Sipërfaqja e katit:- m<sup>2</sup>",
        "Sipërfaqja totale: - m<sup>2</sup>",
      ]
    ],
    "prefix" => 'index.php?s=',
    "links" => [
      "area_1" => "ll_c_kati_1",
      "area_2" => "ll_c_kati_2",
      "area_3" => "ll_c_kati_3",
      "area_4" => "ll_c_kati_4",
      "area_5" => "ll_c_kati_5",
      "area_6" => "ll_c_kati_6",
      "area_7" => "ll_c_kati_7",
      "area_8" => "ll_c_kati_8"
    ],
    "coords_3D" => [
      "area_1" => $kati_1,
      "area_2" => $kati_2,
      "area_3" => $kati_3,
      "area_4" => $kati_4,
      "area_5" => $kati_5,
      "area_6" => $kati_6,
      "area_7" => $kati_7,
      "area_8" => $kati_8,
    ],
    "coords_2D" => []
  ]
];

$json = json_encode($arr);
$myfile = fopen($name . ".js", "w");
fwrite($myfile, "var  data = JSON.parse('" . $json . "');");
fclose($myfile);
echo "<pre>";
echo $json;
