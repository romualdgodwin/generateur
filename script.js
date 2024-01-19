document.getElementById('avatar').addEventListener('change', function () {
    var preview = document.getElementById('avatar-preview'); // Récupère l'élément HTML avec l'ID 'avatar'
    var file = this.files[0]; // Initialise un objet FileReader
    var reader = new FileReader();

    reader.onloadend = function () { // Définit une fonction à exécuter une fois la lecture du fichier terminée
      preview.src = reader.result; // Met à jour la source de l'élément img avec l'aperçu du fichier lu
    }

    if (file) { //Vérifie si un fichier a été sélectionné
      reader.readAsDataURL(file); // Démarre la lecture du contenu du fichier sous forme d'URL data
    } else {
      preview.src = "";  // Réinitialise l'aperçu si aucun fichier n'est sélectionné
    }
  });




function printCV() {
    // Masquer la section du formulaire avant l'impression
    const formSection = document.getElementById('cv-form');
    formSection.classList.add('hidden-for-print');

    // Utiliser window.print() pour ouvrir la boîte de dialogue d'impression
    window.print();

    // Retirer la classe pour rétablir l'affichage normal
    formSection.classList.remove('hidden-for-print');
}

function getValue(selector, context = document) {// Définit une fonction nommée getValue prenant deux paramètres : selector et context (par défaut égal à document).
    const element = context.querySelector(selector);  // Sélectionne un élément dans le contexte donné en utilisant le sélecteur spécifié.
    return element ? element.value : '';  // Retourne la valeur de l'élément s'il existe, sinon retourne une chaîne vide.
}


function isValidName(value) {
    // Utiliser une expression régulière pour vérifier si le nom/prénom contient seulement des lettres, espaces et tirets
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/; // Accepte les lettres, espaces et tirets
    return nameRegex.test(value);
}

function isValidPhoneNumber(value) {
    // Utiliser une expression régulière pour vérifier si le numéro de téléphone contient uniquement des chiffres et peut commencer par un "+"
    const phoneRegex = /^[+\d]+$/;  // ^ début de la chaine, $ fin d'une chaine, /d signifie 0 à 9
    return phoneRegex.test(value);
}

function isValidEmail(value) {
    // Utiliser une expression régulière pour vérifier si la valeur ressemble à une adresse e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value); // 
}


function addExperience() {
    const experienceSection = document.getElementById('work-experience-section');
    const clonedExperience = experienceSection.cloneNode(true); //experienceSection est le nœud DOM que je souhaite cloner.
    //.cloneNode(true) crée une copie (clone) de experienceSection ainsi que de tous ses éléments enfants, récursivement.
    
    // Réinitialisez les champs de la nouvelle expérience
    const inputs = clonedExperience.querySelectorAll('input, textarea'); // Sélectionne tous les champs de saisie et zones de texte dans l'expérience clonée.
inputs.forEach(input => (input.value = '')); // Parcourt chaque élément de la liste et affecte une chaîne vide à sa valeur.


    // Ajoutez le bouton de suppression
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Supprimer cette expérience';
    deleteButton.onclick = function () {
        this.parentElement.remove();
    };
    clonedExperience.appendChild(deleteButton);

    experienceSection.parentNode.insertBefore(clonedExperience, experienceSection.nextSibling);
}

function addFormation() {
    const educationSection = document.getElementById('education-section');
    const clonedSection = educationSection.cloneNode(true);
    
    // Réinitialisez les champs de la nouvelle formation
    const inputs = clonedSection.querySelectorAll('input, textarea');
    inputs.forEach(input => (input.value = ''));

    // Ajoutez le bouton de suppression
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Supprimer cette formation';
    deleteButton.onclick = function () {
        this.parentElement.remove();
    };
    clonedSection.appendChild(deleteButton);

    // Ajoutez la nouvelle section de formation après la section de formation existante
    educationSection.parentNode.insertBefore(clonedSection, educationSection.nextSibling);
}

/*function generateCV() {
    console.log('Début de la génération du CV');

    const selectedModel = document.getElementById('cv-model').value;

    // Sélectionnez la fonction en fonction du modèle choisi
    switch (selectedModel) {
        case 'model1':
            generateCVModel1();
            break;
        case 'model2':
            generateCVModel2();
            break;
        case 'model3':
            generateCVModel3();
            break;
        default:
            console.log('Modèle non reconnu');
    }
}*/


/*function generateCVModel2() {
    const cvContent = 

    displayGeneratedCV(cvContent);
}*/

 


/*function generateCVModel3() {
    const cvContent = `
   
    displayGeneratedCV(cvContent);*/


function generateCV() {
    console.log('Début de la génération du CV');

    // Récupérer les informations du formulaire
    const name = getValue('input[name="name"]');
    const prenom = getValue('input[name="prenom"]');
    const address = getValue('input[name="address"]');
    const phone = getValue('input[name="phone"]');
    const email = getValue('input[name="email"]');
    const skills = getValue('input[name="skills"]');


    // Vérifier si les champs de nom et prénom sont valides
    if (!isValidName(name) || !isValidName(prenom)) {   // avec un point d'exclamation c'est true et sans c'est faux
        alert('Veuillez entrer un prénom et un nom valides.');
        return; // Arrêter la génération du CV si les noms ne sont pas valides
    }

    // Vérifier si le numéro de téléphone est valide
    if (!isValidPhoneNumber(phone)) {
        alert('Veuillez entrer un numéro de téléphone valide (chiffres uniquement et éventuellement avec un + au début).');
        return; // Arrêter la génération du CV si le numéro de téléphone n'est pas valide
    }

    // Vérifier si l'adresse e-mail est valide
    if (!isValidEmail(email)) {
        alert('Veuillez entrer une adresse e-mail valide.');
        return; // Arrêter la génération du CV si l'adresse e-mail n'est pas valide
    }

    // Récupérer les informations de l'expérience de travail
    const company = getValue('input[name="company"]');
    const jobTitle = getValue('input[name="job-title"]');
    const startDate = getValue('input[name="start-date"]');
    const endDate = getValue('input[name="end-date"]');
    const jobDescription = getValue('textarea[name="job-description"]');

    // Récupérer les informations de la formation
    const school = getValue('input[name="school"]');
    const degree = getValue('input[name="degree"]');
    const studyStartYear = getValue('input[name="study-start-year"]');
    const studyEndYear = getValue('input[name="study-end-year"]');
    const fieldOfStudy = getValue('input[name="field-of-study"]');

    // Récupérer les informations de la langue
    const languageName = getValue('input[name="language-name"]');
    const languageLevel = getValue('select[name="language-level"]');

    // Récupérer les informations des centres d'intérêt
    const interests = getValue('input[name="interests"]');

    // Vérifier si tous les champs obligatoires sont remplis
    if (!name || !prenom || !address || !phone || !email || !skills || !company || !jobTitle || !startDate || !endDate || !jobDescription || !school || !degree || !studyStartYear || !studyEndYear || !fieldOfStudy || !languageName || !languageLevel || !interests) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return; // Arrêter la génération du CV si des champs sont manquants
    }

    // Utilisez ces informations pour générer le CV
    const cvContent = `
    <head>
    <title>Curriculum vitae</title>
    <meta charset="utf-8">
    <meta name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,400&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <head>
        <title>Curriculum vitae</title>
        <meta charset="utf-8">
        <meta name="viewport"
                content="width=device-width, initial-scale=1, user-scalable=no">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,400&display=swap" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
      </head>
    <body>  
    <div class="cv-container">
    <div class="left-column">
    <img id="cv-avatar" class="portrait" src="https://www.codeur.com/tuto/wp-content/uploads/2022/01/MG_0110-4-293x300.jpg" />

      <div class="section">
        <p>

        </p>
      </div>
      <div class="section">

      </div>



      
      <div class="section">
                <h2>COMPÉTENCES</h2>
                <ul class="skills">
                  <li><i class="icon fas fa-check-circle text-darkblue"></i> <strong>${skills}</strong></li>
                </ul>
              </div>




              <div class="section">
              <h2>Langues</h2>
              <p>
                  <strong>${languageName}</strong> - Niveau : ${languageLevel}
              </p>
          </div>



            <div class="section">
               <h2>Centres d'intérêt</h2>
            <p>${interests}</p>
            </div>
          </div>

    

    <div class="right-column">
        <div class="header">
            <h1>${name} <span class="text-blue text-uppercase">${prenom} <span></h1>
            <p>Full Stack Developper</p>
            <ul class="infos">
            <li><i class="icon fas fa-at text-blue"></i>${email}</li>
            <li><i class="icon fas fa-phone text-blue"></i>${phone}</li>
            <li><i class="icon fas fa-map-marker-alt text-blue"></i>${address}</li>
        </ul>
        </div>

       
        <div class="content">
        <div class="section">
            
                <h2>Expériences <br><span class="text-blue">professionnelles</span></h2>
                <p>
                    <strong>${startDate} <i class="fas fa-long-arrow-alt-right"></i> ${endDate}</strong>
                    <br>
                    ${jobTitle} chez <em><strong>${company}</strong></em>
                </p>
                <ul class="experience-list">
                    <li>${jobDescription}</li>
                </ul>
            </div>

            <div class="section">      
            </div>



            <div class="section">
                <h2>Études <br><span class="text-blue">& formations</span></h2>
                <p>
                    <strong>${studyStartYear} <i class="fas fa-long-arrow-alt-right"></i> ${studyEndYear}</strong>
                    <br>
                    <em>${degree}</em>, ${school}
                </p>
            </div>
        </div>
        </div>
      
    </div>
    </body>
    `;

    console.log('CV généré');

    // Affichez le CV généré (vous pouvez également l'envoyer vers un autre emplacement, par exemple, une fenêtre modale)
    const cvContainer = document.getElementById('generated-cv-container');
    if (cvContainer) {
        cvContainer.innerHTML = cvContent;
        console.log('CV affiché');
    } else {
        console.log('Erreur: conteneur du CV non trouvé');
    }
}
