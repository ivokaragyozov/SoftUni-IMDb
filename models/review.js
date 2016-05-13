var imdb = imdb || {};

(function (scope) {

    var id = 1;

    function Review(author, content, data) {
        this._id = id++;
        this.author = author;
        this.content = content;
        this.data = data;
    }

    scope.getReview = function (author, content, data) {
        return new Review(author, content, data);
    }

}(imdb));