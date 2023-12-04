let connected = readCookie("token") ? true : false

const fetchApi = new FetchApi()

const cats = await fetchApi.getFetch("http://localhost:5678/api/categories")
const cat = await fetchApi.getFetch("http://localhost:5678/api/works")

const categories = document.getElementsByClassName("categories")[0];
const gallery = document.getElementsByClassName("gallery")[0];

let categorie = document.createElement("button");
categorie.addEventListener("click", () => getCatagories("Tous"))
categorie.classList.add("categorie");
categorie.classList.add("categorie-selected");
categorie.setAttribute("id","Tous");
categorie.innerHTML = "Tous";
categories.appendChild(categorie);

cats.forEach(element => {
    let categorie = document.createElement("button");
    categorie.addEventListener("click", () => getCatagories(element.name))
    categorie.classList.add("categorie");
    categorie.setAttribute("id",element.name);
    categorie.innerHTML = element.name;
    categories.appendChild(categorie);
});
function getCatagories(selected) {
    gallery.replaceChildren();
    document.getElementsByClassName("categorie-selected")[0].classList.remove("categorie-selected");
    document.getElementById(selected).classList.add("categorie-selected");
    cat.forEach(data => {
        if (selected == "Tous") {
            createFigure(data)
        } else {
            if (selected == data.category.name) {
                createFigure(data)
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
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}