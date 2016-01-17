var DiscAddCourseForm = function() {

    this.buildForm = function(form, form_state, options) {
        return new Promise(function(ok, err) {
            form._action = 'courses';
            form.parkName = {
                _type: 'textfield',
                _title: 'Park name',
                _required: true,
                _title_placeholder: true
            };
            form.courseName = {
                _type: 'textfield',
                _title: 'Course name',
                _title_placeholder: true
            };
            // Address
            // https://www.drupal.org/node/2645218
            form.latitude = {
                _type: 'textfield',
                _title: 'Latitude',
                _title_placeholder: true
            };
            form.longitude = {
                _type: 'textfield',
                _title: 'Longitude',
                _title_placeholder: true
            };
            form.notes = {
                _type: 'textarea',
                _title: 'Notes',
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

    //this.validateForm = function(form, formState) {
    //    return new Promise(function(ok, err) {
    //        if (formState.getValue('name') == 'bob') {
    //            formState.setErrorByName('name', 'Sorry bob!');
    //        }
    //        ok();
    //    });
    //};

    this.submitForm = function(form, formState) {
        return new Promise(function(ok, err) {
            var msg = 'Hello ' + formState.getValue('parkName');
            dg.alert(msg);
            ok();
        });
    };

};

// Extend the form prototype and attach our constructor.
DiscAddCourseForm.prototype = new dg.Form('DiscAddCourseForm');
DiscAddCourseForm.constructor = DiscAddCourseForm;