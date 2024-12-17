'use strict'
/* eslint-env ,ode, es6*/ 

const { readFile } = require('fs')
const { promisify } = require('util')

// Convertie la fonction en Promise plutôt qu'en callback
// pour pouvoir utiliser async/await
const readFileAsync = promisify(readFile)

const READ_OPTIONS = { encoding: 'UTF-8' }
const INDEX_URL = '../public/main.html'

module.exports = async() => {
  // Récupérer le contenu du fichier HTML
  const contenu = await readFileAsync(INDEX_URL, READ_OPTIONS)

  // Retourner la page HTML
  return contenu
}