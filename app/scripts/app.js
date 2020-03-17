/*
Challenge:

Use what you've learned about Promises to request thumbnails in parallel but create them in the
proper order even if all the requests haven't finished.
 */

// Inline configuration for jshint below. Prevents `gulp jshint` from failing with quiz starter code.
/* jshint unused: false */

(function(document) {
  'use strict';

  var home = null;

  /**
   * Helper function to show the search query.
   * @param {String} query - The search query.
   */
  function addSearchHeader(query) {
    home.innerHTML = '<h2 class="page-title">query: ' + query + '</h2>';
  }

  /**
   * Helper function to create a planet thumbnail.
   * @param  {Object} data - The raw data describing the planet.
   */
  function createPlanetThumb(data) {
    /*var pT = document.createElement('planet-thumb');
    for (var d in data) {
      pT[d] = data[d];
    }
    
    home.appendChild(pT);
    console.log('rendered: ' + data.pl_name);*/

    return new Promise(function(resolve) {
      var pT = document.createElement('planet-thumb');
      for (var d in data) {
        pT[d] = data[d];
      }
      home.appendChild(pT);
      console.log('rendered: ' + data.pl_name);
      resolve();
    });
  }

  /**
   * XHR wrapped in a promise
   * @param  {String} url - The URL to fetch.
   * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
   */
  function get(url) {
    return fetch(url);
  }

  /**
   * Performs an XHR for a JSON and returns a parsed JSON response.
   * @param  {String} url - The JSON URL to fetch.
   * @return {Promise}    - A promise that passes the parsed JSON response.
   */
  function getJSON(url) {
    /*return get(url).then(function(response) {
      return response.json();
    });*/
    console.log('sent: ' + url);
    return get(url).then(function(response) {
      // For testing purposes, I'm making sure that the urls don't return in order
      if (url === 'data/planets/Kepler-62f.json') {
        return new Promise(function(resolve) {
          setTimeout(function() {
            console.log('received: ' + url);
            resolve(response.json());
          }, 2000);
        });
      } else {
        console.log('received: ' + url);
        return response.json();
      }
    });
  }

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');
    /*
    Your code goes here!
     */


    

    

    getJSON('../data/earth-like-results.json')
      
      //solucion con promises concatenadas (o array de promises), (solo con este .then)
      //(por Cameron Pittman @cwpittman udacity)
      .then(response => {
        let secuence = Promise.resolve(); 
        const promiseArray = response.results.map(url => getJSON(url));
        promiseArray.forEach (request => secuence = secuence.then(()=>request.then(createPlanetThumb)))
      
      })

      /*
      .then(response => Promise.all (response.results.map(url => getJSON(url)))  )


      
      .then(planets => {
        
 
        //solucion con promises concatenadas (o array de promises), (solo con este .then)
        let secuence = Promise.resolve();
        //planets.forEach( (planet) => secuence = secuence.then(() => createPlanetThumb(planet)  )  )
        planets.forEach( (planet) => createPlanetThumb(planet)  )  

        
        /*
        //solucion con generator
        function* genera(items){
          for (let i=0; i<items.length; i++){
            createPlanetThumb(items[yield]);
          }         
        };

        const iterator =  genera(planets);
        iterator.next();
        for (let it=0; it<planets.length; it++){
          iterator.next(it);
          //de esta manera puedo alterar el orden de aparicion como se necesite, en este caso seria el 1° elemento
          //(it === 0) ? setTimeout(()=>iterator.next(it), 0 : iterator.next(it)
        }
        
      }) */
      .catch (e => `There was an error: ${e}`)
  });
})(document);
