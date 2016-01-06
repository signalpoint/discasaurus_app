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