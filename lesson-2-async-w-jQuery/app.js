/* eslint-env jquery */

$(function () {
    const form = $('#search-form');
    const searchField = $('#search-keyword');
    let searchedForText;
    const responseContainer = $('#response-container');

    form.on('submit', function (e) {
        debugger;
        e.preventDefault();
        $(responseContainer).siblings().remove();
        $(responseContainer).html('');
        searchedForText = searchField.val();

        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            
            headers: {Authorization: 'Client-ID TYt3-4mzjJgzSYf2j7BV8SM3ScyHbulpkuBFhLaGxuY'}
        }).done(addImage)

        function addImage (image){
            debugger;
            const firstImage = image.results[0];

            if (image && image.results && image.results[0]) {
                htmlContent = `<figure>
                <img src=${firstImage.urls.regular} alt=${firstImage.description}>
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>`;
            } else {
                htmlContent = `<div class="error-no-image">No images available</div>`
            }

            $(htmlContent).insertBefore(responseContainer);
        }
        
        
        $.ajax({
            url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=zM2a71pD2xeBLFePq6KcpuhGkfpY9eXG`,
            
        }).done(addArticles)

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

            $(htmlContent).insertBefore(responseContainer);
        }



    });
});
