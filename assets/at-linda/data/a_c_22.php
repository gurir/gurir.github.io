<?php
$name = basename(__FILE__, '.php');
$arr = [
    $name => [
        "width" => 1280,
        "height" => 720,
        "parent" => "kati_1",
        "areas" => false,
        "step" => "apartment",
        "title" => "Llamella A",
        "titles" => [
            "area_1" => 'Kati 1',
        ],
        "infos" => [
            "area_1" => [
                "Sipërfaqja e katit: 1212.0 m<sup>2</sup>",
                "Sipërfaqja totale: 10877.9 m<sup>2</sup>",
            ],
        ],
        "prefix" => 'index.php?s=',
        "links" => [
            "area_1" => "ref_ll_a_kati_1",
        ],
        "coords_3D" => [[]],
        "coords_2D" => [],
    ],
];

$json = json_encode($arr);
$myfile = fopen($name . ".js", "w");
fwrite($myfile, "var  data = JSON.parse('" . $json . "');");
fclose($myfile);
echo "<pre>";
echo $json;
