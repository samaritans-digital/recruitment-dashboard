export default () => {
    if(document.querySelector(".applicants-filters")){

        // Grab DOM elements
        const form = document.querySelector(".applicants-filters")  
        const sort = form.querySelector("select[name=sort]")
        const branch = form.querySelector("select[name=branch]")

        // When something is changed, trigger reload
        form.addEventListener('change', ()=>{
            window.location = `/?sort=${sort.value}&branch=${branch.value}`
        })

    }

}