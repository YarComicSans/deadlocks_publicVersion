export function delay (timeout: number, val?) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(val)
        }, timeout)
    })
}
