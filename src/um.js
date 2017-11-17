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

if (lang == 'zh-HK' || lang == 'zh-Hant-HK') {
  lang = 'zh_HK';
}
if (lang == 'cz') {
  lang = 'cs';
}

if (lang.toLowerCase() == "es-mx" || lang.toLowerCase() == "es_mx") {
  lang = "es-419";
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
  var lang = checkLang()
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
    "target": "_blank",
    "href": "Project/" + project + "/" + custom + "/um_pdf/" + getUmName() //initSearch("download_user_manual")
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

  var $docView = $("#doc")
  $('html').attr('id', 'html-' + currentLang);
  initMenu()

  if (page != "um_pdf") {
    var currentPage = checkPage(); //获取处理之后能重定向的页面路径
    var currentLang = checkLang(); //获取处理之后能重定向的语言简写
    var htmlPath = currentPage + currentLang + "/" + currentLang + ".html"
    console.log(htmlPath)
    $docView.load(htmlPath + " #pageContainer >*", function (response, status, xhr) {
      if (status == "error") {
        $docView.html("<p class='alert alert-danger'>404 error:<br/>" + htmlPath + "</div>")
      } else {
        initFaqPage()
        initDownloadUserManual()
      }

    })
  } else {
    var umName = getUmName()
    var umPath = "Project/" + project + '/' + custom + '/' + page + '/' + umName
    if (umName != "") {
      console.log(umPath)
      window.location.href = umPath
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


function getPageData(project, custom, page) {
  var objData;
  var pageList;
  var _umList = umlist[project][custom];
  var redirectStr = ""
  var redirectArr
  _.each(_umList[page], function (v, k) {
    if (IsEndWith(k, ".redirect")) {
      redirectStr = k;
      return false;
    }
  })

  if (redirectStr != "") {
    redirectArr = redirectStr.split(".")
    var redirectArrLength = redirectArr.length
    if (redirectArr[0] == "Public") {
      objData = publicList
    } else {
      objData = umlist
    }
    if (redirectArrLength == 3) {
      pageList = objData
    } else if (redirectArrLength == 4) {
      pageList = objData[redirectArr[1]]
    } else if (redirectArrLength == 5) {
      pageList = objData[redirectArr[1]][redirectArr[2]]
    } else if (redirectArrLength == 6) {
      pageList = objData[redirectArr[1]][redirectArr[2]][redirectArr[3]]
    }
  } else {
    pageList = umlist[project][custom]
  }
  var currentLang = "en"
  try {
    if (_.has(pageList, page)) {
      currentLang = findLang(pageList[page], lang) || findLang(pageList[page], lang.split("-")[0]) || findLang(pageList[page], lang.split("_")[0]) || "en"
    }
  } catch (err) {
    currentLang = "en"
  }
  return currentLang
}


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

function checkLang() {
  return getPageData(project, custom, page)
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
      if (li.hasOwnProperty("target")) {
        str += "<a target='" + li.target + "' class='list-group-item' href='" + li.href + "'>" + li.text + "</a>"
      } else {
        str += "<a class='list-group-item' href='" + li.href + "'>" + li.text + "</a>"
      }
    })
    str += "</div>"
    $(".help-nav").html(str).show()
    $(".help-main").removeClass("col-md-12").addClass("col-md-10 col-sm-9")
  } else {
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