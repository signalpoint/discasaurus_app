/**
 * Implements hook_entity_view().
 */
function disc_entity_view(build, entity) {
  return new Promise(function(ok, err) {

    // Courses.
    if (entity.getEntityType() == 'node') {

      switch (entity.getType()) {
        case 'course':
          //build['add_hole_button'] = {
          //  _markup: dg.l('Add a hole', 'node/add/hole', { _attributes: { 'class': ['button'] } })
          //};
          build['course-holes'] = {
            _theme: 'view',
            _path: 'course-holes/' + entity.id(),
            _format: 'ul',
            _attributes: {
              id: 'course-holes-' + entity.id()
            },
            _row_callback: function(row) {
              var node = dg.Node(row);
              return dg.l(node.getTitle(), 'node/' + node.id());
            },
            _weight: 420
          };
          break;
        default: break;
      }

    }
    ok();
  });
}
