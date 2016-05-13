var imdb = imdb || {};

(function (scope) {
	function loadHtml(selector, data) {
		var container = document.querySelector(selector),
			moviesContainer = document.getElementById('movies'),
			detailsContainer = document.getElementById('details'),
			genresUl = loadGenres(data);

		container.appendChild(genresUl);

		genresUl.addEventListener('click', function (ev) {
			if (ev.target.tagName === 'LI') {
				var genreId,
					genre,
					moviesHtml;

				genreId = parseInt(ev.target.getAttribute('data-id'));
				genre = data.filter(function (genre) {
					return genre._id === genreId;
				})[0];

				moviesHtml = loadMovies(genre.getMovies());
				moviesContainer.innerHTML = moviesHtml.outerHTML;
				moviesContainer.setAttribute('data-genre-id', genreId);
			}
		});

		moviesContainer.addEventListener('click', function (ev) {
            if(ev.target.tagName == 'LI' || ev.target.parentNode.tagName == 'LI') {
                var movieId,
                    genreId,
                    genre,
                    movies = [],
                    movie,
                    reviews = [],
                    actors = [],
                    actorsHtml,
                    reviewsHtml;

                movieId = parseInt(ev.target.getAttribute('data-id') || ev.target.parentNode.getAttribute('data-id'));
                genreId = parseInt(ev.target.parentNode.parentNode.getAttribute('data-genre-id') || ev.target.parentNode.parentNode.parentNode.getAttribute('data-genre-id'));

                genre = data.filter(function (genre) {
                    return genre._id === genreId;
                })[0];

                movies = genre.getMovies();

                movie = movies.filter(function (movie) {
                    return movie._id === movieId;
                })[0];

                actors = movie.getActors();
                reviews = movie.getReviews();

                actorsHtml = loadActors(actors);
                detailsContainer.innerHTML = '<h3>Actors</h3>';
                detailsContainer.innerHTML += actorsHtml.outerHTML;

                reviewsHtml = loadReviews(reviews, movieId, genreId);
                detailsContainer.innerHTML += '<h3>Reviews</h3>';
                detailsContainer.innerHTML += reviewsHtml.outerHTML;
            }
        });

        detailsContainer.addEventListener('click', function (ev) {
            if(ev.target.tagName == 'BUTTON') {
                var reviewId,
                    movieId,
                    genreId,
                    genre,
                    movies = [],
                    movie,
                    reviewLi;

                reviewId = parseInt(ev.target.parentNode.getAttribute('data-review-id'));
                movieId = parseInt(ev.target.parentNode.getAttribute('data-movie-id'));
                genreId = parseInt(ev.target.parentNode.getAttribute('data-genre-id'));

                genre = data.filter(function (genre) {
                    return genre._id === genreId;
                })[0];

                movies = genre.getMovies();

                movie = movies.filter(function (movie) {
                    return movie._id === movieId;
                })[0];

                movie.deleteReviewById(reviewId);

                reviewLi = ev.target.parentNode;
                reviewLi.parentNode.removeChild(reviewLi);
            }
        });
	}

	function loadGenres(genres) {
		var genresUl = document.createElement('ul');
		genresUl.setAttribute('class', 'nav navbar-nav');
		genres.forEach(function (genre) {
			var liGenre = document.createElement('li');
			liGenre.innerHTML = genre.name;
			liGenre.setAttribute('data-id', genre._id);
			genresUl.appendChild(liGenre);
		});

		return genresUl;
	}

	function loadMovies(movies) {
		var moviesUl = document.createElement('ul');
		movies.forEach(function (movie) {
			var liMovie = document.createElement('li');
			liMovie.setAttribute('data-id', movie._id);

			liMovie.innerHTML = '<h3>' + movie.title + '</h3>';
			liMovie.innerHTML += '<div>Country: ' + movie.country + '</div>';
			liMovie.innerHTML += '<div>Time: ' + movie.length + '</div>';
			liMovie.innerHTML += '<div>Rating: ' + movie.rating + '</div>';
			liMovie.innerHTML += '<div>Actors: ' + movie._actors.length + '</div>';
			liMovie.innerHTML += '<div>Reviews: ' + movie._reviews.length + '</div>';
			
			moviesUl.appendChild(liMovie);
		});

		return moviesUl;
	}

    function loadActors(actors) {
        var actorsUl = document.createElement('ul');
        actors.forEach(function (actor) {
            var liActor = document.createElement('li');

            liActor.innerHTML = '<h4>' + actor.name + '</h4>';
            liActor.innerHTML += '<div><b>Bio: </b>' + actor.bio + '</div>';
            liActor.innerHTML += '<div><b>Born: </b>' + actor.born + '</div>';


            actorsUl.appendChild(liActor);
        });

        return actorsUl;
    }

    function loadReviews(reviews, movieId, genreId) {
        var reviewsUl = document.createElement('ul');
        reviews.forEach(function (review) {
            var liReview =  document.createElement('li');

            liReview.innerHTML = '<h4>' + review.author + '</h4>';
            liReview.innerHTML += '<div><b>Content: </b>' + review.content + '</div>';
            liReview.innerHTML += '<div><b>Date: </b>' + review.data + '</div>';
            liReview.innerHTML += '<button>Delete review</button>';

            liReview.setAttribute('data-review-id', review._id);
            liReview.setAttribute('data-movie-id', movieId);
            liReview.setAttribute('data-genre-id', genreId);

            reviewsUl.appendChild(liReview);
        });

        return reviewsUl;
    }

	scope.loadHtml = loadHtml;
}(imdb));