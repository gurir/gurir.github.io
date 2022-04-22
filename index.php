<?php
ini_set('display_errors', 'Off');
ini_set('display_startup_errors', 'Off');
$debug = true;
include_once("logic.php");
include_once("config.php");
include_once("lang.php");
$base_url = 'http://ext.buildinform.com';
$base_url = ''; // until its fixed

$ts = "1";

?>
<!doctype html>
<html lang="<?= $lang ?>">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
  <title><?= $title ?> | <?= ts($json['title']) ?></title>
  <base href="/">
  <meta name="author" content="Proview">
  <link rel="stylesheet" href="<?= $base_url ?>/css/reset.css">
  <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
  <link rel="stylesheet" href="/bif_assets/css/font-awesome.min.css">
  <link rel="stylesheet" href="<?= $base_url ?>/css/main.css?v=<?= $ts ?>">
  <link rel="stylesheet" href="<?= $base_url ?>/css/icons_atl.css?v=<?= $ts ?>">
  <meta property="og:url" content="<?= "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]" ?>" />
  <meta property="og:title" content="<?= $title ?>" />
  <meta property="og:description" content="<?= $desc ?>" />
  <meta property="og:image" content="<?= $og_img ?>" />
  <script src="<?= $base_url ?>/js/jquery-3.3.1.min.js"></script>
  <script type='text/javascript' src='//platform-api.sharethis.com/js/sharethis.js#property=5a19f2091d108f0012ed9d91&product=inline-share-buttons' async='async'></script>
  <style>
    :root {
      --main-color: <?= $main_color ?>;
      --main-rgb-color-1: <?= $main_rgb ?>, 0.6);
      --main-rgb-color-2: <?= $main_rgb ?>, 0.5);
      --main-rgb-color-3: <?= $main_rgb ?>, 0.97);
      --main-rgb-color-4: <?= $main_rgb ?>, 0.2);
    }

    <?php if ($debug) { ?>.console-log-div {
      position: absolute;
      bottom: 0;
      left: 0;
      border: 1px solid gray;
      padding: 5px 10px;
      border-radius: 5px;
      width: 95% !important;
      background-color: #efefef;
      z-index: 9999;
      height: 200px;
      display: none;
    }

    #debug {
      position: absolute;
      top: 0;
      left: 0;
      background: #000;
      color: #fff;
      width: 100%;
      height: 30px;
      z-index: 9999;
      display: none;
    }

    #debug span {
      user-select: all;
    }

    #dot {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 30px;
      height: 30px;
      background: black;
      border-radius: 16px;
      opacity: 0.2;
      border: 1px solid #fff;
      margin-left: -16px;
      margin-top: -20px;
      pointer-events: none;
      z-index: 999999999999999;
      display: none;
    }

    <?php } ?>
  </style>
</head>

<body>
  <div id="wrap">

    <div id="icons">
      <?php if (!isset($_GET['strid'])) { ?>
        <ul>
          <li id="openObject"><?= ts('hape') ?></li>
          <li id="openInfo" data-id="0"><?= ts('info') ?></li>
        </ul>
      <?php } ?>
    </div>

    <?php if (!$pano) { ?>
      <div id="viewer" class="blur">
        <map name="map" id="map"><svg id="svg" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <polygon id="polygon" points="" /></svg></map>
        <img id="renders" src="" usemap="#map" />
        <div id="pointer">
          <p><?= ts('rrotullo') ?></p>
          <img src="<?= $base_url ?>/img/pointer2.png" />
        </div>
        <?php include_once("menu.php"); ?>
        <?php if (!isset($_GET['strid'])) { ?>
          <h2><?= ts($json['title']) ?></h2>
        <?php } ?>
      </div>
    <?php } else { ?>
      <div id="panorama">

      </div>
      <?php include_once("menu_pano.php"); ?>
    <?php } ?>

  </div>
  <div id="startup" <?= $mode == '2d' ? ' class="startup_2d"' : '' ?>>
    <?php if ($mode != '2d') { ?>
      <div id="progressbar">
        <div id="progressbar_tick"></div>
      </div>
      <div id="progress"><span>99</span>%</div>
    <?php } ?>
    <?php if ($mode == '2d') { ?><div id="logo"><?php if (!isset($nologo)) { ?><img src="<?= $base_url ?>/assets/<?= $project ?>/logo.png" /><?php } ?><br /><br /><br /><br /><img width="100px" src="<?= $base_url ?>/img/<?= $loading ?>" /><br /><br /><br /><br /><b><?= ts('prisni') ?><?php if ($pano) { ?><br /><br /> <span id="pprogress">0</span> %</b><?php } ?></div><?php } ?>
  </div>
  <div id="sidebar">
    <i id="close" class="fa fa-times-circle" aria-hidden="true"></i>
    <div id="sec_obj_info" class="sec_side">
      <div class="scrollable">
        <h2><?= $title ?></h2>
        <p><?php if ($is_modelslovenia) { ?> Model Slovenia është ndërmarrje ndërtimore me traditë disa vjeçare,e cila është themeluar ne bashkëpunim me konsulentë dhe ekspert sllovenë te ndërtimit. Aktivitetet kryesore të ModelSloveni-së janë: projektimi, ndërtimet e ulëta dhe të larta dhe shërbimet shit-blerëse të banesave dhe lokaleve afariste. Selia kryesore e kompanisë gjendet në Prishtinë.
            Sot, Model Slovenia është njëra nga kompanitë më të njohura ndërtimore në tregun e Kosovës për ofrimin e hapësirave të përshtatshme për banim (banesa dhe shtëpi individuale) dhe për afarizëm. Duke punësuar një staf me përvojë të duhur profesionale në bashkëpunim me inxhinierë dhe arkitektë të mirënjohur nga Kosova dhe Sllovenia dhe duke inkorporuar në ndërtim materiale ndërtimore të kualitetit te lartë botëror. Model Slovenia është shndërruar në sinonim të kualitetit të dëshmuar në lëmin e ndërtimeve.<?php } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      echo $desc;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    } ?></p>
        <a id="view_object" class="btn btn_inactive" href="/"><?= ts('hape') ?> &raquo;</a>
      </div>
      <div class="shadow"></div>
    </div>
    <div id="sec_obj_all" class="sec_side">
      <div class="scrollable">
        <h2>Te gjitha objektet</h2>
        <?php //include("sitemap.php"); 
        ?>
      </div>
      <div class="shadow"></div>
    </div>
    <div id="sec_map" class="sec_side">
      <div class="half_v">
        <h2><?= ts($json['title']) ?></h2>
        <div id="sinfo" class="row"></div>
        <div id="shares">
          <div class="sharethis-inline-share-buttons"></div>
        </div>
      </div>
      <div class="half_v">
        <div id="gmap"></div>
      </div>
    </div>
  </div>
  <?php if (!$pano) { ?>
    <?php if (!isset($_GET['strid'])) { ?>
      <?php if (!(isset($no_bottom_menu))) { ?>
        <div id="sections">
          <?php if ($masterplan) { ?><a id="s_masterplan" href="/?p=at-linda&m=2d&s=situacioni"><?= ts("situacioni") ?></a> &raquo;<?php } ?>
            <a id="s_building" href="/"><?php
                                        if ($json['step'] == "building") {
                                          echo ts($json['title']);
                                        } else if ($json['step'] == "floor") {
                                          echo ts($j_building['title']);
                                        } else {
                                          echo $mstitle;
                                        }
                                        ?></a> &raquo;
            <a id="s_floor" href="/"><?php
                                      if ($json['step'] == "floor") {
                                        echo ts($json['title']);
                                      } else if ($json['step'] == "apartment") {
                                        if ($project == "at-linda") {
                                          echo ts('kati') . explode("_", $_GET['f'])[count(explode("_", $_GET['f'])) - 1];
                                        } else {
                                          if (isset($_GET['f']) && isset($_GET['rf']) && !$pano) {
                                            $fel = 1;
                                            if (substr($_GET['f'], 0, 4) == "ref_") {
                                              $fel = 2;
                                            }
                                            $fno = intVal(explode("_", $_GET['f'])[$fel]);
                                            echo ts($j_floor['title']) . " " . $fno;
                                          } else {
                                            echo ts($j_floor['title']) ?? ts('kati');
                                          }
                                        }
                                      } else {
                                        echo ts('kati');
                                      }
                                      ?></a> &raquo;
            <a id="s_apartment" href="/"><?php
                                          if ($json['step'] == "apartment") {
                                            echo ts($json['title']);
                                          } else {
                                            ts('apartment');
                                          }
                                          ?></a>
        </div>
      <?php } ?>
    <?php } ?>
  <?php } ?>
  <a id="about" href="<?= $poweredbyurl ?>" target="_blank"><?= $poweredby ?></a>
  <?php if (!isset($_GET['strid']) && $gback) { ?>
    <a id="gback" href="/"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
  <?php } ?>
  <a id="close_cb" class="btn_toggle_cb" href="/"><i class="fa fa-times" aria-hidden="true"></i></a>
  <div id="infobox"></div>
  <div id="sold">E SHITUR</div>
  <?php if ($pano) { ?>
    <script src="<?= $base_url ?>/js/three.min.js"></script>
    <script src="<?= $base_url ?>/js/panolens.js"></script>
    <script>
      <?php include("assets/" . $project . "/panos/" . $section . "/pano.php");
      $refh = "";
      $refhp = 0;
      $refhi = 0;
      ?>
      var progress;

      function onProgress(e) {
        progress = e.progress.loaded / e.progress.total * 100;
        $("#pprogress").text(parseInt(progress));
        if (progress === 100) {
          $("#startup").remove();
        }
      }
      var refh = '<?= $v ?>';
      var viewer = new PANOLENS.Viewer({
        container: document.getElementById('panorama'),
        controlBar: true,
        cameraFov: <?= $cameraFov ?>,
        autoHideInfospot: false,
        <?php if ($debug) { ?>output: 'console'
      <?php } ?>
      });
      <?php
      $phi = 1;
      foreach ($pano_hotspots as $pkey => $phs) { ?>
        var panorama_<?= $pkey ?> = new PANOLENS.ImagePanorama('<?= $base_url ?>/assets/<?= $project ?>/panos/<?= $section ?>/<?= $pkey ?>.jpg');
        viewer.add(panorama_<?= $pkey ?>);

        <?php foreach ($phs as $ph) { ?>
          // INFOSPOT
          var infospot_<?= $phi ?> = new PANOLENS.Infospot(300, 'img/hotspot_position.png');
          infospot_<?= $phi ?>.position.set(<?= $ph['coords'] ?>);
          infospot_<?= $phi ?>.addHoverText("<?= $ph['title'] ?>");
          //infospot_<?= $phi ?>.setText('<?= $ph['title'] ?>');
          infospot_<?= $phi ?>.addEventListener('click', function() {
            <?php if (isset($ph['link'])) { ?>
              window.location = "<?= $ph['link'] ?>";
            <?php } else { ?>
              viewer.setPanorama(panorama_<?= $ph['target'] ?>);
              history.replaceState('', '<?= $title ?> | <?= $json['title'] ?>', actlink + '<?= $ph['target'] ?>');
            <?php } ?>
          });
          panorama_<?= $pkey ?>.add(infospot_<?= $phi ?>);
          panorama_<?= $pkey ?>.addEventListener('progress', onProgress);
      <?php $phi++;
        }
      } ?>
      viewer.setPanorama(panorama_<?= $v ?>);
      //viewer.getControl().rotateLeft(-Math.PI/2);
      viewer.getControl().update();
      // /infospot.focus(100);
    </script>
  <?php } ?>
  <?php if ($debug) { ?>
    <div id="pup_cnt">
      <div id="pup">
        <ul>
          <li>English</li>
          <li>Shqip</li>
          <li>Deutsch</li>
          <li>Français</li>
        </ul>
      </div>
    </div>
  <?php } ?>
  <script src="<?= $base_url ?>/js/jquery.touchSwipe.min.js"></script>
  <script src="<?= $base_url ?>/js/js.cookie-2.2.0.min.js"></script>
  <?php if ($debug) { ?><script src="<?= $base_url ?>/js/console-log-div.js"></script><?php } ?>
  <script src="<?= $base_url ?>/js/screenfull.min.js"></script>
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDgL0dx67FN7Is2onof48x72n7HTOHWYw0&callback=initMap"></script>
  <?php if (!$pano) { ?>
    <script src="<?= $base_url ?>/assets/<?= $project ?>/data/<?= $section ?>.js?v=<?= $ts ?>"></script>
  <?php } ?>

  <script>
    <?php if (isset($r_sold)) {
      $rs_final = '';
      foreach ($r_sold as $rs) {
        $rs_final .= '"' . $rs . '",';
      } ?>
      var sold = [<?= substr($rs_final, 0, -1) ?>];
    <?php } else { ?>
      var sold = [];
    <?php } ?>
    var debug = <?= $debug ? 'true' : 'false' ?>;
    var project = '<?= $project ?>';
    var section = '<?= $section ?>';
    var section_r = '<?= $section_r ?>';
    var flo = '<?= isset($_GET["f"]) ? $_GET["f"] : 0 ?>';
    var bld = '<?= isset($j_floor['parent']) ? $j_floor['parent'] : 0 ?>';
    var masterplan = <?= $masterplan ? 'true' : 'false' ?>;
    var uluru = {
      lat: <?= $lat ?>,
      lng: <?= $lng ?>
    };
    var pano = <?= $pano ? 'true' : 'false' ?>;
    var pw_offset = <?= $pw_offset ?>;
    var tech_2d = <?= $tech_2d ? 'true' : 'false' ?>;
    var base_url = '<?= $base_url ?>';

    <?php if ($pano) {
      $req_uri = str_replace("&v=" . $v, "", $_SERVER["REQUEST_URI"]);
      if (isset($_GET['refh'])) {
        $req_uri = str_replace("&refh=" . $_GET['refh'], "", $req_uri);
      }
    ?>
      var data = ["none"];
      var gback = '<?= $req_uri ?>';
    <?php } else { ?>
      var gback = '<?= $_SERVER["REQUEST_URI"] ?>';
    <?php } ?>
    var actlink = '<?= str_replace($v, "", $_SERVER["REQUEST_URI"]) ?>';
    var ripple = '<?= $ripple ?>';
    var lang = '<?= $lang ?>';
    var l10n = JSON.parse(`<?= json_encode($l10n) ?>`);
  </script>
  <?php if ($debug) { ?>
    <script src="<?= $base_url ?>/js/main_912391jdh0d1djdj1.js?v=<?= $ts ?>"></script>
  <?php } else { ?>
    <script src="<?= $base_url ?>/js/main.min.js?v=<?= $ts ?>"></script>
  <?php } ?>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-107438903-1"></script>
  <script src="<?= $base_url ?>/js/NoSleep.min.js"></script>
  <script>
    $("#icons ul").hide();
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-107438903-1');
    var noSleep = new NoSleep();
    document.addEventListener('click', enableNoSleep, false);
  </script>
</body>

</html>