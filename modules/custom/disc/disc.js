var disc = new dg.Module();

/**
 * Defines custom routes for my module.
 */
disc.routing = function() {
  var routes = {};

  routes["disc.courses"] = {
    "path": "/courses",
    "defaults": {
      "_controller": function() {
        return new Promise(function(ok, err) {

          var content = {};
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
          ok(content);

        });
      },
      "_title": "Disc Golf Courses"
    }
  };

  return routes;
};

/**
 * Defines blocks for my module.
 */
disc.blocks = function() {
  var blocks = {};

  blocks['disc_main_menu'] = {
    build: function () {
      return new Promise(function(ok, err) {
        var content = {};
        var account = dg.currentUser();

        var items = [
          dg.l('Courses', 'courses')
        ];
        if (!account.isAuthenticated()) {
          items.push(dg.l('Login', 'user/login'));
        }
        else {
          items.push(dg.l('My account', 'user/' + account.id()));
          items.push(dg.l('Logout', 'user/logout'));
        }
        content['my_main_menu'] = {
          _theme: 'item_list',
          _attributes: {
            'class': ['menu']
          },
          _items: items
        };
        ok(content);
      });
    }
  };

  return blocks;
};
