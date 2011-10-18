# gpxgoogle

This script reads GPX data (for example, from your GPS) and plots it on a Google
map.

## .gpxgoogle config file

The .gpxgoogle config file is a simple XML file:

    <config>
      <title>Google Maps GPS Track</title>
      <width>640px</width>
      <height>640px</height>
      <units>mi</units>
      <colinear-threshold>0.00001</colinear-threshold>
    </config>

The `title`, `width`, and `height` are only used if an HTML page is generated.
They specify the title of the page and the dimensions of the map, respectively.

The data generated includes the distance between points in the `units` specified.

The `colinear-threshold` determines how nearly colinear three points
have to be in order to drop the middle one. Smaller values produce
more accurate tracks at the expense of more points (larger, slower
maps).
