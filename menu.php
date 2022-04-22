<ul id="menu" class="<?=!$v3D?'menu_no3d menu_no3d_mt':'menu_3d_mt'?><?=isset($_GET['strid'])?' hideim':''?>">
  <?php if($v3D){?><li class="btn_toggle_v3d btn_v">3D</li><?php } ?>
  <li class="btn_toggle_v2dv btn_v">2D<span> V</span></li>
  <li class="btn_toggle_v2dt btn_v">2D<span> T</span></li>
  <!--<li class="btn_toggle_fav"><i class="fa fa-heart-o" aria-hidden="true"></i></li>-->
  <li class="btn_toggle_sec"><i class="fa fa-cubes" aria-hidden="true"></i></li>
  <li class="btn_toggle_map"><i class="fa fa-info" aria-hidden="true"></i></i></li>
  <!--<li class="btn_toggle_list"><i class="fa fa-list" aria-hidden="true"></i></li>-->
  <li class="btn_toggle_fullscreen"><i class="fa fa-arrows-alt" aria-hidden="true"></i></li>
</ul>
