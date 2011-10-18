/* -*- JavaScript -*-
 *
 * Utility routines for Google Map plots. Updated for Google Maps V3.
 */

var mapdata;
var map;

function plotTracks(mparam, divid) {
    mapdata = mparam;

    var latlng = new google.maps.LatLng(mapdata.centerlat, mapdata.centerlng);
    var mapopts = {
        zoom: mapdata.zoom,
        center: latlng,
    };

    if (mapdata.type == "terrain") {
        mapopts.mapTypeId = google.maps.MapTypeId.TERRAIN
    } else { // FIXME: deal with the other types...
        mapopts.mapTypeId = google.maps.MapTypeId.ROADMAP
    }

    map = new google.maps.Map(document.getElementById(divid), mapopts);

    for (var pos = 0; pos < mapdata.tracks.length; pos++) {
        var track = mapdata.tracks[pos];
        var points = new Array();
        for (var ppos = 0; ppos < track.length; ppos++) {
            var pt = track[ppos];
            points.push(trkPt(map,pt.lat,pt.lng,pt.ele,pt.time,pt.dist,pt.velocity,pt.count));
        }

        var lopts = {
            path: points,
            strokeColor: mapdata.trackColor,
            strokeWeight: mapdata.strokeWeight,
            strokeOpacity: mapdata.strokeOpacity
        }

        if (mapdata.lastTrackColor != null && pos+1 == mapdata.tracks.length) {
            lopts.strokeColor = mapdata.lastTrackColor;
        }

        var line = new google.maps.Polyline(lopts);
        line.setMap(map);
    }
}

// Creates an extended GPoint
function trkPt(map, lat, lon, elev, time, dist, uph, count) {
    var pt = new google.maps.LatLng(lat,lon);
    pt.latitude = lat;
    pt.longitude = lon;
    pt.elevation = elev;
    pt.timestamp = time;
    pt.distance = dist;
    pt.unitsperhour = uph;
    pt.pointcount = count;

    if (mapdata.showTrackMarks) {
        var opts = {
            icon: "http://ndw.github.com/gpxgoogle/x.png",
            position: pt,
            title: "Point #" + count,
            map: map
        };

        var mark = new google.maps.Marker(opts);

        var html = "<div>Track point #" + count;
        html = html + " on<br />" + time + "<br />";
        html = html + "Lat: " + lat + "<br />";
        html = html + "Lon: " + lon + "<br />";
        html = html + "Ele: " + elev + "<br />";
        html = html + "Dis: " + dist + "mi<br />";
        if (uph != null) {
            html = html + "Spd: " + uph + "mi/hr<br />";
        }
        html = html + "</div>";

        var infowindow = new google.maps.InfoWindow({
            content: html
        });

        google.maps.event.addListener(mark, 'click', function() { infowindow.open(map,mark); });
    }

    return pt;
}
