window.onload = function() {
    main();
}


const nextBtn = document.getElementById('next-btn');
const pageCountResult = document.getElementById('page-counter');
const prevBtn = document.getElementById('previous-btn');
const tableContainer = document.getElementById('planetsTableList');
const modalBody = document.getElementById('residentsTableList');
const httpLink = 'https://swapi.dev/api/planets/';
const audioSrc = new Audio('../static/music/Star_Wars_Theme_John_Williams.mp3')
let residentsUrlsMain = [];
let pageCounter = 1;
let residentsBtnIndex = [];



// Background Music:

function playAudio() {
    audioSrc.play();
}


function pauseAudio() {
    audioSrc.pause();
}


// Lapozó gombok


prevBtn.addEventListener('click', function() {
   if (pageCounter > 1) {
       pageCounter -= 1;
       pageCountResult.innerHTML = pageCounter;
       clickPrevBtn(httpLink, pageCounter);
   }
});


nextBtn.addEventListener('click', function() {
    if (pageCounter !== 6) {
        pageCounter += 1;
        pageCountResult.innerHTML = pageCounter;
        clickNextBtn(httpLink, pageCounter);
    }
});



// Függvények

function clickNextBtn(httpLink, pageCounter) {
    console.log(pageCounter, residentsUrlsMain);
    const planetRequest = new XMLHttpRequest();
    planetRequest.open('GET', httpLink + '?page=' + pageCounter);
    planetRequest.onload = function () {
        let planetsDataNext = JSON.parse(planetRequest.responseText);
        renderHTMLtable(planetsDataNext.results);
        residentsURLWriter(planetsDataNext.results);
    };
    planetRequest.send();
}


function clickPrevBtn(httpLink, pageCounter) {
    console.log(pageCounter, residentsUrlsMain);
    const planetRequest = new XMLHttpRequest();
    planetRequest.open('GET', httpLink + '?page=' + pageCounter);
    planetRequest.onload = function () {
        let planetsDataPrev = JSON.parse(planetRequest.responseText);
        renderHTMLtable(planetsDataPrev.results);
        residentsURLWriter(planetsDataPrev.results);
    };
    planetRequest.send();
}


function getDefaultdataPlanetrequest(httpLink, pageCounter) {
    const planetRequest = new XMLHttpRequest();
    planetRequest.open('GET', httpLink + '?page=' + pageCounter);
    planetRequest.onload = function () {
        let planetsData = JSON.parse(planetRequest.responseText);
        renderHTMLtable(planetsData.results);
        residentsURLWriter(planetsData.results);
    };
    planetRequest.send();
}


function clickResidentsBtn(residentsUrlsMain, residentsBtnIndex) {
    modalBody.innerHTML = '';
    let residentsButtonID = (residentsBtnIndex-1);
    let selectedResidentButtonTarget = residentsUrlsMain[residentsButtonID];

    for (let linkIndex = 0; linkIndex < selectedResidentButtonTarget.length; linkIndex++) {
        if (selectedResidentButtonTarget.length > 0) {
            let residentsHTTPLink = selectedResidentButtonTarget[linkIndex];

            let residentRequest = new XMLHttpRequest();
            residentRequest.open('GET', residentsHTTPLink);
            residentRequest.onload = function () {
                let residentRequestData = JSON.parse(residentRequest.responseText);

                renderResidentsModalTable(residentRequestData);
            };
            residentRequest.send();
        } else {
            return false;
        }
    }
}


function renderHTMLtable(data) {
    let htmlString = "";
    for (let index = 0; index < data.length; ++index) {
        htmlString += `<tr><th scope="row">${index + 1}</th><td>${data[index]['name']}</td><td>${data[index]['diameter']} km</td><td>${data[index]['climate']}</td><td>${data[index]['terrain']}</td><td>${data[index]['surface_water']}%</td><td>${data[index]['population']} people</td><td><button type="button" id="${index + 1}" class="btn btn-light residents-Btn ${index + 1}" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="clickResidentsBtn(residentsUrlsMain, this.id); getResidentsClickedBtnId(this.id)">Residents <span class="badge bg-dark">(${data[index]['residents'].length})</span></button></td></tr>`;
    }
    tableContainer.innerHTML = htmlString;
}


function residentsURLWriter(data) {
    residentsUrlsMain.length = 0;
    for (let index = 0; index < data.length; ++index) {
        residentsUrlsMain.push(data[index]['residents']);
    }
}


function renderResidentsModalTable(data) {
    let insertString = "";
    insertString += '<tr>' +
                '<td>' + data['name'] + '</td>' +
                '<td>' + data['height'] + ' cm' +'</td>' +
                '<td>' + data['mass'] + ' kg' + '</td>' +
                '<td>' + data['hair_color'] + '</td>' +
                '<td>' + data['skin_color'] + '</td>' +
                '<td>' + data['eye_color'] + '</td>' +
                '<td>' + data['birth_year'] + '</td>' +
                '<td>' + data['gender'] + '</td>' +
                '</tr>';
    modalBody.insertAdjacentHTML("afterbegin", insertString);
}

var loaderIcon = document.getElementById('loader');

function loadingIcon() {
    loaderIcon.style.display="none";
}

function getResidentsClickedBtnId(clicked_id) {
    residentsBtnIndex.push(clicked_id);
}


function main() {
    loadingIcon();
    getDefaultdataPlanetrequest(httpLink, pageCounter);
}

