(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        const unsplashRequest = new XMLHttpRequest();
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID TYt3-4mzjJgzSYf2j7BV8SM3ScyHbulpkuBFhLaGxuY');
        unsplashRequest.send();

        function addImage() {
            const figure = document.querySelector('div.site-container figure');
            const error = document.querySelector('.error-no-image');
            if (figure) {
                const pather = document.querySelector('body > div.site-container');
                pather.removeChild(figure);
            }
            if (error) {
                const pather = document.querySelector('body > div.site-container');
                pather.removeChild(error);
            }
            let htmlContent = "";
            const data = JSON.parse(this.responseText);
            const firstImage = data.results[0];
            if (data && data.results && data.results[0]) {
                htmlContent = `<figure>
                <img src=${firstImage.urls.regular} alt=${firstImage.description}>
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>`;
            } else {
                htmlContent = `<div class="error-no-image">No images available</div>`
            }

            responseContainer.insertAdjacentHTML('beforebegin', htmlContent);
        }

        const nytRequest = new XMLHttpRequest();
        nytRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=zM2a71pD2xeBLFePq6KcpuhGkfpY9eXG`);
        nytRequest.onload = addArticles;
        nytRequest.send();

        function addArticles() {
            let htmlContent = "";
            const data = JSON.parse(this.responseText);
            if (data && data.response.docs && data.response.docs[0]) {
                htmlContent += "<ul>"
                htmlContent += data.response.docs.map (article => 
                    `<li class="article">
                        <h2><a href='${article.web_url}'>${article.headline.main}</a></h2>
                        <p>${article.snippet}</p>
                    </li>`)
                htmlContent += "</ul>"

            } else {
                htmlContent = `<div class="error-no-articles">No articles available</div>`;
            }

            responseContainer.insertAdjacentHTML('beforeend', htmlContent);

        };

    });
})();
