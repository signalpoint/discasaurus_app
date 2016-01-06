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