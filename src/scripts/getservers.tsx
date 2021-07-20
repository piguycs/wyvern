function getServerList(uid:string) {
    var api_url = "https://wyvern-api.huski3.repl.co/api/real_user"
    // maybe implement a fallback api
    var xhr = new XMLHttpRequest()
    
    xhr.open("GET", api_url)

    xhr.setRequestHeader("X-Api-Key", uid)
    let response = 1
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            let status:number = xhr.status
            if (status >= 200 && status < 400) {
                let response:Array<string> = JSON.parse(xhr.responseText).servers
                return response
            } else console.log("ERR fetching API" + status)
        }
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let status:number = xhr.status
            if (status >= 200 && status < 400) {
                let response:Array<string> = JSON.parse(xhr.responseText).servers
                return response
            } else console.log("ERR fetching API" + status)
        }
    }
    xhr.send()

    return response! == undefined ? null : response

}

export default getServerList