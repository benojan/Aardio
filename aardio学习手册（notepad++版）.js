1. 语言相关
1.1. 关于字符串
'a'# >> 取字符a的ASCII值97
'abc'# >> 取首个字符a的ASCII值97
'UTF16字符串'u >> utf-16 LE编码(代码页：1200)字符串
'UTF8字符串'u8 >> utf-8 编码(代码页：65001)字符串
'\u0061\u0062\u0063' >> utf-16 LE编码(代码页：1200)字符串
gbk: 936
utf-8: 65001
utf-16: 1200

字符串形式:
str = 'abcd
\"\nefgh'             >> abcd"换行efgh      //多行不换行，内部转义，\"输出"
str = "abcd
""\nefgh"             >> abcd换行"\nefgh    //多行换行，不转义，""输出"
str = //abcdefgh\n    >> abcdefgh\n         //单行注释内容，不转义
str = /*abcd\n
efgh*/                >> abcd\n回车换行efgh //多行注释内容，不转义

经典案例：
for( chr='A'#; 'Z'# ) {
    str = string.pack( chr )
    io.print( str, str[1], chr, str[[1]] ); //猜猜输出结果是什么？---------------------------A 65 65 A -> Z 90 90 Z
}

1.2. 表+数组
tab = {x=100;y=200;"Sunday";"Monday"}
tab.x //100
tab[1] //"Sunday"

//table中不符合变量命名规则的键必须通过[]操作符访问
tab = { [1]=300;[2]=400;["+"]=200;[1+1]=200 }; //OK
tab = { 1=300; 2=400; "+"=200; 1+1=200 }; //Error

tab2 = {"1"=1;"2"=2;1;2;3}
#tab2 //3
table.len(tab2) //3，table内数组长度
table.count(tab2) //5，table总大小
//http://bbs.aardio.com/forum.php?mod=viewthread&tid=269&highlight=table


bytes = { string.unpack(str) } //多个返回值转数组

1.3. 变量、局部变量、常量
value = '123' //当然名字空间下的变量，无var声明
var value = '123' //局部变量，var声明
_value = '123' //成员常量，下划线开始，小写
_Value = '123' //全局常量，下划线开始，大写
: 同 or  同 ||
? 同 and 同 &&
::Kernel32 := raw.loadDll("Kernel32.dll"); //全局常量赋值，首字母大写
//::Kernel32 := ... 等同于 ::Kernel32 = Kernel32 or ...
value = null //删除变量

1.4. 条件赋值
a = a : 123;//如果a为false、null、0时赋值为123
a := 123; //等价于上面的语句，通常用于常量赋值，以避免重复赋值。

str = "abcdefg"
str ?= string.left(str,3); //如果str为null，则不赋值，以避免string.left抛出错误

1.5 包含操作符
io.print ( $"/my.txt" ) //my.txt文件内容，发布程序后自动嵌入



2. 常用函数
2.1. string库
//unicode编码的字符串，即utf-8、utf-16编码等
string.fromUnicodeIf(unicode字符串) //将@1转成默认代码页，若已经是则不转。返回字符串
string.fromUnicode(unicode字符串,目标编码) //将@1的u/u8编码（只能字符串？）转换成@2编码，省略@2则默认转成what？？编码。返回字符串
string.toUnicode(字符串,源编码,是否允许指针) //将@2编码的字符串转换成unicode，当@1注明u/u8时，忽略@2，@3可以是true,false,或源数据长度。返回字符串
string.fromto('UTF-8字符串'u8,65001,936) //将@2编码的字符串转换成@3编码，当@1注明u/u8时，忽略@2。返回字符串

string.getUtf(字符串) //获取@1的编码。返回0,8,16
string.setUtf(字符串,编码格式) //基本无用。以@2设置@1字符串。无返回

string.len(字符串) //自动识别并计算@1长度。返回长度
string.utf8len(字符串) //以utf-8格式取@1的长度。返回长度，若非utf-8格式，返回0（个别字符有误，如“联通”）
string.sub(字符串,开始,结束,文本模式) //取@2到@3位置的@1子串，@4为true时支持u/u8编码。返回子串
string.left(字符串,截取长度,文本模式) //取@1左侧@2长度的子串，@3为true时支持u/u8编码。返回子串
string.right(字符串,截取长度,文本模式) //取@1右侧@2长度的子串，@3为true时支持u/u8编码。返回子串

string.startWith(字符串,开始串,忽略大小写) //@2是否是@1的开始部分，@3为true时忽略大小写。返回true/false
string.endWith(字符串,结束串,忽略大小写) //@2是否是@1的结束部分，@3为true时忽略大小写。返回true/false

string.cmp(字符串,字符串2,比较长度=null) //比较@1和@2，比较长度为@3。返回正、负、0
string.reverse(字符串) //翻转字符串。返回字符串
string.unpack(字符串 [,i ,j] ) //取@1中第i到第j个字符的字节码。返回多个字节码
bytes = { string.unpack(str) } //转换为一个数组
string.pack(65,66,67); string.pack( {65;66;67} );//连接成字符串。返回字符串 
string.lower(str) //转小写
string.upper(str) //转大写

string.indexAny("abcdefg",'c'# ) //查找@2在@1中的位置。返回位置3
string.lastIndexAny("abcdefg",'cde' ) //反向查找@2在@1中的位置。返回反向位置5
string.find(字符串,模式串,开始位置) //在@1中从@3位置开始查找@2。返回起始位置i，结束位置j。
string.match(字符串, 模式串, 开始位置) //在@1中从@3位置开始查找@2。返回找到的字符串
string.replace(字符串,@@字符串,字符串,次数) //把@1中的@2替换成@3，替换@4次，默认全替。返回结果和次数
/*
@前缀声明在查找替换函数中禁用模式匹配语法,仍然基于二进制模式查找替换。
@@前缀声明在查找替换函数中禁用模式匹配语法,但是会基于文本模式查找替换，不会截断双字节字符。
模式匹配函数：http://bbs.aardio.com/doc/reference/libraries/kernel/string/pattern%20matching.html
模式表达式语法：http://bbs.aardio.com/doc/reference/libraries/kernel/string/pattern%20syntax.html
*/

string.escape('abc'u) //返回@1的转义符\u0061\u0062\u0063，支持u/u8
string.trim(字符串,字符) //清除首尾的@2，默认为空格、\t\r\n\v\f等。返回字符串
string.trimleft(字符串,字符) //清除首@2
string.trimright(字符串,字符) //清除尾@2
string.concat(字符串,字符串,...) //连接字符串,可以为null。返回总字符串
string.split('a;b,c',';,') //拆分@1字符串，@2可以多个字符，所以中文两端必须加<>表示整体，但只能用在首尾一次，如用<;,>匹配'a;,b;,c'。返回数组{'a';'b';'c'}
string.splitEx('中文的字符','<文>|<字>') //支持模式匹配。返回{中;的;符}
string.join({"ab";"cd";"ef"}," ") //合并@1数组，以@2隔开。返回字符串"ab cd ef"

string.format("%X",123) //转换进制：%b二进制数，%x%X大小写十六进制数，%o八进制数，%d十进制数 

//一次性读写文件用这两个，不要用io对象
string.load(路径) //读取@1中文本内容。返回内容。
string.save(路径，字符串，追加方式) //将@2保存到@1文件中，@3为true则追加。

string.random(长度, "这是中文字符集" ) //生成长度为@1的@2内随机字符，@2不能同时有中英文。返回字符串

2.2. math库
math.randomize() //随机数发生器种子
math.random(1,100) //配合上一个使用，产生@1到@2中随机的数字

2.3. win, winex库
match(.(句柄,文本,类名,ID) = 指定一个窗口句柄,检测是否符合给定参数\n所有参数可选,类名与文本支持模式表达式
find(.(类名模式串,标题模式串,进程ID,线程ID)=查找顶层窗口，所有参数都是可选参数\n返回值为：句柄,线程ID,进程ID
findMainWnd(.(类名模式串,标题模式串,进程ID,线程ID) = 查找独立不属于其他窗口所有的顶层窗口所有参数都是可选参数\n返回值为：句柄,线程ID,进程ID
findEx(.(父窗口句柄,第几个匹配,类名模式串 ,标题模式串, 控件ID )=查找子窗口，除父窗口句柄外所有参数可选\n返回值为句柄
findExists(.(父窗口标题,控件文本,父窗口类名,控件类名,控件ID,进程ID,第几个匹配) = 查找包含指定控件窗口的父窗口,所有参数可选\n返回值为:窗口句柄,控件句柄,线程ID,进程ID
findActivate(.(父窗口标题,控件文本,父窗口类名,控件类名,控件ID,进程ID,第几个匹配) = 调用winex.findExists查找并激活包含指定控件窗口的父窗口,所有参数可选\n返回值为:窗口句柄,控件句柄,线程ID,进程ID

winex.attach(hwnd) //附加到“外部”线程窗口并共享输入状态，注意该函数会重置键盘状态。返回值为是否成功附加
winex.attach(hwnd,false) //解除共享输入状态。返回值为是否成功解除
winex.sendString(文本, 窗口句柄=前台窗口) //发送@1给@2，\r\n表示换行
winex.say(文本, 窗口句柄=前台窗口) //发送@1给@2，\n表示换行
winex.say2(文本,窗口句柄=前台窗口) //发送@1给@2，\n表示换行
winex.sayIme(文本,窗口句柄=前台窗口) //发送@1给@2，\n表示换行
hwnd,线程ID,进程ID = winex.find( 类名,标题,进程ID,线程ID ) //查找窗口
winex.key.combine(hedit,"CTRL","s") //在hedit窗口中按下Ctrl+S，需import winex.key
winex.key.click(hedit,"ENTER" ) //在hedit窗口中按下Enter键，需import winex.key
winex.key.altClick(hedit,"F" ) //在hedit窗口中按下Alt+F键，需import winex.key

win.isChild(.(父窗口句柄,子窗口句柄) //判断@2是否是@1的子窗口或隶属子窗口。返回1/0
win.isVisible(hwnd) //判断窗口是否可见，可通过win.show()改变。返回true/false
win.isWindow(hwnd) //判断是否有效窗口。返回true/false
win.isIconic(hwnd) //判断窗口是否最小化为任务栏图标。返回true/false
win.isZoomed(hwnd) //判断窗口是否最大化。返回true/false
win.isEnable(__/*输入窗口句柄*/) = 判断窗口是否启用状态
win.show(hwnd,_SW_...) //显示窗口，任务栏中出现，并不是显示到最前面，@2是以_SW_为前缀的可选显示参数，参见windows编程SW_
win.show(hwnd,false) //隐藏窗口，任务栏中消失
win.close(hwnd) //关闭窗口\n关闭外部进程窗口请使用winex.close()替代
win.enable(__/*输入窗口句柄*/,true) = 启用窗口
win.enable(__/*输入窗口句柄*/,false) = 禁用窗口
win.setTop(__/*输入窗口句柄*/)=前置窗口到当前线程Z序顶部\n顶层窗口或者设置了 _WS_CLIPSIBLINGS 重叠裁剪样式的窗口向前移动\n子窗口会向后面移动.
win.getForeground()=获取前台窗口句柄
win.getActive()=获取当前线程激活窗口句柄,如果要获取全局激活窗口请使用win.getForeground()
win.setActive(hwnd) //设置激活窗口(激活窗口是什么？)
win.getFocus() //获取输入焦点所在窗口句柄
win.setFocus(hwnd) //设置输入焦点，只用于当前线程
win.getDesktop() //获取桌面句柄
win.setTopmost(hwnd) //置顶窗口（不是win.setForeground()）
win.setTopmost(hwnd,false) //取消置顶窗口
win.setForeground(__/*输入窗口句柄*/) //前置窗口并获取输入焦点（把窗口显示在屏幕最前面,最小化窗口自动还原+获取焦点）,\n当前程序是背景窗口时,win7以上系统令在任务栏闪烁,
win.showForeground(.(窗口句柄,x,y,cx,cy) //把窗口显示在屏幕最前面,最小化窗口自动还原\n类似setForeground但不会改变输入焦点,\n除句柄外,其他参数为可选参数
win.find(.(类名,标题) //查找顶层窗口，参数都是可选参数。返回句柄
win.findEx(.(父窗口句柄,上一个窗口句柄,类名,标题) //查找子窗口，除父窗口句柄以外，其他参数都是可选参数 
win.setCapture(.(窗口句柄) = 开始捕获鼠标消息,返回上次调用该函数的窗口句柄
win.releaseCapture() = 释放鼠标捕获,成功返回true
win.registerClassEx(.("类名",类参数表,"源类名") =  并注册新类名\n如果参数@3指定了源类名则复制该类\n可选用参数@2指定 WNDCLASSEX的部份字段值
win.registerFormClass("类名",类参数表,"源类名") = @.registerFormClass("类名",{\n    style = _CS___\n} );

win.delay(1000* 5) //毫秒延时，区别sleep()使用于无窗口、无消息循环时
win.getClass(hwnd) //返回窗口类名
win.getId(hwnd) //返回控件ID
win.getText(hwnd, 缓冲区长度=文本长度) //返回控件文本内容，@2可选
win.setText(hwnd,文本,缓冲区长度=文本长度) //设置控件文本，外部进程窗口使用winex.setText()

win.flash(hwnd,次数,时间间隔,选项) //闪烁窗口
win.msgbox(文本,标题,样式,所有者hwnd) //弹出对话框
win.msgboxErr(文本,标题,所有者hwnd) //弹出错误对话框
win.msgboxTimeout(文本,标题,超时毫秒值,样式,所有者hwnd) //弹出对话框，超时自动关闭
win.msgboxTest(文本,标题,所有者hwnd) //返回布尔值表示用户是否按了“确定”按钮
win.getScreen() //返回屏幕宽度、高度
win.center(hwnd,目标窗口句柄) //居中窗口,并调整以保证显示在可见范围内，目标窗口句柄如果为空则取父窗口或所有者窗口,为0表示桌面

hwndroot = win.getRoot() //获取最顶层父窗口句柄
win.enable(hwnd, 1) //启用窗口，使可以操作
win.enable(hwnd, 0) //禁用窗口，使不能操作
