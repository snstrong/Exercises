/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async so it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
	// Makes an ajax request to the searchShows api.

	let $show = $(await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`));
	let showArr = $show[0].data;
	return showArr.map(function(show) {
		return {
			id      : show.show.id,
			name    : show.show.name,
			summary : show.show.summary,
			image   : show.show.image.medium
		};
	});
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
	const $showsList = $('#shows-list');
	$showsList.empty();

	for (let show of shows) {
		let $item = $(
			`<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}" data-show-name="${show.name}">
           <div class="card-body">
           <img class="card-img-top" src="${show.image}" alt="Image from ${show.name}">  
           <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button class="btn btn-info">Get Episodes</button>
           </div>
         </div>
       </div>
      `
		);

		$showsList.append($item);
	}
}



/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$('#search-form').on('submit', async function handleSearch(evt) {
	evt.preventDefault();

	let query = $('#search-query').val();
	if (!query) return;

	$('#episodes-area').hide();

	let shows = await searchShows(query);

  populateShows(shows);
  
});

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */
async function getEpisodes(id) {
	// returns array of episode info
	let $episodes = $(await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`));
  return ($episodes[0].data.map(function(episode) {
    return {
      id : episode.id,
      season : episode.season,
      number : episode.number,
      name : episode.name,
      summary : episode.summary
    }
  }))
}

async function populateEpisodes(episodes) {
  console.log(episodes);
  const $episodesList = $('#episodes-list');
  $episodesList.empty();
	for (let episode of episodes) {
    console.log(episode);
    let $item = $(`
      <li class="list-group-item" data-episode-id="${episode.id}">
        <h3 class="h3">${episode.name}</h3>
        <p class="lead">Season ${episode.season}, Episode ${episode.number}</p>
        <p>${episode.summary}</p>
      </li>`
    )
    $episodesList.append($item);
	}
}


$('#shows-list').on('click', async function(evt) {
  
  evt.preventDefault();
  
  let evtTgt = event.target;
  
  if (evtTgt.classList.contains('btn')) {
    $('#shows-list').hide();
    $('#search-query').val("");
    $("#episodes-area").show();
    let showData = evtTgt.parentElement.parentElement.dataset;
    console.log(showData.showName);
    $('#episodes-area').prepend(`<h1 class="h1">${showData.showName}</h1>`);
    let $episodeArr = $(await getEpisodes(showData.showId));
    console.log($episodeArr);
    populateEpisodes($episodeArr);
  }
});
