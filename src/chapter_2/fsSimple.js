const fs = require('fs')

const readAndWriteCallbackHell = (inputPath, outputPath) => {
  fs.readFile(inputPath, (error_r, data) => {
    if (error_r) {
      console.log("Error read!")
      return
    }
    fs.writeFile(outputPath, data, (error_w) => {
      if (error_w) {
        console.log("Error write!")
        return
      } else {
        console.log("Done!")
      }
    })
  })
}

const readAndWritePromises = (inputPath, outputPath) => {
  let promise = new Promise(function(resolve, reject) {
    fs.readFile(inputPath, (error_r, data) => {
      if (error_r) {
        reject(new Error("Error read!"))
      } else {
        resolve(data)
      }
    })
  })
  promise.then(
    function(result) {
      fs.writeFile(outputPath, result, (error_w) => {
        if (error_w) {
          console.log("Error write!")
        } else {
          console.log("Done!")
        }
      })
    }
  )
}

const readAndWriteAsyncAwait = async (inputPath, outputPath) => {
  let promise = new Promise(function(resolve, reject) {
    fs.readFile(inputPath, (error_r, data) => {
      if (error_r) {
        reject(new Error("Error read!"))
      } else {
        resolve(data)
      }
    })
  })
  let text = await promise;
  fs.writeFile(outputPath, text, (error_w) => {
    if (error_w) {
      console.log("Error write!")
      return
    } else {
      console.log("Done!")
    }
  })
}

export {
readAndWritePromises('files/fsSimple/file1.txt', 'files/fsSimple/file2.txt'),
readAndWriteCallbackHell('files/fsSimple/file1.txt', 'files/fsSimple/file2.txt'),
readAndWriteAsyncAwait('files/fsSimple/file1.txt', 'files/fsSimple/file2.txt')
}
