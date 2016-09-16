function mockTemplate(templateRoute, tmpl) {
  $templateCache.put(templateRoute, tmpl || templateRoute);
}

function goTo(url) {
  $location.url(url);
  $rootScope.$digest();
}