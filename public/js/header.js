//Récupération du body
const body = document.querySelector("body");
//Creation header, img, nav & h1
//TODO creation du lien passer au contenu
const header = document.createElement("header");
const pLogo = document.createElement("p");
const aLogo = document.createElement("a");
const imgLogo = document.createElement("img");
const nav = document.createElement("nav");
let spanNav;
const h1Title = document.createElement("h1");
let tagId;
//Array tagsline
let spanNavsX = ["portrait", "art", "fashion", "architecture", "travel", "sport", "animals", "events"];

if (location.pathname === "/MarvinDESBONNES_6_01062021/index.html") {
    headerPage();
} else if (location.pathname === "/MarvinDESBONNES_6_01062021/photographer-page.html") {

}

function headerPage() {
    body.appendChild(header);
    header.appendChild(pLogo);
    pLogo.appendChild(aLogo);
    aLogo.setAttribute("href", "index.html");
    aLogo.appendChild(imgLogo);
    imgLogo.src = "public/img/Logo_Fisheye.png";
    imgLogo.alt = "Fisheye Home page";
    header.appendChild(nav);
    nav.setAttribute("role", "navigation");
    nav.setAttribute("aria-label", "photographer categories");
    //Création de la span pour chacun des élments du Array
    for (let spanNavX of spanNavsX) {
        spanNav = document.createElement("span");
        spanNav.classList.add("spanTag");
        spanNav.id = spanNavX;
        spanNav.textContent = "#" + spanNavX.charAt(0).toUpperCase() + spanNavX.slice(1);
        spanNav.setAttribute("onclick", "getTag(this.id)");
        // console.log(spanNav.textContent);
        nav.appendChild(spanNav);


        // spanNav.addEventListener("click", (tag) => {
        //     // var classe = spanNavQuery.classList;
        //     // var result = classe.toggle("spanTagFocus");
        //     tagId = tag.target;
        //     tagId.classList.toggle("spanTagFocus");
        //     location.assign("#" + tagId.id);
        //     console.log(tag.target.id);
        //     console.log("hash: " + location.hash);
        //     console.log(location.href);
        //     // showTagPhotographers();
        //     initializeData();
        //     const showTagPhotographers = (jsonObj) => {
        //         profilPhotograph = jsonObj['photographers'];
        //         for (photograph in profilPhotograph) {
        //             createVariables();
        //             if (location.hash === "#" + tagId.id) {
        //                 console.log("passé");
        //                 for (tag of profilPhotograph[photograph].tags) {
        //                     console.log(tag);
        //                     console.log(testSpan);
        //                     if ("#" + tag === testSpan) {
        //                         console.log("tag est passé");
        //                         datasProfilPhotograph();
        //                     }
        //                 }
        //             }
        //         }
        //     }
        //     // event.toggle(getTag());
        //     // if(result) {
        //     //     classe+ " est rouge";
        //     // } else {
        //     //     classe+" n'est plus";
        //     // }
        //
        // })
    }
    header.appendChild(h1Title);
    h1Title.id = "titlePhotographers";
    h1Title.textContent = "Nos photographes";
}


