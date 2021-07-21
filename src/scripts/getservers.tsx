async function getServerList(uid:string) {
    var api_url = "https://wyvern-api.huski3.repl.co/api/real_user"
    // maybe implement a fallback api

    const authHeader = new Headers()
    authHeader.append('X-Api-Key', uid)

    const response = await fetch(api_url, { headers: authHeader })
    const data = await response.json()

    return data.servers
}

export default getServerList