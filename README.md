# alcatel-move-help

> 目前wifi watch项目的在线help  
> 后续其他项目如果需要整合到一起，就在此工程下添加


## 开发

### 语言及简写对照
```
Arabic  : ar
Bulgarian : bg
Czech : cs
Croatian  : hr
Danish  : da
Dutch : nl
English UK  : en
English US  : en_US
Estonian  : et
Finnish : fi
French  : fr
German  : de
Greek : el
Hungarian : hu
Italian : it
Latam Spanish : es-419
Latvian : lv
Lithuanian  : lt
Macedonian  : mk
Norwegian : nn-NO
Polish  : pl
Portuguese  : pt
BR LATAM Portuguese : pt_BR
Romanian  : ro
Russian : ru
Slovak  : sk
Slovenian : sl
Spanish : es
Swedish (Svenska) : sv
```

### 文件结构及规则说明

```
docs
├── privacy_policy  //privacy policy页面目录，此目录的每个目录代表一种语言，需要添加的语言参考<1. 语言及简写对照>
│   ├── ar //阿拉伯语目录，目录名参考<1. 语言及简写对照>
│   │   └── ar.html //文件名与目录名相同
│   ├── en
│   │   └── en.html
│   └── es
│       └── es.html
├── terms_and_conditions  //terms and conditions页面目录，此目录的每个目录代表一种语言
│   ├── en //英语目录，目录名参考<1. 语言及简写对照>
│   │   └── en.html //文件名与目录名相同
│   ├── nn-NO
│   │   └── nn-NO.html
│   └── sv
│       └── sv.html
└── wifi_watch
    ├── download_user_manual  //download user manual页面目录，需要添加的语言参考<1. 语言及简写对照>新建目录
    │   └── en //英语目录，目录名参考<1. 语言及简写对照>
    │       ├── en.html  //文件名与目录名相同
    │       └── img //图片目录
    │           └── pdf.png
    ├── faqs //faqs页面目录，需要添加的语言参考<1. 语言及简写对照>新建目录
    │   └── en // 英文版目录
    │       ├── en.html //faqs 英文版
    │       └── img  //图片目录
    │           ├── 1.png
    │           ├── 2.png
    │           ├── 3.png
    │           ├── 4.png
    │           ├── 5.jpg
    │           ├── 6.png
    │           └── 7.png
    ├── supported_phones  //supported phones页面目录，需要添加的语言参考<1. 语言及简写对照>新建目录
    │   └── en // 英文版目录
    │       └── en.html //supported phones 英文版
    └── um_pdf //wifi watch UM目录，此目录下放pdf文件，命名规则为:wifi_watch_um_语言简写.pdf
        └── wifi_watch_um_en.pdf //wifi watch英文版UM
```

`注：docs目录的文件格式utf-8，不能有html头，参考已完成的实例`


## 操作流程

1. 提交代码此工程
2. 服务器git pull

## 访问地址

- TERMS AND CONDITIONS OF USE http://www.alcatel-move.com/help/#/terms_and_conditions/en
- Privacy Policy http://www.alcatel-move.com/help/#/privacy_policy/en
- help http://www.alcatel-move.com/help/#/wifi_watch/faqs/en
