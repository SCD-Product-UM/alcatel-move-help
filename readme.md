## 语言简写对应表

- `en`: `English` 英语
- `ar`: `العربية` 阿拉伯语
- `bg`: `Български` 保加利亚语
- `cs`: `čeština` 捷克语
- `da`: `dansk` 丹麦语
- `de`: `Deutsch` 德语
- `el`: `Ελληνικά` 希腊语
- `es`: `español` 西班牙语
- `es-419`: `Español (Latino)` Latam 西班牙语
- `fr`: `Français` 法语
- `hr`: `Hrvatski` 克罗地亚语
- `hu`: `magyar` 匈牙利
- `it`: `Italiano` 意大利语
- `mk`: `Mакедонски` 马其顿语
- `nl`: `Nederlands` 荷兰语
- `nn-NO`: `Norsk (bokmål)` 挪威语
- `pt`: `Português` 葡萄牙语
- `pt_BR`: `Português (Brasil)` 葡萄牙语(巴西)
- `lv`: `Latvian` 拉脱维亚语
- `lt`: `Lithuanian` 立陶宛语
- `pl`: `Polish` 波兰语
- `ro`: `română` 罗马尼亚
- `ru`: `Русский` 俄语
- `sk`: `slovenčina` 斯洛文尼亚语
- `sl`: `slovenski` （捷克语） 斯洛伐克语
- `sv`: `svenska` 瑞典语
- `tr`: `Türkçe` 土耳其语
- `fi`: `Finnish` 芬兰语
- `et`: `Estonian` 爱沙尼亚语
- `zh_CN`: `简体中文`
- `zh_HK`: `繁体中文`


## 文件结构

```
├── Project //按项目划分的html及um资源目录
├── Public //公共的html及um资源目录
├── docs_src //cpe pp和tc资源目录
├── src
│   ├── css.css //样式文件
│   ├── old_index.js //用于控制旧方案的重定向
│   ├── old_url.js //用于控制旧方案的重定向
│   ├── um.js //最终重定向方案及逻辑处理
│   ├── umlist.js //运行auto.sh生成的文件，用于控制重定向
│   └── res.js //菜单多语言字符串
├── .gitignore //git忽略文件
├── auto.sh //批处理文件，将资源添加到对应目录之后，运行，生产src/umlist.js
├── index.js //nodejs脚本，处理资源之后生成src/umlist.js，便于控制重定向
├── package.json //nodejs脚本信息
├── readme.md //项目说明文档
├── index.html //旧方案，引用src/old_index.js，用于重定向到新方案um.html
├── um.xml //新方案入口文件，即最终处理重定向的文件
└── url.html ////旧方案，引用src/old_url.js，用于重定向到新方案um.html
```



## 维护

- Git地址：`https://tcl-lujinhui@github.com/SCD-Product-UM/alcatel-move-help.git`


### 本次主要更新日志
- 暂时保留原资源docs目录，后续再删除，避免由于用户机器缓存问题无法加载资源的问题
- 对之前提供给APP的路径做重定向处理，重定向到新的方案，后续有新项目或者新定制，使用新方案
- 修改UI资源加载方案，避免维护两套资源的问题
- 做自动化重定向处理，避免每次更新语言或是添加新定制或是项目时多处改动的问题
- 优化语言匹配方案
  - 将"-"统一转成“_”
  - 忽略大小写
  - 匹配不到`语言_地区`时,匹配`语言`，例如`en_US`不存在资源时，显示`en`的资源
- 优化um pdf路径匹配方案

### 更新步骤
1. update 本地仓库
2. 将资源提交到对应目录中
  - 注意点：
    - 从um组那边拿回来资源之后不需要做特殊处理，直接放到对应目录即可
    - 资源简写及命名规范，参考`语言简写对应表`
    - html文件编码必须是utf-8
    - 每个html资源的body内容必须放在ID为`pageContainer`的div中
    - 目录下存在`.redirect`后缀的文件，则表明该页面使用的其他公共的资源，例如文件名为`Public.privacy_policy.redirect`表明使用的是`Public/privacy_policy`目录的资源
3. 运行auto.sh
  - 主要是更新src/umlist.js,用于url请求时进行重定向处理
4. 提交到git
5. 服务器中拉取最新资源


## 维护
- 线上服务器：
  - 服务器维护为`服务器组`
  - 服务器地址：`58.251.35.66`
  - 服务器环境代码路径:`/data/www/help/`

### 新项目或者新定制添加
> 给出新方案的URL链接路径，并项对应信息记录到此文档中，新方案的路径型如`http://www.alcatel-move.com/help/um.html?project=wifi_watch&custom=generic&page=privacy_policy&lang=en`


## 对应项目维护情况
> 以下项目在此git仓库中维护
### WiFi watch
#### 通用版
>be call 版本
##### 新方案资源目录`Project\wifi_watch\generic`
##### URL链接
- privacy_policy
  - 旧url：http://www.alcatel-move.com/help/#/privacy_policy/en
  - 新重定向URL：http://www.alcatel-move.com/help/um.html?project=wifi_watch&custom=generic&page=privacy_policy&lang=en
- terms_and_conditions
  - 旧url：http://www.alcatel-move.com/help/#/terms_and_conditions/en
  - 新重定向URL：http://www.alcatel-move.com/help/um.html?project=wifi_watch&custom=generic&page=terms_and_conditions&lang=en
- faqs 
  - 旧url：http://www.alcatel-move.com/help/#/wifi_watch/faqs/en
  - 新重定向URL：http://www.alcatel-move.com/help/um.html?project=wifi_watch&custom=generic&page=faqs&lang=en
#### kuyou
##### 新方案资源目录`Project\wifi_watch\kuyou`
##### URL链接
- privacy_policy
  - 旧url：http://www.tcl-move.com/help/url.html#/wifi_watch/privacy_policy/kuyou/en
  - 新重定向URL：http://www.tcl-move.com/help/um.html?project=wifi_watch&custom=kuyou&page=privacy_policy&lang=en
- terms_and_conditions
  - 旧url：http://www.tcl-move.com/help/url.html#/wifi_watch/terms_and_conditions/kuyou/en
  - 新重定向URL：http://www.tcl-move.com/help/um.html?project=wifi_watch&custom=kuyou&page=terms_and_conditions&lang=en
- faqs
  - 旧url：http://www.tcl-move.com/help/url.html#/wifi_watch/faqs/kuyou/en
  - 新重定向URL：http://www.tcl-move.com/help/um.html?project=wifi_watch&custom=kuyou&page=faqs&lang=en
#### europe
>no be call 版本
##### 新方案资源目录`Project\wifi_watch\europe`
##### URL链接
- privacy_policy
  - 旧url：http://www.alcatel-move.com/help/#/privacy_policy/en
  - 新重定向URL：http://www.alcatel-move.com/help/um.html?project=wifi_watch&custom=generic&page=privacy_policy&lang=en
- terms_and_conditions
  - http://www.alcatel-move.com/help/#/terms_and_conditions/en
  - 新重定向URL：http://www.alcatel-move.com/help/um.html?project=wifi_watch&custom=generic&page=terms_and_conditions&lang=en
- faqs
  - 旧url：http://www.alcatel-move.com/help/#/europe_wifi_watch/faqs/en
  - 新重定向URL：http://www.alcatel-move.com/help/um.html?project=wifi_watch&custom=europe&page=faqs&lang=en

### MB12
#### 通用版
##### 新方案资源目录`Project\mb12\generic`
##### URL链接
- privacy_policy
  - 旧url：http://www.tcl-move.com/help/#/mb12_privacy_policy/en
  - 新重定向URL：http://www.tcl-move.com/help/um.html?project=mb12&custom=generic&page=privacy_policy&lang=en
- terms_and_conditions
  - 旧url：http://www.tcl-move.com/help/#/mb12_terms_and_conditions/en
  - 新重定向URL：http://www.tcl-move.com/help/um.html?project=mb12&custom=generic&page=terms_and_conditions&lang=en
- faqs
  - 旧url：http://www.tcl-move.com/help/#/mb12/faqs/en
  - 新重定向URL：http://www.tcl-move.com/help/um.html?project=mb12&custom=generic&page=faqs&lang=en
#### kuyou
##### 新方案资源目录`Project\mb12\kuyou`
##### URL链接
- privacy_policy
  - 旧url：http://www.tcl-move.com/help/url.html#/mb12/privacy_policy/kuyou/en
  - 新重定向URL：http://www.tcl-move.com/help/um.html?project=mb12&custom=kuyou&page=privacy_policy&lang=en
- terms_and_conditions
  - 旧url：http://www.tcl-move.com/help/url.html#/mb12/terms_and_conditions/kuyou/en
  - 新重定向URL：http://www.tcl-move.com/help/um.html?project=mb12&custom=kuyou&page=terms_and_conditions&lang=en
- faqs
  - 旧url：http://www.tcl-move.com/help/url.html#/mb12/faqs/kuyou/en
  - 新重定向URL：http://www.tcl-move.com/help/um.html?project=mb12&custom=kuyou&page=faqs&lang=en
#### moveband2
##### 新方案资源目录`Project\mb12\moveband2`
##### URL链接
- privacy_policy
  - 旧url：http://www.tcl-move.com/help/#/mb12_privacy_policy/en
  - 新重定向URL：http://www.tcl-move.com/help/um.html?project=mb12&custom=generic&page=privacy_policy&lang=en
- terms_and_conditions
  - 旧url：http://www.tcl-move.com/help/#/mb12_terms_and_conditions/en
  - 新重定向URL：http://www.tcl-move.com/help/um.html?project=mb12&custom=generic&page=terms_and_conditions&lang=en
- faqs
  - 旧url：http://www.tcl-move.com/help/#/mb12-moveband2/faqs/en
  - 新重定向URL：http://www.tcl-move.com/help/um.html?project=mb12&custom=moveband2&page=faqs&lang=en

### MT30
#### 通用版
##### 新方案资源目录`Project\mt30\generic`
##### URL链接
- privacy_policy
  - 旧url：http://www.tcl-move.com/help/#/mt30_privacy_policy/en
  - 新重定向URL：http://www.tcl-move.com/help/um.html?project=mt30&custom=generic&page=privacy_policy&lang=en
- terms_and_conditions
  - 旧url：http://www.tcl-move.com/help/#/mt30_terms_and_conditions/en
  - 新重定向URL：http://www.tcl-move.com/help/um.html?project=mt30&custom=generic&page=terms_and_conditions&lang=en
- faqs
  - 旧url：http://www.tcl-move.com/help/#/mt30/faqs/en
  - 新重定向URL：http://www.tcl-move.com/help/um.html?project=mt30&custom=generic&page=faqs&lang=en
- um_pdf
  - 旧url：http://www.tcl-move.com/help/url.html#/mt30/um/generic/en
  - 新重定向URL：http://www.tcl-move.com/help/um.html?project=mt30&custom=generic&page=um_pdf&lang=en

### Kids watch
#### 通用版
##### 新方案资源目录`Project\kids_watch\generic`
##### URL链接
- privacy_policy
  - 旧url：http://www.tcl-move.com/help/#/kids_watch_privacy_policy/en
  - 新重定向URL：http://www.tcl-move.com/help/um.html?project=kids_watch&custom=generic&page=privacy_policy&lang=en
- terms_and_conditions
  - 旧url：http://www.tcl-move.com/help/#/kids_watch_terms_and_conditions/en
  - 新重定向URL：http://www.tcl-move.com/help/um.html?project=kids_watch&custom=generic&page=terms_and_conditions&lang=en
  
### CPE
#### 通用版
> 目前暂时不变，暂时不做重定向处理
##### 资源目录`docs_src`
##### URL链接
- privacy_policy
  - url：http://www.tcl-move.com/help/url.html#/cpe/privacy_policy/generic/en
- terms_and_conditions
  - url：http://www.tcl-move.com/help/url.html#/cpe/terms_and_conditions/generic/en
