const main = document.getElementById("mainpage");
// create <section>, <h2>, <p>, and <img> elements
const sectionPhotographers = document.createElement("section");
// sectionPhotographers.appendChild(main);

// Autres variables
let allPhotographers;
let photographer;
let dataLastOfIndex;
let _id = [];
let spanTarget;
let profilPhotograph;
let photograph;
let medias;
let tag;

// Variable Media Photographers
let paraTitle;
let myPictures;
let myVideos;
let profilPhotographerInfo;
let urlPicture;
let srcPicture;

//Photographers variables

let myArticle;
let myImage;
let myH2;
let divInfo;
let divTags;
let paraFrom;
let paraTagline;
let paraPrice;
let spanTags;
let a;
let myFigure;
let myFigcaption;

let testSpan;

function createVariables() {

    photographer = profilPhotograph[photograph].name;

    //Photographers variables
    myArticle = document.createElement('article');
    myFigure = document.createElement("figure");
    myFigcaption = document.createElement("figcaption");
    myImage = document.createElement('img');
    myH2 = document.createElement('h2');
    divInfo = document.createElement('div');
    divInfo.classList.add("infoPhotographer");
    divTags = document.createElement('div');
    divTags.classList.add("tagsPhotographer");
    paraFrom = document.createElement('p');
    paraTagline = document.createElement('p');
    paraPrice = document.createElement('p');
    // spanTags = document.createElement('span');
    a = document.createElement('a');

    // Media variables
    paraTitle = document.createElement('p');
    myPictures = document.createElement("img");
    myVideos = document.createElement("video");
    profilPhotographerInfo = document.createElement("article");
    // profilPhotographerInfo = document.querySelector("section");
    urlPicture = document.querySelector("h2");
    srcPicture;

    spanTarget = document.querySelector("span");


}

const initializeData = async () => {
    await fetch('./photographers.json').then(function (response) {
        return response.json();
    }).then(function (json) {
        allPhotographers = json;
        console.log(allPhotographers);
        if (location.pathname === "/MarvinDESBONNES_6_01062021/index.html") {
            showPhotographers(allPhotographers);
        } else if (location.pathname === "/MarvinDESBONNES_6_01062021/photographer-page.html") {
            console.log("ce n'est pas possible");
            // console.log(idProfil);
            showMedia(allPhotographers);
        }
    }).catch(function (err) {
        console.log('Fetch problem: ' + err.message);
    });
}

const datasProfilPhotograph = () => {

    myImage.src = "./public/img/Photographers_ID_Photos/" + profilPhotograph[photograph].portrait;
    myImage.alt = "portrait " + photographer;
    myImage.classList.add("photographer_img");
    myH2.textContent = profilPhotograph[photograph].name;
    paraFrom.textContent = profilPhotograph[photograph].city + ', ' + profilPhotograph[photograph].country;
    paraTagline.textContent = profilPhotograph[photograph].tagline;
    paraPrice.textContent = profilPhotograph[photograph].price + "€/jour";
    //Récupération des tagline dans le tableau
    for (tag of profilPhotograph[photograph].tags) {
        spanTags = document.createElement('span');
        spanTags.classList.add("spanTag");
        // console.log(spanTags);
        spanTags.textContent = "#" + tag;
        // spanTags.setAttribute("onclick", "getTag(this.innerHTML)");
        divTags.appendChild(spanTags);

    }
    _id = profilPhotograph[photograph].id;
    a.href = "photographer-page.html?" + _id;


    myArticle.setAttribute("id", _id);
    myArticle.setAttribute("data-id", _id);
    myArticle.appendChild(a);
    myFigure.appendChild(myImage);
    myFigure.appendChild(myFigcaption);
    myFigcaption.appendChild(myH2);
    a.appendChild(myFigure);
    divInfo.appendChild(paraFrom);
    divInfo.appendChild(paraTagline);
    divInfo.appendChild(paraPrice);


    myArticle.appendChild(divInfo);
    myArticle.appendChild(divTags);
    main.appendChild(myArticle);

    // spanTarget.addEventListener("click", (event) => {
    //     console.log(event);
    // })
}

const datasMediaPhotographer = () => {
    paraTitle.textContent = medias.title;
    srcPicture = urlPicture.textContent.replace(" ", "_");
    // console.log(urlPicture.textContent.replace(" ", "_"));

    myPictures.alt = medias.title;
    myPictures.style.width = "320px";
    myPictures.src = "./public/img/" + srcPicture + "/" + medias.image;
    myVideos.src = "./public/img/" + srcPicture + "/" + medias.video;
    myVideos.alt = medias.title;
    myVideos.style.width = "320px";
    profilPhotographerInfo.appendChild(myFigure);
    // if (myFigure.src.endsWith("jpg")) {
    myFigure.appendChild(myPictures);
    // }
    if (myVideos.src.endsWith("mp4")) {
        myFigure.appendChild(myVideos);
    }
    myFigure.appendChild(myFigcaption);
    myFigcaption.appendChild(paraTitle);
    main.appendChild(profilPhotographerInfo)
}

const getTag = (tagtexte) => {
    testSpan = tagtexte;
    let urlBase = location.href
    let idSpan = document.querySelector("#" + testSpan);
    idSpan.classList.toggle("spanTagFocus");
    if (idSpan.classList.contains("spanTagFocus")) {
        // location.assign("#" + testSpan);
        location.replace(urlBase + "#" + testSpan);
        // showPhotographers(allPhotographers);
    } else {
        location.replace(location.href.replace("#" + testSpan, ""));
        // showPhotographers(allPhotographers);
    }
    console.log("hash: " + location.hash);
}

function showPhotographers(jsonObj) {
    profilPhotograph = jsonObj['photographers'];
    for (photograph in profilPhotograph) {
        createVariables();
        const results = () => {
            if (location.hash === "#" + testSpan) {
                return datasProfilPhotograph();
            } else if (location.hash === "") {
                return datasProfilPhotograph();
            }
        }
        console.log(results);
        // if (location.hash === "#" + testSpan) {
        //     for (tag of profilPhotograph[photograph].tags) {
        //         if (tag === testSpan) {
        //             datasProfilPhotograph();
        //         }
        //     }
        // } else
        // if (location.hash === "") {
        //     datasProfilPhotograph();
        // }
    }
}

function showMedia(jsonObj) {
    dataLastOfIndex = location.href.substring(location.href.lastIndexOf("?") + 1);
    console.log(dataLastOfIndex);

    profilPhotograph = jsonObj['photographers'];
    for (photograph in profilPhotograph) {
        createVariables();

        if (profilPhotograph[photograph].id == dataLastOfIndex) {
            datasProfilPhotograph();
        }
    }

    mediaPhotograph = jsonObj['media'];

    for (medias of mediaPhotograph) {
        //Media variables
        createVariables();

        if (medias.photographerId == dataLastOfIndex) {
            datasMediaPhotographer();
        }
    }
}

initializeData();

