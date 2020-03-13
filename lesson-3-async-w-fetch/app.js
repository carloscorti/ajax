(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        fetch(
            `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            {
           headers: {Authorization: 'Client-ID TYt3-4mzjJgzSYf2j7BV8SM3ScyHbulpkuBFhLaGxuY'}
            }
        ).then(response => response.json())
        .then(addImage)
        .catch(e => requestError(e, 'image'))

        fetch(
            `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=zM2a71pD2xeBLFePq6KcpuhGkfpY9eXG`,
        ).then(response => response.json())
        .then(addArticles)
        .catch(e => requestError(e, 'article'))

        
        function addImage (image){
            const firstImage = image.results[0];

            if (image && image.results && image.results[0]) {
                htmlContent = `<figure>
                <img src=${firstImage.urls.regular} alt=${firstImage.description}>
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>`;
            } else {
                htmlContent = `<div class="error-no-image">Unfortunately, no image was returned for your search :(</div>`
            }

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }


        function addArticles(articles) {
            let htmlContent = "";
            if (articles && articles.response.docs && articles.response.docs[0]) {
                htmlContent += "<ul>";
                htmlContent += articles.response.docs.map (article => 
                    `<li class="article">
                        <h2><a href='${article.web_url}'>${article.headline.main}</a></h2>
                        <p>${article.snippet}</p>
                    </li>`).join('');
                htmlContent += "</ul>";
            }else{
                htmlContent = `<div class="error-no-articles">No articles available</div>`;
            }

            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }

        //error handling for both fetch
        function requestError(e, part) {
            console.log(`El error es ${e}`);
            responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
        }

    });
})();
