const fetchApi = new FetchApi();

const submit = document.getElementById("submit");
submit.addEventListener("click", credentialTest);

async function credentialTest(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
    const user = await fetchApi.postFetch(
        "http://localhost:5678/api/users/login",
        "application/json",
        { email: email, password: password }
    );
    console.log(user);
    if (user.token) {
        createCookie("token", user.token, 1);
        window.location.href = "../index.html";
        return true;
    }
    const errorLogin = document.getElementsByClassName("error-login")[0];
    errorLogin.style.display = "flex";
    return false;
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
