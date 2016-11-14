(function (window) {
  window.__env = window.__env || {};

  // API url
  window.__env.api = 'http://localhost:4000';

  // Base url
  window.__env.baseUrl = '/';

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;

  //GOOGLE API Credentials
  window.__env.googleClientId = '349632514154-qh4289snusgvkrvd4vlkj7g7m7sohaio.apps.googleusercontent.com';
  window.__env.googleSecret = 'uDK7a6809WyVyBAsTtU5mtCJ';
  window.__env.scopes = 'profile email',
  window.__env.domain = ''

  window.__env.redirectAfterLoginState = 'triangular.dashboard-analytics';


}(this));