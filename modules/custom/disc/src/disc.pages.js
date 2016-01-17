function disc_courses_page_controller() {
  return new Promise(function(ok, err) {

    var content = {};
    content['add_course_button'] = {
      _markup: dg.l('Add a course', 'add-course', { _attributes: { 'class': ['button'] } })
    };
    content['course_list'] = {
      _theme: 'view',
      _path: 'courses', // Path to the View in Drupal
      _format: 'ul',
      _attributes: {
        id: 'courses-list'
      },
      _row_callback: function(row) {
        var node = dg.Node(row);
        return dg.l(node.getTitle(), 'node/' + node.id());
      }
    };

    navigator.geolocation.getCurrentPosition(
      // Success
      function (position) {

        // Inspect the position coordinates.
        //console.log(position.coords);

        // Show a generic alert message.
        //dg.alert(
        //    'Latitude: '          + position.coords.latitude          + '\n' +
        //    'Longitude: '         + position.coords.longitude         + '\n' +
        //    'Altitude: '          + position.coords.altitude          + '\n' +
        //    'Accuracy: '          + position.coords.accuracy          + '\n' +
        //    'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        //    'Heading: '           + position.coords.heading           + '\n' +
        //    'Speed: '             + position.coords.speed             + '\n' +
        //    'Timestamp: '         + position.timestamp                + '\n'
        //);

        // Show a bullet list of coordinate data...

        // Iterate over each coordinate and place them in a list.
        var pieces = ['latitude', 'longitude', 'altitude', 'accuracy', 'altitudeAccuracy', 'heading', 'speed'];
        var items = [];
        for (var i = 0; i < pieces.length; i++) {
          var piece = pieces[i];
          items.push(piece + ': ' + position.coords[piece])
        }

        // Show the date and time the location was retrieved.
        var d = new Date(position.timestamp);
        content['user-location-date'] = {
          _markup: d.toDateString()
        };

        // Show the pieces of the coordinates.
        content['user-location'] = {
          _theme: 'item_list',
          _items: items
        };

        ok(content);

      },
      // Error
      function (error) {
        dg.alert(
            'Code: '    + error.code    + '\n' +
            'Message: ' + error.message + '\n'
        );
      }
    );

  });
}