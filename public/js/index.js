
var data;
var result;

$('ul a.nav-link').on('click', function(e) {
    $('.arrow-down').removeClass('active-arrow');
    $(this).next('.arrow-down').addClass('active-arrow');
  })

$.ajax({
    type: "GET",  
    url: "../assets/data.csv",
    dataType: "text",       
    success: function(response)  
    {
		data = $.csv.toArrays(response);
		generateHtmlTable(data);		
	}   
});

$(document).ready(function() {
    var http = new XMLHttpRequest();
    var url = '/data';
    http.open('GET', url, true);
    
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            //alert(http.responseText);
			result=JSON.parse(http.responseText);
			
        }
    }
    console.log("query returning");
    http.send()   ;  
});

function generateHtmlTable(data) {
    var html = '<div class="row"><table  class="table table-condensed table-hover table-striped">';
 
      if(typeof(data[0]) === 'undefined') {
        return null;
      } else {
		$.each(data, function( index, row ) {
		  //bind header
		  if(index == 0) {
			html += '<thead>';
			html += '<tr>';
			$.each(row, function( index, colData ) {
				html += '<th>';
				html += colData;
				html += '</th>';
			});
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';
		  } else {
			html += '<tr>';
			$.each(row, function( index, colData ) {
				html += '<td>';
				html += colData;
				html += '</td>';
			});
			html += '</tr>';
		  }
		});
		html += '</tbody>';
		html += '</table></div>';
		document.getElementById("universities").innerHTML = html
		$('#csv-display').append(html);
	  }
	}	

/* 
* Search box
*/

$('.search-box').change(function(e){
	var uni = $(this).children("option:selected").val();
	for(i=0;i<result.length;i++)
		if (result[i]['Institute'] == uni)
			break;
	var rank = result[i]['Ranking']
	$('.univeristy-name').html('#'+rank+' ' +uni);
	var icr = result[i]['NLIQ']
	$('.icr').html('ICR '+icr);	
	var nliq = result[i]['ICR']
	$('.nliq').html('NLIQ '+nliq);

});
