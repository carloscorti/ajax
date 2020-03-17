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
    var pT = document.createElement('planet-thumb');
    for (var d in data) {
      pT[d] = data[d];
    }
    //debugger;
    home.appendChild(pT);
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
    return get(url).then(function(response) {
      return response.json();
    });
  }

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');
    /*
    Your code goes here!
     */


    

    //let secuence = Promise.resolve();

    getJSON('../data/earth-like-results.json')
      .then(response => 
          //{response.results.forEach( url => {secuence.then(url=> getJSON(url) ) }) })
          {//debugger;
            return Promise.all (response.results.map(url => getJSON(url)))  })

      .then(planets => {
          /*let secuence = Promise.resolve();

          //debugger;

          planets.forEach( (planet, index )=>
          
          {debugger;

          secuence = secuence.then(() => {
            index === 2  ? setTimeout(() => createPlanetThumb(planet), 2000) : createPlanetThumb(planet)}
            //createPlanetThumb(planet)}
            )}
          )*/
        
        /*function* genera(items, callback){
          debugger;
          for (let i=0; i<items.length; i++){
            yield execTumb(items[i], callback);
          }
        };*/
        function* genera(items){
          debugger;
          
          for (let i=0; i<items.length; i++){
            //debugger;
            //yield execTumb(items[i]);
            it = yield items[it||0];
          }
          //let i = 0;
          
        };
        
        /*function execTumb (planet, callback) {
          debugger;
          createPlanetThumb(planet);
          callback();
          //iterator.next();
        }*/
        function execTumb (planet) {
          //debugger;
          createPlanetThumb(planet);
          //iterator.next();
        };
        
        //debugger;
        /*const iterator =  genera(planets, () => {
          debugger;
          iterator.next();
          debugger;});*/
        const iterator =  genera(planets);
        for (let it=0; it<planets.length; it++){
          //debugger;
          //iterator.next();
          //if (it === 4){
            debugger;
            (it === 1) ? setTimeout(()=>iterator.next(it), (Math.random()*2000)+4000) : iterator.next(it)
            //(it === 2) ? setTimeout(()=>iterator.next(), (Math.random()*2000)+4000) : iterator.next()
            //setTimeout(()=>iterator.next(), Math.random()*20000)
          //}else{
            //debugger;
            //iterator.next()
          //} 
        }
          //(index % 2===0) ? setTimeout(iterator.next(), 5000) : iterator.next()});

      })
      .catch (e => `There was an error: ${e}`)
      ////debugger;
  });
})(document);
