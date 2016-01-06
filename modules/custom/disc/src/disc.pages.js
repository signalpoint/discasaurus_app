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