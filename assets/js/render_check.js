const displaySeconds = document.getElementById("secs");
const linkDiv = document.getElementById("link");
const countdownDiv = document.getElementById("countdown");

const filelink = `https://github.com/filiptronicek/STC-intro/raw/master/render/${name}.mp4`;

const time = 131;
let timeleft = time;

function UrlExists(url)
{
    const http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    //return http.status!=404;
    return true;
}

function checkForFile() {
    if(!UrlExists("https://cors-anywhere.herokuapp.com/"+filelink)) {
      timeleft = 10;

    } else {
      clearInterval(timeInterval);
      linkDiv.innerHTML = `Link: <a href="${filelink}" download>Download</a>`;
      countdownDiv.style.display = "none";
    }
}

function countDown() {
  timeleft--;
  if (timeleft === 0) {
    displaySeconds.innerText = "now";
    checkForFile();
  } else {
    displaySeconds.innerText = timeleft.toString();
    displaySeconds.innerText += timeleft === 1 ? " second" : " seconds";
  }
}

countDown();
const timeInterval = setInterval(countDown, 1000);