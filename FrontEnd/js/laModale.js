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
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.getElementById('modification-projet').addEventListener('click', OpenModal)


function openAddPhotoModal(e) {
    const galleryModalContent = document.getElementById('gallery-modal-content');
    galleryModalContent.style.display = "none"
    const addPhotoModal = document.getElementById('add-photo-modal');
    addPhotoModal.style.display = "block"
    // const selection = document.querySelector('selection');
    // selection.classList = "active"
    const goBack = document.getElementById('go-back')
    goBack.style.display = "block" 
}

const addPhotoModalBtn = document.getElementById('add-photo-modal-btn');
addPhotoModalBtn.addEventListener("click", () =>{openAddPhotoModal()});


function returnToGalleryModal(e) {
    const goBack = document.getElementById('go-back');
    goBack.style.display = "none"
    const addPhotoModal = document.getElementById('add-photo-modal');
    addPhotoModal.style.display = "none"
    const galleryModalContent = document.getElementById('gallery-modal-content');
    galleryModalContent.style.display = "block"
}

const goBack = document.getElementById('go-back');
goBack.addEventListener("click", () =>{returnToGalleryModal()});


