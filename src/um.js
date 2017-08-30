//um/url.html?project=wifi_watch&custom=generic&page=faqs&lang=en
var thisPageName = "um.html"
var href = window.location.href;
var project = GetQueryString("project")
var custom = GetQueryString("custom")
var page = GetQueryString("page")
var lang = GetQueryString("lang") || 'en'

if (lang == 'zh' || lang == 'zh-rCN' || lang == 'zh-Hans_US') {
  lang = 'zh_CN';
}
if (lang == 'cz') {
  lang = 'cs';
}

function GetQueryString(name) {
  var locatcion_search = window.location.search
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = locatcion_search.substr(1).match(reg);
  if (r != null) return unescape(r[2]).replace(/(^\s*)|(\s*$)/g, "");
  return null;
};


(function () {
  var cache = {};
  this.tmpl = function (template_id, data) {
    var fn = cache[template_id];
    this.get = function (dataid) {
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

function IsEndWith(str, endStr) {
  var d = str.length - endStr.length;
  return (d >= 0 && str.lastIndexOf(endStr) == d)
}
console.log(project, custom, page, lang)

function initSearch(page) {
  return thisPageName + "?project=" + project + "&custom=" + custom + "&page=" + page + "&lang=" + lang
}

function getRes(ids) {
  var _res
  if (RES.hasOwnProperty(lang)) {
    _res = RES[lang]
  } else {
    _res = RES["en"]
  }
  return _res[ids] || ids
}

function initNavData() {
  return [{
    "text": getRes("ids_faq"),
    "href": initSearch("faqs")
  }, {
    "text": getRes("ids_down_user_manual"),
    "target":"_blank",
    "href": "Project/" + project + "/" + custom + "/um_pdf/" + getUmName()//initSearch("download_user_manual")
  }, {
    "text": getRes("ids_support_phone"),
    "href": initSearch("supported_phones")
  }]
}
var commonMenu = {
  faqs: initNavData(),
  download_user_manual: initNavData(),
  supported_phones: initNavData()
}
var menuData = {
  wifi_watch: {
    generic: commonMenu,
    kuyou: commonMenu,
    europe: commonMenu
  },
  mb12: {
    generic: commonMenu,
    moveband2: commonMenu,
    kuyou: commonMenu
  }
}

function init() {
  checkPage()
  var $docView = $("#doc")
  $('html').attr('id', 'html-' + checkLang());
  initMenu()
  if (page != "um_pdf") {
    $docView.load(checkPage() + checkLang() + "/" + checkLang() + ".html #pageContainer >*", function (response, status, xhr) {
      if (status == "error") {
        $docView.html("<p class='alert alert-danger'>404 error:<br/>" + checkPage() + checkLang() + "/" + checkLang() + ".html</div>")
      } else {
        initFaqPage()
        initDownloadUserManual()
      }

    })
  } else {
    console.log(getUmName())
    if (getUmName() != "") {
      console.log("Project/" + project + '/' + custom + '/' + page + '/'+getUmName())
      window.location.href = "Project/" + project + '/' + custom + '/' + page + '/' + getUmName()
    } else {
      $docView.html("<p class='alert alert-danger'>404 error:<br/></div>")
    }
  }
}

function IsEndWith(str, endStr) {
  var d = str.length - endStr.length;
  return (d >= 0 && str.lastIndexOf(endStr) == d)
}

function checkPage() {
  var htmlPagePath = ""
  try {
    if (_.has(umlist[project][custom], page)) {
      $.each(umlist[project][custom][page], function (k, v) {
        if (IsEndWith(k, ".redirect")) {
          for (var i = 0; i < k.split(".").length - 1; i++) {
            htmlPagePath += k.split(".")[i] + "/"
          }
        }
      })
      if (htmlPagePath == "") {
        htmlPagePath = "Project/" + project + "/" + custom + "/" + page + "/"
      }
    }
  } catch (err) {

  }
  return htmlPagePath;
}


function getUmName() {
  var um_pdf_name = ""

  function findLang(listObj, lang) {
    var _lang = null
    _.each(listObj, function (v, k) {
      if (IsEndWith(k.toLowerCase().replace(/\-/g, "_").split(".pdf")[0], lang.toLowerCase().replace(/\-/g, "_"))) {
        _lang = k
        return false
      }
    })
    return _lang
  }
  try {
    if (_.has(umlist[project][custom], "um_pdf")) {
      um_pdf_name = findLang(umlist[project][custom]["um_pdf"], lang) || findLang(umlist[project][custom]["um_pdf"], lang.split("-")[0]) || findLang(umlist[project][custom]["um_pdf"], lang.split("_")[0]) || findLang(umlist[project][custom]["um_pdf"], "en")
    }
  } catch (err) {

  }
  return um_pdf_name
}

function checkLang() {
  var currentLang

  function findLang(listObj, lang) {
    var _lang = null
    _.each(listObj, function (v, k) {
      if (k.toLowerCase().replace(/\-/g, "_") == lang.toLowerCase().replace(/\-/g, "_")) {
        _lang = k
        return false
      }
    })
    return _lang
  }
  try {
    if (_.has(umlist[project][custom], page)) {
      currentLang = findLang(umlist[project][custom][page], lang) || findLang(umlist[project][custom][page], lang.split("-")[0]) || findLang(umlist[project][custom][page], lang.split("_")[0]) || "en"
    }
  } catch (err) {
    currentLang = "en"
  }

  return currentLang
}

function initMenu() {
  var isHasMeun = false;
  try {
    if (_.has(menuData[project][custom], page)) {
      isHasMeun = true
    }
  } catch (err) {
    isHasMeun = false
  }
  if (isHasMeun) {
    var str = "<div id='help-nav list-group'>"
    $.each(menuData[project][custom][page], function (i, li) {
      if(li.hasOwnProperty("target")){
        str += "<a target='"+li.target+"' class='list-group-item' href='" + li.href + "'>" + li.text + "</a>"
      }else{
        str += "<a class='list-group-item' href='" + li.href + "'>" + li.text + "</a>"
      }
    })
    str += "</div>"
    $(".help-nav").html(str).show()
    $(".help-main").removeClass("col-md-12").addClass("col-md-10 col-sm-9")
  }else{
    $(".help-nav").html(str).hide()
    $(".help-main").removeClass("col-md-10 col-sm-9").addClass("col-md-12")
  }

}

function initFaqPage() {
  document.title = $('h1:first').text() || $('h2:first').text() || $('h3:first').text() || "";
  var $docView = $("#doc")
  $docView.addClass("page-" + page)
  $docView.find('img').each(function () {
    $this = $(this);
    var src = $this.attr('src') + "?" + Math.random();
    var enImg = "Project/" + project + '/' + custom + '/' + page + '/en/' + src;
    $this.attr('src', "Project/" + project + '/' + custom + '/' + page + '/' + checkLang() + '/' + src)
      .addClass('img-responsive')
      .attr('onerror', "this.src='" + enImg + "';this.onerror='return true'");
  });

  $docView.find('p').each(function () {
    var $this = $(this);
    if ($.trim($this.text()) !== '') {
      $this.removeClass('ds-block').find('img').addClass('inline-img');
    } else {
      $this.addClass('ds-block');
    }
  });
  $(".page-faqs h4").each(function (v) {
    $(this).prepend(v + 1 + ". ")
  })
  $(".page-faqs h4").on("click", function () {
    var thisBlock = $(this).next("blockquote")
    if (thisBlock.hasClass("show")) {
      thisBlock.removeClass("show")
    } else {
      thisBlock.addClass("show")
    }
  })
}

function initDownloadUserManual() {
  $("#umlinkHref").attr("href", "Project/" + project + "/" + custom + "/um_pdf/" + getUmName())
}

init()