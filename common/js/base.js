var langListConfig = {
  "en": "English",
  "es": "español",
  "ar": "العربية",
  "bg": "Български",
  "cs": "čeština",
  "da": "dansk",
  "de": "Deutsch",
  "el": "Ελληνικά",
  "en-us": "English (United States)",
  "es-latn": "Español (Latino)",
  "fr": "Français",
  "fr-ca": "Français (Canada)",
  "hr": "Hrvatski",
  "hu": "magyar",
  "it": "Italiano",
  "mk": "Mакедонски",
  "nl": "Nederlands",
  "no": "Norsk (bokmål)",
  "po": "polski",
  "pt": "Português",
  "pt-br": "Português (Brasil)",
  "ro": "română",
  "ru": "Русский",
  "sk": "slovenčina",
  "sl": "slovenski",
  "sv": "svenska",
  "zh-cn": "中文(简体)",
  "zh-hk": "中文(繁体)",
  "tr": "Türkçe"
};

var docsDir = 'docs/';
var layoutDir = 'layout/';
var loadPageErrorNum = 0;
var currentPage = '';
var currentLang = 'en';


function initMarkDownHtml($mdview, pageName, langId) {
  $('[linkHref]').each(function(){
    $(this).attr('href','#'+$(this).attr('linkHref')+'/'+currentLang);
  });

  $('#umlinkHref').attr('href','docs/wifi_watch/um_pdf/wifi_watch_um_'+currentLang+'.pdf');
  $mdview.find('img').each(function() {
    $this = $(this);
    var src = $this.attr('src');
    var enImg = docsDir + pageName + '/en/' + src;
    $this.attr('src', docsDir + pageName + '/' + langId + '/' + src)
      .addClass('img-responsive')
      .attr('onerror', "this.src='" + enImg + "';this.onerror='return true'");
  });
  $('html').attr('id', 'html-' + langId);
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
  currentLang = langId;
  var $mdview = $('[mdview]');
  var $docView = $mdview;
  currentPage = pagePath;
  $("#lang-select").val(langId);
  $pageContainer = $("#pageContainer");

  $.ajax({
    url: layoutDir + pagePath + '/index.html'
  }).always(function(data) {
    $docView.html(data);
    var $childView = $mdview.find('[mdview]');
    if ($childView.size() > 0) {
      $docView = $childView;
    }
    loadDoc(langId);

  });

  function loadDoc(langId) {
    $.ajax({
      url: docsDir + pagePath + '/' + langId + '/' + langId + '.html'
    }).done(function(data) {
      loadPageErrorNum = 0;
      $pageContainer.removeClass("loading");
      $docView.addClass('mdview').html(data);
      initMarkDownHtml($docView, pagePath, langId);
    }).fail(function() {
      if (loadPageErrorNum === 0) {
        loadDoc('en');
        //window.location.hash = '/' + pagePath + '/en';
      } else {
        $pageContainer.removeClass("loading");
        $docView.html('404 Not Found');
      }
      loadPageErrorNum++;
    });
  }
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
      $('[mdview]').html('404 Not Found');
      $("#pageContainer").removeClass("loading");
    }
  };
  var router = Router(routes).configure(options);
  router.init();
}


function pageInit() {
  var langSelectStr = '';
  $.each(langListConfig, function(i, v) {
    langSelectStr += '<option value="' + i + '">' + v + '</option>';
  });
  $("#lang-select").html(langSelectStr).change(function() {
    window.location.hash = '/' + currentPage + '/' + $(this).val();
  });

  
}

$(function() {
  pageInit();
  initRouter();
});
