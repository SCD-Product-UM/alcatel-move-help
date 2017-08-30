//兼容老方案，做重定向处理
    //var pathname = 'http://www.tcl-move.com/help/index.html#/mb12/faqs/en'
    //取路由值
    var hashPath = window.location.hash;
    //hashPath = "#/mb12/faqs/hh/en"
    hashPath = hashPath.replace("#/", "")
    var hashParams = hashPath.split('/');

    function redirectTo(project, custom, page, lang) {
      var redirectUrl = "um.html?project=" + project + "&custom=" + custom + "&page=" + page + "&lang=" + lang
      //console.log(redirectUrl)
      //$("#body").html('<a href="' + redirectUrl + '" target="_blank">' + redirectUrl + '</a>')
      window.location.href=redirectUrl
    }
    try {
      switch (hashParams[0]) {
        //########### wifi watch #####################
        case "privacy_policy":
          redirectTo("wifi_watch", "generic", "privacy_policy", hashParams[1] || "en")
          break;
        case "terms_and_conditions":
          redirectTo("wifi_watch", "generic", "terms_and_conditions", hashParams[1] || "en")
          break;
        case "wifi_watch_kuyou_pp":
          redirectTo("wifi_watch", "kuyou", "privacy_policy", hashParams[1] || "en")
          break;
        case "wifi_watch_kuyou_tc":
          redirectTo("wifi_watch", "kuyou", "terms_and_conditions", hashParams[1] || "en")
          break;
          //########### mb12 #####################
        case "mb12_kuyou_privacy_policy":
          redirectTo("mb12", "kuyou", "privacy_policy", hashParams[1] || "en")
          break;
        case "mb12_kuyou_terms_and_conditions":
          redirectTo("mb12", "kuyou", "terms_and_conditions", hashParams[1] || "en")
          break;
        case "mb12_privacy_policy":
          redirectTo("mb12", "generic", "privacy_policy", hashParams[1] || "en")
          break;
        case "mb12_terms_and_conditions":
          redirectTo("mb12", "generic", "terms_and_conditions", hashParams[1] || "en")
          break;
          //########### mt30 #####################
        case "mt30_privacy_policy":
          redirectTo("mt30", "generic", "privacy_policy", hashParams[1] || "en")
          break;
        case "mt30_terms_and_conditions":
          redirectTo("mt30", "generic", "terms_and_conditions", hashParams[1] || "en")
          break;
          //########### kids watch #####################
        case "kids_watch_privacy_policy":
          redirectTo("kids_watch", "generic", "privacy_policy", hashParams[1] || "en")
          break;
        case "kids_watch_terms_and_conditions":
          redirectTo("kids_watch", "generic", "terms_and_conditions", hashParams[1] || "en")
          break;

          //########### mb12 #####################
        case "mb12":
          redirectTo("mb12", "generic", hashParams[1], hashParams[2] || "en")
          break;
        case "mb12_kuyou":
          redirectTo("mb12", "kuyou", hashParams[1], hashParams[2] || "en")
          break;
        case "mb12-moveband2":
          redirectTo("mb12", "moveband2", hashParams[1], hashParams[2] || "en")
          break;
          //########### wifi watch #####################
        case "wifi_watch":
          redirectTo("wifi_watch", "generic", hashParams[1], hashParams[2] || "en")
          break;
        case "wifi_watch_kuyou":
          redirectTo("wifi_watch", "kuyou", hashParams[1], hashParams[2] || "en")
          break;
        case "europe_wifi_watch":
          redirectTo("wifi_watch", "europe", hashParams[1], hashParams[2] || "en")
          break;
          //########### mt30 #####################
        case "mt30":
          redirectTo("mt30", "generic", hashParams[1], hashParams[2] || "en")
          break;

      }
    } catch (err) {
      console.log(err)
    }