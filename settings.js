// jDrupal Settings.
jDrupal.settings = {

  // Drupal site settings.
  sitePath: 'http://localhost/discasaurus.com/drupal',
  basePath: '/',

  // Set to true to see debug info printed to the console.log().
  debug: true,

  // Cache settings for Entities and View.
  cache: {
    entity: {
      enabled: false,
      expiration: 3600
    },
    views: {
      enabled: false,
      expiration: 3600
    }
  }

};

// DrupalGap Settings.
drupalgap.settings.mode = 'web-app';
drupalgap.settings.front = 'courses';
drupalgap.settings.theme = {
  name: 'frank',
  path: 'themes/frank'
};
drupalgap.settings.blocks.frank = {
  header: {
    disc_main_menu: {}
  },
  content: {
    main: {}
  },
  footer: {
    admin_menu: {
      roles: [
        { target_id: 'administrator', visible: true }
      ]
    }
  }
};

/**
 * MODULES
 *   Any modules enabled here must have their .js file loaded within the <head>
 *   of the index.html file.
 */

// Contrib modules.
//jDrupal.modules['example'] = {
//  path: 'app/modules/contrib/example'
//};
jDrupal.modules['foundation'] = {
  path: 'app/modules/contrib/foundation'
};

// Custom modules.
jDrupal.modules['my_module'] = {
  path: 'app/modules/custom/my_module'
};
jDrupal.modules['disc'] = {
  path: 'app/modules/custom/disc'
};