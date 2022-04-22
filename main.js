var v1 = 0;
var step = 100;
var v2 = 36;
var frame = 1;
var v3 = 0;
var v4 = 0;
var v5 = 0;
var v6 = '';
var v7 = 0;
var v8 = 0;
var v9 = false;
var v10 = 0;
var v11 = 0;
var width = 1920;
var height = 1080;
var a_rotate = true;
var v12 = 0;
var v13 = true;
var v14 = false;
var v14_id = 0;
var v0 = '3D';
var v16 = false;
var coords = {};
var coords_2D = {};
var v17 = true;
var t, at;
var v18 = false;
var v19 = (!pano ? data[section]['width'] : 1280);
var v20 = (!pano ? data[section]['height'] : 720);
var r2dwidth = v19;
var r2dheight = v20;
var mode = 'all';
var ev;
var v40 = window.self !== window.top; v40 = false;
var iconOpened = false;
var devo = false;
var v36 = 0;
var v35 = false;
var v37 = true;
var v38 = '';
var v39 = '';
var cb_active = false;
var fov = 60;

if (data.hasOwnProperty(section)) {
  if (data[section]['areas'] == false) {
    v37 = false;
  }
  if (data[section].hasOwnProperty('width_2d')) {
    r2dwidth = data[section]['width_2d'];
    r2dheight = data[section]['height_2d'];
  }
  if (data[section].hasOwnProperty('def_frame')) {
    frame = parseInt(data[section]['def_frame']);
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
var v21 = 0;

var v22 = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  v22 = true;
}
var isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if (isiOS && !v40) {
  $(".btn_toggle_fullscreen").addClass("inactive");
}

if (!pano && data[section]['areas'] == false) {
  v21 = 0;
} else {
  v21 = (!pano ? Object.keys(data[section]['coords_2D']).length : 0);
  if (v21 == 0) {
    v21 = (!pano ? Object.keys(data[section]['coords_3D']).length : 0);
  }
}

var appf = "";
if (!pano && data[section]['step'] == "floor") {
  appf = "&f=" + section_r + "&rf=" + section;
}

for (i = 1; i < v21 + 1; i++) {
  if (sold.includes('area_' + i)) {
    v38 = ' area_sold';
  }
  $("#map").append('<area class="area' + v38 + '" data-id="' + i + '" id="area_' + i + '" data-href="' + data[section]['prefix'] + data[section]['links']['area_' + i] + '" data-info="true" shape="poly" coords="" />');
  v38 = '';
}

$(function () {
  $("#viewer").swipe({ swipeStatus: v23, tap: v28, doubleTap: v27 });
  step = $("#renders").width() / v2;

  $('#close').click(function () {
    $("#sidebar").animate({ marginLeft: '-100%' }, 350);
    if (v14) {
      $("#icons ul").animate({ marginLeft: 0 }, 350);
      iconOpened = false;
    }
  });

  $('#openObject').click(function () {
    var href = $(this).attr('href');
    window.location.href = href + appf + '&p=' + project;
  });

  $('#openInfo').click(function () {
    v31($(this).attr('data-id'), "#sec_obj_info");
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
    if (!v17) {
      v14 = false;
      v14_id = 0;
      v0 = '3D';
      $("#renders").attr('src', base_url + '/assets/' + project + '/' + section + '_renders/' + frame + '.jpg');
      v30();
      $("#svg").hide();
      $(".btn_v").removeClass("active");
      $(this).addClass("active");
      if (a_rotate) {
        $("#pointer").show();
      }
    }
  });

  $('.btn_toggle_v2dv').click(function () {
    if (!v17) {
      v14 = false;
      v14_id = 0;
      v0 = '2D';
      if (data[section]['step'] == "masterplan" && project == 'at-linda' && width < 720 && height < 720 && v22) {
        v39 = '_low';
      }
      $("#renders").attr('src', base_url + '/assets/' + project + '/' + section + '_2d/img_ren' + v39 + '.jpg');
      v30();
      $("#svg").hide();
      $(".btn_v").removeClass("active");
      $(this).addClass("active");
      if (a_rotate) {
        $("#pointer").hide();
      }
    }
  });

  $('.btn_toggle_v2dt').click(function () {
    if (!v17) {
      v14 = false;
      v14_id = 0;
      v0 = '2D';
      $("#renders").attr('src', base_url + '/assets/' + project + '/' + section + '_2d/img_tec.jpg');
      v30();
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

  if (v21 == 0) {
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
    else if (isiOS && v40) {
      window.parent.postMessage('fullscreen', '*');
    }
  });


  $('.btn_toggle_fav').click(function () {
    v16 = !v16;
    if (v16) {
      $(this).html('<i class="fa fa-heart" aria-hidden="true"></i>');
    }
    else {
      $(this).html('<i class="fa fa-heart-o" aria-hidden="true"></i>');
    }
  });

  $('.btn_toggle_sec').click(function () {
    if (!v17) {
      v17 = true;
      v33 = 0;
      t = setInterval(v25, 500 / v21);
      v25();
    }
  });
  $('.btn_toggle_map').click(function () {
    v31(0, "#sec_map");
    $("#gmap").show();
    window.dispatchEvent(new Event('resize'));
    map.setCenter(uluru);
  });
  $('.btn_toggle_list').click(function () {
    v31(0, "#sec_obj_all");
  });


  $('.area').mouseover(function (e) {
    if (!v22) {
      var data_id = $(this).attr("data-id");
      if (v13 && !v14 && !v17) {
        if (v0 == '3D') {
          $("#polygon").attr("points", coords[$(this).attr("data-id") + "-" + frame]);
        }
        else if (v0 == '2D') {
          $("#polygon").attr("points", coords_2D[$(this).attr("data-id")]);
        }
        var output = '<h4>' + data[section]['titles']['area_' + data_id] + '</h4><table>';
        $.each(data[section]['infos']['area_' + data_id], function (index, value) {
          var ss = value.split(":");
          output += '<tr><td>' + ss[0] + ':</td><td>' + ss[1] + '</td></tr>';
        });
        output += '</table>';
        // TODO: Make flexi
        if (data_id != 1 && data_id != 8 && data_id != 3 && data[section]['step'] == "masterplan" && project == 'at-linda') {
          output += '<p><br/><b>Së shpejti. Shih llamellën A, H dhe C.</b></p>';
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
    if (!v14 && !v22) {
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
  }
  else if (!pano && data[section]['step'] == 'building') {
    $("#s_masterplan").addClass('s_prev');
    $("#s_building").addClass('s_current');
    $("#s_floor").addClass('s_next');
    $("#s_apartment").addClass('s_next');
    $("#gback").attr('href', '/?s=situacioni&p=' + project);
    if (masterplan) { $("#gback").show(); }
  }
  else if (!pano && data[section]['step'] == 'floor') {
    $("#s_masterplan").addClass('s_prev');
    $("#s_building").addClass('s_prev');
    $("#s_floor").addClass('s_current');
    $("#s_apartment").addClass('s_next');
    $("#s_building").attr('href', '/?s=' + data[section]['parent'] + "&p=" + project);
    $("#gback").attr('href', '/?s=' + data[section]['parent'] + "&p=" + project);
    $("#gback").show();
  }
  else if (!pano && data[section]['step'] == 'apartment') {
    $("#s_masterplan").addClass('s_prev');
    $("#s_building").addClass('s_prev');
    $("#s_floor").addClass('s_prev');
    $("#s_apartment").addClass('s_current');
    $("#s_building").attr('href', '/?s=' + bld + "&p=" + project);
    $("#s_floor").attr('href', '/?s=' + flo + "&p=" + project);
    $("#gback").attr('href', '/?s=' + flo + "&p=" + project);
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
      at = setInterval(v24, 1500);
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

  if (pano && !v22) {
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

function v24() {
  clearInterval(at);
  $("#about").fadeOut();
}

var v33 = 0;
function v25() {
  v33++;
  if (v0 == '3D') {
    $("#polygon").attr("points", coords[v33 + "-" + frame]);
  } else {
    $("#polygon").attr("points", coords_2D[v33]);
  }
  $("#svg").show();
  if (v33 == v21 + 1) {
    clearInterval(t);
    $("#svg").hide();
    v17 = false;
  }
}

function v23(event, phase, direction, distance, duration, fingers, fingerData, currentDirection) {
  if (v0 == '3D' && !v17) {
    if (currentDirection == 'left' || currentDirection == 'right') {
      if (v35) {
        $(".hotspot").remove();
      }
      v13 = false;
      if (!v9) {
        v9 = true;
        $("#svg").hide();
        $("#icons ul").animate({ marginLeft: -130 }, 350);
        iconOpened = false;
      }
      v7 = currentDirection;

      if (v7 != v6) {
        if (v22) {
          v3 = event.touches[0] ? event.targetTouches[0].pageX : 0;
        } else {
          v3 = event.pageX;
        }
      }

      if (v7 == 'right') {
        v8 = distance - v3;
        if (v8 > step) {
          frame++;
          if (frame == v2 + 1) {
            frame = 1;
          }
          v3 = v10;
        }
      } else {
        v8 = v3 - distance;
        if (v8 > step) {
          frame--;
          if (frame == 0) {
            frame = v2;
          }
          v3 = v10;
        }
      }

      v5 = distance;
      v6 = v7;
      v26();
      if (a_rotate) {
        Cookies.set('a_rotate', 0, { expires: 1 });
        a_rotate = false;
        $("#pointer").fadeOut();
      }
    }
    if (phase == "end") {
      ticks = 1;
      v4 = 0;
      v6 = 0;
      v9 = false;
      v13 = true;
      v14 = false;
      v14_id = 0;
      v29();

    }
  }
}

function v26() {
  document.getElementById('renders').src = base_url + '/assets/' + project + '/' + section + '_renders/' + frame + '.jpg';
}

function v28(event) {
  var path = [];
  var node = event.target;
  while (node != document.body) {
    path.push(node);
    node = node.parentNode;
  }
  if (path[0].getAttribute("data-id") != null && v13 && !v17) {
    v14 = true;
    if (path[0].getAttribute("data-id") == v14_id) {
      window.location.href = data[section]['prefix'] + data[section]['links']['area_' + path[0].getAttribute("data-id")] + appf + '&p=' + project;
    } else {
      v14_id = path[0].getAttribute("data-id");
      $("#sidebar").animate({ marginLeft: "-100%" }, 350);
      v32(path[0].getAttribute("data-id"));
      if (v0 == "3D") {
        $("#polygon").attr("points", coords[path[0].getAttribute("data-id") + "-" + frame]);
      } else {
        $("#polygon").attr("points", coords_2D[path[0].getAttribute("data-id")]);
      }
      $("#svg").show();
    }
  } else {
    v14 = false;
    v14_id = 0;
    $("#icons ul").animate({ marginLeft: -130 }, 350);
    iconOpened = false;
    $("#svg").hide();
  }
}

function v27(event) {
  var path = [];
  var node = event.target;
  while (node != document.body) {
    path.push(node);
    node = node.parentNode;
  }
  if (path[0].getAttribute("data-id") != null && v13 && !v17) {
    if (data[section]['links']['area_' + path[0].getAttribute("data-id")] != "") {
      window.location.href = data[section]['prefix'] + data[section]['links']['area_' + path[0].getAttribute("data-id")] + appf + '&p=' + project;
    }
  }
}

function v29() {
  for (i = 1; i < v21 + 1; i++) {
    $("#area_" + i).attr("coords", coords[i + "-" + frame]);
  }
  if (v35) {
    renderHotspots();
  }
  if (debug) {
    console.log(frame);
  }
}
v29();

if (mode == 'all' && !pano) {
  var loaded = 0;
  var n = 0;
  var c = 0;
  for (i = 1; i < 37; i++) {
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
      v30();
      $('#viewer').removeClass("blur");
      $('#renders').attr('src', base_url + '/assets/' + project + '/' + section + '_renders/' + frame + '.jpg');
      $("#startup").fadeOut();
      if (a_rotate) {
        $("#pointer").fadeIn();
        $("#pointer").addClass('a_rotate');
      } else {
        $("#pointer").hide();
      }
      t = setInterval(v25, 500 / v21);
    }

  }, 1);
} else if (!pano) {
  v17 = false;
  $('#viewer').removeClass("blur");
  $("#renders").attr('src', base_url + '/assets/' + project + '/' + section + '_2d/img_ren.jpg');
  var tmpImg = new Image();
  tmpImg.src = base_url + '/assets/' + project + '/' + section + '_2d/img_ren.jpg';
  tmpImg.onload = function () {
    $("#startup").fadeOut();
    v30();
    t = setInterval(v25, 500 / v21);
  };
}

function v30() {
  v14 = false;
  v14_id = 0;
  $("#icons ul").animate({ marginLeft: -130 }, 350);
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
    v36 = (width - w) / 2;
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

  if (v0 == '3D') {
    if (mode == 'all' && v37) {
      for (i = 1; i < v21 + 1; i++) {
        for (f = 1; f < 37; f++) {
          var current_cords = data[section]['coords_3D']['area_' + i][f];
          var even = false;
          var new_cords = "";
          var no = 0;
          $.each(current_cords, function (index, value) {
            if (even) {
              no = parseInt((width * value) / v19) - pw_offset;

            } else {
              no = parseInt((height * value) / v20);
            }
            new_cords = new_cords + "," + no;
            even = !even;
          });
          coords[i + "-" + f] = new_cords.substring(1);
        }
      }
      v29();
    }
  } else if (v0 == '2D') {
    for (i = 1; i < v21 + 1; i++) {
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

  if (!pano && typeof data[section]['hotspots'] !== 'undefined') {
    v21 = Object.keys(data[section]['hotspots']).length;
    $(".hotspot").remove();
    for (i = 1; i < v21 + 1; i++) {
      var hx = (parseInt(data[section]['hotspots']['area_' + i][0]) * width / 1280) - 30;
      var hy = (parseInt(data[section]['hotspots']['area_' + i][1]) * height / 720) - 32;
      $("#viewer").append('<div data-href="' + data[section]['links']['area_' + i] + '" class="hotspot" style="top:' + hy + 'px;left:' + hx + 'px;"><img src="' + base_url + '/img/ripple.svg"/><div></div></div>');
    }
  }
  if (!pano && typeof data[section]['hotspots_3D'] !== 'undefined') {
    v21 = Object.keys(data[section]['hotspots_3D']).length;
    v35 = true;
    renderHotspots();
  }
  step = $("#renders").width() / v2;
}

function renderHotspots() {
  if (!v22) {
    $(".hotspot").remove();
    var x = 0;
    var y = 0;

    $.each(data[section]['hotspots_3D'], function (hi, hotspot) {
      y = hotspot['y'] * height / 720 - 32;
      $.each(hotspot, function (i, val) {
        if (i == frame) {
          x = (val * width / 1280 - 32) + v36;
          $("#viewer").append('<div data-id="' + hi + '" class="hotspot hotspot_3d" data-href="' + hotspot['url'] + '" style="left:' + x + 'px;top:' + y + 'px"><img src="' + base_url + '/img/ripple_2.svg"/><div></div></div>');
        }
      });
    });
  }
}

function v31(data_id, sec) {
  $(".sec_side").hide();
  $(sec).show();
  if (data_id > 0) {
    var href = data[section]['prefix'] + data[section]['links']['area_' + data_id] + appf + "&p=" + project;
    $("#view_object").attr('href', href);
    $("#sidebar h2").text(data[section]['titles']['area_' + data_id]);
    var output = '<table>';
    $.each(data[section]['infos']['area_' + data_id], function (index, value) {
      var ss = value.split(":");
      output += '<tr><td>' + ss[0] + ':</td><td>' + ss[1] + '</td></tr>';
    });
    output += '</table>';
    if (data[section]['links']['area_' + data_id] == "" && project == 'at-linda') {
      output += '<p><br/><b>Së shpejti. Shih llamellën A dhe H.</b></p>';
    }
    $("#sidebar p").html(output);
  }
  $("#sidebar").animate({ marginLeft: 0 }, 350);
  $("#icons ul").animate({ marginLeft: -130 }, 350);
  iconOpened = false;
}
function v32(data_id) {
  if (iconOpened) {
    $("#icons ul").css("margin-left", "-100px");
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
  $("#icons ul").animate({ marginLeft: 0 }, 350);
  iconOpened = true;
}

$(window).resize(function () {
  v30();
  if (pano) {
    hfovfix();
  }
});

$(document).bind('touchmove', function (e) {
  e.preventDefault();
  if (v22) {
    v10 = parseInt(e.targetTouches[0].pageX);
    v11 = parseInt(e.targetTouches[0].pageY);
  }
});
$(document).bind('mousemove', function (e) {
  e.preventDefault();
  if (!v22) {
    v10 = parseInt(e.pageX);
    v11 = parseInt(e.pageY);
    $("#infobox").css("top", v11 + 40);
    $("#infobox").css("left", v10 - 150);
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
    window.location.href = 'http://int-virutaltour.chelseapoint.net/p/bernica-park/' + $(this).attr('data-href');
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
