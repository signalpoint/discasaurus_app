var disc = new dg.Module(); // Create the module.
dg.modules.disc = disc; // Attach it to DrupalGap.

/**
 * Defines custom routes for my module.
 */
disc.routing = function() {
  var routes = {};
  routes["disc.courses"] = {
    "path": "/courses",
    "defaults": {
      "_controller": disc_courses_page_controller,
      "_title": "Disc Golf Courses"
    }
  };
  routes["disc.add-course"] = {
    "path": "/add-course",
    "defaults": {
      "_form": 'DiscAddCourseForm',
      "_title": "Add a course"
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
    build: disc_main_menu_build
  };
  return blocks;
};

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
    ok(content);

  });
}

function disc_main_menu_build() {
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

var DiscAddCourseForm = function() {

  this.buildForm = function(form, form_state, options) {
    return new Promise(function(ok, err) {
      form._action = 'courses';
      form.name = {
        _type: 'textfield',
        _title: 'Course name',
        _required: true,
        _title_placeholder: true
      };
      form.actions = {
        _type: 'actions',
        submit: {
          _type: 'submit',
          _value: 'Submit course for review',
          _button_type: 'primary'
        }
      };
      ok(form);
    });
  };

  this.validateForm = function(form, formState) {
    return new Promise(function(ok, err) {
      if (formState.getValue('name') == 'bob') {
        formState.setErrorByName('name', 'Sorry bob!');
      }
      ok();
    });
  };

  this.submitForm = function(form, formState) {
    return new Promise(function(ok, err) {
      var msg = 'Hello ' + formState.getValue('name');
      dg.alert(msg);
      ok();
    });
  };

};

// Extend the form prototype and attach our constructor.
DiscAddCourseForm.prototype = new dg.Form('DiscAddCourseForm');
DiscAddCourseForm.constructor = DiscAddCourseForm;