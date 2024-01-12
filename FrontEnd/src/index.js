let connected = readCookie("token") ? true : false;

let selectedCategory = "Tous";

const fetchApi = new FetchApi();

const cats = await fetchApi.getFetch("http://localhost:5678/api/categories");
const cat = await fetchApi.getFetch("http://localhost:5678/api/works");

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
const photo = document.getElementById("photo");
const photoImg = document.getElementsByClassName("photo-img")[0];
const validateNewPicture = document.getElementById("submitPicure");
const title = document.getElementById("titre");
const selectedCat = document.getElementById("categorie");

if (connected) {
    editor.style.display = "flex";
    header.style.marginTop = "70px";
    modifier.style.display = "flex";
}

let categorie = document.createElement("button");
categorie.addEventListener("click", () => getCatagories("Tous"));
categorie.classList.add("categorie");
categorie.classList.add("categorie-selected");
categorie.setAttribute("id", "Tous");
categorie.innerHTML = "Tous";
categories.appendChild(categorie);

cats.forEach((element) => {
    let categorie = document.createElement("button");
    categorie.addEventListener("click", () => getCatagories(element.name));
    categorie.classList.add("categorie");
    categorie.setAttribute("id", element.name);
    categorie.innerHTML = element.name;
    categories.appendChild(categorie);

    let option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.name;
    document.getElementById("categorie").appendChild(option);
});

function getCatagories(selected) {
    gallery.replaceChildren();
    document
        .getElementsByClassName("categorie-selected")[0]
        .classList.remove("categorie-selected");
    document.getElementById(selected).classList.add("categorie-selected");
    cat.forEach((data) => {
        if (selected === "Tous") {
            createFigure(data);
        } else {
            if (selected === data.category.name) {
                createFigure(data);
            }
        }
    });
}

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

getCatagories("Tous");

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

function loadModalImg(works) {
    works.forEach((elem) => {
        let img = document.createElement("img");
        let div1 = document.createElement("div");
        let btn = document.createElement("button");
        let i = document.createElement("i");

        img.src = elem.imageUrl;
        div1.classList.add("pictureDiv");
        btn.classList.add("btnDiv");
        i.classList.add("fa-solid");
        i.classList.add("fa-trash-can");
        i.classList.add("fa-xs");

        btn.addEventListener("click", () => deletePicture(elem));

        btn.appendChild(i);
        div1.appendChild(btn);
        div1.appendChild(img);
        modalImg.appendChild(div1);
    });
}

loadModalImg(cat);

async function deletePicture(elem) {
    let del = await fetchApi.deleteFetch(
        `http://localhost:5678/api/works/${elem.id}`,
        readCookie("token")
    );
    modalImg.replaceChildren();
    loadModalImg(await fetchApi.getFetch("http://localhost:5678/api/works"));
}

//modal

editorBanner.addEventListener("click", openModal);
modifier.addEventListener("click", openModal);
modalCross.addEventListener("click", closeModal);
modalBack.addEventListener("click", openList);
buttonNew[buttonNew.length - 1].addEventListener("click", openNew);

function openModal() {
    modal.style.display = "flex";
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

function printImage() {
    photoImg.style.display = "block";
    document.querySelector(".picture-box i").style.display = "none";
    document.querySelector(".picture-box label").style.display = "none";
    document.querySelector(".picture-box p").style.display = "none";
    imageToSend = this.files[0];
    let reader = new FileReader();
    photoImg.title = imageToSend.name;
    
    reader.onload = function (event) {
        //photoImg.src = event.target.result;
        //imageToSend = event.target.result;
        console.log(typeof(imageToSend))
    };
    
    //reader.readAsBinaryString(imageToSend);
    
    let reader1 = new FileReader();
    
    photoImg.title = imageToSend.name;
    
    reader1.onload = function (event) {
        photoImg.src = event.target.result;
        imageToSend2 = event.target.result;
        console.log(typeof(imageToSend));
    };
    
    reader1.readAsDataURL(imageToSend);
    const formData = new FormData();
    formData.append("image", imageToSend);

    imageToSend = formData;
    for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
    }
    //console.log(formData, imageToSend)
}

validateNewPicture.addEventListener("click", addPicture);

title.addEventListener("input", onChangePicture);
selectedCat.addEventListener("input", onChangePicture);

function onChangePicture() {
    if (selectedCat.value && title.value != "" && imageToSend) {
        validateNewPicture.removeAttribute("disabled");
        return true;
    }
    validateNewPicture.setAttribute("disabled", "");
    return false;
}

async function addPicture(e) {
    e.preventDefault();
    if (selectedCat.value && title.value != "" && imageToSend) {
        console.log(typeof imageToSend);
        let add = await fetchApi.postFetch(
            `http://localhost:5678/api/works`,
            `multipart/form-data`,
            {
                image: imageToSend,
                title: title.value,
                category: Number(selectedCat.value),
            },
            readCookie("token")
        );
        console.log("add", add);
        // modalImg.replaceChildren();
        // loadModalImg(
        //     await fetchApi.getFetch("http://localhost:5678/api/works")
        //     );
        return true;
    }
    // const errorLogin = document.getElementsByClassName("error-login")[0];
    // errorLogin.style.display = "flex";
    return false;
}