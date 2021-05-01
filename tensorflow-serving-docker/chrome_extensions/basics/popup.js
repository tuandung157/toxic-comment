let currentYear = new Date().getFullYear().toString();
console.log('Comment test: '+comment);

document.querySelector('footer')
        .appendChild(document.createTextNode("@ " + currentYear + " Lê Tuấn Dũng"));

        
document.querySelector('#update-button').onclick = () => {
        let comment = localStorage.getItem('comment') ? localStorage.getItem('comment') : '0';
        let toxicComment = localStorage.getItem('toxicComment') ? localStorage.getItem('toxicComment') : '0';
        let highToxicComment = localStorage.getItem('highToxicComment') ? localStorage.getItem('highToxicComment') : '0';

        alert(comment);
        document.querySelector('#comment').innerHTML = comment;
        document.querySelector('#toxic-comment').innerHTML = toxicComment;
        document.querySelector('#high-toxic-comment').innerHTML = highToxicComment;
        document.querySelector('#percent-toxic').innerHTML = Math.round(((toxicComment+highToxicComment)/comment)*10000)/100;
}