'use strict'
/* eslint-env ,ode, es6*/ 

function numbers() {
    fetch('http://localhost:6300/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Indique que le corps de la requête est du JSON
        },
        body: JSON.stringify({value: 4 }) // Corps de la requête sous forme JSON
      })
        .then((response) => response.json()) // On attend une réponse au format JSON
        .then(data => {
          console.log('Réponse du serveur:', parseInt(data.receivedData));
          document.write(parseInt(data.receivedData))
        })
}

