// Create global variables to hold coordinates and the map.
var _disc_user_latitude = null;
var _disc_user_longitude = null;
var _disc_map = null;

function disc_courses_page_controller() {
  return new Promise(function(ok, err) {

    var content = {};

    // Show a button to add a course.
    content['add_course_button'] = {
      _markup: dg.l('Add a course', 'add-course', { _attributes: { 'class': ['button'] } })
    };

    // Show a list of courses.
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

    // Add a placeholder for the map.
    var map_attributes = {
      id: 'my-module-map',
      style: 'width: 100%; height: 320px;'
    };
    content['map'] = {
      _markup: '<div ' + dg.attributes(map_attributes) + '></div>',
      _postRender: [disc_map_post_render]
    };

    navigator.geolocation.getCurrentPosition(
      // Success
      function (position) {

        // Set aside the user's position.
        _disc_user_latitude = position.coords.latitude;
        _disc_user_longitude = position.coords.longitude;



        ok(content);

      },
      // Error
      function (error) {
        dg.alert(
            'Code: '    + error.code    + '\n' +
            'Message: ' + error.message + '\n'
        );
        ok(content);
      }
    );

  });
}

function disc_map_post_render() {

  // Build the lat lng object from the user's position.
  var myLatlng = new google.maps.LatLng(
      _disc_user_latitude,
      _disc_user_longitude
  );

  // Set the map's options.
  var mapOptions = {
    center: myLatlng,
    zoom: 11,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    },
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    }
  };

  // Initialize the map, and set a timeout to resize properly.
  _disc_map = new google.maps.Map(
      document.getElementById("my-module-map"),
      mapOptions
  );
  setTimeout(function() {
    google.maps.event.trigger(_disc_map, 'resize');
    _disc_map.setCenter(myLatlng);
  }, 500);

  // Add a marker for the user's current position.
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: _disc_map,
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
  });
}
