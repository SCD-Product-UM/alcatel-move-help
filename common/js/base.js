var langListConfig = {
  "en": "English",
  "ar": "العربية",
  "bg": "Български",
  "cs": "čeština",
  "da": "dansk",
  "de": "Deutsch",
  "el": "Ελληνικά",
  //"en_US": "English (United States)",
  "es": "español",
  "es-419": "Español (Latino)",
  "fr": "Français",
  "hr": "Hrvatski",
  "hu": "magyar",
  "it": "Italiano",
  "mk": "Mакедонски",
  "nl": "Nederlands",
  "nn-NO": "Norsk (bokmål)",
  "pt": "Português",
  "pt_BR": "Português (Brasil)",
  "lv": "Latvian",
  "lt": "Lithuanian",
  "pl": "Polish",
  "ro": "română",
  "ru": "Русский",
  "sk": "slovenčina",
  "sl": "slovenski",
  "sv": "svenska",
  "tr": "Türkçe",
  "fi":'Finnish',
  "et": "Estonian",
  "zh_CN": "简体中文"
};

var docsDir = 'docs/';
var layoutDir = 'layout/';
var loadPageErrorNum = 0;
var currentPage = '';
var currentLang = 'en';


function initMarkDownHtml($mdview, pageName, langId) {
  $('[linkHref]').each(function() {
    $(this).attr('href', '#' + $(this).attr('linkHref') + '/' + currentLang);
  });
  var currentProject = window.location.hash.split('/')[1]
  $('#umlinkHref').attr('href', 'docs/'+currentProject+'/um_pdf/wifi_watch_um_' + currentLang + '.pdf');
  $('#mb12-um-link').attr('href', 'docs/mb12/um_pdf/mb12_um_' + currentLang + '.pdf');
  $('#mt30-um-link').attr('href', 'docs/mt30/um_pdf/mt30_um_' + currentLang + '.pdf');
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
  $(".js-faqs h4").each(function(v){
    $(this).prepend(v+1+". ")
    //console.log($(this).text())
  })
  $(".js-faqs h4").on("click",function(){
    var thisBlock=$(this).next("blockquote")
    if (thisBlock.hasClass("show")){
      thisBlock.removeClass("show")
    }else{
      thisBlock.addClass("show")
    }
  })
}

function loadPage() {
  var args = [];
  var argsLength = arguments.length;
  for (var i = 0; i < argsLength; i++) {
    args.push(arguments[i]);
  }
  var pathArr = args.slice(0, argsLength - 1);
  var pagePath = pathArr.join('/');
  currentPage = pagePath;
  var langId = arguments[argsLength - 1];
  if(!langListConfig.hasOwnProperty(langId)){
    if(langId.indexOf("_")!=-1){
      langId = langId.split("_")[0]
    }else if(langId.indexOf("-")!=-1){
      langId = langId.split("-")[0]
    }
  }
  if(!langListConfig.hasOwnProperty(langId)){
    window.location.hash = '/' + currentPage + '/en';
  }
  currentLang = langId;
  var $mdview = $('[mdview]');
  var $docView = $mdview;
  var location_href = location.href;
  if(location_href.indexOf("kids_watch")!=-1){
    $("#lang-select").hide()
  }else{
    $("#lang-select").show()
  }
  $("#lang-select").val(langId);
  $pageContainer = $("#pageContainer");

  $.ajax({
    url: layoutDir + pagePath + '/index.html'
  }).always(function(data) {
    $docView.html(data);
    $("#tpl").replaceTpl();
    var $childView = $mdview.find('[mdview]');
    if ($childView.size() > 0) {
      $docView = $childView;
    }
    loadDoc(langId);

  });

  function loadDoc(langId) {
    $.ajax({
      url: docsDir + pagePath + '/' + langId + '/' + langId + '.html?'+Math.random()
    }).done(function(data) {
      loadPageErrorNum = 0;
      $pageContainer.removeClass("loading");
      $docView.addClass('mdview').html(data);
      initMarkDownHtml($docView, pagePath, langId);
      $("#tpl").replaceTpl();
    }).fail(function() {
      if (loadPageErrorNum === 0) {
        //loadDoc('en');
        window.location.hash = '/' + pagePath + '/en';
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


(function() {
  var cache = {};
  this.tmpl = function(template_id, data) {
    var fn = cache[template_id];
    this.get = function(dataid) {
      var id = dataid.split(":")[0];
      var res = data[id] ? (dataid.charAt(dataid.length - 1) == ":" ? data[id] + ':' : data[id]) : 'null';
      return res;
    }

    if (!fn) {
      var template = document.getElementById(template_id).innerHTML;
      fn = new Function("data", "var p=[]; p.push('" +
        template
        .replace(/[\r\t\n]/g, " ")
        .split("'").join("\\'")
        .replace(/\${(.+?)}/g, "',this.get(\'$1\'),'")
        .split("${").join("');")
        .split("}").join("p.push('") + "');return p.join('');");
      cache[template_id] = fn;
    }
    return fn();
  };
})();

(function($) {
  $.fn.extend({
    replaceTpl: function() {
      return this.each(function() {
        $(this).replaceWith(tmpl($(this).attr("id"), RES[currentLang]));
      })
    }
  });
})(jQuery);

$(function() {
  pageInit();
  initRouter();
});
