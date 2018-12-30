export default () => {
    if(document.querySelector(".applicants-filters")){

        // Grab DOM elements
        const form = document.querySelector(".applicants-filters")  
        const sort = form.querySelector("select[name=sort]")
        const branch = form.querySelector("select[name=branch]")

        // When something is changed, trigger reload
        form.addEventListener('change', ()=>{

            // const currentUrl = window.location

            window.location.search = '?sort=soonest'

            // alert(window.location.search)
        })


    }

}