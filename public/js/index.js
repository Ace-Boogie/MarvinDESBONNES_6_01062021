/* Création des balises HTML pour le body, le header et le main */
const bodyAccueil = document.querySelector("body");
const headerAccueil = document.createElement("header");
const mainAccueil = document.createElement("main");


/*Lier les HTML via appendChild */
bodyAccueil.appendChild(headerAccueil);
bodyAccueil.appendChild(mainAccueil);


/* Ajout des classes et d'Id */
mainAccueil.id = "mainAccueil";
headerAccueil.classList.add("header_photographers");

/* API request */
const fetchPhotographers = async () => {
    return await fetch('./photographers.json')
        .then(res => (res.json())
            .catch(err => {
                console.log('Fetch problem: ' + err.message)
            }));
}
/* Array contenant les tags de la navigation */
const spanNavsX = [
    {
        "tags": ["portrait", "art", "fashion", "architecture", "travel", "sport", "animals", "events"]
    }];

class HeaderPhotographers {
    // constructor(rawData, targetNode) {
    constructor(targetNode) {
        // this.rawData = rawData;
        this.targetNode = targetNode;

        this.init();
    }

    init() {
        this.buildLogo();
        this.buildAndGetTagsHeader();
        this.buildAndSettingPasserAuContenu();
        this.buildTitle()
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

    /* Création d'un array tags dans une nav, récupération et affichage des tags */
    buildAndGetTagsHeader() {
        /* Navigation */
        this.nav = document.createElement("nav");
        this.nav.role = "navigation";
        this.nav.setAttribute("aria-label", "photographer categories");

        /* Tags */
        spanNavsX.map((getValue) => {
            getValue.tags.map((tag) => {
                this.spanTags = document.createElement("span");
                this.spanTags.classList.add("spanTagHeader", "beforeTag");
                this.spanTags.textContent = tag;
                this.spanTags.setAttribute("aria-label", tag);
                this.spanTags.href = "#" + tag;
                this.spanTags.onclick = searchTag;
                this.spanTags.tabIndex = 0;
                this.nav.append(this.spanTags);
            }).join(" ");
        }).join(" ")
    }

    /* Création du titre de la page */
    buildTitle() {
        this.h1 = document.createElement("h1");
        this.h1.id = "titlePhotographers";
        this.h1.textContent = "Nos Photographes";

    }

    /* Création et setting du bouton Passer au contenu si la window est supérieur à 434px */
    buildAndSettingPasserAuContenu() {
        this.goToContent = document.createElement("a");
        this.goToContent.textContent = "Passer au contenu";
        this.goToContent.classList.add("scroll-hide");

        /* Renvoi au main du contenu lorsque l'on clique dessus */
        this.goToContent.href = "#mainAccueil";

        /* Apparition du bouton lorsque l'on scroll */
        window.addEventListener("scroll", () => {
            console.log(location.hash);
            if (window.scrollY >= 200 && window.innerWidth > 769) {

                this.goToContent.style.display = "flex";
            } else {
                this.goToContent.style.display = "none";
            }
        })
    }


    append(domNode) {
        this.linkLogo.append(this.logo);

        domNode.append(this.goToContent);
        domNode.append(this.linkLogo);
        domNode.append(this.nav);
        domNode.append(this.h1);
    }

}

class AllPhotographers {
    constructor(rawData, targetNode) {
        this.rawData = rawData;
        this.targetNode = targetNode;

        this.init();
    }

    init() {
        this.buildArticle();
        this.buildFigure();
        this.buildImage();
        this.buildFigcaption();
        this.buildInformations();
        this.buildTags();

        if (this.targetNode) {
            this.append(this.targetNode);
        }
    }

    /* Création de l'article qui contiendra buildFigure */
    buildArticle() {
        this.article = document.createElement("article");

        this.article.classList.add("main_photographers");

    }

    /* Récupère buildImage et buildFigcaption */
    buildFigure() {
        this.figure = document.createElement("figure");
        this.figure.id = this.rawData.id;
        this.figure.classList.add("figureTab");
        this.figure.tabIndex = 0;
        this.figure.onclick = redirectionPagePhotograph;
    }

    /* Récupère la photo de profil du photographe */
    buildImage() {
        this.img = document.createElement("img");

        this.img.id = this.rawData.id
        this.img.classList.add("photographer_img")
        this.img.src = "./public/img/Photographers_ID_Photos/" + this.rawData.portrait;
        this.img.alt = "portrait de " + this.rawData.name;
    }

    /* Récupère le nom du photographe */
    buildFigcaption() {
        this.figcaption = document.createElement("figcaption");
        /* nom du photographe */
        this.h2figcaption = document.createElement("h2");
        this.h2figcaption.textContent = this.rawData.name;
    }

    /* Récupère les informations concernant le photographe */
    buildInformations() {
        /* Création d'un div pour contenir les informations */
        this.divInformations = document.createElement("div");
        this.divInformations.classList.add("infoPhotographer");

        /* Provenance du photographe */
        this.pFrom = document.createElement("p");
        this.pFrom.classList.add("infoPhotographer_from");
        this.pFrom.textContent = this.rawData.city + ", " + this.rawData.country;

        /* Tagline du photographe */
        this.pTagline = document.createElement("p");
        this.pTagline.classList.add("infoPhotographer_tagline");
        this.pTagline.textContent = this.rawData.tagline;

        /* Prix en € par jour du photographe */
        this.pPrice = document.createElement("p");
        this.pPrice.classList.add("infoPhotographer_price");
        this.pPrice.textContent = this.rawData.price + "€ / jour";

    }

    /* Récupère les #tags du photographe */
    buildTags() {
        /* Creation de la div content les #tags du photographe */
        this.divTags = document.createElement("div");

        /* Récupération de chaque tag dans le Array tags */
        this.rawData.tags.map((tag) => {
            this.spanTags = document.createElement("span");
            this.spanTags.classList.add("spanTag");
            this.spanTags.onclick = searchTag;
            this.spanTags.textContent = tag;
            this.spanTags.setAttribute("aria-label", tag);
            this.spanTags.href = "#" + tag;
            this.spanTags.tabIndex = 0;

            this.divTags.append(this.spanTags);
        }).join("")

    }

    append(domNode) {
        this.article.append(this.figure);
        this.figure.append(this.img);

        this.figcaption.append(this.h2figcaption);
        this.figure.append(this.figcaption);

        this.divInformations.append(this.pFrom);
        this.divInformations.append(this.pTagline);
        this.divInformations.append(this.pPrice);
        this.article.append(this.divInformations);

        this.article.append(this.divTags);
        domNode.append(this.article);

    }
}

const indexPhotographers = async () => {
    try {
        const dataJson = await fetchPhotographers();

        new HeaderPhotographers(headerAccueil);

        const showData = dataJson["photographers"];
        showData.map((photograph) => {
            new AllPhotographers(photograph, mainAccueil);
        })
    } catch {
        const errorMessage = document.createElement("div")
        errorMessage.textContent = "Error"
        errorMessage.style = "color: red;";
        mainAccueil.appendChild(errorMessage)
    }
}

/* Filtre en fonction du tag du header choisi */
const searchTag = async (tagContent) => {
    try {
        if (location.hash) {
            location.hash = "";
        }
        location.hash = "#" + tagContent.target.textContent;

        mainAccueil.innerHTML = "";
        const dataJson = await fetchPhotographers();
        const showData = dataJson["photographers"];
        showData.filter(photograph => photograph.tags.includes(tagContent.target.textContent))
            .map((photograph) => {
                new AllPhotographers(photograph, mainAccueil);
            })

    } catch {
        const errorMessage = document.createElement("div")
        errorMessage.textContent = "Error"
        errorMessage.style = "color: red;";
        mainAccueil.appendChild(errorMessage)
    }
}

/* Redirect url profil photograph page with ID */
const redirectionPagePhotograph = (idProfil) => {
    console.log(idProfil.target.id);
    location.assign("photographer-page.html?id=" + idProfil.target.id);
}

/* Touche accessibilité */
const accessibilityIndex = async () => {
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
                    if (event.target.classList.contains("spanTagHeader") || event.target.classList.contains("spanTag")) {
                        searchTag(event);
                    }
                    if (event.target.classList.contains("figureTab")) {
                        redirectionPagePhotograph(event);
                    }
                }
                break;
            default:
                return; // Quitter lorsque cela ne gère pas l'événement touche.
        }

        // Annuler l'action par défaut pour éviter qu'elle ne soit traitée deux fois.
        event.preventDefault();
    }, true);
}

accessibilityIndex();
indexPhotographers();