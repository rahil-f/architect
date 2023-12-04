const fetchApi = new FetchApi("sophie.bluel@test.tld", "S0phie")

console.log(fetchApi)
const ret1 = await fetchApi.postFetch("http://localhost:5678/api/users/login", {"email": "sophie.bluel@test.tld", "password": "S0phie"})
const ret = await fetchApi.getFetch("http://localhost:5678/api/categories")

console.log(ret1, ret)