var imdb = imdb || {};

(function (scope) {

    var id = 1;

    function Theatre(title, length, rating, country) {
        this._id = id++;
        this.title = title;
        this.length = length;
        this.rating = rating;
        this.country = country;
        this.isPuppet =  false;
        this._actors = [];
        this._reviews = [];
    }

    Theatre.prototype.addActor = function (actor) {
        this._actors.push(actor);
    };
    Theatre.prototype.getActors = function () {
        return this._actors;
    };
    Theatre.prototype.addReview = function (review) {
        this._reviews.push(review);
    };
    Theatre.prototype.deleteReview = function (review) {
        this._reviews = this._reviews.filter(function (currentReview) {
            return currentReview !== review;
        })
    };
    Theatre.prototype.deleteReviewById = function (id) {
        this._reviews = this._reviews.filter(function (currentReview) {
            return currentReview._id == id;
        })
    };
    Theatre.prototype.getReviews = function () {
        return this._reviews;
    };

    scope.getTheatre = function (title, length, rating, country) {
        return new Theatre(title, length, rating, country);
    }

}(imdb));