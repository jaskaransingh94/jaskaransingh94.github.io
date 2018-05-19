/*{"Title":"The Avengers",
"Year":"2012",
"Rated":"PG-13",
"Released":"04 May 2012",
"Runtime":"143 min",
"Genre":"Action, Adventure, Sci-Fi",
"Director":"Joss Whedon",
"Writer":"Joss Whedon (screenplay), Zak Penn (story), Joss Whedon (story)",
"Actors":"Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth",
"Plot":"Nick Fury is the director of S.H.I.E.L.D., an international peace-keeping agency.The agency is a who's who of Marvel Super Heroes, with Iron Man, The Incredible Hulk, Thor, Captain America,Hawkeye and Black Widow. When global security is threatened by Loki and his cohorts, Nick Fury and his team will need all their powers to save the world from disaster.",
"Language":"English, Russian, Hindi",
"Country":"USA",
"Awards":"Nominated for 1 Oscar. Another 38 wins & 79 nominations.",
"Poster":"https://ia.media-imdb.com/images/M/MV5BMTk2NTI1MTU4N15BMl5BanBnXkFtZTcwODg0OTY0Nw@@._V1_SX300.jpg",
"Ratings":[{"Source":"Internet Movie Database","Value":"8.1/10"},
{"Source":"Rotten Tomatoes","Value":"92%"},
{"Source":"Metacritic","Value":"69/100"}],
"Metascore":"69",
"imdbRating":"8.1",
"imdbVotes":"1,100,592",
"imdbID":"tt0848228",
"Type":"movie",
"DVD":"25 Sep 2012",
"BoxOffice":"$623,279,547",
"Production":"Walt Disney Pictures",
"Website":"http://marvel.com/avengers_movie",/
"Response":"True"} use effect and progress bar*/
let value = false;
let text,year,dropdown;
let ratings ='';
$(document).ready(() => {
	value = true;

	$("#drop a").click(function(){
		dropdown = $(this).html();
		$(".abc:first-child").text(dropdown);
     //$(".abc:first-child").val(dropdown);
     if(dropdown === 'ID'){
     	$('#year').css({
     		display: 'none'
     	});
     }else{
     	$('#year').css({
     		display: 'flex'
     	});
     }

 });	

	$("#search").click(function(){

		if(dropdown === 'ID'){
			text = $('#txtSearch').val();
			if($.trim(text)!==''){
				$( "#main_div1" ).empty();
				$( "#main_div" ).empty();
				$( "#default" ).empty();
				setTimeout(getAllDetailsById(text), 1000);
			}
			else{
				$( "#year").addClass('text-danger')
				$( "#txtSearch").effect('shake', 400);

			}	
		}else if(dropdown === 'Title And Year'){
			text = $('#txtSearch').val();
			year = $('#year').val();
			if($.trim(text)!=='' && $.trim(year)!==''){
				$( "#main_div1" ).empty();
				$( "#main_div" ).empty();
				$( "#default" ).empty();
				setTimeout(getAllDetailsByTitleAndYear(text,year), 1000);
			}
			else{
				if($.trim(text)==''){
					$( "#txtSearch").effect('shake', 400);}
					else if($.trim(year)==''){
						$( "#year").effect('shake', 400);
					}
				}	
			}else{
			//$( ".abc").addClass('text-danger')	
			$( ".abc").effect('shake', 400);	
		}

	});


	if($('#txtSearch').val().length === 0 && value == true){
		setTimeout(getAllDetailsDefault, 1000);
	}
	

	$(function() {
		$("#year").datepicker({
			changeYear:true,
			changeMonth: false,
			showButtonPanel: true,
			yearRange: '1950:2018',
			dateFormat: 'yy',
			onClose: function(dateText, inst) { 
				var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
				$(this).datepicker('setDate', new Date(year, 0, 1));
			}});

	});

	$("#progressbar").progressbar({
		value: false
	});

	
});


let getAllDetailsDefault = () => {

	$.ajax({
		type: 'GET',
		dataType: 'json',
		async: true,
		url: 'https://www.omdbapi.com/?apikey=b8c7cc6d&s=avengers&type=movie',

		success: (response) => {

			for(x of response.Search){
				console.log(x) 
				let tempdiv =`<div class="card">    
				<img class="card-img-top" src="${x.Poster}" alt="Card image cap">
				<div class="card-body">
				<h5 class="card-title">${x.Title}</h5>
				<ul class="list-group list-group-flush">
				<li class="list-group-item">Year: ${x.Year}</li>
				<li class="list-group-item">Type: ${x.Type}</li>
				<li class="list-group-item">imdbID: ${x.imdbID}</li>
				</ul>
				</div>
				</div>`

				$("#main_div").append(tempdiv);

			}

		}, error: (err) => {

			console.log(err);
			let temp1 = `<div class="alert alert-danger"><strong>Error Due To: ${error.statusText}</div>`
			$("#main_div").append(temp1);

		},
		beforeSend: function(){
			$("#progressbar").progressbar();
			//setTimeout(3000)
		},
		complete: function(){
			$("#progressbar").progressbar().hide();
		},

		timeout:5000

	});

}

let getAllDetailsById = (id) => {

	$.ajax({
		type: 'GET',
		dataType: 'json',
		async: true,
		url: 'https://www.omdbapi.com/?apikey=b8c7cc6d&i='+id,

		success: (response) => {
			if(response.Response=='True'){
				for(x of response.Ratings){
					ratings += x.Source +' - '+ x.Value + ', '
				}
				let tempdiv =`<div class="card mb-3 img_small">
				<img class="card-img-top" src="${response.Poster}" alt="Image not found" onerror="this.onerror=null;this.src='noImage.jpg';">
				<div class="card-body">
				<h5 class="card-title">${response.Title}</h5>
				<p class="card-text">${response.Plot}</p>
				<ul class="list-group list-group-flush">
				<li class="list-group-item">Year: ${response.Year}</li>
				<li class="list-group-item">Rated: ${response.Rated}</li>
				<li class="list-group-item">Released: ${response.Released}</li>
				<li class="list-group-item">Runtime: ${response.Runtime}</li>
				<li class="list-group-item">Genre: ${response.Genre}</li>
				<li class="list-group-item">Director: ${response.Director}</li>
				<li class="list-group-item">Writer: ${response.Writer}</li>
				<li class="list-group-item">Actors: ${response.Actors}</li>
				<li class="list-group-item">Language: ${response.Language}</li>
				<li class="list-group-item">Country: ${response.Country}</li>
				<li class="list-group-item">Awards: ${response.Awards}</li>
				<li class="list-group-item">Ratings: ${ratings.substring(0, ratings.length-2)}</li>
				<li class="list-group-item">imdbRating: ${response.imdbRating}</li>
				<li class="list-group-item">imdbVotes: ${response.imdbVotes}</li>
				<li class="list-group-item">imdbID: ${response.imdbID}</li>
				<li class="list-group-item">Type: ${response.Type}</li>
				<li class="list-group-item">BoxOffice: ${response.BoxOffice}</li>
				<li class="list-group-item">Production: ${response.Production}</li>
				<li class="list-group-item">Website: ${response.Website}</li>
				</ul>
				</div>
				</div>`

				$("#main_div1").append(tempdiv);
			}else {
				let temp1 = `<div class="alert alert-danger"><strong>No Movie Found with Id: ${text}</div>`
				$("#main_div1").append(temp1);
			}

			
		}, error: function (error) {
			console.log(error);
			let temp1 = `<div class="alert alert-danger"><strong>Error Due To: ${error.statusText}</div>`
			$("#main_div1").append(temp1);

		},beforeSend: function(){
			$("#progressbar").progressbar();
		},
		complete: function(){
			$("#progressbar").progressbar().hide();
		},

		timeout:5000


	});

}

let getAllDetailsByTitleAndYear = (text,year) => {

	$.ajax({
		type: 'GET',
		dataType: 'json',
		async: true,
		url: 'https://www.omdbapi.com/?apikey=b8c7cc6d&t='+text+'&y='+year,

		success: (response) => {
			if(response.Response=='True'){
				console.log(response)
				for(x of response.Ratings){
					ratings += x.Source +' - '+ x.Value + ', '
				}
				let tempdiv =`<div class="card mb-3 img_small">
				<img class="card-img-top" src="${response.Poster}" alt="Image not found" onerror="this.onerror=null;this.src='noImage.jpg';">
				<div class="card-body">
				<h5 class="card-title">${response.Title}</h5>
				<p class="card-text">${response.Plot}</p>
				<ul class="list-group list-group-flush">
				<li class="list-group-item">Year: ${response.Year}</li>
				<li class="list-group-item">Rated: ${response.Rated}</li>
				<li class="list-group-item">Released: ${response.Released}</li>
				<li class="list-group-item">Runtime: ${response.Runtime}</li>
				<li class="list-group-item">Genre: ${response.Genre}</li>
				<li class="list-group-item">Director: ${response.Director}</li>
				<li class="list-group-item">Writer: ${response.Writer}</li>
				<li class="list-group-item">Actors: ${response.Actors}</li>
				<li class="list-group-item">Language: ${response.Language}</li>
				<li class="list-group-item">Country: ${response.Country}</li>
				<li class="list-group-item">Awards: ${response.Awards}</li>
				<li class="list-group-item">Ratings: ${ratings.substring(0, ratings.length-2)}</li>
				<li class="list-group-item">imdbRating: ${response.imdbRating}</li>
				<li class="list-group-item">imdbVotes: ${response.imdbVotes}</li>
				<li class="list-group-item">imdbID: ${response.imdbID}</li>
				<li class="list-group-item">Type: ${response.Type}</li>
				<li class="list-group-item">BoxOffice: ${response.BoxOffice}</li>
				<li class="list-group-item">Production: ${response.Production}</li>
				<li class="list-group-item">Website: ${response.Website}</li>
				</ul>
				</div>
				</div>`

				$("#main_div1").append(tempdiv);

			}else {
				let temp1 = `<div class="alert alert-danger"><strong>No Movie Found with Name: ${text}</div>`
				$("#main_div1").append(temp1);
			}

			
		}, error: function (error) {
			console.log(error);
			let temp1 = `<div class="alert alert-danger"><strong>Error Due To: ${error.statusText}</div>`
			$("#main_div1").append(temp1);

		},beforeSend: function(){
			$("#progressbar").progressbar();
		},
		complete: function(){
			$("#progressbar").progressbar().hide();
		},

		timeout:5000

	});

}

