console.log("background scripts")

chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab) {
    let msg = {
        txt: tab.id
    }
    console.log(tab.id)
    chrome.tabs.sendMessage(tab.id, msg)
}