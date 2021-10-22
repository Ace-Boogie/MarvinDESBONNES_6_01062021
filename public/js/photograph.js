/* Création des balises HTML pour le body, le header et le main */
const bodyPhotograph = document.querySelector("#photographer-page");
const headerLogo = document.createElement("header");
const mainPhotographPage = document.createElement("main");
const headerPage = document.createElement("header");
const sectionTrierPar = document.createElement("section");
const sectionMedia = document.createElement("section");
const footer = document.createElement("div");
const resultHearts = document.createElement("p");


/*Lier les HTML via appendChild */
bodyPhotograph.appendChild(headerLogo);
bodyPhotograph.appendChild(mainPhotographPage);
mainPhotographPage.appendChild(headerPage);
mainPhotographPage.appendChild(sectionTrierPar);
mainPhotographPage.appendChild(sectionMedia);
mainPhotographPage.appendChild(footer);
footer.appendChild(resultHearts);


/* Ajout des classes et d'Id */
headerLogo.classList.add("header-logo-profil");
headerPage.classList.add("header_page_photograph");
sectionTrierPar.id = "trierPar";
sectionTrierPar.classList.add("trierPar");
sectionMedia.id = "sectionPhotograph";
footer.classList.add("footer_like_page");
resultHearts.classList.add("result_heart");

/* API request */
const fetchPhotographers = async () => {
    return await fetch('./photographers.json')
        .then(res => (res.json())
            .catch(err => {
                console.log('Fetch problem: ' + err.message)
            }));
}

/* Récupération de l'id du la page idex.html */
const urlId = parseInt(location.href.substring(location.href.lastIndexOf("?") + 4));

class HeaderLogo {
    constructor(targetNode) {
        this.targetNode = targetNode;

        this.init();
    }

    init() {
        this.buildLogo();
        if (this.targetNode) {
            this.append(this.targetNode);
        }
    }

    /* Création du href du logo et logo */
    buildLogo() {

        /* Href du logo */
        this.linkLogo = document.createElement("a");
        this.linkLogo.id = "aImg";
        this.linkLogo.href = "index.html";
        this.linkLogo.tabIndex = 0;
        this.linkLogo.classList.add("homePage");

        /* Logo */
        this.logo = document.createElement("img");
        this.logo.classList.add("header_photographers_logo");
        this.logo.src = "./public/img/Logo_Fisheye.jpg"
        this.logo.alt = "Fisheye Home page";

    }

    append(domNode) {
        this.linkLogo.append(this.logo);

        domNode.append(this.linkLogo);
    }

}

class HeaderMain {
    constructor(rawData, targetNode) {
        this.rawData = rawData;
        this.targetNode = targetNode;

        this.init();
    }

    init() {
        this.buildSectionInformation();
        this.buildTags();
        this.buildSectionContact();
        this.buildForm();
        this.buildAndShowPhotoProfil();

        if (this.targetNode) {
            this.append(this.targetNode);
        }
    }

    /* Création de la section contenant les informations du photographe */
    buildSectionInformation() {
        this.sectionInformations = document.createElement("section");
        this.sectionInformations.classList.add("header_photograph_article_info", "section_informations");

        /* Nom du photographe */
        this.h2NamePhotograph = document.createElement("h2");
        this.h2NamePhotograph.textContent = this.rawData.name;

        /* Provenance du photographe */
        this.pFrom = document.createElement("p");
        this.pFrom.classList.add("header_photograph_article_info_from", "section_informations_from");
        this.pFrom.textContent = this.rawData.city + ", " + this.rawData.country;

        /* Tagline du photographe */
        this.pTagline = document.createElement("p");
        this.pTagline.classList.add("header_photograph_article_info_tagline", "section_informations_tagline");
        this.pTagline.textContent = this.rawData.tagline;

    }

    /* Création des tags du photographe contenu dans buildSectionInformation() */
    buildTags() {
        /* Creation de la div content les #tags du photographe */
        this.divTags = document.createElement("div");
        this.divTags.classList.add("divTags");

        /* Récupération de chaque tag dans le Array tags */
        this.rawData.tags.map((tag) => {
            this.spanTags = document.createElement("span");
            this.spanTags.classList.add("spanTagHeader");
            this.spanTags.onclick = filterTagMedia;
            this.spanTags.textContent = tag;
            this.spanTags.setAttribute("aria-label", tag);

            this.divTags.append(this.spanTags);
        }).join("")

    }

    /* Création de la section contenant le bouton contactez-moi */
    buildSectionContact() {
        this.sectionContact = document.createElement("section");
        this.sectionContact.classList.add("section_btn");

        this.btnContact = document.createElement("button");
        this.btnContact.id = "contact-me";
        this.btnContact.textContent = "Contactez-moi";
        this.btnContact.onclick = contactMe;
        this.btnContact.tabIndex = 0;
    }

    /* Création du formulaire contactez-moi contenu dans buildSectionContact() */
    buildForm() {
        this.myFormContain = document.createElement("div");
        this.myFormContain.classList.add("contain-modal-body");

        this.myFormContent = document.createElement("div");
        this.myFormContent.classList.add("content-modal-body");

        /* Création de l'icone afin de close le formulaire */
        this.myFormCloseContent = document.createElement("span");
        this.myFormCloseContent.id = "closeModal";
        this.myFormCloseContent.classList.add("close");
        this.myFormCloseContent.tabIndex = 0;
        this.myFormCloseContent.onclick = closeModal;

        this.myFormCloseIcone = document.createElement("i");
        this.myFormCloseIcone.classList.add("fa", "fa-times");

        /* Création de la div qui contient les datas du formulaire */
        this.myFormBody = document.createElement("div");
        this.myFormBody.classList.add("modal-body");

        /* Création du form */
        this.myForm = document.createElement("form");
        this.myForm.setAttribute("name", "reserve");

        /* Titre du formulaire */
        this.myFormH1 = document.createElement("h1");
        this.myFormH1.id = "contact-modal-h1";
        this.myFormH1.innerHTML = "Contactez-moi <br/> " + this.rawData.name;

        /*Création de la div, du label et du input pour le prénom */
        this.myFormDataFirstName = document.createElement("div");
        this.myFormDataFirstName.classList.add("formData");

        this.myLabelFirst = document.createElement("label");
        this.myLabelFirst.textContent = "Prénom";
        this.myLabelFirst.setAttribute("for", "first");

        this.myInputFirst = document.createElement("input");
        this.myInputFirst.id = "first";
        this.myInputFirst.classList.add("text-control");
        this.myInputFirst.type = "text";
        this.myInputFirst.setAttribute("name", "first");
        this.myInputFirst.setAttribute("minlength", "2");
        this.myInputFirst.setAttribute("row", "5");
        this.myInputFirst.required = true;

        /*Création de la div, du label et du input pour le nom */
        this.myFormDataLastName = document.createElement("div");
        this.myFormDataLastName.classList.add("formData");

        this.myLabelLast = document.createElement("label");
        this.myLabelLast.textContent = "Nom";
        this.myLabelLast.setAttribute("for", "last");

        this.myInputLast = document.createElement("input");
        this.myInputLast.id = "last";
        this.myInputLast.classList.add("text-control");
        this.myInputLast.type = "text";
        this.myInputLast.setAttribute("name", "last");
        this.myInputLast.setAttribute("minlength", "2");
        this.myInputLast.setAttribute("row", "5");
        this.myInputLast.required = true;

        /*Création de la div, du label et du input pour l'email */
        this.myFormDataEmail = document.createElement("div");
        this.myFormDataEmail.classList.add("formData");

        this.myLabelEmail = document.createElement("label");
        this.myLabelEmail.textContent = "E-mail";
        this.myLabelEmail.setAttribute("for", "email");

        this.myInputEmail = document.createElement("input");
        this.myInputEmail.id = "email";
        this.myInputEmail.classList.add("text-control");
        this.myInputEmail.type = "text";
        this.myInputEmail.setAttribute("name", "email");
        this.myInputEmail.setAttribute("row", "5");
        this.myInputEmail.required = true;

        /*Création de la div, du label et du input pour le message */
        this.myFormDataMessage = document.createElement("div");
        this.myFormDataMessage.classList.add("formData");

        this.myLabelMessage = document.createElement("label");
        this.myLabelMessage.textContent = "Votre message";
        this.myLabelMessage.setAttribute("for", "message");

        this.myTextareaMessage = document.createElement("textarea");
        this.myTextareaMessage.id = "message";
        this.myTextareaMessage.classList.add("text-control", "text-area");
        this.myTextareaMessage.setAttribute("name", "message");
        this.myTextareaMessage.setAttribute("row", "5");
        this.myTextareaMessage.setAttribute("cols", "30");
        this.myTextareaMessage.required = true;

        /*Création du bouton pour l'envoi du formulaire */
        this.myBtnPostData = document.createElement("button");
        this.myBtnPostData.id = "btnPostData";
        this.myBtnPostData.classList.add("btn-submit", "button");
        this.myBtnPostData.type = "button";
        this.myBtnPostData.onclick = recupData;
        this.myBtnPostData.value = "Envoyer";
        this.myBtnPostData.textContent = "Envoyer";

    }

    /* Création section contenant la photo profil du photographe */
    buildAndShowPhotoProfil() {
        this.sectionPhotoProfil = document.createElement("section");
        this.sectionPhotoProfil.classList.add("section_photo_profil");

        /* Photo de profil du photographe */
        this.img = document.createElement("img");

        this.img.id = this.rawData.id
        this.img.classList.add("photographer_img_page_header")
        this.img.src = "./public/img/Photographers_ID_Photos/" + this.rawData.portrait;
        this.img.alt = "portrait de " + this.rawData.name;
    }


    append(domNode) {
        this.sectionInformations.append(this.h2NamePhotograph);
        this.sectionInformations.append(this.pFrom);
        this.sectionInformations.append(this.pTagline);
        this.sectionInformations.append(this.divTags);

        /* append du formulaire */
        this.sectionContact.append(this.btnContact);
        this.sectionContact.append(this.myFormContain);

        this.myFormContain.append(this.myFormContent);
        this.myFormContent.append(this.myFormCloseContent)
        this.myFormCloseContent.append(this.myFormCloseIcone);
        this.myFormContent.append(this.myFormBody);

        this.myFormBody.append(this.myForm);
        this.myForm.append(this.myFormH1);
        this.myForm.append(this.myFormDataFirstName);

        this.myFormDataFirstName.append(this.myLabelFirst);
        this.myFormDataFirstName.append(this.myInputFirst);

        this.myForm.append(this.myFormDataLastName);

        this.myFormDataLastName.append(this.myLabelLast);
        this.myFormDataLastName.append(this.myInputLast);

        this.myForm.append(this.myFormDataEmail);

        this.myFormDataEmail.append(this.myLabelEmail);
        this.myFormDataEmail.append(this.myInputEmail);

        this.myForm.append(this.myFormDataMessage);

        this.myFormDataMessage.append(this.myLabelMessage);
        this.myFormDataMessage.append(this.myTextareaMessage);

        this.myForm.append(this.myBtnPostData);

        /* Photo de profil */
        this.sectionPhotoProfil.append(this.img);

        domNode.append(this.sectionInformations);
        domNode.append(this.sectionContact);
        domNode.append(this.sectionPhotoProfil);


    }
}

class SelectTypeMedia {
    constructor(targetNode) {

        this.targetNode = targetNode;

        this.init();
    }

    init() {
        this.buildLabel();
        this.buildSelect();
        this.buildOption();

        if (this.targetNode) {
            this.append(this.targetNode);
        }
    }

    /* Création du label */
    buildLabel() {
        this.label = document.createElement("label");
        this.label.textContent = "Trier par";
        this.label.setAttribute("for", "chooseBy");
    }

    /* Création du select */
    buildSelect() {
        this.select = document.createElement("select");
        this.select.id = "chooseBy";
        this.select.name = "tri";
        this.select.tabIndex = 0;
    }

    /* Création des options du select */
    buildOption() {

        /* Option Likes */
        this.optionSelectLikes = document.createElement("option");
        this.optionSelectLikes.value = "likes";
        this.optionSelectLikes.selected = true;
        this.optionSelectLikes.textContent = "Popularité";

        /* Option Date */
        this.optionSelectDate = document.createElement("option");
        this.optionSelectDate.value = "date";
        this.optionSelectDate.textContent = "Date";

        /* Option Title */
        this.optionSelectTitle = document.createElement("option");
        this.optionSelectTitle.value = "title";
        this.optionSelectTitle.textContent = "Titre";

    }

    append(domNode) {
        this.select.append(this.optionSelectLikes);
        this.select.append(this.optionSelectDate);
        this.select.append(this.optionSelectTitle);

        domNode.append(this.label);
        domNode.append(this.select);

    }
}

class MediaPhotograph {
    constructor(rawData, rawDataIndex, rawNamePhotograph, targetNode) {
        this.rawData = rawData;
        this.rawDataIndex = rawDataIndex;
        this.rawNamePhotograph = rawNamePhotograph;
        this.targetNode = targetNode;

        this.init();
    }

    init() {
        this.buildArticle();
        this.buildFigure();
        this.buildFigcaption();

        if (this.targetNode) {
            this.append(this.targetNode);
        }
    }

    /* Création de l'article qui contiendra buildFigure */
    buildArticle() {
        this.article = document.createElement("article");


    }

    /* Récupère buildImage et buildFigcaption */
    buildFigure() {
        this.figure = document.createElement("figure");
        this.figure.id = this.rawData.id;
    }


    /* Récupèration du nom et du like du media */
    buildFigcaption() {
        this.figcaption = document.createElement("figcaption");
        this.figcaption.classList.add("media_figcaption");
        /* nom du media */
        this.h2figcaption = document.createElement("h2");
        this.h2figcaption.textContent = this.rawData.title;

        /* like du media */
        this.likeMedia = document.createElement("p");
        this.likeMedia.id = this.rawData.likes;
        this.likeMedia.classList.add("likes_heart");
        this.likeMedia.tabIndex = 0;
        this.likeMedia.onclick = addLike;
        this.likeMedia.textContent = this.rawData.likes;
    }


}

class Image extends MediaPhotograph {


    init() {
        this.buildArticle();
        this.buildFigure();
        this.buildImage();
        this.buildFigcaption();

        if (this.targetNode) {
            this.append(this.targetNode);
        }
    }

    buildArticle() {
        super.buildArticle();
    }

    /* Récupère les photos du photographe */
    buildImage() {

        this.img = document.createElement("img");

        this.img.id = this.rawData.id
        this.img.classList.add("nbMedia", "figureTab");
        this.img.tabIndex = 0;
        this.img.onclick = lightBox;
        this.img.setAttribute("data-slide-to", this.rawDataIndex)
        this.img.src = "./public/img/" + this.rawNamePhotograph.replace(" ", "_") + "/" + this.rawData.image;
        this.img.alt = this.rawData.image;
        this.img.title = this.rawData.title;
    }

    buildFigure() {
        super.buildFigure();
    }

    buildFigcaption() {
        super.buildFigcaption();
    }


    append(domNode) {
        this.figure.append(this.img);
        this.figure.append(this.figcaption);
        this.figcaption.append(this.h2figcaption);
        this.figcaption.append(this.likeMedia);

        domNode.append(this.figure);

    }
}

class Video extends MediaPhotograph {

    init() {
        this.buildArticle();
        this.buildFigure();
        this.buildVideo();
        this.buildFigcaption();

        if (this.targetNode) {
            this.append(this.targetNode);
        }
    }


    buildArticle() {
        super.buildArticle();
    }

    /* Récupère les vidéos du photographe */
    buildVideo() {

        this.video = document.createElement("video");

        this.video.id = this.rawData.id
        this.video.classList.add("nbMedia", "figureTab");
        this.video.tabIndex = 0;
        this.video.onclick = lightBox;
        this.video.setAttribute("data-slide-to", this.rawDataIndex);
        this.video.src = "./public/img/" + this.rawNamePhotograph.replace(" ", "_") + "/" + this.rawData.video;
        this.video.title = this.rawData.title;
    }

    buildFigure() {
        super.buildFigure();
    }

    buildFigcaption() {
        super.buildFigcaption();
    }


    append(domNode) {
        this.figure.append(this.video);
        this.figure.append(this.figcaption);
        this.figcaption.append(this.h2figcaption);
        this.figcaption.append(this.likeMedia);

        domNode.append(this.figure);

    }
}

class FooterPrice {
    constructor(rawData, targetNode) {
        this.rawData = rawData;
        this.targetNode = targetNode;

        this.init();
    }

    init() {
        this.buildAndGetPrice();

        if (this.targetNode) {
            this.append(this.targetNode);
        }
    }

    /* Récupération du prix du photographe par jour */
    buildAndGetPrice() {
        this.price = document.createElement("p");
        this.price.textContent = this.rawData.price + "€ / jour";
    }


    append(domNode) {

        domNode.append(this.price);

    }
}

class LightBox {
    constructor(rawValue, targetNode) {
        this.rawValue = rawValue;
        this.targetNode = targetNode;

        this.init();
    }

    init() {
        this.buildBaliseHtml();
        this.buildPrev();
        this.buildImageOrVideo();
        this.buildTitleMedia();
        this.buildNext();
        this.buildExit();
        this.clickNextMedia();
        this.clickPrevMedia();
        // this.buildAccessibility();


        if (this.targetNode) {
            this.append(this.targetNode);
        }
    }

    buildBaliseHtml() {
        /* Creation des balises HTML contenues dans la lightBox */
        this.overlay = document.createElement("div");
        this.overlay.id = "overlay";
        this.overlay.style.display = "flex";

        /* Selectionner tous ceux qui ont la classe nbMedia */
        this.nbMedia = document.querySelectorAll(".nbMedia");

        /* Récupération de l'attribut data-slide-to du media cliqué*/
        this.indexMedia = this.rawValue.target.getAttribute("data-slide-to");

        /* Récupération de l'attribut data-slide-to du lightBox */
        this.nbDataSlide = parseInt(this.rawValue.target.getAttribute("data-slide-to"));
    }

    buildPrev() {
        this.divPrevBtn = document.createElement("div");
        this.divPrevBtn.id = "prevButton";
        this.divPrevBtn.setAttribute("data-slide-to", this.indexMedia);

        this.iLeft = document.createElement("i");
        this.iLeft.classList.add("fa", "fa-chevron-left");
    }

    buildImageOrVideo() {
        this.imgOverlay = document.createElement("img");
        this.imgOverlay.classList.add("lightBoxMedia");
        this.imgOverlay.setAttribute("data-slide-to", this.indexMedia);
        this.imgOverlay.src = this.rawValue.target.src;

        this.videoOverlay = document.createElement("video");
        this.videoOverlay.classList.add("lightBoxMedia");
        this.videoOverlay.setAttribute("data-slide-to", this.indexMedia);
        this.videoOverlay.src = this.rawValue.target.src;
        this.videoOverlay.controls = true;
    }

    buildTitleMedia() {
        this.h2Overlay = document.createElement("h2");
        this.h2Overlay.id = "titleOverlay";
        this.h2Overlay.textContent = this.rawValue.target.title;

    }

    buildNext() {
        this.divNextBtn = document.createElement("div");
        this.divNextBtn.id = "nextButton";
        this.divNextBtn.setAttribute("data-slide-to", this.indexMedia);

        this.iNext = document.createElement("i");
        this.iNext.classList.add("fa", "fa-chevron-right");
    }

    buildExit() {
        this.divExitBtn = document.createElement("div");
        this.divExitBtn.id = "exitButton";

        this.iExit = document.createElement("i");
        this.iExit.classList.add("fa", "fa-times");
        this.iExit.id = "iExitBtn";

        /* Click fermeture de la lightBox au click */
        this.divExitBtn.addEventListener("click", () => {
            this.closeMedia();
        });
    }

    closeMedia(){
        this.overlay.style.display = "none";
        this.overlay.parentElement.removeChild(this.overlay);
    }

    /* Clique sur la flèche pour avoir le media suivant de la lightBox */
    clickNextMedia() {
        this.divNextBtn.addEventListener("click", () => {
            this.nextMedia();
        })
    }

    nextMedia() {
        this.nbDivNextDataSlide = parseInt(this.divNextBtn.getAttribute("data-slide-to"));
        if (this.nbDivNextDataSlide === this.nbMedia.length - 1) {
            if (this.rawValue.target.src.endsWith(".jpg")) {
                if (this.nbMedia[0].src.endsWith(".mp4")) {
                    this.overlay.replaceChild(this.videoOverlay, this.imgOverlay);
                    this.videoOverlay.setAttribute("data-slide-to", 0);
                    this.divNextBtn.setAttribute("data-slide-to", 0);
                    this.divPrevBtn.setAttribute("data-slide-to", 0);
                    this.h2Overlay.textContent = this.nbMedia[0].title
                    this.videoOverlay.controls = true;
                    return this.videoOverlay.src = this.nbMedia[0].src;
                } else if (this.nbMedia[0].src.endsWith(".jpg")) {
                    this.imgOverlay.setAttribute("data-slide-to", 0);
                    this.divNextBtn.setAttribute("data-slide-to", 0);
                    this.divPrevBtn.setAttribute("data-slide-to", 0);
                    this.h2Overlay.textContent = this.nbMedia[0].title
                    return this.imgOverlay.src = this.nbMedia[0].src;
                }
            } else if (this.rawValue.target.src.endsWith(".mp4")) {
                if (this.nbMedia[0].src.endsWith(".mp4")) {
                    this.videoOverlay.setAttribute("data-slide-to", 0);
                    this.divNextBtn.setAttribute("data-slide-to", 0);
                    this.divPrevBtn.setAttribute("data-slide-to", 0);
                    this.h2Overlay.textContent = this.nbMedia[0].title
                    this.videoOverlay.controls = true;
                    return this.videoOverlay.src = this.nbMedia[0].src;
                } else if (this.nbMedia[0].src.endsWith(".jpg")) {
                    this.overlay.replaceChild(this.imgOverlay, this.videoOverlay);
                    this.imgOverlay.setAttribute("data-slide-to", 0);
                    this.divNextBtn.setAttribute("data-slide-to", 0);
                    this.divPrevBtn.setAttribute("data-slide-to", 0);
                    this.h2Overlay.textContent = this.nbMedia[0].title
                    return this.imgOverlay.src = this.nbMedia[0].src;
                }
            }
        }
        if (this.nbDivNextDataSlide < this.nbMedia.length - 1) {
            if (this.nbMedia[this.nbDivNextDataSlide].src.endsWith(".jpg")) {
                if (this.nbMedia[this.nbDivNextDataSlide + 1].src.endsWith(".mp4")) {
                    this.overlay.replaceChild(this.videoOverlay, this.imgOverlay);
                    this.videoOverlay.setAttribute("data-slide-to", this.nbDivNextDataSlide + 1);
                    this.divNextBtn.setAttribute("data-slide-to", this.nbDivNextDataSlide + 1);
                    this.divPrevBtn.setAttribute("data-slide-to", this.nbDivNextDataSlide + 1);
                    this.h2Overlay.textContent = this.nbMedia[this.nbDivNextDataSlide + 1].title
                    this.videoOverlay.controls = true;
                    return this.videoOverlay.src = this.nbMedia[this.nbDivNextDataSlide + 1].src;
                }
                if (this.nbMedia[this.nbDivNextDataSlide + 1].src.endsWith(".jpg")) {
                    this.imgOverlay.setAttribute("data-slide-to", this.nbDivNextDataSlide + 1);
                    this.divNextBtn.setAttribute("data-slide-to", this.nbDivNextDataSlide + 1);
                    this.divPrevBtn.setAttribute("data-slide-to", this.nbDivNextDataSlide + 1);
                    this.h2Overlay.textContent = this.nbMedia[this.nbDivNextDataSlide + 1].title
                    return this.imgOverlay.src = this.nbMedia[this.nbDivNextDataSlide + 1].src;
                }
            } else if (this.nbMedia[this.nbDivNextDataSlide].src.endsWith(".mp4")) {
                if (this.nbMedia[this.nbDivNextDataSlide + 1].src.endsWith(".mp4")) {
                    this.videoOverlay.setAttribute("data-slide-to", this.nbDivNextDataSlide + 1);
                    this.divNextBtn.setAttribute("data-slide-to", this.nbDivNextDataSlide + 1);
                    this.divPrevBtn.setAttribute("data-slide-to", this.nbDataSlide + 1);
                    this.h2Overlay.textContent = this.nbMedia[this.nbDivNextDataSlide + 1].title
                    this.videoOverlay.controls = true;
                    return this.videoOverlay.src = this.nbMedia[this.nbDivNextDataSlide + 1].src;
                }
                if (this.nbMedia[this.nbDivNextDataSlide + 1].src.endsWith(".jpg")) {
                    this.overlay.replaceChild(this.imgOverlay, this.videoOverlay);
                    this.imgOverlay.setAttribute("data-slide-to", this.nbDivNextDataSlide + 1);
                    this.divNextBtn.setAttribute("data-slide-to", this.nbDivNextDataSlide + 1);
                    this.divPrevBtn.setAttribute("data-slide-to", this.nbDivNextDataSlide + 1);
                    this.h2Overlay.textContent = this.nbMedia[this.nbDivNextDataSlide + 1].title
                    return this.imgOverlay.src = this.nbMedia[this.nbDivNextDataSlide + 1].src;
                }
            }
        }
    }

    /* Clique sur la flèche pour avoir le media précédent de la lightBox */
    clickPrevMedia() {
        this.divPrevBtn.addEventListener("click", () => {
            this.prevMedia();
        })
    }

    prevMedia() {

        this.nbDivPrevDataSlide = parseInt(this.divPrevBtn.getAttribute("data-slide-to"));
        if (this.nbDivPrevDataSlide === 0) {
            if (this.nbMedia[0].src.endsWith(".jpg")) {
                if (this.nbMedia[this.nbMedia.length - 1].src.endsWith(".mp4")) {
                    this.overlay.replaceChild(this.videoOverlay, this.imgOverlay);
                    this.videoOverlay.setAttribute("data-slide-to", this.nbMedia.length - 1);
                    this.divNextBtn.setAttribute("data-slide-to", this.nbMedia.length - 1);
                    this.divPrevBtn.setAttribute("data-slide-to", this.nbMedia.length - 1);
                    this.h2Overlay.textContent = this.nbMedia[this.nbMedia.length - 1].title
                    this.videoOverlay.controls = true;
                    return this.videoOverlay.src = this.nbMedia[this.nbMedia.length - 1].src;
                } else if (this.nbMedia[this.nbMedia.length - 1].src.endsWith(".jpg")) {
                    this.imgOverlay.setAttribute("data-slide-to", this.nbMedia.length - 1);
                    this.divNextBtn.setAttribute("data-slide-to", this.nbMedia.length - 1);
                    this.divPrevBtn.setAttribute("data-slide-to", this.nbMedia.length - 1);
                    this.h2Overlay.textContent = this.nbMedia[this.nbMedia.length - 1].title
                    return this.imgOverlay.src = this.nbMedia[this.nbMedia.length - 1].src;
                }
            } else if (this.nbMedia[0].src.endsWith(".mp4")) {
                if (this.nbMedia[this.nbMedia.length - 1].src.endsWith(".mp4")) {
                    this.videoOverlay.setAttribute("data-slide-to", this.nbMedia.length - 1);
                    this.divNextBtn.setAttribute("data-slide-to", this.nbMedia.length - 1);
                    this.divPrevBtn.setAttribute("data-slide-to", this.nbMedia.length - 1);
                    this.h2Overlay.textContent = this.nbMedia[this.nbMedia.length - 1].title
                    this.videoOverlay.controls = true;
                    return this.videoOverlay.src = this.nbMedia[this.nbMedia.length - 1].src;
                } else if (this.nbMedia[this.nbMedia.length - 1].src.endsWith(".jpg")) {
                    this.overlay.replaceChild(this.imgOverlay, this.videoOverlay);
                    this.imgOverlay.setAttribute("data-slide-to", this.nbMedia.length - 1);
                    this.divNextBtn.setAttribute("data-slide-to", this.nbMedia.length - 1);
                    this.divPrevBtn.setAttribute("data-slide-to", this.nbMedia.length - 1);
                    this.h2Overlay.textContent = this.nbMedia[this.nbMedia.length - 1].title
                    return this.imgOverlay.src = this.nbMedia[this.nbMedia.length - 1].src;
                }
            }
        }
        if (this.nbDivPrevDataSlide > 0) {
            if (this.nbMedia[this.nbDivPrevDataSlide].src.endsWith(".jpg")) {
                if (this.nbMedia[this.nbDivPrevDataSlide - 1].src.endsWith(".mp4")) {
                    this.overlay.replaceChild(this.videoOverlay, this.imgOverlay);
                    this.videoOverlay.setAttribute("data-slide-to", this.nbDivPrevDataSlide - 1);
                    this.divNextBtn.setAttribute("data-slide-to", this.nbDivPrevDataSlide - 1);
                    this.divPrevBtn.setAttribute("data-slide-to", this.nbDivPrevDataSlide - 1);
                    this.h2Overlay.textContent = this.nbMedia[this.nbDivPrevDataSlide - 1].title
                    this.videoOverlay.controls = true;
                    return this.videoOverlay.src = this.nbMedia[this.nbDivPrevDataSlide - 1].src;
                }
                if (this.nbMedia[this.nbDivPrevDataSlide - 1].src.endsWith(".jpg")) {
                    this.imgOverlay.setAttribute("data-slide-to", this.nbDivPrevDataSlide - 1);
                    this.divNextBtn.setAttribute("data-slide-to", this.nbDivPrevDataSlide - 1);
                    this.divPrevBtn.setAttribute("data-slide-to", this.nbDivPrevDataSlide - 1);
                    this.h2Overlay.textContent = this.nbMedia[this.nbDivPrevDataSlide - 1].title
                    return this.imgOverlay.src = this.nbMedia[this.nbDivPrevDataSlide - 1].src;
                }
            } else if (this.nbMedia[this.nbDivPrevDataSlide].src.endsWith(".mp4")) {
                if (this.nbMedia[this.nbDivPrevDataSlide - 1].src.endsWith(".mp4")) {
                    this.videoOverlay.setAttribute("data-slide-to", this.nbDivPrevDataSlide - 1);
                    this.divNextBtn.setAttribute("data-slide-to", this.nbDivPrevDataSlide - 1);
                    this.divPrevBtn.setAttribute("data-slide-to", this.nbDivPrevDataSlide - 1);
                    this.h2Overlay.textContent = this.nbMedia[this.nbDivPrevDataSlide - 1].title
                    this.videoOverlay.controls = true;
                    return this.videoOverlay.src = this.nbMedia[this.nbDivPrevDataSlide - 1].src;
                }
                if (this.nbMedia[this.nbDivPrevDataSlide - 1].src.endsWith(".jpg")) {
                    console.log("c'est là")
                    this.overlay.replaceChild(this.imgOverlay, this.videoOverlay);
                    this.imgOverlay.setAttribute("data-slide-to", this.nbDivPrevDataSlide - 1);
                    this.divNextBtn.setAttribute("data-slide-to", this.nbDivPrevDataSlide - 1);
                    this.divPrevBtn.setAttribute("data-slide-to", this.nbDivPrevDataSlide - 1);
                    this.h2Overlay.textContent = this.nbMedia[this.nbDivPrevDataSlide - 1].title
                    return this.imgOverlay.src = this.nbMedia[this.nbDivPrevDataSlide - 1].src;
                }
            }
        }
    }

    append(domNode) {
        this.overlay.append(this.divPrevBtn);
        this.divPrevBtn.append(this.iLeft);

        if (this.rawValue.target.src.endsWith(".jpg")) {
            this.overlay.append(this.imgOverlay);
        } else if (this.rawValue.target.src.endsWith(".mp4")) {

            this.overlay.append(this.videoOverlay);
        }
        this.overlay.append(this.h2Overlay);

        this.overlay.append(this.divNextBtn);
        this.divNextBtn.append(this.iNext);

        this.overlay.append(this.divExitBtn);
        this.divExitBtn.append(this.iExit)

        domNode.append(this.overlay);

    }
}


/* Affichage de la page photographer-page.html */
const photographerPage = async () => {
    try {
        const dataJson = await fetchPhotographers();

        /* Affichage du HeaderLogo */
        new HeaderLogo(headerLogo);

        let namePhotograph;

        /* Affichage du HeaderMain */
        const showData = dataJson["photographers"];
        showData.filter((photograph) => {
            if (photograph.id === urlId) {
                new HeaderMain(photograph, headerPage);
                namePhotograph = photograph.name;
                new FooterPrice(photograph, footer)
            }
        }).join("")

        /* Affichage des medias du photographe */
        const showMedia = dataJson["media"];

        /* Affichage des medias par selection */
        new SelectTypeMedia(sectionTrierPar);
        const selectElem = document.querySelector('#chooseBy');
        selectElem.addEventListener('change', (event) => {
            switch (event.target.value) {
                case "likes" :
                    sectionMedia.innerHTML = "";
                    showMedia
                        .filter((media) => media.photographerId === urlId)
                        .sort((a, b) => {
                            return a.likes < b.likes ? 1 : -1;
                        })
                        .map((media, index) => {
                            if (media.image) {
                                return new Image(media, index, namePhotograph, sectionMedia);
                            }

                            if (media.video) {
                                return new Video(media, index, namePhotograph, sectionMedia);
                            }
                        }).join("")
                    break;
                case "date" :
                    sectionMedia.innerHTML = "";
                    showMedia
                        .filter((media) => media.photographerId === urlId)
                        .sort((a, b) => {
                            return a.date > b.date ? 1 : -1;
                        })
                        .map((media, index) => {
                            if (media.image) {
                                return new Image(media, index, namePhotograph, sectionMedia);
                            }

                            if (media.video) {
                                return new Video(media, index, namePhotograph, sectionMedia);
                            }
                        }).join("")
                    break;
                case "title" :
                    sectionMedia.innerHTML = "";
                    showMedia
                        .filter((media) => media.photographerId === urlId)
                        .sort((a, b) => {
                            return a.title > b.title ? 1 : -1;
                        })
                        .map((media, index) => {
                            if (media.image) {
                                return new Image(media, index, namePhotograph, sectionMedia);
                            }

                            if (media.video) {
                                return new Video(media, index, namePhotograph, sectionMedia);
                            }
                        }).join("")
                    break;
            }
        });

        /* Affichage des medias par défault */
        showMedia
            .filter((media) => media.photographerId === urlId)
            .sort((a, b) => {
                return a.likes < b.likes ? 1 : -1;
            })
            .map((media, index) => {
                if (media.image) {
                    return new Image(media, index, namePhotograph, sectionMedia);
                }

                if (media.video) {
                    return new Video(media, index, namePhotograph, sectionMedia);
                }
            }).join("")

        resultHearts.textContent = showMedia
            .filter(media => media.photographerId === urlId)
            .map(media => media.likes)
            .reduce((a, b) => a + b, 0)

    } catch {
        const errorMessage = document.createElement("div")
        errorMessage.textContent = "Error"
        errorMessage.style.color = "red;";
        mainPhotographPage.appendChild(errorMessage)
    }
}

/* Filtre en fonction du tag du header choisi */
const filterTagMedia = async (tagContent) => {
    try {
        let namePhotograph;
        if (location.hash) {
            location.hash = "";
        }
        location.hash = "#" + tagContent.target.textContent;


        const dataJson = await fetchPhotographers();
        const showData = dataJson["photographers"];
        showData.filter(photograph => {
            if (photograph.id === urlId) {
                namePhotograph = photograph.name;

            }
        })

        console.log(tagContent.target)
        console.log(tagContent.target.textContent);
        sectionMedia.innerHTML = "";
        const showMedia = dataJson["media"];
        showMedia
            .filter((media) => media.photographerId === urlId)
            .map((media, index) => {
                if (media.tags.includes(tagContent.target.textContent)) {
                    console.log("on y est presque")
                    if (media.image) {
                        return new Image(media, index, namePhotograph, sectionMedia);
                    }

                    if (media.video) {
                        return new Video(media, index, namePhotograph, sectionMedia);
                    }
                }
            }).join("")

    } catch {
        const errorMessage = document.createElement("div")
        errorMessage.textContent = "Error"
        errorMessage.style.color = "red;";
        mainPhotographPage.appendChild(errorMessage)
    }
}

/* Affichage de la lightBox */
const lightBox = (val) => {
    const lightBoxClass = new LightBox(val, bodyPhotograph);

    window.addEventListener('keydown', (e) => {

        if (e.key === "ArrowLeft"){
            lightBoxClass.prevMedia();
        }
        if (e.key === "ArrowRight"){
            lightBoxClass.nextMedia();
        }
        if (e.key === "Escape"){
            lightBoxClass.closeMedia();
        }
    })
}

/* Ajouter ou Retirer un like */
const addLike = (event) => {
    //changement target effectué path
    if (event.target.id === event.target.textContent) {
        event.target.textContent = parseInt(event.target.textContent, 10) + 1;
        resultHearts.textContent = parseInt(resultHearts.textContent, 10) + 1;
    } else if (event.target.id !== event.target.textContent) {
        event.target.textContent = parseInt(event.target.textContent, 10) - 1;
        resultHearts.textContent = parseInt(resultHearts.textContent, 10) - 1;
    }
}

/* Affichage du formulaire de contact */
const contactMe = () => {

    const launchContactMe = document.querySelector(".contain-modal-body");
    const contactMe = document.querySelector("#contact-me");
    launchContactMe.style.display = "block";
    contactMe.style.zIndex = 0;
}


/* Fermeture de la modal du contact */
const closeModal = () => {

    const launchContactMe = document.querySelector(".contain-modal-body");
    const contactMe = document.querySelector("#contact-me");
    launchContactMe.style.display = "none";
    contactMe.style.zIndex = 8;
}

/* Récupération du message envoyé */
const recupData = (data) => {
    data.preventDefault();
    const inputRequireds = document.querySelectorAll("input[required]");
    const textLabel = document.querySelector("#message");
    for (const inputRequired of inputRequireds) {
        console.log(inputRequired.id + " : " + inputRequired.value);
        inputRequired.value = "";
    }
    console.log("Message : " + textLabel.value);
    textLabel.value = "";

    closeModal();
}

/* Touche clavier accessibilité */
const accessibilityProfil = () => {

    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
            return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
        }

        switch (event.key) {
            case "Enter":
                // Faire quelque chose pour les touches "enter" ou "return" pressées.
                if (event.target.tabIndex === 0) {
                    if (event.target.classList.contains("homePage")) {
                        return event.target.href;
                    }
                    if (event.target.classList.contains("figureTab")) {
                        lightBox(event);
                    }
                    if (event.target.id === "contact-me") {
                        contactMe();
                    }
                    if (event.target.id === "closeModal") {
                        closeModal();
                    }
                    if (event.target.id === "btnPostData") {
                        recupData(data);
                    }
                    if (event.target.classList.contains("likes_heart")) {
                        addLike(event);
                    }
                }
                break;
            case "Escape":
                // Faire quelque chose pour la touche "esc" pressée.
                if (event.target.id === "closeModal") {
                    closeModal();
                }
                break;
            default:
                return; // Quitter lorsque cela ne gère pas l'événement touche.
        }

        // Annuler l'action par défaut pour éviter qu'elle ne soit traitée deux fois.
        event.preventDefault();
    }, true);
}

photographerPage();
accessibilityProfil();