let currentYear = new Date().getFullYear().toString();

document.querySelector("footer")
        .appendChild(document.createTextNode("@ " + currentYear + " Lê Tuấn Dũng"));

        
const runApp = setTimeout(
        function repeatSend() {
                chrome.storage.sync.get(["comment", "toxicComment", "highToxicComment"], (items) => {
                        let comment = items.comment;
                        let toxicComment = items.toxicComment;
                        let highToxicComment = items.highToxicComment;
                        let percent =  comment != 0 ? Math.round(((toxicComment+highToxicComment)/comment)*10000)/100 : 0;
                        
                        document.querySelector("#comment").innerHTML = comment;
                        document.querySelector("#toxic-comment").innerHTML = toxicComment;
                        document.querySelector("#high-toxic-comment").innerHTML = highToxicComment;
                        document.querySelector("#percent-toxic").innerHTML = percent.toString()+"%";

                        let image = document.querySelector(".image-preview");
                        if (percent < 5) {
                                image.src = "./icon/angel.svg";
                        }
                        else if (percent < 10) {
                                image.src = "./icon/happy.svg";
                        }
                        else if (percent < 20) {  
                                image.src = "./icon/angry.svg";
                        }
                        else {
                                image.src = "./icon/devil.svg";
                        }
                });

                setTimeout(repeatSend, 500);
        }
)
        
