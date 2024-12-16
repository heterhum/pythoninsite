'use strict'
/* eslint-env ,ode, es6*/ 


// Importe le paquet express
const express = require('express')

const { spawn } = require('node:child_process');

// Créé une application express
const app = express()

// Démarrer le serveur et écouter un port donné
const PORT = 6300

// Importer la logique de la page d'accueil
const genererPageAccueil = require('./pages/index-get.js')

function runPythonScript(scriptPath, args, callback) {
    const pythonProcess = spawn('python', [scriptPath].concat(args));
 
    let data = '';
    pythonProcess.stdout.on('data', (chunk) => {
        data += chunk.toString(); // Collect data from Python script
    });
 
    pythonProcess.stderr.on('data', (error) => {
        console.error(`stderr: ${error}`);
    });
 
    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.log(`Python script exited with code ${code}`);
            callback(`Error: Script exited with code ${code}`, null);
        } else {
            console.log('Python script executed successfully',data);
            callback(null, data);
        }
    });
}

// Ecoute la méthode GET et la route '/'
app.get('/', async(req, res) => {
    // Récupérer le contenu de la page HTML
    const indexHtml = await genererPageAccueil()
    

  // Envoyer le résultat
  res.send(indexHtml)
})

// Retourne les images
// Retourne les styles
app.use('/styles',express.static('C:/Users/xoxar/Desktop/perso/code/site/pythonsite/public/styles'))
app.use('/img',express.static('C:/Users/xoxar/Desktop/perso/code/site/pythonsite/public/img'))

app.use(express.json())
app.post('/submit', async (req, res) => {
    const data = await req.body; // Les données envoyées par le client via fetch()
    console.log('Données reçues:', parseInt(data["value"])); // Affiche les données dans le serveur

    runPythonScript('C:/Users/xoxar/Desktop/perso/code/site/pythonsite/server/calcul.py', [parseInt(data["value"])], (err, result) => {
        if (err) {
            console.log(err); }
        else {
            res.json({
                message: 'Données reçues et traitées avec succès',
                receivedData: result
            });
        }
    })
  });

app.listen(PORT, () => {
  // Fonction éxecutée lorsque l'application a démarré
  console.log(`Serveur démarré : http://localhost:${PORT}`)
})