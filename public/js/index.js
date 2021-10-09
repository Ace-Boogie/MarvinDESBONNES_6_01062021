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
        "logo": "Logo_Fisheye.png",
        "altLogo": "Fisheye Home page",
        "tags": ["portrait", "art", "fashion", "architecture", "travel", "sport", "animals", "events"]
    }];

//TODO essayer de filter avec ça
// <li>
//     <a href="index.html?tags=architecture" aria-label="Tag Architecture" className="tag__li"
//        id="architecture">#Architecture</a>
// </li>


/* Affichage du header de la page */
const showHeaderPage = async () => {
    console.log(window.innerWidth);
    /* Création du bouton Passer au contenu si la window est supérieur à 434px */
    const goToContent = document.createElement("a");
    goToContent.textContent = "Passer au contenu";
    goToContent.classList.add("scroll-hide");
    goToContent.style.display = "none";
    /* Renvoi au main du contenu lorsque l'on clique dessus */
    goToContent.href="#mainAccueil";

    /* Apparition du bouton lorsque l'on scroll */
    window.addEventListener('scroll', function () {
        if (window.innerWidth > 434){
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
    myA.classList.add("tabIndex");
    console.log(myA.tabIndex);
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
        getValue.tags.map((tag, index) => {
            const mySpanHeader = document.createElement("span");
            myNav.appendChild(mySpanHeader);
            mySpanHeader.classList.add("spanTagHeader", "beforeTag", "tabIndex");
            mySpanHeader.textContent = tag;
            mySpanHeader.href = "#"+tag;
            mySpanHeader.onclick = searchTag;
            mySpanHeader.tabIndex = index + 1;
            console.log(mySpanHeader.tabIndex);
        }).join(" ");
    }).join(" ")

    await fetchPhotographers();
    showPhotographers();
}


/* Affichage des photographers */
const showPhotographers = async () => {
    // await fetchPhotographers();

    showData = dataJson["photographers"];
    showData.map((photograph, index) => {

        /* Création des balises HTML pour afficher les photographers */
        const articlePhotograph = document.createElement("article");
        articlePhotograph.classList.add("main_photographers", "tabIndex");
        console.log(articlePhotograph.tabIndex);
        const figurePhotograph = document.createElement("figure");
        figurePhotograph.tabIndex = index + 9;
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
            // spanTags.onclick = addTagUrl;
            spanTags.onclick = searchTag;
            spanTags.textContent = tag;
            divTags.appendChild(spanTags);
        }).join(" ");
    }).join(" ")
}

/* Redirect url profil photograph page with ID */
const redirectionPhotograph = (idProfil) => {
    console.log(idProfil.target.id);
    location.assign("photographer-page.html?id=" + idProfil.target.id);

}

/* Add tag profil photograph */
const addTagUrl = (tagUrl) => {
    console.log(tagUrl.path[0].textContent);
    console.log(tagUrl.target.textContent);
    tagUrl.path[0].classList.toggle("spanTagFocus");
    if (tagUrl.path[0].classList.contains("spanTagFocus")) {
        location.assign(location.href + "#" + tagUrl.path[0].textContent);
        //TODO Faire le filtre pour les tags
    } else {
        location.replace(location.href.replace("#" + tagUrl.path[0].textContent, ""));
        // showPhotographers(allPhotographers);
    }

}

/* Filtre en fonction du tag du header choisi */
const searchTag = async (tagContent) => {
    await fetchPhotographers();
    mainAccueil.innerHTML = "";
    showData
        .filter(photograph => photograph.tags.includes(tagContent.target.textContent))
        .map((photograph, index) => {

            /* Création des balises HTML pour afficher les photographers */
            const articlePhotograph = document.createElement("article");
            articlePhotograph.classList.add("main_photographers", "tabIndex");
            console.log(articlePhotograph.tabIndex);
            const figurePhotograph = document.createElement("figure");
            figurePhotograph.tabIndex = index + 9;
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
                divTags.appendChild(spanTags);
            }).join(" ");
        }).join(" ")
    // console.log(tagContent.target.textContent);
}


/* Touche accessibilité */


// window.addEventListener("keydown", function (event) {
//     if (event.defaultPrevented) {
//         return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
//     }
//
//     switch (event.key) {
//         case "ArrowLeft":
//             console.log(event.key);
//             if (event.target.tabIndex < 0){
//                 console.log("-1 "+event.target.tabIndex);
//                 return event.target.tabIndex - 1;
//             }
//             // if ()
//             // Faire quelque chose pour la touche "left arrow" pressée.
//             break;
//         case "ArrowRight":
//             console.log(event.key);
//             if (event.target.tabIndex > 0){
//                 console.log("+1 "+event.target.tabIndex);
//                 return event.target.tabIndex + 1;
//             }
//             // Faire quelque chose pour la touche "right arrow" pressée.
//             break;
//         case "Enter":
//             // Faire quelque chose pour les touches "enter" ou "return" pressées.
//             if (event.target.tabIndex == 0){
//                 return event.target.href = "index.html";
//             }
//             if (event.target.tabIndex > 0){
//                 console.log("spanTag");
//             }
//             break;
//         default:
//             return; // Quitter lorsque cela ne gère pas l'événement touche.
//     }
//
//     // Annuler l'action par défaut pour éviter qu'elle ne soit traitée deux fois.
//     event.preventDefault();
// }, true);

showHeaderPage();