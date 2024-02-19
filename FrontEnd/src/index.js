let connected = readCookie("token") ? true : false; // verification de la connexion par le token

let selectedCategory = "Tous"; // categorie de base

const fetchApi = new FetchApi(); // novelle instance de la classe fetch

const cats = await fetchApi.getFetch("http://localhost:5678/api/categories"); // recuperation des categories
const cat = await fetchApi.getFetch("http://localhost:5678/api/works"); // recuperation des images

// recuperation des elements necessaires
const editor = document.getElementsByClassName("editor")[0];
const header = document.getElementsByTagName("header")[0];
const modifier = document.getElementsByClassName("modifier")[0];
const modal = document.getElementsByClassName("modal")[0];
const listPart = document.getElementsByClassName("list")[0];
const newPart = document.getElementsByClassName("new")[0];
const modalCross = document.getElementsByClassName("fa-xmark")[0];
const modalBack = document.getElementsByClassName("fa-arrow-left")[0];
const buttonNew = document.querySelectorAll(".list button");
const editorBanner = document.getElementsByClassName("editor")[0];
const body = document.getElementsByTagName("body")[0];
const categories = document.getElementsByClassName("categories")[0];
const gallery = document.getElementsByClassName("gallery")[0];
const modalImg = document.getElementsByClassName("modalImg")[0];
const photo = document.getElementById("image");
const photoImg = document.getElementsByClassName("photo-img")[0];
const validateNewPicture = document.getElementById("submitPicture");
const formNewPicture = document.getElementById("newPicture");
const title = document.getElementById("title");
const selectedCat = document.getElementById("category");
const loginlink = document.getElementById("login");
const project = document.getElementsByClassName("project")[0];

// si connecté creation des elements necessaires
if (connected) {
    editor.style.display = "flex";
    header.style.marginTop = "70px";
    modifier.style.display = "flex";
    loginlink.textContent = "Logout";
    categories.style.display = "none";
    project.style.marginBottom = "51px"
}

// creation de la catagorie "Tous"
let categorie = document.createElement("button");
categorie.addEventListener("click", () => getCatagories("Tous", cat));
categorie.classList.add("categorie");
categorie.classList.add("categorie-selected");
categorie.setAttribute("id", "Tous");
categorie.innerHTML = "Tous";
categories.appendChild(categorie);

// creation des categories depuis la variable des categories
cats.forEach((element) => {
    let categorie = document.createElement("button");
    categorie.addEventListener("click", () => getCatagories(element.name, cat));
    categorie.classList.add("categorie");
    categorie.setAttribute("id", element.name);
    categorie.innerHTML = element.name;
    categories.appendChild(categorie);
    
    let option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.name;
    document.getElementById("category").appendChild(option);
});

//listener sur le bouton de deconnexion
loginlink.addEventListener("click", () => logout());

// fonction de deconnexion
function logout() {
    console.log("logout", connected);
    editor.style.display = "none";
    header.style.marginTop = "50px";
    modifier.style.display = "none";
    loginlink.textContent = "Login";
    categories.display = "flex";
    project.style.marginBottom = "0";
    connected = false;
    deleteCokies("token");
}

// fct creation des images en fonction de la categorie selectionnée 
function getCatagories(selected, datas) {
    gallery.replaceChildren();
    document
        .getElementsByClassName("categorie-selected")[0]
        .classList.remove("categorie-selected");
    document.getElementById(selected).classList.add("categorie-selected");
    datas.forEach((data) => {
        if (selected === "Tous") {
            createFigure(data);
        } else {
            if (selected === data.category.name) {
                createFigure(data);
            }
        }
    });
}

getCatagories("Tous", cat);

function createFigure(data) {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");

    img.src = data.imageUrl;
    figcaption.innerHTML = data.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
}

// fct qui recupere un token depuis son nom et qui le retourne si trouvé ou retourne null
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// fct qui supprime un token
function deleteCokies(name) {
    const co = readCookie(name);
    if (co) {
        document.cookie =
            name + "=" +co+ "; expires=Thu, 01 Jan 1970 00:00:01 GMT" + "; path=/";
    }
}

// fct pour creer les images du modal pour la suppresion
function loadModalImg(works) {
    works.forEach((elem) => {
        addNewImageModal(elem);
    });
}

//add new image modal
function addNewImageModal(data) {
    let img = document.createElement("img");
    let div1 = document.createElement("div");
    let btn = document.createElement("button");
    let i = document.createElement("i");

    img.src = data.imageUrl;
    div1.classList.add("pictureDiv");
    btn.classList.add("btnDiv");
    i.classList.add("fa-solid");
    i.classList.add("fa-trash-can");
    i.classList.add("fa-xs");

    btn.addEventListener("click", () => deletePicture(data));

    btn.appendChild(i);
    div1.appendChild(btn);
    div1.appendChild(img);
    modalImg.appendChild(div1);
}

loadModalImg(cat);

// fct qui supprime une image
async function deletePicture(elem) {
    let del = await fetchApi.deleteFetch(
        `http://localhost:5678/api/works/${elem.id}`,
        readCookie("token")
    );
    modalImg.replaceChildren();
    loadModalImg(await fetchApi.getFetch("http://localhost:5678/api/works"));
    getCatagories(
        "Tous",
        await fetchApi.getFetch("http://localhost:5678/api/works")
    );
}

//modal
editorBanner.addEventListener("click", openModal);
modifier.addEventListener("click", openModal);
modalCross.addEventListener("click", closeModal);
modalBack.addEventListener("click", openList);
buttonNew[buttonNew.length - 1].addEventListener("click", openNew);

function openModal() {
    const topWindow = document.documentElement.scrollTop || document.body.scrollTop;
    const leftWindow = document.documentElement.scrollLeft || document.body.scrollLeft;
    console.log(topWindow, leftWindow)
    modal.style.display = "flex";
    modal.style.top = topWindow+"px";
    modal.style.left = leftWindow + "px";
    listPart.style.display = "flex";
    modalCross.style.display = "block";
    body.style.overflow = "hidden";

}

function openNew() {
    listPart.style.display = "none";
    newPart.style.display = "flex";
    modalBack.style.display = "block";
}

function openList() {
    listPart.style.display = "flex";
    newPart.style.display = "none";
    modalBack.style.display = "none";
}

function closeModal() {
    modal.style.display = "none";
    listPart.style.display = "none";
    newPart.style.display = "none";
    modalCross.style.display = "none";
    modalBack.style.display = "none";
    body.style.overflow = "scroll";
}

window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
};

let imageToSend;
let imageToSend2;
photo.addEventListener("change", printImage);
photo.addEventListener("change", onChangePicture);

// fct qui recupere l'image depuis le modal pour ml'afficher et la stocker pour l'envoie
function printImage() {
    photoImg.style.display = "block";
    document.querySelector(".picture-box i").style.display = "none";
    document.querySelector(".picture-box label").style.display = "none";
    document.querySelector(".picture-box p").style.display = "none";
    imageToSend = this.files[0];
    photoImg.title = imageToSend.name;

    let reader1 = new FileReader();
    
    photoImg.title = imageToSend.name;
    
    reader1.onload = function (event) {
        photoImg.src = event.target.result;
        imageToSend = event.target.result;
        console.log(typeof(imageToSend));
    };
    
    reader1.readAsDataURL(imageToSend);
}


title.addEventListener("input", onChangePicture);
selectedCat.addEventListener("input", onChangePicture);

// fct qui verifie si le bouton d'envoi de nouvelle image peut etre activé
function onChangePicture() {
    if (selectedCat.value && title.value != "" && imageToSend) {
        validateNewPicture.removeAttribute("disabled");
        return true;
    }
    validateNewPicture.setAttribute("disabled", "");
    return false;
}

// listener qui ecoute le submit de la nouvelle image
formNewPicture.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (selectedCat.value && title.value != "" && imageToSend) {
        const formData = new FormData(formNewPicture);
        let add = await fetchApi.postFetch(
            `http://localhost:5678/api/works`,
            ``,
            formData,
            readCookie("token")
        );
        console.log("add", add);
        if (add.id) {
            closeModal()
            getCatagories("Tous", await fetchApi.getFetch("http://localhost:5678/api/works"));
            //reset modal state
            title.value = "";
            selectedCat.options[0].selected = true;
            photoImg.style.display = "none";
            document.querySelector(".picture-box i").style.display = "flex";
            document.querySelector(".picture-box label").style.display = "flex";
            document.querySelector(".picture-box p").style.display = "flex";

            //create new image inside modal
            addNewImageModal(add);
            
        } else {
            const errorLogin = document.getElementsByClassName("error-login")[0];
            errorLogin.style.display = "flex";
        }
    } else {
        alert("Vous n'avez pas rempli tous les champs");
    }
    //document.querySelector(".gallery").innerHTML = "";
})