export default () => {
    if(document.querySelector('#launch-modal')){
        const button = document.querySelector('#launch-modal')
        const overlay = document.querySelector('.overlay')
        const modal = document.querySelector('.reschedule-modal')

        button.addEventListener('click', ()=> {
            overlay.classList.add('visible')
            modal.classList.add('visible')
            document.body.style.overflow = 'hidden'
        })

        // Respond to overlay click
        overlay.addEventListener('click', ()=> {
            closeModal()
        })

        // Respond to ESC keypress
        document.addEventListener('keyup', (e)=> {
            if(e.keyCode === 27){
                closeModal()
            }
        })

        const closeModal = () => {
            overlay.classList.remove('visible')
            modal.classList.remove('visible')
            document.body.style.overflow = ''
        }

    }
}


