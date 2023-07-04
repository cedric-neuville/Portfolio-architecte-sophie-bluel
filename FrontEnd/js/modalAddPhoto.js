// const projectTitle = document.getElementById('project-title');
// const categoryOfProject = document.getElementById('category-of-project');
// const projectSubmit = document.getElementById('project-submit');


// function createOptionsByCategories(listOfCategories) {
//     try {
//       categoryOfProject.innerHTML = "";
//       const nullOption = document.createElement('option');
//       nullOption.value = "";
//       categoryOfProject.appendChild(nullOption);
//       listOfCategories.map((category) => {
//         const option = document.createElement('option');
//         option.value = category.id;
//         option.innerText = category.name;
//         categoryOfProject.appendChild(option);
//       });
//     } catch (err) {
//       window.alert(
//         "Problême de connection : impossible de récupérer les catégories."
//       );
//     }
//   }
import {categories} from "./index.js";

let imgOk = false;
let titleOk = false;
let catOk = false;

function createOptionsByCategories(cat) {
  let select = document.getElementById('category')
  cat.map((category) => {
    const option = document.createElement('option');
    option.value = category.id;
    option.text = category.name;
    select.appendChild(option);
  });
}

createOptionsByCategories(categories)


//   async function postNewWork (data) {
//     const token = sessionStorage.getItem("token");
//     const options = {
//       method: "POST",
//       headers: {
//         accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: data, 
//     };
//     return await fetch("http://localhost:5678/api/works", options);
  
//   }

    // try {
    //   const postedWork = await postNewWork(formData);
    //   console.log("Requête POST envoyé. Réponse du serveur : ", postedWork);
    //   addPhotoBtn.value = "";
    //   titleOfProject.value = "";
    //   categoryOfProject.value = "";
    // } catch (err) {
    //   window.alert(
    //     "Problême de connection : impossible de poster un nouveau projet."
    //   );
    // }

  //   async function createNewWork() {
  //       const formData = new FormData();
  //       formData.append("title", projectTitle.value);
  //       formData.append("image", addPhotoBtn.files[0]);
  //       formData.append("category", categoryOfProject.value);
  // }

  function togglePreview() {
    document.querySelector('.preview').classList.toggle('hidden')
    document.querySelector('.selection').classList.toggle('hidden')
  }

  let inputImage = document.getElementById('image')
  inputImage.addEventListener('change', () => {
    const file = inputImage.files[0];
    const maxSize = 4 *1024*1024;
    const authorizedType = /(jpg|jpeg|png)$/; 
    if ( file.size > maxSize) {
        console.log('taille non valide')
        return false
    }
    if (!authorizedType.test(file.type)) {
        console.log('type non valide')
        return false
    }
    let imgPreview = document.getElementById('img-preview')
    imgPreview.src = URL.createObjectURL(file)
    imgPreview.onload = () => {
        URL.revokeObjectURL(imgPreview.src)
        togglePreview()
    };
  imgOk = true
  checkEntries()
  })

  function checkEntries() {
    if (imgOk && titleOk && catOk) {
      document.getElementById('project-submit').disabled = false
    }else {
      document.getElementById('project-submit').disabled = true
    }
  }
