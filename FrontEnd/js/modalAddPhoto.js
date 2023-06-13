// import { postNewWork } from "./index.js";

// const galleryModalContent = document.getElementById('gallery-modal-content');
// const addPhotoModal = document.getElementById('add-photo-modal');
// const projectTitle = document.getElementById('project-title');
// const categoryOfProject = document.getElementById('category-of-project');
// const addPhotoBtn = document.getElementById('add-photo-btn');
// addPhotoBtn.addEventListener('change', previewPhoto);

// const goBack = document.getElementById('go-back');
// goBack.addEventListener('click', () => {
//   cancelUploadedPhoto();
//   returnToGalleryModal();
// });

// function previewPhoto() {
//     const photo = addPhotoBtn.files[0];
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const img = new Image();
//       img.src = e.target.result;
//       img.classList.add();
//       addPhoto.appendChild(img);
//     };
//     reader.readAsDataURL(photo);
//     addPhotoIcon.style.display = "none";
//     addPhotoBtn.style.display = "none";
//     addPhotoDescription.style.display = "none";
//   }

// function cancelUploadedPhoto() {
//     if (document.querySelector()) {
//       document.querySelector().remove();
//       const addPhotoIcon = document.getElementById('add-photo-icon');
//       addPhotoIcon.style.display = "inline";
//       const addPhotoBtn = document.getElementById('add-photo-btn');
//       addPhotoBtn.style.display = "inline";
//       const AddPhotoDescription = document.getElementById('add-photo-description');
//       AddPhotoDescription.style.display = "block";
//     }
// }
// function createOptionsByCategories(listOfCategories) {
//     try {
//       projectCategory.innerHTML = "";
//       const nullOption = document.createElement('option');
//       nullOption.value = "";
//       projectCategory.appendChild(nullOption);
//       listOfCategories.map((category) => {
//         const option = document.createElement('option');
//         option.value = category.id;
//         option.innerText = category.name;
//         projectCategory.appendChild(option);
//       });
//     } catch (err) {
//       window.alert(
//         "Problême de connection : impossible de récupérer les catégories."
//       );
//     }
//   }
// function returnToGalleryModal() {
//    const goBack= document.getElementById('go-back');
//    projectTitle.value = "";
//    galleryModal.classList.remove("active");
//   }

//  async function createNewWork() {
//     const formData = new FormData();
//     formData.append("title", projectTitle.value);
//     formData.append("image", addPhotoBtn.files[0]);
//     formData.append("category", projectCategory.value);

//     try {
//       const postedWork = await postNewWork(formData);
//       console.log("Requête POST envoyé. Réponse du serveur : ", postedWork);
//       addPhotoBtn.value = "";
//       projectTitle.value = "";
//       projectCategory.value = "";
//     } catch (err) {
//       window.alert(
//         "Problême de connection : impossible de poster un nouveau projet."
//       );
//     }
//   }
  