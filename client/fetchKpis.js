import fetch from 'isomorphic-unfetch'

export default () => {
    // Check that the DOM elements exist
    if(document.querySelector(".kpis")){

        const applicants = document.querySelector('#kpi-applicants')
        const slots = document.querySelector('#kpi-unbooked-slots')
        const waiting = document.querySelector('#kpi-avg-waiting-time')

        let query = parseQuery(window.location.search)

        fetchKpis(query.branch)
            .then(data=>{
                applicants.innerHTML = data.applicantCount
                slots.innerHTML = data.unbookedSlots
                waiting.innerHTML = (data.avgWaitingTime)? `${data.avgWaitingTime} days` : '?'
            })
            .catch(data=>{
                applicants.innerHTML = '?'
                slots.innerHTML = '?'
                waiting.innerHTML = '?'
            })

    }
}

const parseQuery = (search) => {
    var query = search.substr(1)
    var result = {}
    query.split("&").forEach(function(part) {
        var item = part.split("=")
        result[item[0]] = decodeURIComponent(item[1])
    })
    return result
}

const fetchKpis = async (branchId) => {
    let endpoint = "/api/kpis"
    if(branchId){
        endpoint = `/api/kpis/${branchId}`
    }
    const response = await fetch(endpoint)
    const data = await response.json()
    return data
}