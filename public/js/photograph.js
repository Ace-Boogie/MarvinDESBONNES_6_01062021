/* Création des balises HTML pour le body, le header et le main */
const bodyPhotograph = document.querySelector("#photographer-page");
const headerLogo = document.createElement("header");
const mainPhotographPage = document.createElement("main");
const headerPage = document.createElement("header");
const trierPar = document.createElement("section");
const sectionProfil = document.createElement("section");
const footerLikePage = document.createElement("div");

/* Creation des balises pour la lightBox */
const overlay = document.createElement("div");
const imgOverlay = document.createElement("img");
const videoOverlay = document.createElement("video");
const divPrevBtn = document.createElement("div");
const iLeft = document.createElement("i");
const divNextBtn = document.createElement("div");
const iNext = document.createElement("i");
const divExitBtn = document.createElement("div");
const iExit = document.createElement("i");
const numberOfImages = document.querySelectorAll(".lightBoxMedia").length;

/*Lier les HTML via appendChild */
bodyPhotograph.appendChild(headerLogo);
bodyPhotograph.appendChild(mainPhotographPage);
mainPhotographPage.appendChild(headerPage);
mainPhotographPage.appendChild(trierPar);
mainPhotographPage.appendChild(sectionProfil);
mainPhotographPage.appendChild(footerLikePage);

sectionProfil.id = "sectionPhotograph";

/* Création variable dataJson */
let dataJson;
let showData;
let mediaOfPhotograph;
let likesResults;
let result;
let optionnelle;


/* API request */
const fetchPhotographers = async () => {
    dataJson = await fetch('./photographers.json')
        .then(res => (res.json())
            .catch(err => {
                console.log('Fetch problem: ' + err.message)
            }));

}

/* Creation du header du logo */
const showHeaderlogo = () => {

    headerLogo.classList.add("header-logo-profil");
    const myA = document.createElement("a");
    headerLogo.appendChild(myA);
    myA.href = "index.html";
    const myLogo = document.createElement("img");
    myLogo.classList.add("header_photographers_logo");
    myA.appendChild(myLogo);
    myLogo.src = "public/img/Logo_Fisheye.png";
    myLogo.alt = "Fisheye Home page";
}

/* Affichage du header du main */
const showHeaderMain = async () => {

    await fetchPhotographers();
    let urlId = location.href.substring(location.href.lastIndexOf("?") + 4);

    showData = dataJson["photographers"];
    headerPage.classList.add("header_photograph");
    showData
        .filter((photograph, index, array) => {
            if (photograph.id == urlId) {
                console.log("c'est filtré");
                /* Création de l'article du header page */
                const myArticleHeader = document.createElement("article");
                myArticleHeader.classList.add("header_photograph_article");
                headerPage.appendChild(myArticleHeader);

                const myArticleDivInfo = document.createElement("div");
                myArticleDivInfo.classList.add("header_photograph_article_info");
                myArticleHeader.appendChild(myArticleDivInfo);

                const myArticleH2 = document.createElement("h2");
                myArticleH2.textContent = photograph.name;
                myArticleDivInfo.appendChild(myArticleH2)

                const myArticleInfoFrom = document.createElement("p");
                myArticleInfoFrom.classList.add("header_photograph_article_info_from");
                myArticleInfoFrom.textContent = photograph.city + ", " + photograph.country;
                myArticleDivInfo.appendChild(myArticleInfoFrom);

                const myArticleInfoTagline = document.createElement("p");
                myArticleInfoTagline.classList.add("header_photograph_article_info_tagline");
                myArticleInfoTagline.textContent = photograph.tagline;
                myArticleDivInfo.appendChild(myArticleInfoTagline);

                const myArticleDivInfoTags = document.createElement("div");
                myArticleDivInfoTags.classList.add("header_photograph_article_info_tags");
                myArticleDivInfo.appendChild(myArticleDivInfoTags);

                photograph.tags.map((tag) => {

                    const myArticleInfoTags = document.createElement("span");
                    myArticleInfoTags.classList.add("spanTagHeader");
                    myArticleInfoTags.textContent = tag;
                    myArticleDivInfoTags.appendChild(myArticleInfoTags);
                }).join(" ")

                /* Creation du button contact */
                const myDivContact = document.createElement("div");
                myDivContact.id = "contact-me";
                myArticleHeader.appendChild(myDivContact);

                const myBtnContact = document.createElement("button");
                myBtnContact.classList.add("btn-contact-me");
                myBtnContact.textContent = "Contactez-moi";
                myBtnContact.onclick = contactMe;
                myDivContact.appendChild(myBtnContact);

                /* Création du formulaire de contact */
                const myFormContain = document.createElement("div");
                myFormContain.classList.add("contain-modal-body");
                myArticleHeader.appendChild(myFormContain);

                const myContentModalBody = document.createElement("div");
                myContentModalBody.classList.add("content-modal-body");
                myFormContain.appendChild(myContentModalBody);

                const myCloseModal = document.createElement("span");
                myCloseModal.id = "closeModal";
                myCloseModal.classList.add("close");
                myCloseModal.onclick = closeModal;
                myContentModalBody.appendChild(myCloseModal);

                const myModalBody = document.createElement("div");
                myModalBody.classList.add("modal-body");
                myContentModalBody.appendChild(myModalBody);

                const myForm = document.createElement("form");
                myForm.setAttribute("name", "reserve");
                myForm.setAttribute("action", "index.html");
                myForm.setAttribute("method", "get");
                myForm.setAttribute("onsubmit", "return validate()");
                myModalBody.appendChild(myForm);

                const myFormDataH1 = document.createElement("h1");
                myFormDataH1.id = "contact-modal-h1";
                myFormDataH1.innerHTML = "Contactez-moi <br/> " + photograph.name;
                myForm.appendChild(myFormDataH1);

                const myFormDataFirstName = document.createElement("div");
                myFormDataFirstName.classList.add("formData");
                myForm.appendChild(myFormDataFirstName);
                const myLabelFirst = document.createElement("label");
                myLabelFirst.textContent = "Prénom";
                myLabelFirst.setAttribute("for", "first");
                myFormDataFirstName.appendChild(myLabelFirst);
                const myInputFirst = document.createElement("input");
                myInputFirst.id = "first";
                myInputFirst.classList.add("text-control");
                myInputFirst.type = "text";
                myInputFirst.setAttribute("name", "first");
                myInputFirst.setAttribute("minlength", "2");
                myInputFirst.required = true;
                myFormDataFirstName.appendChild(myInputFirst);

                const myFormDataLastName = document.createElement("div");
                myFormDataLastName.classList.add("formData");
                myForm.appendChild(myFormDataLastName);
                const myLabelLast = document.createElement("label");
                myLabelLast.textContent = "Nom";
                myLabelLast.setAttribute("for", "last");
                myFormDataLastName.appendChild(myLabelLast);
                const myInputLast = document.createElement("input");
                myInputLast.id = "last";
                myInputLast.classList.add("text-control");
                myInputLast.type = "text";
                myInputLast.setAttribute("name", "last");
                myInputLast.setAttribute("minlength", "2");
                myInputLast.required = true;
                myFormDataLastName.appendChild(myInputLast);

                const myFormDataEmail = document.createElement("div");
                myFormDataEmail.classList.add("formData");
                myForm.appendChild(myFormDataEmail);
                const myLabelEmail = document.createElement("label");
                myLabelEmail.textContent = "E-mail";
                myLabelEmail.setAttribute("for", "email");
                myFormDataEmail.appendChild(myLabelEmail);
                const myInputEmail = document.createElement("input");
                myInputEmail.id = "email";
                myInputEmail.classList.add("text-control");
                myInputEmail.type = "text";
                myInputEmail.setAttribute("name", "email");
                myInputEmail.required = true;
                myFormDataEmail.appendChild(myInputEmail);

                const myFormDataMessage = document.createElement("div");
                myFormDataMessage.classList.add("formData");
                myForm.appendChild(myFormDataMessage);
                const myLabelMessage = document.createElement("label");
                myLabelMessage.textContent = "Votre message";
                myLabelMessage.setAttribute("for", "message");
                myFormDataMessage.appendChild(myLabelMessage);
                const myTextareaMessage = document.createElement("textarea");
                myTextareaMessage.id = "message";
                myTextareaMessage.classList.add("text-control", "text-area");
                myTextareaMessage.setAttribute("name", "message");
                myTextareaMessage.setAttribute("row", "5");
                myTextareaMessage.setAttribute("cols", "30");
                myTextareaMessage.required = true;
                myFormDataMessage.appendChild(myTextareaMessage);

                const myDivBtnPostData = document.createElement("div");
                myDivBtnPostData.id = "divBtnPostData";
                myForm.appendChild(myDivBtnPostData);
                const myInputBtnPostData = document.createElement("input");
                myInputBtnPostData.id = "btnPostData";
                myInputBtnPostData.classList.add("btn-submit", "button");
                myInputBtnPostData.type = "submit";
                myInputBtnPostData.value = "Envoyer";
                myDivBtnPostData.appendChild(myInputBtnPostData);

                /* Affichage de la photo du profil */
                const myDivPhotoProfil = document.createElement("div");
                myDivPhotoProfil.classList.add("header_photograph_article_img");
                myArticleHeader.appendChild(myDivPhotoProfil);

                const myImgPhotoProfil = document.createElement("img");
                myImgPhotoProfil.classList.add("photographer_img_page_header");
                myImgPhotoProfil.src = "./public/img/Photographers_ID_Photos/" + photograph.portrait;
                myImgPhotoProfil.alt = "portrait de " + photograph.name;
                myDivPhotoProfil.appendChild(myImgPhotoProfil);
            }
        })
        .join(" ")


}

/* Affichage du select : popularité, date, titre */
const showSelect = () => {
    trierPar.id = "trierPar";
    trierPar.classList.add("trierPar");

    const myLabelSelect = document.createElement("label");
    myLabelSelect.textContent = "Trier par";
    myLabelSelect.setAttribute("for", "chooseBy");
    trierPar.appendChild(myLabelSelect);

    const mySelect = document.createElement("select");
    mySelect.id = "chooseBy";
    mySelect.name = "tri";
    trierPar.appendChild(mySelect);

    const myOptionLike = document.createElement("option");
    myOptionLike.value = "likes";
    myOptionLike.selected = true;
    myOptionLike.textContent = "Popularité";
    mySelect.appendChild(myOptionLike);

    const myOptionDate = document.createElement("option");
    myOptionDate.value = "date";
    myOptionDate.textContent = "Date";
    mySelect.appendChild(myOptionDate);

    const myOptionTitle = document.createElement("option");
    myOptionTitle.value = "title";
    myOptionTitle.textContent = "Titre";
    mySelect.appendChild(myOptionTitle);

}


/* Affichage du profil et de ses medias */
const showMediaOfPhotograph = async () => {
    await fetchPhotographers();
    /* Récupération de l'id du la page html */
    let urlId = location.href.substring(location.href.lastIndexOf("?") + 4);
    /* Récupéaration du name de l'id */
    let namePhotograph;
    dataJson["photographers"].map((photograh) => {
        if (photograh.id == urlId) {
            console.log(photograh.name)
            return namePhotograph = photograh.name;
        }
    });

    /* Affichage des medias en fonction de l'option */
    const selectElem = document.querySelector('#chooseBy');
    selectElem.addEventListener('change', comparaison);


    /* Création des medias */
    mediaOfPhotograph = dataJson["media"];
    mediaOfPhotograph
        .filter(media => media.photographerId == urlId)
        .sort((a, b) => {
            return a.likes < b.likes ? 1 : -1;
        })
        .map((media, index) => {

            /* Création des balises HTML pour afficher les medias */
            const articleMedia = document.createElement("article");
            sectionProfil.appendChild(articleMedia);

            const figureMedia = document.createElement("figure");
            figureMedia.id = media.id;
            articleMedia.appendChild(figureMedia);

            const imgMedia = document.createElement("img");
            imgMedia.id = media.id;
            imgMedia.classList.add("nbMedia");
            imgMedia.setAttribute("data-slide-to", index);
            imgMedia.onclick = lightBox;
            imgMedia.alt = media.image;

            const videoMedia = document.createElement("video");
            videoMedia.id = media.id;
            videoMedia.classList.add("nbMedia");
            videoMedia.setAttribute("data-slide-to", index);
            videoMedia.onclick = lightBox;

            const figcaptionMedia = document.createElement("figcaption");
            figcaptionMedia.classList.add("media_figcaption");

            const h2Media = document.createElement("h2");
            h2Media.textContent = media.title;
            figcaptionMedia.appendChild(h2Media);

            const pLikeHeartMedia = document.createElement("p");
            pLikeHeartMedia.id = media.likes;
            pLikeHeartMedia.classList.add("likes_heart");
            pLikeHeartMedia.onclick = addLike;
            pLikeHeartMedia.textContent = media.likes;
            figcaptionMedia.appendChild(pLikeHeartMedia);

            let resultVideo = Object.values(media);
            let isVideo = resultVideo[3].endsWith(".mp4");
            if (isVideo) {
                figureMedia.appendChild(videoMedia);
                figureMedia.appendChild(figcaptionMedia);
                return videoMedia.src = "./public/img/" + namePhotograph.replace(" ", "_") + "/" + media.video;
            } else {
                figureMedia.appendChild(imgMedia);
                figureMedia.appendChild(figcaptionMedia);
                return imgMedia.src = "./public/img/" + namePhotograph.replace(" ", "_") + "/" + media.image;
            }

        })
        .join(" ")

    /* Function de tri des medias par  */
    function comparaison(e) {
        if (e.target.value === "likes") {
            sectionProfil.innerHTML = "";
            mediaOfPhotograph
                .filter(media => media.photographerId == urlId)
                .sort((a, b) => {
                    return a.likes < b.likes ? 1 : -1;
                })
                .map((media, index) => {

                    /* Création des balises HTML pour afficher les medias */
                    const articleMedia = document.createElement("article");
                    sectionProfil.appendChild(articleMedia);

                    const figureMedia = document.createElement("figure");
                    figureMedia.id = media.id;
                    articleMedia.appendChild(figureMedia);

                    const imgMedia = document.createElement("img");
                    imgMedia.id = media.id;
                    imgMedia.setAttribute("value", index);
                    imgMedia.onclick = lightBox;
                    imgMedia.alt = media.image;

                    const videoMedia = document.createElement("video");
                    videoMedia.id = media.id;
                    videoMedia.setAttribute("value", index);
                    videoMedia.onclick = lightBox;

                    const figcaptionMedia = document.createElement("figcaption");
                    figcaptionMedia.classList.add("media_figcaption");

                    const h2Media = document.createElement("h2");
                    h2Media.textContent = media.title;
                    figcaptionMedia.appendChild(h2Media);

                    const pLikeHeartMedia = document.createElement("p");
                    pLikeHeartMedia.id = media.likes;
                    pLikeHeartMedia.classList.add("likes_heart");
                    pLikeHeartMedia.onclick = addLike;
                    pLikeHeartMedia.textContent = media.likes;
                    figcaptionMedia.appendChild(pLikeHeartMedia);

                    let resultVideo = Object.values(media);
                    let isVideo = resultVideo[3].endsWith(".mp4");
                    if (isVideo) {
                        figureMedia.appendChild(videoMedia);
                        figureMedia.appendChild(figcaptionMedia);
                        return videoMedia.src = "./public/img/" + namePhotograph.replace(" ", "_") + "/" + media.video;
                    } else {
                        figureMedia.appendChild(imgMedia);
                        figureMedia.appendChild(figcaptionMedia);
                        return imgMedia.src = "./public/img/" + namePhotograph.replace(" ", "_") + "/" + media.image;
                    }

                })
                .join(" ")
        }

        if (e.target.value === "date") {
            sectionProfil.innerHTML = "";
            mediaOfPhotograph
                .filter(media => media.photographerId == urlId)
                .sort((a, b) => {
                    return a.date > b.date ? 1 : -1;
                })
                .map((media, index) => {

                    /* Création des balises HTML pour afficher les medias */
                    const articleMedia = document.createElement("article");
                    sectionProfil.appendChild(articleMedia);

                    const figureMedia = document.createElement("figure");
                    figureMedia.id = media.id;
                    articleMedia.appendChild(figureMedia);

                    const imgMedia = document.createElement("img");
                    imgMedia.id = media.id;
                    imgMedia.setAttribute("value", index);
                    imgMedia.onclick = lightBox;
                    imgMedia.alt = media.image;

                    const videoMedia = document.createElement("video");
                    videoMedia.id = media.id;
                    videoMedia.setAttribute("value", index);
                    videoMedia.onclick = lightBox;

                    const figcaptionMedia = document.createElement("figcaption");
                    figcaptionMedia.classList.add("media_figcaption");

                    const h2Media = document.createElement("h2");
                    h2Media.textContent = media.title;
                    figcaptionMedia.appendChild(h2Media);

                    const pLikeHeartMedia = document.createElement("p");
                    pLikeHeartMedia.id = media.likes;
                    pLikeHeartMedia.classList.add("likes_heart");
                    pLikeHeartMedia.onclick = addLike;
                    pLikeHeartMedia.textContent = media.likes;
                    figcaptionMedia.appendChild(pLikeHeartMedia);

                    let resultVideo = Object.values(media);
                    let isVideo = resultVideo[3].endsWith(".mp4");
                    if (isVideo) {
                        figureMedia.appendChild(videoMedia);
                        figureMedia.appendChild(figcaptionMedia);
                        return videoMedia.src = "./public/img/" + namePhotograph.replace(" ", "_") + "/" + media.video;
                    } else {
                        figureMedia.appendChild(imgMedia);
                        figureMedia.appendChild(figcaptionMedia);
                        return imgMedia.src = "./public/img/" + namePhotograph.replace(" ", "_") + "/" + media.image;
                    }

                })
                .join(" ")
        }

        if (e.target.value === "title") {
            sectionProfil.innerHTML = "";
            mediaOfPhotograph
                .filter(media => media.photographerId == urlId)
                .sort((a, b) => {
                    return a.title > b.title ? 1 : -1;
                })
                .map((media, index) => {

                    /* Création des balises HTML pour afficher les medias */
                    const articleMedia = document.createElement("article");
                    sectionProfil.appendChild(articleMedia);

                    const figureMedia = document.createElement("figure");
                    figureMedia.id = media.id;
                    articleMedia.appendChild(figureMedia);

                    const imgMedia = document.createElement("img");
                    imgMedia.id = media.id;
                    imgMedia.setAttribute("value", index);
                    imgMedia.onclick = lightBox;
                    imgMedia.alt = media.image;

                    const videoMedia = document.createElement("video");
                    videoMedia.id = media.id;
                    videoMedia.setAttribute("value", index);
                    videoMedia.onclick = lightBox;

                    const figcaptionMedia = document.createElement("figcaption");
                    figcaptionMedia.classList.add("media_figcaption");

                    const h2Media = document.createElement("h2");
                    h2Media.textContent = media.title;
                    figcaptionMedia.appendChild(h2Media);

                    const pLikeHeartMedia = document.createElement("p");
                    pLikeHeartMedia.id = media.likes;
                    pLikeHeartMedia.classList.add("likes_heart");
                    pLikeHeartMedia.onclick = addLike;
                    pLikeHeartMedia.textContent = media.likes;
                    figcaptionMedia.appendChild(pLikeHeartMedia);

                    let resultVideo = Object.values(media);
                    let isVideo = resultVideo[3].endsWith(".mp4");
                    if (isVideo) {
                        figureMedia.appendChild(videoMedia);
                        figureMedia.appendChild(figcaptionMedia);
                        return videoMedia.src = "./public/img/" + namePhotograph.replace(" ", "_") + "/" + media.video;
                    } else {
                        figureMedia.appendChild(imgMedia);
                        figureMedia.appendChild(figcaptionMedia);
                        return imgMedia.src = "./public/img/" + namePhotograph.replace(" ", "_") + "/" + media.image;
                    }

                })
                .join(" ")
        }
    }

    showLikePrice();
}


/* Affichage de la somme des like et du prix par jour */
const resultHearts = document.createElement("p");
const showLikePrice = async () => {
    await fetchPhotographers();
    /* Récupération de l'id du la page html */
    let urlId = location.href.substring(location.href.lastIndexOf("?") + 4);
    /* Récupération de la somme des likes */
    likesResults = mediaOfPhotograph
        .filter(media => media.photographerId == urlId)
        .map(media => media.likes)
        .reduce((a, b) => a + b, 0)

    /* Récupération du prix */
    pricePhotograph = showData
        .filter(photograph => photograph.id == urlId)
        .map(photograph => photograph.price)

    footerLikePage.classList.add("footer_like_page");
    resultHearts.classList.add("result_heart");
    resultHearts.textContent = likesResults;
    footerLikePage.appendChild(resultHearts);

    const resultPrice = document.createElement("p");
    resultPrice.textContent = pricePhotograph + "€ / jour";
    footerLikePage.appendChild(resultPrice);
}

/* Ajouter ou Retirer un like */
const addLike = (event) => {
    if (event.path[0].id === event.path[0].textContent) {
        event.path[0].textContent = parseInt(event.path[0].textContent, 10) + 1;
        resultHearts.textContent = parseInt(resultHearts.textContent, 10) + 1;
    } else if (event.path[0].id !== event.path[0].textContent) {
        event.path[0].textContent = parseInt(event.path[0].textContent, 10) - 1;
        resultHearts.textContent = parseInt(resultHearts.textContent, 10) - 1;
    }
}

/* Affichage de la modal du contact */
const contactMe = () => {

    const launchContactMe = document.querySelector(".contain-modal-body");
    launchContactMe.style.display = "block";
}

/* Fermeture de la modal du contact ou de la lightBox */
const closeModal = () => {

    const launchContactMe = document.querySelector(".contain-modal-body");
    launchContactMe.style.display = "none";
}

/* Création de la lightBox */
const lightBox = (val) => {

    const nbMedia = document.querySelectorAll(".nbMedia");
    let indexMedia = val.path[0].getAttribute("data-slide-to");

    overlay.id = "overlay";
    overlay.style.display = "flex";
    bodyPhotograph.appendChild(overlay);

    imgOverlay.classList.add("lightBoxMedia");
    videoOverlay.classList.add("lightBoxMedia");

    divPrevBtn.id = "prevButton";
    divPrevBtn.setAttribute("data-slide-to", indexMedia);

    iLeft.classList.add("fa", "fa-chevron-left");
    divPrevBtn.appendChild(iLeft);
    divPrevBtn.addEventListener("click", prevMediaLightBox);


    divNextBtn.id = "nextButton";
    divNextBtn.setAttribute("data-slide-to", indexMedia);

    iNext.classList.add("fa", "fa-chevron-right");
    divNextBtn.appendChild(iNext);
    divNextBtn.addEventListener("click", nextMediaLightBox);

    //TODO divNextBtn.addEventListener("keypress", nextMediaLightBox);

    divExitBtn.id = "exitButton";

    iExit.classList.add("fa", "fa-times");
    iExit.id = "iExitBtn";
    divExitBtn.appendChild(iExit);
    divExitBtn.addEventListener("click", closeLightBox);


    let resultVideo = val.path[0].src;
    console.log(resultVideo.endsWith(".mp4"));
    let isVideo = resultVideo.endsWith(".mp4");
    if (isVideo) {
        overlay.appendChild(divPrevBtn);
        overlay.appendChild(videoOverlay);
        videoOverlay.setAttribute("data-slide-to", indexMedia);
        overlay.appendChild(divNextBtn);
        overlay.appendChild(divExitBtn);
        if (overlay.appendChild(imgOverlay)) {
            overlay.removeChild(imgOverlay);
        }
        return videoOverlay.src = val.path[0].src;
    } else {
        overlay.appendChild(divPrevBtn);
        overlay.appendChild(imgOverlay);
        imgOverlay.setAttribute("data-slide-to", indexMedia);
        overlay.appendChild(divNextBtn);
        overlay.appendChild(divExitBtn);
        if (overlay.appendChild(videoOverlay)) {
            overlay.removeChild(videoOverlay);
        }
        return imgOverlay.src = val.path[0].src;
    }

    /* Au clic sur la flèche droite sur la lightBox */
    function nextMediaLightBox(valueIndex) {
        let nbDataSlide = parseInt(valueIndex.path[1].getAttribute("data-slide-to"));
        console.log(valueIndex.path[2].childNodes[1].src);
        if (nbDataSlide < nbMedia.length) {
            if (valueIndex.path[2].childNodes[1].src.endsWith(".mp4")) {
                console.log(!nbMedia[nbDataSlide + 1].src.endsWith(".mp4"));
                if (nbMedia[nbDataSlide + 1].src.endsWith(".mp4")) {
                    overlay.appendChild(divPrevBtn);
                    overlay.appendChild(videoOverlay);
                    videoOverlay.setAttribute("data-slide-to", nbDataSlide + 1);
                    if (overlay.appendChild(imgOverlay)) {
                        overlay.removeChild(imgOverlay);
                    }
                    overlay.appendChild(divNextBtn);
                    overlay.appendChild(divExitBtn);
                    divNextBtn.setAttribute("data-slide-to", nbDataSlide + 1);
                    divPrevBtn.setAttribute("data-slide-to", nbDataSlide + 1);
                    return videoOverlay.src = nbMedia[nbDataSlide + 1].src;
                } else {
                    overlay.appendChild(divPrevBtn);
                    overlay.appendChild(imgOverlay);
                    imgOverlay.setAttribute("data-slide-to", nbDataSlide + 1);
                    if (overlay.appendChild(videoOverlay)) {
                        overlay.removeChild(videoOverlay);
                    }
                    overlay.appendChild(divNextBtn);
                    overlay.appendChild(divExitBtn);
                    divNextBtn.setAttribute("data-slide-to", nbDataSlide + 1);
                    divPrevBtn.setAttribute("data-slide-to", nbDataSlide + 1);
                    return imgOverlay.src = nbMedia[nbDataSlide + 1].src;
                }
            } else {
                if (!nbMedia[nbDataSlide + 1].src.endsWith(".mp4")) {
                    overlay.appendChild(divPrevBtn);
                    overlay.appendChild(imgOverlay);
                    imgOverlay.setAttribute("data-slide-to", nbDataSlide + 1);
                    if (overlay.appendChild(videoOverlay)) {
                        overlay.removeChild(videoOverlay);
                    }
                    overlay.appendChild(divNextBtn);
                    overlay.appendChild(divExitBtn);
                    divNextBtn.setAttribute("data-slide-to", nbDataSlide + 1);
                    divPrevBtn.setAttribute("data-slide-to", nbDataSlide + 1);
                    return imgOverlay.src = nbMedia[nbDataSlide + 1].src;

                } else {
                    overlay.appendChild(divPrevBtn);
                    overlay.appendChild(videoOverlay);
                    videoOverlay.setAttribute("data-slide-to", nbDataSlide + 1);
                    if (overlay.appendChild(imgOverlay)) {
                        overlay.removeChild(imgOverlay);
                    }
                    overlay.appendChild(divNextBtn);
                    overlay.appendChild(divExitBtn);
                    divNextBtn.setAttribute("data-slide-to", nbDataSlide + 1);
                    divPrevBtn.setAttribute("data-slide-to", nbDataSlide + 1);
                    return videoOverlay.src = nbMedia[nbDataSlide + 1].src;
                }
            }
        }
    }

    /* Au clic sur la flèche gauche de la lightBox */
    function prevMediaLightBox(valueIndex) {
        let nbDataSlide = parseInt(valueIndex.path[1].getAttribute("data-slide-to"));
        console.log(valueIndex.path[2].childNodes[1].src);
        if (nbDataSlide > 0) {
            if (valueIndex.path[2].childNodes[1].src.endsWith(".mp4")) {
                console.log(!nbMedia[nbDataSlide - 1].src.endsWith(".mp4"));
                if (nbMedia[nbDataSlide - 1].src.endsWith(".mp4")) {
                    overlay.appendChild(divPrevBtn);
                    overlay.appendChild(videoOverlay);
                    videoOverlay.setAttribute("data-slide-to", nbDataSlide - 1);
                    if (overlay.appendChild(imgOverlay)) {
                        overlay.removeChild(imgOverlay);
                    }
                    overlay.appendChild(divNextBtn);
                    overlay.appendChild(divExitBtn);
                    divNextBtn.setAttribute("data-slide-to", nbDataSlide - 1);
                    divPrevBtn.setAttribute("data-slide-to", nbDataSlide - 1);
                    return videoOverlay.src = nbMedia[nbDataSlide - 1].src;
                } else {
                    overlay.appendChild(divPrevBtn);
                    overlay.appendChild(imgOverlay);
                    imgOverlay.setAttribute("data-slide-to", nbDataSlide - 1);
                    if (overlay.appendChild(videoOverlay)) {
                        overlay.removeChild(videoOverlay);
                    }
                    overlay.appendChild(divNextBtn);
                    overlay.appendChild(divExitBtn);
                    divNextBtn.setAttribute("data-slide-to", nbDataSlide - 1);
                    divPrevBtn.setAttribute("data-slide-to", nbDataSlide - 1);
                    return imgOverlay.src = nbMedia[nbDataSlide - 1].src;
                }
            } else {
                if (nbMedia[nbDataSlide - 1].src.endsWith(".mp4")) {
                    overlay.appendChild(divPrevBtn);
                    overlay.appendChild(videoOverlay);
                    videoOverlay.setAttribute("data-slide-to", nbDataSlide - 1);
                    if (overlay.appendChild(imgOverlay)) {
                        overlay.removeChild(imgOverlay);
                    }
                    overlay.appendChild(divNextBtn);
                    overlay.appendChild(divExitBtn);
                    divNextBtn.setAttribute("data-slide-to", nbDataSlide - 1);
                    divPrevBtn.setAttribute("data-slide-to", nbDataSlide - 1);
                    return videoOverlay.src = nbMedia[nbDataSlide - 1].src;
                } else {
                    overlay.appendChild(divPrevBtn);
                    overlay.appendChild(imgOverlay);
                    imgOverlay.setAttribute("data-slide-to", nbDataSlide - 1);
                    if (overlay.appendChild(videoOverlay)) {
                        overlay.removeChild(videoOverlay);
                    }
                    overlay.appendChild(divNextBtn);
                    overlay.appendChild(divExitBtn);
                    divNextBtn.setAttribute("data-slide-to", nbDataSlide - 1);
                    divPrevBtn.setAttribute("data-slide-to", nbDataSlide - 1);
                    return imgOverlay.src = nbMedia[nbDataSlide - 1].src;
                }
            }
        }
    }

    /* fermeture de la lightBox */
    function closeLightBox() {
        console.log("ça clique");
        overlay.style.display = "none";
    }
}

showHeaderlogo();
showHeaderMain();
showSelect();
showMediaOfPhotograph();