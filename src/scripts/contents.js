console.group("---contents.js start---");

function main(){
    sendToBackground();
}

const actions = {
    m1:(pValue) => {
        console.log("pValue:"+pValue)
        return "m1 ok!!"
    },
    location:(pValue) => {
        console.log("pValue:"+pValue);

        if(pValue!=""){
            console.log("window.location.href:"+pValue);
            location.replace(pValue);
        }
        return pValue
        return true
    }
}

// Background.jsとpopup.jsの両方にデータを送信
function sendToBackground(){
    chrome.runtime.sendMessage(
        { from: "contents.js"
        , to: "background.js"
        , value: { contents: "test value from contents" } }
    );
}

// 受信側 other tab -> contents(popup/option -> contents)
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.group("---contents.js 受信---");
    console.log(message);
    
    sendResponse(actions[message.method](message.value));
    console.groupEnd();
    return;
});



console.groupEnd();
