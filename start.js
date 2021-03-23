const cliProgress = require('cli-progress');
const axios = require('axios')
require('colors')
const { from } = require('rxjs')
const { mergeMap } = require('rxjs/operators')

const b1 = new cliProgress.SingleBar({
    format: `Send requests | ${'{bar}'.blue.bold} | {percentage}% | {value}/{total}`,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
})

const objects = [
    {
        url: "http://localhost:3000/posts",
        type: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            name: "Mario Velandia"
        }
    },
    {
        url: "http://localhost:3000/postsd",
        type: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            name: "Mario Velandia"
        }
    },
    {
        url: "http://localhost:3000/posts",
        type: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            name: "Mario Velandia"
        }
    },
    {
        url: "http://localhost:3000/postsd",
        type: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            name: "Mario Velandia"
        }
    },
    {
        url: "http://localhost:3000/posts",
        type: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            name: "Mario Velandia"
        }
    },
    {
        url: "http://localhost:3000/postsd",
        type: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            name: "Mario Velandia"
        }
    },
    {
        url: "http://localhost:3000/posts",
        type: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            name: "Mario Velandia"
        }
    },
    {
        url: "http://localhost:3000/postsd",
        type: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            name: "Mario Velandia"
        }
    },
    {
        url: "http://localhost:3000/posts",
        type: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            name: "Mario Velandia"
        }
    },
    {
        url: "http://localhost:3000/postsd",
        type: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            name: "Mario Velandia"
        }
    },
    {
        url: "http://localhost:3000/posts",
        type: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            name: "Mario Velandia"
        }
    },
    {
        url: "http://localhost:3000/postsd",
        type: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            name: "Mario Velandia"
        }
    }
]

function responseRequest(resolve, status, objResponse) {
    resolve({
        status,
        code: status ? objResponse.status : objResponse.response.status,
        data: status ? objResponse.data : objResponse.response.data
    })
}

function sendRequest(obj) {
    return new Promise((resolve) => {
        if (obj) {
            if (obj?.url != null) {

                if (!obj?.type) obj.type = 'GET'
                if (!obj?.headers) obj.headers = {}
                if (!obj?.body) obj.body = ''

                obj.type.toUpperCase()

                switch (obj?.type) {
                    case "DELETE":
                        axios.delete(obj.url, obj.headers).then((response) => {
                            responseRequest(resolve, true, response)
                        }).catch((error) => {
                            responseRequest(resolve, false, error)
                        })
                        break

                    case "HEAD":
                        axios.head(obj.url, obj.headers).then((response) => {
                            responseRequest(resolve, true, response)
                        }).catch((error) => {
                            responseRequest(resolve, false, error)
                        })
                        break

                    case "OPTIONS":
                        axios.options(obj.url, obj.headers).then((response) => {
                            responseRequest(resolve, true, response)
                        }).catch((error) => {
                            responseRequest(resolve, false, error)
                        })
                        break

                    case "POST":
                        axios.post(obj.url, body, { headers: obj.headers }).then((response) => {
                            responseRequest(resolve, true, response)
                        }).catch((error) => {
                            responseRequest(resolve, false, error)
                        })
                        break

                    case "PUT":
                        axios.put(obj.url, body, { headers: obj.headers }).then((response) => {
                            responseRequest(resolve, true, response)
                        }).catch((error) => {
                            responseRequest(resolve, false, error)
                        })
                        break

                    case "PATCH":
                        axios.patch(obj.url, body, { headers: obj.headers }).then((response) => {
                            responseRequest(resolve, true, response)
                        }).catch((error) => {
                            responseRequest(resolve, false, error)
                        })
                        break

                    default:
                        axios.get(obj.url, obj.headers).then((response) => {
                            responseRequest(resolve, true, response)
                        }).catch((error) => {
                            responseRequest(resolve, false, error)
                        })
                        break
                }
            }
            else {
                resolve({
                    status: false,
                    message: "url incorrect"
                })
            }
        }
        else {
            resolve({
                status: false,
                message: "object non null"
            })
        }
    })
}
b1.start(objects.length, 0, {})

let all = []

from(objects).pipe(
    mergeMap((obj) => sendRequest(obj))
).subscribe({
    next: value => {
        all.push(value)
        b1.increment(1)
    },
    complete: () => {
        b1.stop()
        console.log(all)
    },
    error: error => console.log("error: ", error)
})