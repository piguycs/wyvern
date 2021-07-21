function getServerList(uid:string) {
    var api_url = "https://wyvern-api.huski3.repl.co/api/real_user"
    // maybe implement a fallback api

    const authHeader = new Headers()
    authHeader.append('X-Api-Key', uid)

    var obj:any

    fetch(api_url, { headers: authHeader })
        .then(res => res.json())
        .then(data => obj = data)
        .then(() => console.log(obj))

    console.log("hello" + Promise.resolve(obj))
}

export default getServerList