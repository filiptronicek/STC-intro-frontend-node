const displaySeconds = document.getElementById("secs");
const linkDiv = document.getElementById("link");
const countdownDiv = document.getElementById("countdown");
const videoDiv = document.getElementById("videoEl");

videoDiv.style.display = "none";

const filelink = `https://github.com/filiptronicek/STC-intro/raw/master/render/${name}.mp4`;

const time = 131;
let timeleft = time;

function UrlExists(url) {
  const http = new XMLHttpRequest();
  http.open("HEAD", url, false);
  http.send();
  return http.status != 404;
}

function checkForFile() {
  if (UrlExists("https://cors-anywhere.herokuapp.com/" + filelink)) {
    videoDiv.src = filelink;
    videoDiv.style.display = "block";
    clearInterval(checkInterval);
    clearInterval(timeInterval);
    linkDiv.innerHTML = `Link: <a href="${filelink}" download>Download</a>`;
    countdownDiv.style.display = "none";
  } else {
    timeleft = 10;
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
  if(timeleft === time - 2) {
    checkForFile();
  }
}

/* Starting function */

countDown();

const timeInterval = setInterval(countDown, 1000);
const checkInterval = setInterval(checkForFile, 5000);