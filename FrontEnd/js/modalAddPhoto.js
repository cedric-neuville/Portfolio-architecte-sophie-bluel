
import {categories} from "./index.js";
import {works, displayWorks} from "./index.js";
 import {majModalgallery} from "./modalGallery.js"
let imgOk = false;
let titleOk = false;
let catOk = false;
// fonction pour faire apparaître les différentes catégories 
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


// fonction qui remplace le preview par l'image si celle ci est valide
  function togglePreview() {
    document.querySelector('.preview').classList.toggle('hidden')
    document.querySelector('.selection').classList.toggle('hidden')
  }
// fonction pour vérifier la validité de l'image (taille et type du fichier)
  let imageUrl = document.getElementById('image')
  imageUrl.addEventListener('change', () => {
    const file = imageUrl.files[0];
    const maxSize = 4 *1024*1024;
    const authorizedType = /(jpg|jpeg|png)$/; 
    if ( file.size > maxSize) {
        document.getElementById('error-img').textContent = 'taille non valide'
        imgOk = false
        checkEntries()
        return false
    }
    if (!authorizedType.test(file.type)) {
        document.getElementById('error-img').textContent = 'type de fichier non valide'
        imgOk = false
        checkEntries()
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
// fonction qui change la couleur du bouton "valider" et qui enlèves les messages d'erreurs
  function checkEntries() {
    if (imgOk && titleOk && catOk) {
      document.getElementById('project-submit').disabled = false
     
      document.getElementById('error-form').textContent = ''
     
    }else {
      document.getElementById('project-submit').disabled = true
      document.getElementById('error-form').textContent = 'Impossible de poster un nouveau projet'
     
    }
  }
// fonction pour verifier si le titre est valide
let title = document.getElementById('title')
  title.addEventListener('change', function() {
    
    if(this.value.length < 3 || this.value.length > 50) {
      document.getElementById('error-title').textContent = 'taille du texte non valide'
      titleOk = false
    }else {
      document.getElementById('error-title').textContent = ''
      titleOk = true
    }
    checkEntries()
  });
  
  let categoryId = document.getElementById('category')
  categoryId.addEventListener('change', function() {
    if(this.value) {
      document.getElementById('error-category').textContent = ''
      catOk = true 
    }else {
      catOk = false
      document.getElementById('error-category').textContent = 'aucune catégorie selectionnée'
     
    }
    checkEntries()
  })



// fonction qui va ajouter le nouveau work sur la page index et aux niveaux des vignettes
let form = document.getElementById('add-work-form')
form.addEventListener('submit', function(e) {
  e.preventDefault()
  let formData = new FormData(this)
  const token = sessionStorage.getItem("token");
  const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: formData, 
      };
     fetch("http://localhost:5678/api/works", options)
      .then(res => res.json())
      .then(work => {
        works.push(work);
        displayWorks(works);
        majModalgallery(works);
      })
  
});