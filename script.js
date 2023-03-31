document.addEventListener("DOMContentLoaded", function() {
  let slideIndex = 1;
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  
  showSlides(slideIndex);
  
  function plusSlides(n) {
  showSlides(slideIndex += n);
  }
  
  // Thumbnail image controls
  function currentSlide(n) {
  showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
  slideIndex = 1;
  }
  if (n < 1) {
  slideIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
  slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
  }
  
  const slideshowContainer = document.querySelector('.slideshow-container');
  
  slideshowContainer.addEventListener('touchstart', function(e) {
  startX = e.changedTouches[0].screenX;
  startY = e.changedTouches[0].screenY;
  });
  
  slideshowContainer.addEventListener('touchend', function(e) {
  endX = e.changedTouches[0].screenX;
  endY = e.changedTouches[0].screenY;
  let deltaX = endX - startX;
  let deltaY = endY - startY;
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
  if (deltaX > 0) {
  plusSlides(-1);
  } else {
  plusSlides(1);
  }
  }
  });
  const button = document.getElementById('det-clc');
  const elementsToToggle = document.querySelectorAll('.toggle-element');
  
  button.addEventListener('click', () => {
  elementsToToggle.forEach(element => {
  if (element.style.display === 'none') {
  element.style.display = 'inline-block';
  } else {
  element.style.display = 'none';
  }
  });
  });
  
});
function color() {
document.getElementById("player1").style.cssText = "background-color: #40BC62 ; color: white;" ;
document.getElementById("player2").disabled = true;
document.getElementById("player3").disabled = true;
};

function color1() {
document.getElementById("player2").style.cssText = "background-color: #40BC62 ; color: white;" ;
document.getElementById("player1").disabled = true;
document.getElementById("player3").disabled = true;

};
function color2() {
document.getElementById("player3").style.cssText = "background-color: #40BC62 ; color: white;" ;
document.getElementById("player2").disabled = true;
document.getElementById("player1").disabled = true;
};
var div = document.getElementById("matches-table" );
var button = document.getElementById("b1");
function toggleDivHeight() {
var div = document.getElementById("matches-table" );
var button = document.getElementById("b1");
  
 if (div.style.height === "100%") {
 div.style.height = "400px";
 div.style.overflow = "hidden";
 button.innerHTML = "Show all ";
 } else {
 div.style.height = "100%";
 div.style.overflow = "visible";
 button.innerHTML = "Minimize ";
 }
}






const API_KEY = '32d6fb2c52e34d0ea5d707dc24a44dd7';
const API_ENDPOINT = 'https://api.football-data.org/v4';

// Get today's date and the date of next week
const today = new Date();
const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
const todayStr = today.toISOString().slice(0, 10);
const nextWeekStr = nextWeek.toISOString().slice(0, 10);

// Make an API request for the Premier League matches
fetch(`${API_ENDPOINT}/competitions/PL/matches?status=SCHEDULED&dateFrom=${todayStr}&dateTo=${nextWeekStr}`, {
  headers: { 'X-Auth-Token': API_KEY }
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const matches = data.matches;
    const table = document.querySelector('#matches-table');
   
  
  
    let html = '<div class="headline" >UPComing Matches</div>';
    matches.forEach(match => {
      const date = new Date(match.utcDate);
      const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      const homeTeam = match.homeTeam.name;
      const awayTeam = match.awayTeam.name;
      const score = match.score.fullTime.homeTeam + ' - ' + match.score.fullTime.awayTeam;
      const himg = match.homeTeam.crest;
      const aimg = match.awayTeam.crest;
      html += `<div class="match-card">
      <img src="${himg}" alt="Image 1" class="match-card-img ">
      <div class="match-card-body">
      <p class="match-card-title">${homeTeam} Vs ${awayTeam}</p>
      <p class="match-card-text">${dateStr} 
      <br> </p>
      
      </div>
      <img src="${aimg} " alt="Image 2" class="match-card-img">
      </div>`;
    });
    html += '</div>';
    table.innerHTML = html;
  })
  .catch(error => {
    console.error('There was a problem with the API request:', error);
  });

// Make an API request for the Premier League matches
fetch(`${API_ENDPOINT}/competitions/PL/standings`, {
  headers: { 'X-Auth-Token': API_KEY }
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const standings = data.standings[0].table;
    const tables = document.querySelector('.rank-table');
    let html1 = '<thead><tr><th>Team Name</th><th>Goals</th><th>Position</th></tr></thead><tbody>';
    standings.forEach((team, index) => {
      const name = team.team.name;
      const goals = team.goalsFor;
      const teimg = team.team.crest;
      const position = index + 1;
      html1 += `<tr>        
        <td style="text-align: left;" >${name}  </td>
        <td><img width="30px" src="${teimg}"> <br>
        ${goals}</td>
         <td style="text-align: center;">
         <div class="circle">${position}</div>
         </td>
      </tr>`;
    });
    html1 += '</tbody>';
    tables.innerHTML = html1;
  })
  .catch(error => {
    console.error('There was a problem with the API request:', error);
  });
