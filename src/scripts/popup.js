console.group("---popup.js start---");


const ContentsJsName = 'scripts/contents.js'
const PopupJsName = 'scripts/popup.js'
const BackgroundJsName = 'background.js'
const FromJsName = PopupJsName


function main(){

}

async function clickC1(){
    const sleep2 = (second) => new Promise(resolve => setTimeout(resolve, second * 1000))

    var urls=document.getElementById("urls").value.replace(/\r\n|\r/g, "\n").split("\n");
    var t1="qqqq"
    sendToContents(
        "location"
        ,urls
        ,function(response){
            console.log("clickC1 callback!!:"+response)
            console.log("t1:"+t1)
        }
    );
    // sleep(10);
    t1="gggggg"

}
function clickC2(){
    sendToContents("m1","clickC2",function(response){console.log("clickC2 callback!!:"+response)});
}

// 現在アクティブなタブにデータを送信
async function sendToContents(toMethod,pValue,callback){
    console.log("sendToContents step1")
    chrome.tabs.query(
        {   active: true
            , currentWindow: true
        }, function (tabs) {
            pValue.forEach(element => {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    { from: FromJsName
                    , to: ContentsJsName
                    , method: toMethod
                    , value: element }
                    , function (response) {
                        callback(response);
                    }
                );
                sleep(10);
            })
        }
    );
}

// Background.jsにデータを送信
function sendToBackground(toMethod,pValue,callback){
    chrome.runtime.sendMessage(
        { from: FromJsName
        , to: BackgroundJsName
        , method: toMethod
        , value: pValue }
        , callback
    ); 
}


// backgroundで受け取った値をコンソールに表示
function logBackgroundValue () {
    var test = chrome.extension.getBackgroundPage().test_value;
    console.log(test);
    return;
}


document.getElementById('log').addEventListener('click', logBackgroundValue);
document.getElementById('sendC1').addEventListener('click', clickC1);
document.getElementById('sendC2').addEventListener('click', clickC2);
document.getElementById('sendB').addEventListener('click', sendToBackground);


// contents.jsで送信した値を受信
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.group("---popup.js 受信---");
        console.log("request:",request)
        console.log("sender:",sender)
        test_value = request.value;
        console.groupEnd();
        sendResponse(true);
        return true;
    }
);


main();
console.groupEnd();
