const xhr = new XMLHttpRequest()

xhr.open('get', 'http://127.0.0.1')

xhr.send()

xhr.onreadystatechange(() => {
    if (this.readyState !== 4) return
    if (this.status >= 200 && this.status < 400) {
        console.log(this.response);
    }
})


function myRequest(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return

            if (this.status >= 200 && this.status < 400) {
                resolve(this.response)
            } else {
                reject(this.statusText)
            }
        }

        xhr.onerror = function () {
            reject(this.statusText)
        }

        xhr.responseType = 'json'

        xhr.setRequestHeader('Accept', 'application/json')

        xhr.send()
    })
}