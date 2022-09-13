const fs = require('fs')

const progressbar = async () => {
    let len = 0
    let totalSize = 0
    let progress = 0
    let sizeOfFile
    let download = []
    const prom = new Promise((resolve, rejects) =>
    {
        fs.readdir ('files/fsHard', (error_r, data) => {
            if (error_r) {
                rejects(new Error("Error read!"))
            } else {
                let k = 0
                len = data.length
                data.forEach(file => {
                    sizeOfFile = fs.statSync('files/fsHard/' + file).size
                    totalSize += sizeOfFile
                    progress += sizeOfFile
                    download[k++] = progress
                })
                resolve()
            }
        })
    })
    prom.then( function() {
        for (let i = 0; i < len; i++) {
            console.log('|' + Math.round(download[i] / totalSize * 100) + '% / 100%|')
        }
    })
}

progressbar()
