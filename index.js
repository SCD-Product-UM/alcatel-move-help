var fs = require('fs');
var _ = require("underscore")

//遍历文件夹，获取所有文件夹里面的文件信息
/*
 * @param path 路径
 *
 */
function geFileList(path) {
  var filesList = [];
  readFile(path, filesList);
  return filesList;
}
var fileLists={}
//遍历读取文件
function readFile(path, filesList) {
  files = fs.readdirSync(path); //需要用到同步读取
  files.forEach(walk);

  function walk(file) {
    states = fs.statSync(path + '/' + file);
    if (states.isDirectory()) {
      fileLists[file]={}
      add2fileLists(path + '/' + file)
      readFile(path + '/' + file, filesList);
    } else {
      add2fileLists(path + '/' + file)
    }
  }
}


function readFileList(path,preListData){
  files = fs.readdirSync(path); //需要用到同步读取
  _.each(files,function(name){
    console.log(name)
    states = fs.statSync(path + '/' + name);
    if(states.isDirectory()){
      if(name!="img"){
        name,preListData[name]={}
        readFileList(path+"/"+name,preListData[name])
      }
      
    }else{
      preListData[name] = ""
    }
  })
}
readFileList("Project",fileLists)
console.log(fileLists)



function add2fileLists(file){
  var _filePath = file.split("/")
  _.each(_filePath,function(name,i){
    if(_.has(name)){}
  })
  
}

//写入文件utf-8格式
function writeFile(fileName, data) {
  fs.writeFile(fileName,"var umlist ="+JSON.stringify(data, null, 2) , 'utf-8', complete);

  function complete() {
    console.log("文件生成成功");
  }
}

//var filesList = geFileList("Project");

/*
filesList.sort(sortHandler);

function sortHandler(a, b) {
  if (a.size > b.size)
    return -1;
  else if (a.size < b.size) return 1
  return 0;
}
var str = '';
for (var i = 0; i < filesList.length; i++) {
  var item = filesList[i];
  var desc = "文件名:" + item.name + " " +
    "大小:" + (item.size / 1024).toFixed(2) + "/kb" + " " +
    "路径:" + item.path;
  str += desc + "\n"
}
*/
writeFile("src/umlist.js", fileLists);