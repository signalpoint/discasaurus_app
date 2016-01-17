/**
 * Node
 * @param {Number|Object} nid_or_node
 * @constructor
 */
disc.Course = function(nid_or_node) {

  // Prep the entity.
  jDrupalEntityConstructorPrep(this, nid_or_node);

  this.holes = [];

};

disc.Course.prototype.getHoles = function() {
  var self = this;
  return new Promise(function(ok, err) {
    if (!self.holes.length) {
      dg.viewsLoad('course-holes/' + self.id()).then(function(view) {
        var results = view.getResults();
        for (var i = 0; i < results.length; i ++) {
          self.holes.push(new $.Node(results[i]));
        }
        ok(self.holes);
      });
    }
    else { ok(self.holes); }
  });
};

// Extend the entity prototype.
disc.Course.prototype = new dg.Node;
disc.Course.prototype.constructor = disc.Course;