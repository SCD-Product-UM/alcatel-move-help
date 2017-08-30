//兼容老方案，做重定向处理
//var pathname = 'http://www.tcl-move.com/help/url.html#/mb12/faqs/moveband2/en'
//取路由值
var hashPath = window.location.hash;
//hashPath = "#/mb12/faqs/hh/en"
hashPath = hashPath.replace("#/", "")
var hashParams = hashPath.split('/');
var langId = hashParams[3];
var customeName = hashParams[2]
var pageName = hashParams[1]
var project = hashParams[0]
console.log(project, pageName, customeName, langId)

function redirectTo(project, custom, page, lang) {
  var redirectUrl = "um.html?project=" + project + "&custom=" + custom + "&page=" + page + "&lang=" + lang
  console.log(redirectUrl)
  //$("#body").html('<a href="'+redirectUrl+'" target="_blank">'+redirectUrl+'</a>')
  window.location.href = redirectUrl
}
console.log(project)
switch (project) {
  case "mb12":
    if (customeName == "moveband2") {
      redirectTo(project, "moveband2", pageName, langId)
    } else if (customeName == "kuyou") {
      redirectTo(project, "kuyou", pageName, langId)
    }
    break;
  case "wifi_watch":
    if (customeName == "kuyou") {
      redirectTo(project, "kuyou", pageName, langId)
    }
    break;
  case "mt30":
    if (customeName == "generic") {
      if (pageName == "um") {
        redirectTo(project, "generic", "um_pdf", langId)
      } else {
        redirectTo(project, "generic", pageName, langId)
      }
    }
    break;
  case "cpe":
    if (customeName == "generic") {
      if (pageName == "privacy_policy" || pageName == "terms_and_conditions") {
        window.location.href = "http://www.tcl-move.com/help/docs_src/cpe_" + pageName + "/" + langId + "/" +
          langId + ".html"
      }
    }
    break;
}