const bodyPhotograph = document.querySelector("#photographer-page");
const mainPhotographPage = document.createElement("main");
const videoVisibility  = document.createElement("section");
const headerPage = document.createElement("header");
const footerPage = document.createElement("footer");

bodyPhotograph.appendChild(headerPage);
bodyPhotograph.appendChild(mainPhotographPage);
// bodyPhotograph.appendChild(videoVisibility);
bodyPhotograph.appendChild(footerPage);
mainPhotographPage.id = "mainPhotograph";
// console.log(urlPicture);
// Création variable dataJson
let dataJson;
let dataJsonMap;
let showData;
let mediaOfPhotograph;
let srcPicture;
let likesResults;

//Récupération du prix / jour
let pricePhotograph;

// API request
const fetchPhotographers = async () => {
    dataJson = await fetch('./photographers.json')
        .then(res => (res.json())
            .catch(err => {
                console.log('Fetch problem: ' + err.message)
            }));

    // console.log(dataJson);
}

const showMediaOfPhotograph = async () => {
    await fetchPhotographers();
    let urlId = location.href.substring(location.href.lastIndexOf("?") + 4);
    let namePhotograph;
    // console.log(urlId);
    showData = dataJson["photographers"];
    headerPage.classList.add("header_photograph");
    headerPage.innerHTML = showData
        .filter(photograph => photograph.id == urlId)
        .map(photograph => (`
        <a href="accueil.html">
            <img src="public/img/Logo_Fisheye.png" alt="Fisheye Home page">
        </a>
        <article class="header_photograph_article">
            <div class="header_photograph_article_info">
                <h2>${namePhotograph = photograph.name}</h2>
                <p class="header_photograph_article_info_from">${photograph.city}, ${photograph.country}</p>
                <p class="header_photograph_article_info_tagline">${photograph.tagline}</p>
                <div class="header_photograph_article_info_tags">
                ${photograph.tags.map(tag => (`
                <span class="spanTag" onclick="addTagUrl(this.textContent)">${tag}</span>
                `)).join(" ")}
                </div>
            </div>
<!--            <div class="header_photograph_article_contact">-->
                <button class="btn-contact-me">Contactez-moi</button>
<!--            </div>-->
            <div class="header_photograph_article_img">
                <img class="photographer_img"
                    src="./public/img/Photographers_ID_Photos/${photograph.portrait}"
                    alt="portrait de ${photograph.name}">
            </div>          
        </article>
    `)).join(" ")

    // console.log(namePhotograph);
    // console.log(headerPage);

    mediaOfPhotograph = dataJson["media"];
    srcPicture = namePhotograph.replace(" ", "_");
    mainPhotographPage.innerHTML = mediaOfPhotograph
        .filter(media => media.photographerId == urlId)
        .map(media => (`
        <article>
            <figure id="${media.id}" >
                <img src="./public/img/${srcPicture}/${media.image}"
                    alt="portrait de ${media.image}">
                <figcaption class="media_figcaption" onclick="addLike(this)">
                    <h2>${media.title}</h2>
                    <p class="likes_heart">${media.likes} <i class="fas fa-heart"></i></p>
                </figcaption>
            </figure>
         </article>
        `)).join(" ")


    //Affichage vidéo du photograph
    videoVisibility.innerHTML = mediaOfPhotograph
        .filter(mediaVideo => mediaVideo.photographerId == urlId)
        .map(mediaVideo => (`
        <article>
            <figure id="${mediaVideo.id}" >
                <video controls width="250">
                    <source src="./public/img/${srcPicture}/${mediaVideo.video}">
                </video>
                <figcaption class="media_figcaption" onclick="addLike(this)">
                    <h2>${mediaVideo.title}</h2>
                    <p class="likes_heart">${mediaVideo.likes} <i class="fas fa-heart"></i></p>
                </figcaption>
            </figure>
         </article>
        `)).join(" ")


    // console.log(mediaOfPhotograph);

    //Récupération de la somme des likes
    likesResults = mediaOfPhotograph
        .filter(media => media.photographerId == urlId)
        .map(media => media.likes)

    let result = likesResults.reduce((a, b)=> a + b, 0);
    console.log(result);

    pricePhotograph = showData
        .filter(photograph => photograph.id == urlId)
        .map(photograph => photograph.price)
    console.log(pricePhotograph);

    footerPage.classList.add("footer_page");
    footerPage.innerHTML = `
    <p>${result} <i class="fas fa-heart"></i></p>
    <p>${pricePhotograph}€ / jour</p>
    `;
}

const addLike = (event) => {
    console.log(event.getAttribute("p"));
}

const imgOrVideo = async () => {
    if (media.image.endsWith("jpg")) {
        `
        <img class="photographer_img"
                    src="./public/img/${srcPicture}/${media.image}"
                    alt="portrait de ${media.image}">
        `
    } else if (media.video.endsWith("mp4")) {
        `
        <video controls width="250" src="./public/img/${srcPicture}/${media.video}"></video>
        `
    }
}


showMediaOfPhotograph();