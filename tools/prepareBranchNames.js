const fs = require("fs")
const rawData = require("../branch-data.json")

const rawDataArray = Object.keys(rawData).map(key => rawData[key])

let processedData = []

rawDataArray.map( branch => {
    if(branch.pilot){
        processedData.push({
            name: branch.name,
            id: branch.id
        })
    }
})

// rawDataArray.map((branch)=>{
//     processedData.push({
//         name: branch.name,
//         id: branch.id
//     })
// })

console.log(processedData)

fs.writeFile("./branch-names.json", JSON.stringify(processedData), ()=>{
    console.log("✅  Done!")
})