let modal = null


const OpenModal = function (e) {
    e.preventDefault()
    // const target = document.querySelector(e.target.getAttribute("href"))
    // target.style.dysplay = null
    // modal = target
    modal = document.getElementById('modal-main')
    modal.style.display = "flex"
    modal.addEventListener('click', CloseModal)
    modal.querySelector('js-modal-close').addEventListener('click', CloseModal)
    modal.querySelector('js-modal-stop').addEventListener('click', stopPropagation)
}
const CloseModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.removeEventListener("click", CloseModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', CloseModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelector('.white-title').addEventListener('click', OpenModal)