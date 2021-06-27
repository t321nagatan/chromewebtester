//引数にはミリ秒を指定します。（例：5秒の場合は5000）
function sleep(a){
    var dt1 = new Date().getTime();
    var dt2 = new Date().getTime();
    while (dt2 < dt1 + a*1000){
        dt2 = new Date().getTime();
    }
    return;
}