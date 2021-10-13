// import * as  from '/public/js/accesibility.js';


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

/* Création des variables dataJson */
let dataJson;
let showData;

/* API request */
const fetchPhotographers = async () => {
    dataJson = await fetch('./photographers.json')
        .then(res => (res.json())
            .catch(err => {
                console.log('Fetch problem: ' + err.message)
            }));
}

/* Array tagsline pour le header */
let spanNavsX = [
    {
        "logo": "Logo_Fisheye.jpg",
        "altLogo": "Fisheye Home page",
        "tags": ["portrait", "art", "fashion", "architecture", "travel", "sport", "animals", "events"]
    }];


/* Affichage du header de la page */
const showHeaderPage = async () => {
    /* Création du bouton Passer au contenu si la window est supérieur à 434px */
    const goToContent = document.createElement("a");
    goToContent.textContent = "Passer au contenu";
    goToContent.classList.add("scroll-hide");
    goToContent.style.display = "none";
    /* Renvoi au main du contenu lorsque l'on clique dessus */
    goToContent.href="#mainAccueil";

    /* Apparition du bouton lorsque l'on scroll */
    window.addEventListener('scroll', function () {
        if (window.innerWidth > 769){
            headerAccueil.appendChild(goToContent);
        } else {
            headerAccueil.removeChild(goToContent);
        }
        if (window.scrollY >= 30) {
            goToContent.style.display = "flex";
        } else {
            goToContent.style.display = "none";
        }
    });




    const myA = document.createElement("a");
    myA.id = "aImg";
    headerAccueil.appendChild(myA);
    myA.href = "index.html";
    myA.tabIndex = 0;
    myA.classList.add("homePage");

    const myLogo = document.createElement("img");
    myLogo.classList.add("header_photographers_logo");
    myA.appendChild(myLogo);

    const myNav = document.createElement("nav");
    headerAccueil.appendChild(myNav);
    // a voir comment ajouter le role et le aria-label
    myNav.role = "navigation";
    myNav.arialabel = "photographer categories";
    // mettre les tags onclick="showFilterTag(this)">${tag}

    const myH1 = document.createElement("h1");
    headerAccueil.appendChild(myH1)
    myH1.id = "titlePhotographers";
    myH1.textContent = "Nos Photographes";

    spanNavsX.map((getValue) => {

        myLogo.src = "public/img/" + getValue.logo;
        myLogo.alt = getValue.altLogo;
        getValue.tags.map((tag) => {
            const mySpanHeader = document.createElement("span");
            myNav.appendChild(mySpanHeader);
            mySpanHeader.classList.add("spanTagHeader", "beforeTag");
            mySpanHeader.textContent = tag;
            mySpanHeader.setAttribute("aria-label", tag);
            mySpanHeader.href = "#"+tag;
            mySpanHeader.onclick = searchTag;
            mySpanHeader.tabIndex = 0;
        }).join(" ");
    }).join(" ")

    await fetchPhotographers();
    showPhotographers();
}


/* Affichage des photographers */
const showPhotographers = async () => {
    // await fetchPhotographers();

    showData = dataJson["photographers"];
    showData.map((photograph) => {

        /* Création des balises HTML pour afficher les photographers */
        const articlePhotograph = document.createElement("article");
        articlePhotograph.classList.add("main_photographers");
        const figurePhotograph = document.createElement("figure");
        figurePhotograph.tabIndex = 0;
        figurePhotograph.classList.add("figureTab");
        const imgPhotograph = document.createElement("img");
        const figcaptionPhotograph = document.createElement("figcaption");
        const h2Photograph = document.createElement("h2");
        const divPhotograph = document.createElement("div");
        divPhotograph.classList.add("infoPhotographer");
        const pInfoPhotographerFrom = document.createElement("p");
        pInfoPhotographerFrom.classList.add("infoPhotographer_from");
        const pInfoPhotographerTagline = document.createElement("p");
        pInfoPhotographerTagline.classList.add("infoPhotographer_tagline");
        const pInfoPhotographerPrice = document.createElement("p");
        pInfoPhotographerPrice.classList.add("infoPhotographer_price");
        const divTags = document.createElement("div");

        //Ajout de appenchild
        mainAccueil.appendChild(articlePhotograph);

        articlePhotograph.appendChild(figurePhotograph);
        figurePhotograph.appendChild(imgPhotograph);
        figurePhotograph.appendChild(figcaptionPhotograph);
        figcaptionPhotograph.appendChild(h2Photograph);

        articlePhotograph.appendChild(divPhotograph);
        divPhotograph.appendChild(pInfoPhotographerFrom);
        divPhotograph.appendChild(pInfoPhotographerTagline);
        divPhotograph.appendChild(pInfoPhotographerPrice);

        articlePhotograph.appendChild(divTags);


        /* Ajout des classes et d'Id */
        figurePhotograph.id = photograph.id;
        figurePhotograph.onclick = redirectionPhotograph;

        imgPhotograph.id = photograph.id;
        imgPhotograph.classList.add("photographer_img");
        imgPhotograph.src = "./public/img/Photographers_ID_Photos/" + photograph.portrait;
        imgPhotograph.alt = "portrait de " + photograph.name;

        h2Photograph.textContent = photograph.name;
        pInfoPhotographerFrom.textContent = photograph.city + ", " + photograph.country;
        pInfoPhotographerTagline.textContent = photograph.tagline;
        pInfoPhotographerPrice.textContent = photograph.price + "€ / jour";


        photograph.tags.map((tag) => {
            const spanTags = document.createElement("span");
            spanTags.classList.add("spanTag");
            spanTags.onclick = searchTag;
            spanTags.textContent = tag;
            spanTags.setAttribute("aria-label", tag);
            spanTags.href = "#"+tag;
            spanTags.tabIndex = 0;
            divTags.appendChild(spanTags);
        }).join(" ");
    }).join(" ")
}

/* Redirect url profil photograph page with ID */
const redirectionPhotograph = (idProfil) => {
    console.log(idProfil.target.id);
    location.assign("photographer-page.html?id=" + idProfil.target.id);

}


/* Filtre en fonction du tag du header choisi */
const searchTag = async (tagContent) => {
    await fetchPhotographers();
    if (location.hash){
        location.hash = "";
    }
    location.hash = "#"+tagContent.target.textContent;

    mainAccueil.innerHTML = "";
    showData
        .filter(photograph => photograph.tags.includes(tagContent.target.textContent))
        .map((photograph) => {

            /* Création des balises HTML pour afficher les photographers */
            const articlePhotograph = document.createElement("article");
            articlePhotograph.classList.add("main_photographers");
            const figurePhotograph = document.createElement("figure");
            figurePhotograph.tabIndex = 0;
            figurePhotograph.classList.add("figureTab");
            const imgPhotograph = document.createElement("img");
            const figcaptionPhotograph = document.createElement("figcaption");
            const h2Photograph = document.createElement("h2");
            const divPhotograph = document.createElement("div");
            divPhotograph.classList.add("infoPhotographer");
            const pInfoPhotographerFrom = document.createElement("p");
            pInfoPhotographerFrom.classList.add("infoPhotographer_from");
            const pInfoPhotographerTagline = document.createElement("p");
            pInfoPhotographerTagline.classList.add("infoPhotographer_tagline");
            const pInfoPhotographerPrice = document.createElement("p");
            pInfoPhotographerPrice.classList.add("infoPhotographer_price");
            const divTags = document.createElement("div");

            //Ajout de appenchild
            mainAccueil.appendChild(articlePhotograph);

            articlePhotograph.appendChild(figurePhotograph);
            figurePhotograph.appendChild(imgPhotograph);
            figurePhotograph.appendChild(figcaptionPhotograph);
            figcaptionPhotograph.appendChild(h2Photograph);

            articlePhotograph.appendChild(divPhotograph);
            divPhotograph.appendChild(pInfoPhotographerFrom);
            divPhotograph.appendChild(pInfoPhotographerTagline);
            divPhotograph.appendChild(pInfoPhotographerPrice);

            articlePhotograph.appendChild(divTags);


            /* Ajout des classes et d'Id */
            figurePhotograph.id = photograph.id;
            figurePhotograph.onclick = redirectionPhotograph;

            imgPhotograph.id = photograph.id;
            imgPhotograph.classList.add("photographer_img");
            imgPhotograph.src = "./public/img/Photographers_ID_Photos/" + photograph.portrait;
            imgPhotograph.alt = "portrait de " + photograph.name;

            h2Photograph.textContent = photograph.name;
            pInfoPhotographerFrom.textContent = photograph.city + ", " + photograph.country;
            pInfoPhotographerTagline.textContent = photograph.tagline;
            pInfoPhotographerPrice.textContent = photograph.price + "€ / jour";


            photograph.tags.map((tag) => {
                const spanTags = document.createElement("span");
                spanTags.classList.add("spanTag");
                spanTags.textContent = tag;
                spanTags.setAttribute("aria-label", tag);
                spanTags.onclick = searchTag;
                spanTags.href = "#"+tag;
                spanTags.tabIndex = 0;
                divTags.appendChild(spanTags);
            }).join(" ");
        }).join(" ")
}


/* Touche accessibilité */
const accessibilityIndex = () => {
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
                        redirectionPhotograph(event);
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
showHeaderPage();