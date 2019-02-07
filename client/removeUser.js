import dialogPolyfill from 'dialog-polyfill'

export default () => {
    if(document.querySelector('#launch-remove-user-modal')){
        const buttons = document.querySelectorAll('#launch-remove-user-modal')
        const modal = document.querySelector('.modal')
        const close = document.querySelector('.modal .modal__close')
        const emailField = document.querySelector('.modal #email-to-remove')

        // Turn on polyfill
        dialogPolyfill.registerDialog(modal);

        buttons.forEach(button => {
            button.addEventListener('click', ()=> {
                // Set value of field to remove
                emailField.value = button.dataset.user
                modal.showModal();
            })
        })

        close.addEventListener('click', ()=> {
            modal.close();
        })

    }
}