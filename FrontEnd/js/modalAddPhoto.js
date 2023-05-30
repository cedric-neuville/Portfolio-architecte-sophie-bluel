import { postNewWork } from "./index.js";

const GalleryModalContent = document.getElementById("gallery-modal-content");
const AddPhotoModal = document.getElementById("add-photo-modal");
const TitleOfProject = document.getElementById("title-of-project");
const CategoryOfProject = document.getElementById("category-of-project");

// Prévisualisation des photos téléchargées
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

// Annulation du télechargement de la photo si deja fait
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

// Ajouter les catégories dans le formulaire
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

//   Retour sur la galerie de la modale
  export function returnToGalleryModal() {
    const projectTitle = document.getElementById("project-title");
    projectTitle.value = "";
    modalViewAddPhoto.classList.remove("active");
    modalViewGallery.classList.add("active");
  }

// Envoie du formulaire pour un nouveau work
export async function createNewWork() {
    const formData = new FormData();
    formData.append("title", projectTitle.value);
    formData.append("image", addPhotoBtn.files[0]);
    formData.append("category", projectCategory.value);
    //Envoie de la requete
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
  