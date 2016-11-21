function init(){
  var pathname = window.location.pathname;
  var langStr = pathname.split('/').reverse()[0];
  var langId = langStr.split('.')[0];
  $('html').attr('id','html-'+langId);
}
$(function() {
  init();
});