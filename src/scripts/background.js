console.group("---background.js start---");
const ContentsJsName = 'contents.js'
const PopupJsName = 'popup.js'
const BackgroundJsName = 'background.js'
const FromJsName = BackgroundJsName

var test_value;

function main(){

}

// contents.jsで送信した値を受信
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.group("---background.js 受信---");
        console.log("request:",request)
        console.log("sender:",sender)
        test_value = request.value;
        console.groupEnd();
        sendResponse(true);
        return true;
    }
);

// 現在アクティブなタブにデータを送信
function sendToContents(pValue){
    sendMessage(ContentsJsName,pValue);
}

// Popup.jsにデータを送信
function sendToPopup(pValue){
    sendMessage(PopupJsName,pValue);
}

// データを送信
function sendMessage(to,pValue){
    switch(to){
    case PopupJsName:
        chrome.runtime.sendMessage(
            { from: FromJsName
            ,to: PopupJsName
            ,value: pValue },
            function (response) {
                console.group("---background.js PopupJsName Responce---");
                console.log(response);
                console.groupEnd();
                return;
            }
        ); 
        break;
    case ContentsJsName:
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, 
                JSON.stringify({ contents: pValue }),
                function (response) {
                    console.group("---popup.js ContentsJsName Responce---");
                    console.log(response);
                    console.groupEnd();
                    return;
                });
        });
        break;
    }
}

main();
console.groupEnd();
