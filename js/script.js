
function loadData(event) {

    event.preventDefault();

    $('.bgimg').remove();

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    const street = $('#street').val();
    const city = $('#city').val();
    const wikyCity = city.replace(" ", "%20");

    function requestJson (url, header={}){
        return fetch(url, {
            headers: header
        }).then(response => response.json());
    }

    requestJson(`https://api.unsplash.com/search/photos/?query=${city}`,
    {'Authorization': 'Client-ID TYt3-4mzjJgzSYf2j7BV8SM3ScyHbulpkuBFhLaGxuY'})
    .then(unsplashHandler)
    .catch(e => errorHandler (e, "pic", $greeting))

    requestJson(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${city}&api-key=zM2a71pD2xeBLFePq6KcpuhGkfpY9eXG`)
    .then(nytHandler)
    .catch(e => errorHandler (e, "article", $nytElem))

    requestJson(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${wikyCity}&prop=info&inprop=url&format=json&origin=*`)
    .then(wikiHandler)
    .catch(e => errorHandler (e, "wiki",  $wikiElem));
    
    function errorHandler (errorThrown, itemString, domElement) {
        console.log(`There was an error loading the ${itemString}, error: ${errorThrown}`);
        domElement.text(`No ${itemString} found`);
    }
    

    function unsplashHandler (response) {
        if (response && response.results && response.results.length){
            const img = Math.round(Math.random()*(response.results.length-1));
            $body.append(`<img class="bgimg" src="${response.results[img].urls.regular}" alt="Selected adress and city">`)
        }else{
            console.log("unpls error working")
            throw Error("No pic found")
        }
    }

    function nytHandler (data) {
        if (data && data.response.docs && data.response.docs.length && city){
            data.response.docs.map (article =>
                    $nytElem.append(`<li class="article">
                                        <a href='${article.web_url}' target="_blank">${article.headline.main}</a>
                                        <p>${article.abstract}</p>                            
                                    </li>`)
            );
        }else{
            console.log("nyt error working")
            throw Error("No article found")
        }
    }

    function wikiHandler (data){
        if (data && data.query && Object.values(data.query.pages).length){
            for (element of Object.values(data.query.pages)){
                //console.log(element.fullurl)
                $wikiElem.append(`<li>
                                    <a href='${element.fullurl}' target="_blank">${element.title}</a>
                                </li>`)
            };
        }else{
            console.log("wiki error working")
            throw Error("No wiki found")
        };
    };


    return false;
};

$('#form-container').submit(loadData);