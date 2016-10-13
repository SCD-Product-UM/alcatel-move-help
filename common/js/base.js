var docsDir = 'docs/'
var loadPageErrorNum = 0;


function initMarkDownHtml(pageName, langId) {
  $mdview = $('[mdview]');
  $mdview.find('img').each(function() {
    $this = $(this);
    var src = $this.attr('src');
    var enImg = docsDir + pageName + '/en/' + src;
    $this.attr('src', docsDir + pageName + '/' + langId + '/' + src)
      .addClass('img-responsive')
      .attr('onerror', "this.src='" + enImg + "';this.onerror='return true'");
  });
  $('html').attr('id','html-'+langId)
  document.title = $('h1:first').text() || "";
  $mdview.find('table').addClass('table table-bordered');
  $mdview.find('p').each(function() {
    var $this = $(this);
    if ($.trim($this.text()) !== '') {
      $this.removeClass('ds-block').find('img').addClass('inline-img');
    } else {
      $this.addClass('ds-block');
    }
  });
}

function loadPage() {
  var args = [];
  var argsLength = arguments.length;
  for (var i = 0; i < argsLength; i++) {
    args.push(arguments[i]);
  }
  var pathArr = args.slice(0, argsLength - 1);
  var pagePath = pathArr.join('/');
  var langId = arguments[argsLength - 1];
  $mdview = $('[mdview]');
  $.ajax({
    url: docsDir+pagePath + '/' + langId + '/' + langId + '.html'
  }).done(function(data) {
    loadPageErrorNum = 0;
    $mdview.addClass('mdview').html(data);
    initMarkDownHtml(pagePath, langId);
  }).fail(function() {
    if (loadPageErrorNum === 0) {
      window.location.hash = '/' +pagePath+'/en';
    } else {
      $mdview.html('notfound');
    }
    loadPageErrorNum++;
  });
}

function initRouter() {
  var routes = {
    '/:page/': loadPage,
    '/:page/:lang': loadPage,
    '/:page/:more/:lang': loadPage,
    '/:page/:more/:more1/:lang': loadPage,
    '/:page/:more/:more1/:more2/:lang': loadPage,
    '/:page/:more/:more1/:more2/:more3/:lang': loadPage,
    '/:page/:more/:more1/:more2/:more3/:more4/:lang': loadPage
  };

  var options = {
    notfound: function() {
      $('[mdview]').html('notfound');
    }
  };
  var router = Router(routes).configure(options);
  router.init();
}


$(function() {
  initRouter();
});
