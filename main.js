//Développé par Benstitou Sofiane
//header

//Elements gauche
calendrier = document.getElementById('calendrier');

//Action gauche
setInterval(() => {
    calendrier.innerHTML = moment().format('DD/MM/YYYY');
}, 1000);

//Elements milieu
horloge = document.getElementById('horloge');

//Actions milieu

//horloge
setInterval(() => {
    horloge.innerHTML = moment().format('HH:mm:ss');
}, 1000);

//Elements droite
lecteur = document.getElementById('lecteur');

//Actions droite

//lecteur
audio = new Audio('peaceofmind.mp3');
lecteurState = 'pause';
lecteur.addEventListener('click', () => {
    if (lecteurState == 'pause'){
        lecteur.innerHTML = '⏸️';
        audio.play();
        lecteurState = 'lecture';
    } else {
        lecteur.innerHTML = '⏯️';
        audio.pause();
        lecteurState = 'pause';
    }
});




//---------------------------------------------------------

//Gestion du bureau
body = document.getElementById('body');
isLanceurExists = false;
shortcutState = "ajouter";


function addApp(desktop, appContainer){
    let app = document.createElement('div');
    app.setAttribute('class', 'app');

    appContainer.appendChild(app);

    app.addEventListener('click', (event) => {
        if (event.altKey){
            if (appContainer.childElementCount != 3){
                addApp(desktop, appContainer);
            } else {
                alert("Pas plus de 3 apps par appContainer !😤");
            }
        } else if (event.ctrlKey){
            if (desktop.childElementCount != 4){
                addAppContainer(desktop);
            } else {
                alert("Pas plus de 4 appContainer par desktop !😤");
            }
        }
    });

    app.addEventListener('dblclick', () => {
        if (shortcutState == "ajouter"){
            if (isLanceurExists == false){
                let footer = document.createElement('footer');
                footer.setAttribute('class', 'footer');
        
                let lanceur = document.createElement('input');
                lanceur.setAttribute('type','text');
                lanceur.setAttribute('class','lanceur');
                lanceur.setAttribute('placeholder','Choisissez une app');
        
                body.appendChild(footer);
                footer.appendChild(lanceur);
                isLanceurExists = true
                lanceur.focus();
        
                lanceur.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter'){
                        if (lanceur.value != ''){
                            let appContent = document.createElement('iframe');
                            appContent.setAttribute('class','iframe');
                            appContent.setAttribute('frameborder','0');
                            appContent.setAttribute('src',`https://benstitousofiane.github.io/${lanceur.value}/`);
            
                            app.appendChild(appContent);
            
                            footer.removeChild(lanceur);
                            body.removeChild(footer);
                            isLanceurExists = false;
                        } else {
                            footer.removeChild(lanceur);
                            body.removeChild(footer);
                            isLanceurExists = false;
                        }
                    }
                });
            }
        } else if (shortcutState == "supprimer"){
            if (desktop.childElementCount != 1){
                if (appContainer.childElementCount != 1){
                    appContainer.removeChild(app);
                } else {
                    desktop.removeChild(appContainer);
                }
            } else {
                if (appContainer.childElementCount != 1){
                    appContainer.removeChild(app);
                } else {
                    body.removeChild(desktop);
                }
            }
        }
    });
}

function addAppContainer(desktop){
    let appContainer = document.createElement('div');
    appContainer.setAttribute('class', 'appContainer');
    
    desktop.appendChild(appContainer);
    addApp(desktop, appContainer);
}


function addDesktop(){
    let desktop = document.createElement('div');
    desktop.setAttribute('class','desktop');

    body.appendChild(desktop);
    addAppContainer(desktop);
}

window.addEventListener('keydown', (event) => {
    if (event.altKey && event.key === 'n'){
        addDesktop();
    }
});

//mode ajouter
window.addEventListener('keydown', (event) => {
    if (event.altKey && event.key === 'a'){
        shortcutState = "ajouter";
    }
});

//mode supprimer
window.addEventListener('keydown', (event) => {
    if (event.altKey && event.key === 's'){
        shortcutState = "supprimer";
    }
});

//A faire : isLanceurExists, admettre s'il rien n'est dans le lanceur et supprésiond d'une app