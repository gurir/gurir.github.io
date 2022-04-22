<?php
$f = file_get_contents("js/main_912391jdh0d1djdj1.js","r");
$alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'];



$words = [
  'view_mode',
  'render_h',
  'frames',
  'start_x',
  'dir_real',
  'dist_last',
  'dir_last',
  'dir2',
  'dist2',
  'swipe_start',
  'mouse_x',
  'mouse_y',
  'current_hover_id',
  'clickable',
  'clicked',
  'view_mode',
  'faved',
  'paused',
  'map_visible',
  'rwidth',
  'rheight',
  'total_areas',
  'isMobile',
  'viewer_cnt',
  'hideAbout',
  'highlightAll',
  'changeFrame',
  'dtaped',
  'taped',
  'frameChanged',
  'adjust',
  'openSidebar',
  'openIcons',
  'highlighted',
  'clicked_id'.
  'iconOpened',
  'hotspots_3d',
  'offset_x',
  'areas_enable',
  'is_sold',
  'qres',
  'isIframe'
];

$i = 0;
foreach($words as $w) {
    $f = str_replace($w,"v".$i,$f);
    $i++;
}
echo $f;
