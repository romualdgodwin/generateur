/*document.getElementById('avatar').addEventListener('change', function () {
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
  });*/







  function printCV() {
    // Masquer la section du formulaire avant l'impression
    const formSection = document.getElementById('cv-form');
    formSection.classList.add('hidden-for-print');
  
    // Utiliser window.print() pour ouvrir la boîte de dialogue d'impression
    window.print();
  
    // Retirer la classe pour rétablir l'affichage normal
    formSection.classList.remove('hidden-for-print');
  }
  
  function getValue(selector, context = document) {
    const element = context.querySelector(selector);
    return element ? element.value : '';
  }
  
  function isValidName(value) {
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;
    return nameRegex.test(value);
  }
  
  function isValidPhoneNumber(value) {
    const phoneRegex = /^[+\d]+$/;
    return phoneRegex.test(value);
  }
  
  function isValidEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }
  
  function addExperience() {
    const experienceSection = document.getElementById('work-experience-section');
    const clonedExperience = experienceSection.cloneNode(true);
    clonedExperience.classList.add('generated-experience');
  
    const inputs = clonedExperience.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.value = '';
        input.classList.add('experience-field');
    });
  
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
    clonedSection.classList.add('generated-formation');
  
    const inputs = clonedSection.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.value = '';
        input.classList.add('formation-field');
    });
  
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Supprimer cette formation';
    deleteButton.onclick = function () {
        this.parentElement.remove();
    };
    clonedSection.appendChild(deleteButton);
  
    educationSection.parentNode.insertBefore(clonedSection, educationSection.nextSibling);
  }
  
  function generateCommonCVContent(selectedModel) {
    console.log('Début de la génération du CV');
  
    const name = getValue('input[name="name"]');
    const prenom = getValue('input[name="prenom"]');
    const address = getValue('input[name="address"]');
    const phone = getValue('input[name="phone"]');
    const email = getValue('input[name="email"]');
    const skills = getValue('input[name="skills"]');
  
    if (!isValidName(name) || !isValidName(prenom)) {
        alert('Veuillez entrer un prénom et un nom valides.');
        return;
    }
  
    if (!isValidPhoneNumber(phone)) {
        alert('Veuillez entrer un numéro de téléphone valide (chiffres uniquement et éventuellement avec un + au début).');
        return;
    }
  
    if (!isValidEmail(email)) {
        alert('Veuillez entrer une adresse e-mail valide.');
        return;
    }
  
    const company = getValue('input[name="company"]');
    const jobTitle = getValue('input[name="job-title"]');
    const startDate = getValue('input[name="start-date"]');
    const endDate = getValue('input[name="end-date"]');
    const jobDescription = getValue('textarea[name="job-description"]');
  
    const generatedExperiences = document.querySelectorAll('.generated-experience');
    const experiencesContent = Array.from(generatedExperiences).map(experience => {
        const jobTitle = experience.querySelector('input[name="job-title"]').value;
        const startDate = experience.querySelector('input[name="start-date"]').value;
        const endDate = experience.querySelector('input[name="end-date"]').value;
        const jobDescription = experience.querySelector('textarea[name="job-description"]').value;
        const company = experience.querySelector('input[name="company"]').value;
  
        return `
            <p>
                <strong>${startDate} <i class="fas fa-long-arrow-alt-right"></i> ${endDate}</strong>
                <br>
                ${jobTitle} chez <em><strong>${company}</strong></em>
            </p>
            <ul class="experience-list">
                <li>${jobDescription}</li>
            </ul>
        `;
    }).join('\n');
  
    console.log('Experience Information:');
    console.log('Company:', company);
    console.log('Job Title:', jobTitle);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Job Description:', jobDescription);
  
    const school = getValue('input[name="school"]');
    const degree = getValue('input[name="degree"]');
    const studyStartYear = getValue('input[name="study-start-year"]');
    const studyEndYear = getValue('input[name="study-end-year"]');
    const fieldOfStudy = getValue('input[name="field-of-study"]');
  
    console.log('Formation Information:');
    console.log('School:', school);
    console.log('Degree:', degree);
    console.log('Study Start Year:', studyStartYear);
    console.log('Study End Year:', studyEndYear);
    console.log('Field of Study:', fieldOfStudy);
  
    const generatedFormations = document.querySelectorAll('.generated-formation');
    const formationsContent = Array.from(generatedFormations).map(formation => {
        const school = formation.querySelector('input[name="school"]').value;
        const degree = formation.querySelector('input[name="degree"]').value;
        const studyStartYear = formation.querySelector('input[name="study-start-year"]').value;
        const studyEndYear = formation.querySelector('input[name="study-end-year"]').value;
  
        return `
            <p>
                <strong>${studyStartYear} <i class="fas fa-long-arrow-alt-right"></i> ${studyEndYear}</strong>
                <br>
                <em>${degree}</em>, ${school}
            </p>
        `;
    }).join('\n');
  
    const languageName = getValue('input[name="language-name"]');
    const languageLevel = getValue('select[name="language-level"]');
    const interests = getValue('input[name="interests"]');
  
    if (!name || !prenom || !address || !phone || !email || !skills || !company || !jobTitle || !startDate || !endDate || !jobDescription || !school || !degree || !studyStartYear || !studyEndYear || !fieldOfStudy || !languageName || !languageLevel || !interests) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }
  
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
            <br>
            <li><i class="icon fas fa-phone text-blue"></i>${phone}</li>
            <br>
            <li><i class="icon fas fa-map-marker-alt text-blue"></i>${address}</li>
        </ul>
        </div>
  
       
        <div class="content">
        <div class="section" id="work-experience-section">
            
                <h3> Experience professionnelles</span></h3>
                <p>
                    <strong>${startDate} <i class="fas fa-long-arrow-alt-right"></i> ${endDate}</strong>
                    <br>
                    ${jobTitle} chez <em><strong>${company}</strong></em>
                </p>
                <ul class="experience-list">
                    <li>${jobDescription}</li>
                </ul>
                ${experiencesContent}
            </div>
  
            <div class="section">      
            </div>
  
  
  
            <div class="section" id="education-section">
                <h3>Etudes & formations</span></h3>
                <p>
                    <strong>${studyStartYear} <i class="fas fa-long-arrow-alt-right"></i> ${studyEndYear}</strong>
                    <br>
                    <em>${degree}</em>, ${school}
                </p>
                ${formationsContent}
            </div>
        </div>
        </div>
      
    </div>
    </body>
    `;
  
    console.log('CV généré');
    return cvContent;
  }
  
  function generateCVModel1() {
    const model1Content = generateCommonCVContent('model1');
    return model1Content;
  }
  
  function generateCVModel2() {
    const model2Content = generateCommonCVContent('model2');
    return model2Content;
  }
  
  function generateCVModel3() {
    const model3Content = generateCommonCVContent('model3');
    // Ajoutez des éléments spécifiques au modèle 3 ici (si nécessaire)
    return model3Content;
  }
  
  function generateCV() {
    const selectedModel = document.getElementById('cv-model').value;
    let cvContent = '';
  
    switch (selectedModel) {
        case 'model1':
            cvContent = generateCVModel1();
            break;
        case 'model2':
            cvContent = generateCVModel2();
            break;
        case 'model3':
            cvContent = generateCVModel3();
            break;
        default:
            console.error('Modèle de CV non reconnu');
            return;
    }
  
    console.log(cvContent);
  
    const cvContainer = document.getElementById('generated-cv-container');
    if (cvContainer) {
        cvContainer.innerHTML = cvContent;
        cvContainer.className = `cv-container ${selectedModel}`;
    } else {
        console.error('Erreur: conteneur du CV non trouvé');
    }
  
    window.scrollTo(0, 0);
  }
  