import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import { useKey } from '../hooks/useKey';
import { KEY } from '../App';

export function MovieDetails({
	selectedId,
	onCloseMovie,
	onAddWatched,
	watched,
}) {
	const [movie, setMovie] = useState({});
	const [userRating, setUserRating] = useState('');

	const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
	const watchedUserRating = watched.find(
		(movie) => movie.imdbID === selectedId
	)?.userRating;

	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	function handleAdd() {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(' ').at(0)),
			userRating,
		};

		onAddWatched(newWatchedMovie);
		onCloseMovie();
	}

	useKey('Escape', onCloseMovie);

	useEffect(
		function () {
			async function getMovieDetails() {
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
				);
				const data = await res.json();
				setMovie(data);
			}
			getMovieDetails();
		},
		[selectedId]
	);

	useEffect(
		function () {
			if (!title) return;
			document.title = `Movie | ${title}`;

			return function () {
				document.title = 'movieSaver';
			};
		},
		[title]
	);

	return (
		<div className="details">
			<header>
				<button className="btn-back" onClick={onCloseMovie}>
					&larr;
				</button>
				<img src={poster} />
				<div className="details-overview">
					<h2>{title}</h2>
					<p>
						{released} &bull; {runtime}
					</p>
					<p>{genre}</p>
					<p>
						<span>⭐</span>
						{imdbRating} IMDB rating
					</p>
				</div>
			</header>
			<section>
				<div className="rating">
					{!isWatched ? (
						<>
							<StarRating
								maxRating={10}
								size={24}
								onSetRating={setUserRating}
							/>

							{userRating > 0 && (
								<button className="btn-add" onClick={handleAdd}>
									+ Add to list
								</button>
							)}
						</>
					) : (
						<p>
							You rated this movie {watchedUserRating}
							<span>⭐</span>
						</p>
					)}
				</div>

				<p>
					<em>{plot}</em>
				</p>
				<p>Starring {actors}</p>
				<p>Directed by {director}</p>
			</section>
		</div>
	);
}
