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