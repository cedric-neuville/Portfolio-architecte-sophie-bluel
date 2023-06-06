import { postNewWork } from "./index.js";

const GalleryModalContent = document.getElementById("gallery-modal-content");
const AddPhotoModal = document.getElementById("add-photo-modal");
const TitleOfProject = document.getElementById("title-of-project");
const CategoryOfProject = document.getElementById("category-of-project");
const addPhotoBtn = document.getElementById("addPhotoBtn");
addPhotoBtn.addEventListener("change", previewPhoto);

const goBack = document.getElementById("goBack");
goBack.addEventListener("click", () => {
  cancelUploadedPhoto();
  returnToGalleryModal();
});

export function previewPhoto() {
    const photo = addPhotoBtn.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.classList.add("uploaded-photo");
      addPhoto.appendChild(img);
    };
    reader.readAsDataURL(photo);
    addPhotoIcon.style.display = "none";
    addPhotoBtn.style.display = "none";
    addPhotoInstructions.style.display = "none";
  }

export function cancelUploadedPhoto() {
    if (document.querySelector(".uploaded-photo")) {
      document.querySelector(".uploaded-photo").remove();
      const addPhotoIcon = document.getElementById("addPhotoIcon");
      addPhotoIcon.style.display = "inline";
      const addPhotoBtn = document.getElementById("addPhotoBtn");
      addPhotoBtn.style.display = "inline";
      const AddPhotoDescription = document.getElementById("add-photo-description");
      AddPhotoDescription.style.display = "block";
    }
}


export async function createOptionsByCategories(listOfCategories) {
    try {
      projectCategory.innerHTML = "";
      const nullOption = document.createElement("option");
      nullOption.value = "";
      projectCategory.appendChild(nullOption);
      listOfCategories.map((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.innerText = category.name;
        projectCategory.appendChild(option);
      });
    } catch (err) {
      window.alert(
        "Problême de connection : impossible de récupérer les catégories."
      );
    }
  }

  export function returnToGalleryModal() {
    const projectTitle = document.getElementById("project-title");
    projectTitle.value = "";
    modalViewAddPhoto.classList.remove("active");
    modalViewGallery.classList.add("active");
  }


export async function createNewWork() {
    const formData = new FormData();
    formData.append("title", projectTitle.value);
    formData.append("image", addPhotoBtn.files[0]);
    formData.append("category", projectCategory.value);

    try {
      const postedWork = await postNewWork(formData);
      console.log("Requête POST envoyé. Réponse du serveur : ", postedWork);
      addPhotoBtn.value = "";
      projectTitle.value = "";
      projectCategory.value = "";
    } catch (err) {
      window.alert(
        "Problême de connection : impossible de poster un nouveau projet."
      );
    }
  }
  