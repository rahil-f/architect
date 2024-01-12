class FetchApi {
    constructor() {}

    async getFetch(url = "") {
        return await fetch(url)
            .then((response) => response.json())
            .catch((error) => console.log(error.message));
    }

    async postFetch(url = "", content = "application/json", data = {}, token = "") {
        console.log(content)
        return await fetch(url, {
            method: "POST",
            headers:
                content === ""
                    ? {
                          //"Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`,
                          //Accept: "application/json",
                          Authorization: token !== "" ? `Bearer ${token}` : "",
                      }
                    : {
                          "Content-Type": content,
                          Accept: "application/json",
                          Authorization: token !== "" ? `Bearer ${token}` : "",
                      },
            body: JSON.stringify(data),
        })
            .then((resp) => resp.json())
            .catch((error) => console.log(error.message));
    }

    async deleteFetch(url = "", token = null) {
        console.log(url, `Bearer ${token}`);
        return await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: null,
        })
            .then((resp) => resp.ok)
            .catch((error) => console.log(error.message));
    }
}
