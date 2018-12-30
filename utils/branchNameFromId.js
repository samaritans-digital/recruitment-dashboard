const branchNames = require("../branch-names.json")

module.exports = (branchId) => {
    const results = branchNames.filter(branch => {
        if(branch.id === branchId){
            return true
        }
    })
    return results[0].name
}