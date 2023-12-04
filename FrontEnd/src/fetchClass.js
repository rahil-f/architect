class FetchApi {
    constructor() {
        
    }

    async getFetch(url = "") {
        return await fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error.message))
    };

    async postFetch(url = "", data = {}) {
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .catch(error => console.log(error.message))
    };
}