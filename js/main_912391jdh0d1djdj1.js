var render_h = 0;
var step = 100;
var frames = parseInt(data[section]['frames']) || 36;
var frame = 1;
var start_x = 0;
var dir_real = 0;
var dist_last = 0;
var dir_last = '';
var dir2 = 0;
var dist2 = 0;
var swipe_start = false;
var mouse_x = 0;
var mouse_y = 0;
var width = 1920;
var height = 1080;
var a_rotate = true;
var current_hover_id = 0;
var clickable = true;
var clicked = false;
var clicked_id = 0;
var view_mode = '3D';
var faved = false;
var coords = {};
var coords_2D = {};
var paused = true;
var t, at;
var map_visible = false;
var rwidth = (!pano ? data[section]['width'] : 1280);
var rheight = (!pano ? data[section]['height'] : 720);
var r2dwidth = rwidth;
var r2dheight = rheight;
var mode = 'all';
var ev;
var isIframe = window.self !== window.top; isIframe = false;
var iconOpened = false;
var devo = false;
var offset_x = 0;
var hotspots_3d = false;
var areas_enable = true;
var is_sold = '';
var qres = '';
var cb_active = false;
var fov = 60;
var allow_hotspot2d = false;

if (data.hasOwnProperty(section)) {
  if (data[section]['areas'] == false) {
    areas_enable = false;
  }
  if (data[section].hasOwnProperty('width_2d')) {
    r2dwidth = data[section]['width_2d'];
    r2dheight = data[section]['height_2d'];
  }
  if (data[section].hasOwnProperty('def_frame')) {
    frame = parseInt(data[section]['def_frame']);
  }

  if (data[section].hasOwnProperty('info')) {
    var output = "";
    $.each(data[section]['info'], function (index, value) {

      if (value.indexOf(':') > -1) {
        var ss = value.split(":");
        output += '<div class="col-6">' + ts(ss[0]) + '</div><div class="col-6 text-right">' + ts(ss[1]) + '</div>';
      } else {
        output += '<div class="col-12">' + ts(value) + '</div>';
      }

    });
    $("#sinfo").html(output + '<div class="clear"></div>');
  }
}

if (Cookies.get('a_rotate') == 0) {
  a_rotate = false;
}
if (pano) {
  $("#gback").attr('href', gback);
  $("#gback").show();
}

if (!pano && data[section]['coords_3D'].length == 0) {
  mode = '2d';
}
var total_areas = 0;

var isMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  isMobile = true;
}
var isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if (isiOS && !isIframe) {
  $(".btn_toggle_fullscreen").addClass("inactive");
}

if (!pano && data[section]['areas'] == false) {
  total_areas = 0;
} else {
  total_areas = (!pano ? Object.keys(data[section]['coords_2D']).length : 0);
  if (total_areas == 0) {
    total_areas = (!pano ? Object.keys(data[section]['coords_3D']).length : 0);
  }
}

var appf = "";
if (!pano && data[section]['step'] == "floor") {
  appf = "&f=" + section_r + "&rf=" + section;
}

for (i = 1; i < total_areas + 1; i++) {
  if (sold.includes('area_' + i)) {
    is_sold = ' area_sold';
  }

  if (data[section]['prefix'] == "full_url") {
    $("#map").append('<area class="area' + is_sold + '" data-id="' + i + '" id="area_' + i + '" data-href="' + data[section]['links']['area_' + i] + '" data-info="true" shape="poly" coords="" />');
  } else {
    $("#map").append('<area class="area' + is_sold + '" data-id="' + i + '" id="area_' + i + '" data-href="' + data[section]['prefix'] + data[section]['links']['area_' + i] + '" data-info="true" shape="poly" coords="" />');
  }

  is_sold = '';
}

$(function () {
  $("#viewer").swipe({ swipeStatus: viewer_cnt, tap: taped, doubleTap: dtaped });
  step = $("#renders").width() / frames;

  $('#close').click(function () {
    $("#sidebar").animate({ marginLeft: '-100%' }, 350);
    if (clicked) {
      $("#icons ul").fadeIn();
      iconOpened = false;
    }
  });

  $('#openObject').click(function () {
    var href = $(this).attr('href');
    href = href.substring(9);
    if (data[section]['prefix'] == "full_url") {
      window.location.href = href;
    } else {
      window.location.href = href + appf + '&p=' + project + (lang != 'sq' ? '&lang=' + lang : '');
    }
  });

  $('#openInfo').click(function () {
    openSidebar($(this).attr('data-id'), "#sec_obj_info");
  });

  $('.btn_toggle_cb').click(function (e) {
    e.preventDefault();
    cb_active = !cb_active;
    if (cb_active) {
      viewer.enableEffect(PANOLENS.Modes.STEREO);
      viewer.enableControl(PANOLENS.Controls.DEVICEORIENTATION);
      if (screenfull.enabled) {
        screenfull.request();
      }
      $("#menu").fadeOut("slow");
      $("#gback").fadeOut("slow");
      $("#close_cb").fadeIn("slow");
    } else {
      viewer.enableEffect(PANOLENS.Modes.NORMAL);
      viewer.enableControl(PANOLENS.Controls.ORBIT);
      if (screenfull.enabled) {
        screenfull.exit();
      }
      $("#menu").fadeIn("slow");
      $("#gback").fadeIn("slow");
      $("#close_cb").fadeOut("slow");
    }
  });


  $('.btn_toggle_v3d').click(function () {
    if (!paused) {
      clicked = false;
      clicked_id = 0;
      view_mode = '3D';
      allow_hotspot2d = false;
      $("#renders").attr('src', base_url + '/assets/' + project + '/' + section + '_renders/' + frame + '.jpg');
      adjust();
      $("#svg").hide();
      $(".btn_v").removeClass("active");
      $(this).addClass("active");
      if (a_rotate) {
        $("#pointer").show();
      }
    }
  });

  $('.btn_toggle_v2dv').click(function () {
    if (!paused) {
      clicked = false;
      clicked_id = 0;
      view_mode = '2D';
      allow_hotspot2d = true;
      if (data[section]['step'] == "masterplan" && project == 'at-linda' && width < 720 && height < 720 && isMobile) {
        qres = '_low';
      }
      $("#renders").attr('src', base_url + '/assets/' + project + '/' + section + '_2d/img_ren' + qres + '.jpg');
      adjust();
      $("#svg").hide();
      $(".btn_v").removeClass("active");
      $(this).addClass("active");
      if (a_rotate) {
        $("#pointer").hide();
      }
    }
  });

  $('.btn_toggle_v2dt').click(function () {
    if (!paused) {
      clicked = false;
      clicked_id = 0;
      view_mode = '2D';
      allow_hotspot2d = true;
      $("#renders").attr('src', base_url + '/assets/' + project + '/' + section + '_2d/img_tec.jpg');
      adjust();
      $("#svg").hide();
      $(".btn_v").removeClass("active");
      $(this).addClass("active");
      if (a_rotate) {
        $("#pointer").hide();
      }
    }
  });

  $.get(base_url + '/assets/' + project + '/' + section + '_2d/img_tec.jpg').fail(function () {
    $('.btn_toggle_v2dt').addClass("inactive");
  });
  $.get(base_url + '/assets/' + project + '/' + section + '_2d/img_ren.jpg').fail(function () {
    $('.btn_toggle_v2dv').addClass("inactive");
  });

  if (total_areas == 0) {
    $('.btn_toggle_sec').addClass("inactive");
  }

  $('.btn_toggle_fullscreen').click(function () {
    if (!isiOS) {
      if (screenfull.enabled) {
        screenfull.toggle();
      }
      if (!screenfull.isFullscreen) {
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    }
    else if (isiOS && isIframe) {
      window.parent.postMessage('fullscreen', '*');
    }
  });


  $('.btn_toggle_fav').click(function () {
    faved = !faved;
    if (faved) {
      $(this).html('<i class="fa fa-heart" aria-hidden="true"></i>');
    }
    else {
      $(this).html('<i class="fa fa-heart-o" aria-hidden="true"></i>');
    }
  });

  $('.btn_toggle_sec').click(function () {
    if (!paused) {
      paused = true;
      highlighted = 0;
      t = setInterval(highlightAll, 500 / total_areas);
      highlightAll();
    }
  });
  $('.btn_toggle_map').click(function () {
    openSidebar(0, "#sec_map");
    $("#gmap").show();
    window.dispatchEvent(new Event('resize'));
    map.setCenter(uluru);
  });
  $('.btn_toggle_list').click(function () {
    openSidebar(0, "#sec_obj_all");
  });


  $('.area').mouseover(function (e) {
    if (!isMobile) {
      var data_id = $(this).attr("data-id");
      if (clickable && !clicked && !paused) {
        if (view_mode == '3D') {
          $("#polygon").attr("points", coords[$(this).attr("data-id") + "-" + frame]);
        }
        else if (view_mode == '2D') {
          $("#polygon").attr("points", coords_2D[$(this).attr("data-id")]);
        }
        var output = '<h4>' + ts(data[section]['titles']['area_' + data_id]) + '</h4><table>';
        $.each(data[section]['infos']['area_' + data_id], function (index, value) {
          var ss = value.split(":");
          output += '<tr><td>' + ts(ss[0]) + ':</td><td>' + ts(ss[1]) + '</td></tr>';
        });
        output += '</table>';
        // TODO: Make flexi
        if (data_id != 1 && data_id != 2 && data_id != 8 && data_id != 3 && data[section]['step'] == "masterplan" && project == 'at-linda') {
          output += '<p><br/><b>Së shpejti. Shih llamellën A, B, H dhe C.</b></p>';
        }
        $("#infobox").html(output);
        $("#infobox").show();
        if ($(this).hasClass("area_sold")) {
          $("#svg").addClass("svg_sold");
        } else {
          $("#svg").removeClass("svg_sold");
        }
        $("#svg").show();
      }
    }
  }).mouseout(function () {
    if (!clicked && !isMobile) {
      $("#svg").hide();
    }
    $("#infobox").hide();
  });

  $("#s_masterplan").attr('href', '/?s=situacioni&p=' + project);
  if (!pano && data[section]['step'] == 'masterplan') {
    $("#s_masterplan").addClass('s_current');
    $("#s_building").addClass('s_next');
    $("#s_floor").addClass('s_next');
    $("#s_apartment").addClass('s_next');
    if (project == "bp") {
      $("#gback").attr('href', 'http://chelseapoint.net/');
      $("#gback").show();
    }
  }
  else if (!pano && data[section]['step'] == 'building') {
    $("#s_masterplan").addClass('s_prev');
    $("#s_building").addClass('s_current');
    $("#s_floor").addClass('s_next');
    $("#s_apartment").addClass('s_next');
    $("#gback").attr('href', '/?s=situacioni&p=' + project + (lang != 'sq' ? '&lang=' + lang : ''));
    if (masterplan) { $("#gback").show(); }
  }
  else if (!pano && data[section]['step'] == 'floor') {
    $("#s_masterplan").addClass('s_prev');
    $("#s_building").addClass('s_prev');
    $("#s_floor").addClass('s_current');
    $("#s_apartment").addClass('s_next');
    $("#s_building").attr('href', '/?s=' + data[section]['parent'] + "&p=" + project + (lang != 'sq' ? '&lang=' + lang : ''));
    $("#gback").attr('href', '/?s=' + data[section]['parent'] + "&p=" + project + (lang != 'sq' ? '&lang=' + lang : ''));
    $("#gback").show();
  }
  else if (!pano && data[section]['step'] == 'apartment') {
    $("#s_masterplan").addClass('s_prev');
    $("#s_building").addClass('s_prev');
    $("#s_floor").addClass('s_prev');
    $("#s_apartment").addClass('s_current');
    $("#s_building").attr('href', '/?s=' + bld + "&p=" + project + (lang != 'sq' ? '&lang=' + lang : ''));
    $("#s_floor").attr('href', '/?s=' + flo + "&p=" + project + (lang != 'sq' ? '&lang=' + lang : ''));
    $("#gback").attr('href', '/?s=' + flo + "&p=" + project + (lang != 'sq' ? '&lang=' + lang : ''));
    $("#gback").show();
  } else if (!pano && data[section]['step'] == 'apartament') {
    $("#s_masterplan").addClass('s_prev');
    $("#s_building").addClass('s_prev');
    $("#s_floor").addClass('s_prev');
    $("#s_apartment").addClass('s_current');
    $("#s_building").attr('href', '/?s=' + bld + "&p=" + project + (lang != 'sq' ? '&lang=' + lang : ''));
    $("#s_floor").attr('href', '/?s=' + flo + "&p=" + project + (lang != 'sq' ? '&lang=' + lang : ''));
    $("#gback").attr('href', '/?s=' + flo + "&p=" + project + (lang != 'sq' ? '&lang=' + lang : ''));
    $("#gback").show();
  }

  if (mode == '2d') {
    if (tech_2d) {
      $(".btn_toggle_v2dt").trigger("click");
    } else {
      $(".btn_toggle_v2dv").trigger("click");
    }
    $(".btn_toggle_v3d").addClass("inactive");
  } else {
    $(".btn_toggle_v3d").addClass("active");
  }


  $(document).contextmenu(function (e) {
    if (!debug) {
      e.preventDefault();
      $("#about").css("top", e.pageY + 10);
      $("#about").css("left", e.pageX - 90);
      $("#about").fadeIn();
      at = setInterval(hideAbout, 1500);
    }
  });


  $('.btn_zoom_plus').click(function () {
    if (viewer.getCamera().fov > 30) {
      viewer.getCamera().fov -= 5;
      viewer.getCamera().updateProjectionMatrix();
    }
  });
  $('.btn_zoom_minus').click(function () {
    if (viewer.getCamera().fov < 90) {
      viewer.getCamera().fov += 5;
      viewer.getCamera().updateProjectionMatrix();
    }
  });
  $('.btn_toggle_do').click(function () {
    devo = !devo;
    if (devo) {
      viewer.enableControl(PANOLENS.Controls.DEVICEORIENTATION);
      $(this).addClass('active');
    } else {
      viewer.enableControl(PANOLENS.Controls.ORBIT);
      $(this).removeClass('active');
    }
  });

  if (pano && !isMobile) {
    $(".btn_toggle_do").addClass("inactive");
  }

  if (pano) {
    hfovfix();
  }

  if (debug) {
    $("#debug").show();
    if (pano) {
      $("#dot").show();
    }
  }

}); // END OF READY

function hideAbout() {
  clearInterval(at);
  $("#about").fadeOut();
}

var highlighted = 0;
function highlightAll() {
  highlighted++;
  if (view_mode == '3D') {
    $("#polygon").attr("points", coords[highlighted + "-" + frame]);
  } else {
    $("#polygon").attr("points", coords_2D[highlighted]);
    console.log(coords_2D[highlighted]);
  }
  $("#svg").show();
  if (highlighted == total_areas + 1) {
    clearInterval(t);
    $("#svg").hide();
    paused = false;
  }
}

function viewer_cnt(event, phase, direction, distance, duration, fingers, fingerData, currentDirection) {
  if (view_mode == '3D' && !paused) {
    if (currentDirection == 'left' || currentDirection == 'right') {
      if (hotspots_3d) {
        $(".hotspot").remove();
      }
      clickable = false;
      if (!swipe_start) {
        swipe_start = true;
        $("#svg").hide();
        $("#icons ul").fadeOut();
        iconOpened = false;
      }
      dir2 = currentDirection;

      if (dir2 != dir_last) {
        if (isMobile) {
          start_x = event.touches[0] ? event.targetTouches[0].pageX : 0;
        } else {
          start_x = event.pageX;
        }
      }

      if (dir2 == 'right') {
        dist2 = distance - start_x;
        if (dist2 > step) {
          frame++;
          if (frame == frames + 1) {
            frame = 1;
          }
          start_x = mouse_x;
        }
      } else {
        dist2 = start_x - distance;
        if (dist2 > step) {
          frame--;
          if (frame == 0) {
            frame = frames;
          }
          start_x = mouse_x;
        }
      }

      dist_last = distance;
      dir_last = dir2;
      changeFrame();
      if (a_rotate) {
        Cookies.set('a_rotate', 0, { expires: 1 });
        a_rotate = false;
        $("#pointer").fadeOut();
      }
    }
    if (phase == "end") {
      ticks = 1;
      dir_real = 0;
      dir_last = 0;
      swipe_start = false;
      clickable = true;
      clicked = false;
      clicked_id = 0;
      frameChanged();

    }
  }
}

function changeFrame() {
  document.getElementById('renders').src = base_url + '/assets/' + project + '/' + section + '_renders/' + frame + '.jpg';
}

function taped(event) {
  var path = [];
  var node = event.target;
  while (node != document.body) {
    path.push(node);
    node = node.parentNode;
  }
  if (path[0].getAttribute("data-id") != null && clickable && !paused) {
    clicked = true;
    if (path[0].getAttribute("data-id") == clicked_id) {
      if (data[section]['prefix'] == "full_url") {
        window.location.href = data[section]['links']['area_' + path[0].getAttribute("data-id")] + appf + '&p=' + project + (lang != 'sq' ? '&lang=' + lang : '');
      } else {
        window.location.href = data[section]['prefix'] + data[section]['links']['area_' + path[0].getAttribute("data-id")] + appf + '&p=' + project + (lang != 'sq' ? '&lang=' + lang : '');
      }

    } else {
      clicked_id = path[0].getAttribute("data-id");
      $("#sidebar").animate({ marginLeft: "-100%" }, 350);
      openIcons(path[0].getAttribute("data-id"));
      if (view_mode == "3D") {
        $("#polygon").attr("points", coords[path[0].getAttribute("data-id") + "-" + frame]);
      } else {
        $("#polygon").attr("points", coords_2D[path[0].getAttribute("data-id")]);
      }
      $("#svg").show();
    }
  } else {
    clicked = false;
    clicked_id = 0;
    $("#icons ul").fadeOut();
    iconOpened = false;
    $("#svg").hide();
  }
}

function dtaped(event) {
  var path = [];
  var node = event.target;
  while (node != document.body) {
    path.push(node);
    node = node.parentNode;
  }
  if (path[0].getAttribute("data-id") != null && clickable && !paused) {
    if (data[section]['links']['area_' + path[0].getAttribute("data-id")] != "") {
      window.location.href = data[section]['prefix'] + data[section]['links']['area_' + path[0].getAttribute("data-id")] + appf + '&p=' + project + (lang != 'sq' ? '&lang=' + lang : '');
    }
  }
}

function frameChanged() {
  for (i = 1; i < total_areas + 1; i++) {
    $("#area_" + i).attr("coords", coords[i + "-" + frame]);
  }
  if (hotspots_3d) {
    renderHotspots();
  }
  if (debug) {
    console.log(frame);
  }
}
frameChanged();

if (mode == 'all' && !pano) {
  var loaded = 0;
  var n = 0;
  var c = 0;
  for (i = 1; i < frames + 1; i++) {
    n++;
    var tmpImg = new Image();
    tmpImg.src = base_url + '/assets/' + project + '/' + section + '_renders/' + i + '.jpg';
    tmpImg.onload = function () {
      $('#renders').attr('src', base_url + '/assets/' + project + '/' + section + '_renders/' + c + '.jpg');
      c++;
    };
  }

  //var colorbar = new Nanobar({target: document.getElementById('color')});

  var interval = setInterval(function () {
    percent = n / 100;
    loaded = Math.ceil(c / percent);
    $("#progress span").text(loaded);
    $("#progressbar_tick").css('width', loaded + "%");
    if (loaded == 100) {
      clearInterval(interval);
      adjust();
      $('#viewer').removeClass("blur");
      $('#renders').attr('src', base_url + '/assets/' + project + '/' + section + '_renders/' + frame + '.jpg');
      $("#startup").fadeOut();
      if (a_rotate) {
        $("#pointer").fadeIn();
        $("#pointer").addClass('a_rotate');
      } else {
        $("#pointer").hide();
      }
      t = setInterval(highlightAll, 500 / total_areas);
    }

  }, 1);
} else if (!pano) {
  paused = false;
  $('#viewer').removeClass("blur");
  $("#renders").attr('src', base_url + '/assets/' + project + '/' + section + '_2d/img_ren.jpg');
  var tmpImg = new Image();
  tmpImg.src = base_url + '/assets/' + project + '/' + section + '_2d/img_ren.jpg';
  tmpImg.onload = function () {
    $("#startup").fadeOut();
    adjust();
    t = setInterval(highlightAll, 500 / total_areas);
  };
}

function adjust() {
  clicked = false;
  clicked_id = 0;
  $("#icons ul").hide();
  iconOpened = false;
  if (!pano) {
    $("#svg").hide();
    $("#renders").css('width', 'auto');
    $("#renders").height($(window).height());
    $("#viewer").width($("#renders").width());
    $("#viewer").css('left', '50%');
    $("#viewer").css('margin-left', '-' + $("#viewer").width() / 2 + 'px');
    $("#viewer").css('margin-top', '0');
    width = $("#renders").width();
    height = $("#renders").height();
    if (width > $(window).width()) {
      $("#renders").width($(window).width());
      $("#renders").css('height', 'auto');
      width = $("#renders").width();
      height = $("#renders").height();
      $("#viewer").css('margin-top', (($(window).height() - height) / 2) + 'px');
      $("#viewer").css('left', '0');
      $("#viewer").css('margin-left', '0');
    }
    $("#viewer").width($("#renders").width());
    $("#viewer").height($("#renders").height());
    var w = 16 * height / 9;
    offset_x = (width - w) / 2;
  }

  if ($("#viewer").height() < $("#menu").height()) {
    $("#menu").addClass("menu_adapt");
    if (isiOS) {
      $("#menu").addClass("menu_adapt_ios");
    }
    if ($("#menu").hasClass("menu_no3d")) {
      $("#menu").removeClass("menu_no3d_mt");
    } else {
      $("#menu").addClass("menu_3d_mt");
    }
    $(".btn_toggle_map").hide();
  } else {
    $("#menu").removeClass("menu_adapt");
    if (isiOS) {
      $("#menu").removeClass("menu_adapt_ios");
    }
    if ($("#menu").hasClass("menu_no3d")) {
      $("#menu").addClass("menu_no3d_mt");
    } else {
      $("#menu").removeClass("menu_3d_mt");
    }
    $(".btn_toggle_map").show();
  }

  if (view_mode == '3D') {
    if (mode == 'all' && areas_enable) {
      for (i = 1; i < total_areas + 1; i++) {
        for (f = 1; f < 37; f++) {
          var current_cords = data[section]['coords_3D']['area_' + i][f];
          var even = false;
          var new_cords = "";
          var no = 0;
          $.each(current_cords, function (index, value) {
            if (even) {
              no = parseInt((width * value) / rwidth) - pw_offset;

            } else {
              no = parseInt((height * value) / rheight);
            }
            new_cords = new_cords + "," + no;
            even = !even;
          });
          coords[i + "-" + f] = new_cords.substring(1);
        }
      }
      frameChanged();
    }
  } else if (view_mode == '2D') {
    for (i = 1; i < total_areas + 1; i++) {
      var current_cords = data[section]['coords_2D']['area_' + i];
      var even = false;
      var new_cords = "";
      var no = 0;
      $.each(current_cords, function (index, value) {
        if (even) {
          no = parseInt((width * value) / r2dwidth);
        } else {
          no = parseInt((height * value) / r2dheight);
        }
        new_cords = new_cords + "," + no;
        even = !even;
      });
      coords_2D[i] = new_cords.substring(1);
      $("#area_" + i).attr("coords", coords_2D[i]);
    }
  }

  if (!pano && typeof data[section]['hotspots'] !== 'undefined' && allow_hotspot2d) {
    total_areas = Object.keys(data[section]['hotspots']).length;
    $(".hotspot").remove();
    for (i = 1; i < total_areas + 1; i++) {
      var hx = (parseInt(data[section]['hotspots']['area_' + i][0]) * width / r2dwidth) - 30;
      var hy = (parseInt(data[section]['hotspots']['area_' + i][1]) * height / r2dheight) - 32;
      //<span class="hlink">'+data[section]['links']['area_'+i]+'</span>
      $("#viewer").append('<div data-href="' + data[section]['links']['area_' + i] + '" class="hotspot" style="top:' + hy + 'px;left:' + hx + 'px;"><img src="' + base_url + '/img/ripple' + ripple + '.svg"/><div></div></div>');
    }
  } else {
    $(".hotspot").remove();
  }
  if (!pano && typeof data[section]['hotspots_3D'] !== 'undefined') {
    total_areas = Object.keys(data[section]['hotspots_3D']).length;
    hotspots_3d = true;
    renderHotspots();
  }
  step = $("#renders").width() / frames;
}

function renderHotspots() {

  $(".hotspot").remove();
  var x = 0;
  var y = 0;

  $.each(data[section]['hotspots_3D'], function (hi, hotspot) {
    //y = hotspot['y'] * height / 720 - 32;
    $.each(hotspot, function (i, val) {
      if (i == frame) {
        console.log(val);
        x = (val[0] * width / 1280 - 32) + offset_x;
        y = (val[1] * width / 1280 - 32) + offset_x;
        $("#viewer").append('<div data-id="' + hi + '" class="hotspot hotspot_3d" data-href="' + hotspot['url'] + '" style="left:' + x + 'px;top:' + y + 'px"><img src="' + base_url + '/img/ripple_2.svg"/><div></div></div>');
      }
    });
  });

}

function openSidebar(data_id, sec) {
  $(".sec_side").hide();
  $(sec).show();
  if (data_id > 0) {
    var href = data[section]['prefix'] + data[section]['links']['area_' + data_id] + appf + "&p=" + project;
    $("#view_object").attr('href', href);
    $("#sidebar h2").text(ts(data[section]['titles']['area_' + data_id]));
    var output = '<table>';
    $.each(data[section]['infos']['area_' + data_id], function (index, value) {
      var ss = value.split(":");
      output += '<tr><td>' + ts(ss[0]) + ':</td><td>' + ts(ss[1]) + '</td></tr>';
    });
    output += '</table>';
    if (data[section]['links']['area_' + data_id] == "" && project == 'at-linda') {
      output += '<p><br/><b>Së shpejti. Shih llamellën A dhe H.</b></p>';
    }
    $("#sidebar p").html(output);
  }
  $("#sidebar").animate({ marginLeft: 0 }, 350);
  $("#icons ul").fadeOut();
  iconOpened = false;
}
function openIcons(data_id) {
  if (iconOpened) {
    $("#icons ul").fadeOut('fast');
  }
  var href = data[section]['prefix'] + data[section]['links']['area_' + data_id];
  if (data[section]['links']['area_' + data_id] == "") {
    $("#openObject").addClass("btn_inactive");
    $("#view_object").addClass("btn_inactive");
  } else {
    $("#openObject").removeClass("btn_inactive");
    $("#view_object").removeClass("btn_inactive");
  }
  $("#openObject").attr('href', href);
  $("#openInfo").attr('data-id', data_id);
  $("#icons ul").fadeIn();
  iconOpened = true;
}

$(window).resize(function () {
  adjust();
  if (pano) {
    hfovfix();
  }
});

$(document).bind('touchmove', function (e) {
  // /e.preventDefault();
  if (isMobile) {
    mouse_x = parseInt(e.targetTouches[0].pageX);
    mouse_y = parseInt(e.targetTouches[0].pageY);
  }
});
$(document).bind('mousemove', function (e) {
  e.preventDefault();
  if (!isMobile) {
    mouse_x = parseInt(e.pageX);
    mouse_y = parseInt(e.pageY);
    $("#infobox").css("top", mouse_y + 40);
    $("#infobox").css("left", mouse_x - 150);
  }
});

$(document).on("click", ".s_next", function (e) {
  e.preventDefault();
});

$(document).on("click", ".s_current", function (e) {
  e.preventDefault();
  window.location.reload(true);
});

$(document).on("click", ".hotspot", function (e) {
  e.preventDefault();

  if ($(this).hasClass("hotspot_3d")) {
    if (project == "proview") {
      window.location.href = 'http://demos2.proview360.ch/p/demo/' + $(this).attr('data-href');
    }
    else if (project == "immobrille") {
      window.location.href = 'http://demo2.immobrille.ch/p/demo/' + $(this).attr('data-href');
    }
    else if (project == "demo-car") {
      window.location.href = $(this).attr('data-href');
    }
    else if (project == "at-linda") {
      window.location.href = '/index.php?s=' + $(this).attr('data-id') + '&p=at-linda';
    }
    else {
      window.location.href = 'http://int.buildinform.com/p/bernica-park/' + $(this).attr('data-href');
    }

  } else {
    window.location.href = gback + '&v=' + $(this).attr('data-href');
  }

});

$(document).on("click", ".bi-hotspot", function (e) {
  e.preventDefault();
  if ($(this).attr('data-href') != 'none') {
    window.location.href = gback + '&v=' + $(this).attr('data-href') + "&refh=" + refh;
  }
});

function hfovfix() {
  p_height = window.innerHeight;
  p_width = window.innerWidth;
  var ratio_single = p_width / p_height;
  var hhfov = ratio_single * 100 / 1.8;
  //viewer.setHfovBounds([hhfov-10,hhfov+10]).setHfov(hhfov);
}

var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('gmap'), {
    zoom: 16,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

function hasTouch() {
  return 'ontouchstart' in document.documentElement
    || navigator.maxTouchPoints > 0
    || navigator.msMaxTouchPoints > 0;
}

if (hasTouch()) { // remove all :hover stylesheets
  try { // prevent exception on browsers not supporting DOM styleSheets properly
    for (var si in document.styleSheets) {
      var styleSheet = document.styleSheets[si];
      if (!styleSheet.rules) continue;

      for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
        if (!styleSheet.rules[ri].selectorText) continue;

        if (styleSheet.rules[ri].selectorText.match(':hover')) {
          styleSheet.deleteRule(ri);
        }
      }
    }
  } catch (ex) { }
}

function enableNoSleep() {
  noSleep.enable();
  document.removeEventListener('click', enableNoSleep, false);
}


function ts(s) {
  if (s.indexOf("@[") != -1) {
    let start_pos = s.indexOf('@[');
    let end_pos = s.indexOf(']', start_pos);
    let word = s.substring(start_pos + 2, end_pos);
    s = s.replace('@[' + word + ']', l10n[word][lang]);
  }
  return s;
}
