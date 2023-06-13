let modal = null


const OpenModal = function (e) {
    e.preventDefault()
    modal = document.getElementById('modal-main')
    modal.style.display = "flex"
    modal.addEventListener('click', CloseModal)
    modal.querySelector('.close-modal').addEventListener('click', CloseModal)
    modal.querySelector('#modal-main-content').addEventListener('click', stopPropagation)
}
const CloseModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
//     modal.removeEventListener("click", CloseModal)
//     modal.querySelector().removeEventListener('click', CloseModal)
//     modal.querySelector().removeEventListener('click', stopPropagation)
//     modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.getElementById('modification-projet').addEventListener('click', OpenModal)


function openAddPhotoModal(e) {
    const GalleryModalContent = document.getElementById('gallery-modal-content');
    GalleryModalContent.style.display = "none"
    let addPhotoModal = document.getElementById('add-photo-modal')
    addPhotoModal.style.display = 'block'
   
 }

const addPhotoModalBtn = document.getElementById("add-photo-modal-btn");
addPhotoModalBtn.addEventListener("click", () =>{openAddPhotoModal()});



