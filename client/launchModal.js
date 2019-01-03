import dialogPolyfill from 'dialog-polyfill'

export default () => {
    if(document.querySelector('#launch-modal')){
        const button = document.querySelector('#launch-modal')
        const modal = document.querySelector('.modal')
        const close = document.querySelector('.modal .modal__close')

        // Turn on polyfill
        dialogPolyfill.registerDialog(modal);

        button.addEventListener('click', ()=> {
            modal.showModal();
        })

        close.addEventListener('click', ()=> {
            modal.close();
        })

    }
}