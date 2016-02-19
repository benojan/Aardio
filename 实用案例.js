1. 按行读取文本

方法一、
string.save("/test.txt",str );
//每次读一行 
for line in io.lines("/test.txt") { 
    console.log( line )
}
方法二、
//上面的代码基本等价于下面的过程
file = io.open("/test.txt","r+t")
while(
    var lineNum,line = 0;
    lineNum++, line = file.read();
    line 
    ){
    console.log(lineNum,line )
}

方法三、
string.save("/test.txt",str );
io.getLines = function(path,from=1,to){
    var i = 1;
    var ret = {};
    if(!to)from = to; 
    for line in io.lines("/test.txt") { 
        if( i >= from ){
            ..table.push( ret,line);
            if( i >= to ){
                break;
            }
        }
        i++;
    }
    return string.join( ret,'\r\n'); 
}
var str = io.getLines("/test.txt",2,3);
console.log(str)

方法四、
var next = io.lines("/test.txt")
for( i=1;2 ){ 
    next() //跳过2行
} 
while( var line ; line = next();line ) {
    console.log( line )
}

方法五、
var str = string.load("/test.txt");
var tab = ..table.slice( string.split(str,'<\r\n>'),2,3) //取第二行到第三行
console.varDump(tab)

2. 打开网页
import process
process.execute("http://www.baidu.com/")
