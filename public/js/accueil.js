//Création variable HTML
const bodyAccueil = document.querySelector("#accueil");
const headerAccueil = document.createElement("header");
const mainAccueil = document.createElement("main");

bodyAccueil.appendChild(headerAccueil);
bodyAccueil.appendChild(mainAccueil);
mainAccueil.id = "mainAccueil";

let myArticle;
let myFigure;
let myFigcaption;
let myImage;
let myH2;
let divInfo;
let divTags;
let paraFrom;
let paraTagline;
let paraPrice;
let a;
let arrayTag;

//Photographers variables
myArticle = document.querySelector('article');
myFigure = document.querySelector("figure");
myFigcaption = document.querySelector("figcaption");
myImage = document.querySelector('img');
myH2 = document.querySelector('h2');
divInfo = document.querySelector('div .infoPhotographer');
// divTags = document.querySelector('div');
paraFrom = document.querySelector('p');
// paraTagline = document.querySelector('p');
// paraPrice = document.querySelector('p');
spanTags = document.querySelector('span .tagsPhotographer');

// Media variables
// paraTitle = document.createElement('p');
// myPictures = document.createElement("img");
// myVideos = document.createElement("video");
// profilPhotographerInfo = document.createElement("article");
// profilPhotographerInfo = document.querySelector("section");
// urlPicture = document.querySelector("h2");
// srcPicture;

// spanTarget = document.querySelector("span");

// Création variable dataJson
let dataJson;
let showData;
// let tagName;
//Array tagsline
let spanNavsX = [
    {
        "logo": "Logo_Fisheye.png",
        "altLogo": "Fisheye Home page",
        "tags": ["portrait", "art", "fashion", "architecture", "travel", "sport", "animals", "events"]
    }];
// API request
const fetchPhotographers = async () => {
    dataJson = await fetch('./photographers.json')
        .then(res => (res.json())
            .catch(err => {
                console.log('Fetch problem: ' + err.message)
            }));

    // console.log(dataJson);
}


// Le header
const showHeaderPage = async () => {
    headerAccueil.classList.add("header_photographers");
    headerAccueil.innerHTML = spanNavsX.map(getValue => (`
        <a href="accueil.html">
            <img src="public/img/${getValue.logo}" alt="${getValue.altLogo}">
        </a>
        <nav aria-label="photographer categories" role="navigation">
            ${getValue.tags
        .map(tag => (`
                <span class="spanTag" onclick="showFilterTag(this)">${tag}</span>
                `)).join(" ")
    }
        </nav>
        <h1 id="titlePhotographers">Nos Photographes</h1>
    `)).join(" ")
    await fetchPhotographers();
    showPhotographers();
}

// Permet de filtrer via les tags du header
const showFilterTag = async (tagName) => {

    tagName.classList.toggle("spanTagFocus");
    if (tagName.classList.contains("spanTagFocus")) {
        console.log(tagName.classList.value);
        location.assign(location.href + "#" + tagName.textContent);
        arrayTag = [];
        arrayTag.push(tagName.textContent);
        console.log(arrayTag);
        console.log(location.hash);

        showData = dataJson["photographers"];
        mainAccueil.innerHTML = showData
            //TODO gérer les filtres lorsque deux filtres ne correspondent à aucun profil
            .filter(photograph => photograph.tags.includes(tagName.textContent) === arrayTag.every(value => value.includes(tagName.textContent, tagName.textContent)))
            .map(photograph => (`
        <article>
            <figure id="${photograph.id}" onclick="redirectionPhotograph(this)">
                <img class="photographer_img" 
                    src="./public/img/Photographers_ID_Photos/${photograph.portrait}" 
                    alt="portrait de ${photograph.name}">
                <figcaption>
                    <h2>${photograph.name}</h2>
                </figcaption>
            </figure>
            <div class="infoPhotographer">
                <p class="infoPhotographer_from">${photograph.city}, ${photograph.country}</p>
                <p class="infoPhotographer_tagline">${photograph.tagline}</p>
                <p class="infoPhotographer_price">${photograph.price}€/jour</p>
            </div>
            <div>
                ${photograph.tags.map(tag => (`
                <span class="spanTag" onclick="addTagUrl(this.textContent)">${tag}</span>
                `)).join(" ")}
            </div>
        </article>
    `)).join(" ")
        // console.table(mainAccueil.innerHTML);
    } else {
        location.replace(location.href.replace("#" + tagName.textContent, ""));
        // showPhotographers(allPhotographers);
        console.log(arrayTag);
    }
}

const showPhotographers = async () => {
    // await fetchPhotographers();
    showData = dataJson["photographers"];

    mainAccueil.innerHTML = showData.map(photograph => (`
        <article class="main_photographers">
            <figure id="${photograph.id}" onclick="redirectionPhotograph(this)">
                <img class="photographer_img" 
                    src="./public/img/Photographers_ID_Photos/${photograph.portrait}" 
                    alt="portrait de ${photograph.name}">
                <figcaption>
                    <h2>${photograph.name}</h2>
                </figcaption>
            </figure>
            <div class="infoPhotographer">
                <p class="infoPhotographer_from">${photograph.city}, ${photograph.country}</p>
                <p class="infoPhotographer_tagline">${photograph.tagline}</p>
                <p class="infoPhotographer_price">${photograph.price}€/jour</p>
            </div>
            <div>
                ${photograph.tags.map(tag => (`
                <span class="spanTag" onclick="addTagUrl(this.textContent)">${tag}</span>
                `)).join(" ")}
            </div>
        </article>
    `)).join(" ")
}

//Redirect url profil photograph page with ID
const redirectionPhotograph = (event) => {
    console.log(event.id);
    location.assign("photographer-page.html?id=" + event.id);
    showMediaOfPhotograph();

}

//Add tag profil photograph
const addTagUrl = (tagUrl) => {
    tagUrl.classList.toggle("spanTagFocus");
    if (tagUrl.classList.contains("spanTagFocus")) {
        console.log(tagUrl);
        location.assign(location.href + "#" + tagUrl);
        main.innerHTML = showData
            .filter(photograph => photograph.tags.includes(tagUrl))
            .map(photograph => (`
        <article>
            <figure id="${photograph.id}" onclick="redirectionPhotograph(this)">
                <img class="photographer_img" 
                    src="./public/img/Photographers_ID_Photos/${photograph.portrait}" 
                    alt="portrait de ${photograph.name}">
                <figcaption>
                    <h2>${photograph.name}</h2>
                </figcaption>
            </figure>
            <div class="infoPhotographer">
                <p>
                ${photograph.city}, ${photograph.country}<br>
                ${photograph.tagline}<br>
                ${photograph.price}€/jour
                </p>
            </div>
            <div>
                ${photograph.tags.map(tag => (`
                <span class="spanTag" onclick="addTagUrl(this.textContent)">${tag}</span>
                `)).join(" ")}
            </div>
        </article>
    `)).join(" ")
    } else {
        location.replace(location.href.replace("#" + tagUrl.textContent, ""));
        // showPhotographers(allPhotographers);
    }

}

showHeaderPage();