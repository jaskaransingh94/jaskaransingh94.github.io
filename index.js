let value = false;
let text,year,dropdown;
let ratings ='';
$(document).ready(() => {
	value = true;

//for radio button value fetch and remove now trending
$("#drop").click(function(){
		//dropdown = $(this).html();
		dropdown = $("#drop input[type='radio']:checked").val();
		//$(".abc:first-child").text(dropdown);
		if(dropdown === 'ID' || dropdown === 'Title'){
			$('#year').css({
				display: 'none'
			});
		}else{
			$('#year').css({
				display: 'flex'
			});
		}

	});	

// search operation
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
			$( "#txtSearch").effect('shake', 400);

		}	
	}else if(dropdown === 'Title'){
		text = $('#txtSearch').val();
		if($.trim(text)!==''){
			$( "#main_div1" ).empty();
			$( "#main_div" ).empty();
			$( "#default" ).empty();
			setTimeout(getAllDetailsByTitle(text), 1000);
		}
		else{
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

// new screen show now trending
if($('#txtSearch').val().length === 0 && value == true){
	setTimeout(getAllDetailsDefault, 1000);
}

// datepricker for year
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
// initialize progress bar
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
				let tempdiv =`<div class="card">    
				<img class="card-img-top" src="${x.Poster}" alt="Image not found" onerror="this.onerror=null;this.src='noImage.jpg';">
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

			let temp1 = `<div class="alert alert-danger"><strong>Error Due To: ${err.statusText}</div>`
			$("#main_div1").append(temp1);

		},
		beforeSend: function(){
			$("#progressbar").progressbar();
			//setTimeout(3000)
		},
		complete: function(){
			$("#progressbar").progressbar().hide();
		},

		timeout:10000

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
			let temp1 = `<div class="alert alert-danger"><strong>Error Due To: ${error.statusText}</div>`
			$("#main_div1").append(temp1);

		},beforeSend: function(){
			$("#progressbar").progressbar();
		},
		complete: function(){
			$("#progressbar").progressbar().hide();
		},

		timeout:10000


	});

}

let getAllDetailsByTitle = (text) => {

	$.ajax({
		type: 'GET',
		dataType: 'json',
		async: true,
		url: 'https://www.omdbapi.com/?apikey=b8c7cc6d&s='+text,

		success: (response) => {
			if(response.Response=='True'){
				for(x of response.Search){
					let tempdiv =`<div class="card">    
					<img class="card-img-top" src="${x.Poster}" alt="Card image cap" alt="Image not found" onerror="this.onerror=null;this.src='noImage.jpg';">
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
			}else {
				let temp1 = `<div class="alert alert-danger"><strong>No Movie Found with Name: ${text}</div>`
				$("#main_div1").append(temp1);
			}

		}, error: (err) => {

			let temp1 = `<div class="alert alert-danger"><strong>Error Due To: ${err.statusText}</div>`
			$("#main_div1").append(temp1);

		},
		beforeSend: function(){
			$("#progressbar").progressbar();
			//setTimeout(3000)
		},
		complete: function(){
			$("#progressbar").progressbar().hide();
		},

		timeout:10000

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
			let temp1 = `<div class="alert alert-danger"><strong>Error Due To: ${error.statusText}</div>`
			$("#main_div1").append(temp1);

		},beforeSend: function(){
			$("#progressbar").progressbar();
		},
		complete: function(){
			$("#progressbar").progressbar().hide();
		},

		timeout:10000

	});

}

