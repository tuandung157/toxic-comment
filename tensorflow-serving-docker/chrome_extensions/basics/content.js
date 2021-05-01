console.log("App start");

let comment = 0;
let toxicComment = 0;
let highToxicComment = 0;

const startApp = () => {
    const sendToxicCheck = () => {
        console.log("Send texts");

        let tagsWithUncheckedText = Array.from(document.querySelectorAll("ytd-comment-renderer:not(.checked)"));
        let texts = tagsWithUncheckedText.map(e => {
            ++comment;
            let wholeText = '';
            if (e.querySelector("#content-text span")) Array.from(e.querySelectorAll("#content-text > span")).forEach(span => wholeText += span.innerHTML);
            else wholeText = e.querySelector("#content-text").innerHTML;
            return wholeText;
        });

        console.log(texts);

        fetch("http://localhost:5000/api/checked_toxic", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            mode: "cors",
            body: JSON.stringify(texts)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Server is not connected");
                }
            })
            .then(result => {
                tagsWithUncheckedText.forEach((tag, index) => {
                    const badge = document.createElement("div");
                    badge.classList.add('toxic-badge');
                    badge.style.display = "flex";
                    badge.style.justifyContent = "center";
                    badge.style.padding = "0.4rem 0.8rem";
                    badge.style.borderRadius = "100px";
                    badge.style.marginLeft = "1rem";
                    badge.style.backgroundColor = "#16a085";
                    badge.style.color = "#ffffff";
                    badge.style.fontSize = "11px";
                    badge.style.fontWeight = "normal";
                    badge.innerText = 'Токсичность: '+Math.round(result.response[index]*10000)/100+'%';
                    tag.querySelector("#header-author").appendChild(badge);

                    if (result.response[index] > 0.5) {
                        ++toxicComment;

                        tag.style.opacity = '0.3';
                        tag.onmouseover = () => tag.style.opacity = '1';
                        tag.onmouseout = () => tag.style.opacity = '0.3';
                        tag.querySelector(".toxic-badge").style.backgroundColor = "#f39c12";
                        tag.querySelector(".toxic-badge").style.color = "#000000";

                        if (result.response[index] > 0.75) {
                            ++highToxicComment; 
                            --toxicComment;

                            const originalText =  tag.querySelector("#content-text").innerHTML;
                            const open = document.createElement("span");
                            open.href = "#";
                            open.innerText = "здесь";
                            open.style.textDecoration = "underline";
                            open.style.color = "#4d87c7";
                            open.onclick = () => tag.querySelector("#content-text").innerHTML = originalText;

                            tag.querySelector("#content-text").innerHTML = '';
                            tag.querySelector("#content-text")
                                .appendChild(document.createTextNode("Комментарий скрыт по причине большого токсичности, нажмите "));
                            tag.querySelector("#content-text").appendChild(open);
                            tag.querySelector("#content-text")
                                .appendChild(document.createTextNode(" для его просмотра"));

                            tag.querySelector(".toxic-badge").style.backgroundColor = "#c0392b";
                            tag.querySelector(".toxic-badge").style.color = "#ffffff";
                            tag.querySelector(".toxic-badge").style.opacity = "1";
                        }
                    }
                    tag.classList.add("checked");

                    localStorage.setItem('comment', comment);
                    localStorage.setItem('toxicComment', toxicComment);
                    localStorage.setItem('highToxicComment', highToxicComment);
                });
            })
            .catch(error => {
                console.log('Error message: ' + error.message);
            });
    }

    const runApp = setTimeout(function repeatSend(){
        sendToxicCheck();
        setTimeout(repeatSend,1000)
    });
}

startApp(); 