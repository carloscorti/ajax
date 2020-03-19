
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

    console.log(street, city, wikyCity);

    $.ajax ({
        url: `https://api.unsplash.com/search/photos/?query=${city}`,
        headers: 
        {
            Authorization: 'Client-ID TYt3-4mzjJgzSYf2j7BV8SM3ScyHbulpkuBFhLaGxuY'
        }, 
        dataType: "json"
    }).done(unsplashHandler)
    .fail(e => errorHandler (e, "pic", $greeting));

    $.ajax ({
        url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${city}&api-key=zM2a71pD2xeBLFePq6KcpuhGkfpY9eXG`,
         
        dataType: "json"
    }).done(nytHandler)
    .fail(e => errorHandler (e, "article", $nytElem));

    $.ajax ({
        url: `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${wikyCity}&prop=info&inprop=url&format=json&origin=*`,
        
        dataType: "json",

    }).done(wikiHandler)
    .fail(e => errorHandler (e, "wiki charge",  $wikiElem));
    
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
            return Error("No pic found")
        }
    }

    function nytHandler (data) {
        if (data && data.response.docs && data.response.docs.length && city){
            console.log(data, data.response.docs, data.response.docs.length);
            data.response.docs.map (article =>
                    $nytElem.append(`<li class="article">
                                        <a href='${article.web_url}' target="_blank">${article.headline.main}</a>
                                        <p>${article.abstract}</p>                            
                                    </li>`)
            );
        }else{
            console.log("nyt error working")
            return Error("No article found")
        }
    }

    function wikiHandler (data){
        if (data && data.query && Object.values(data.query.pages).length){
            console.log(data, data.query.pages, Object.values(data.query.pages).length);
            for (element of Object.values(data.query.pages)){
                //console.log(element.fullurl)
                $wikiElem.append(`<li>
                                    <a href='${element.fullurl}' target="_blank">${element.title}</a>
                                </li>`)
            };
        }else{
            console.log("wiki error working")
            return Error("No wiki found")
        };
        //Object.values(data.query.pages).forEach(element => console.log(element.fullurl)
    };


        /*
        const img = Math.round(Math.random()*(response.results.length-1));
        $body.append(`<img class="bgimg" src="${response.results[img].urls.regular}" alt="Selected adress and city">`)
        */
    



    // load streetview

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

// loadData();
