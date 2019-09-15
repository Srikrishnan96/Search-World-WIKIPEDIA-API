function ajaxCall() {
    $.ajax({ 
    url: `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=${$('.search-bar').val()}`,
    dataType: 'jsonp',
    type: 'GET',
    success: function(data) {
        var searchResults = '';
        data.query.search.forEach(function(obj) {
            searchResults += `<h4 class="search-result" style="color:#0066ff">${obj.title}</h4><br>${obj.snippet}<br><hr>`
        });
        $('.iframe-content').hide();
        $('.search-results').show();
        $('.search-results').html(searchResults);
        $('.search-result').on('click', resultClick);
        }
    });
}

function randomArticle() {
    $('.iframe-content').attr('src', `https://en.wikipedia.org/wiki/Special:Random`);
    $('.iframe-content').show();
    $('.search-results').hide();
}

function resultClick(e) {
    $('.iframe-content').attr('src', `https://en.wikipedia.org/wiki/${e.target.innerHTML}`);
    $('.iframe-content').show();
    $('.search-results').hide();
}

$(document).ready(function() {
    $('.search-bar').focus(function() {
        $('.search-bar').addClass('border-danger');
    });
    $('.search-bar').blur(function() {
        $('.search-bar').removeClass('border-danger');
    });
    $('.search-bar').focus();
    $('.search-bar').on('keyup', ajaxCall);
    $('.random-article').on('click', randomArticle);
});
