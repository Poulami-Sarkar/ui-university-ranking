
var data;
var result;
var toggle='2D';
var range='1>rho>0';
var table_body='';

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
	var table='';
	var icr = result[i]['NLIQ']
	var nliq = result[i]['ICR']
	table += '<tr><td>ICR<td/><td>'+icr+'<td/></tr>';
	table += '<tr><td>NLIQ<td/><td>'+nliq+'<td/></tr>';
	$('.uni-data').html(table);
	
	// Get specific university data
	table_body='';
	for( key in result[i]){
		table_body+='<tr><th scope="row">'+key+'</th>';
		table_body+='<td>'+result[i][key]+'</td></tr>';
	}
	$('.complete-uni-data').html(table_body);
	console.log(table_body);
});


/*
* Change the graph
*/

$("a").click(function(){
	// Change src attribute of image
	$('#collapseContent div h4').html('Pyswarm learning curve');
	range = $(this).attr('href')
	var tab_id =range + ' img';

	if(range == '#d21')
		range = '1>rho>0';
	else if(range == '#d22')
		range = '0.1>rho>0.001';
	else if(range == '#d23')
		range = '0.99>rho>0.9';	
	else if(range == '#d24')
		range = '0.9>rho>0.101';
	else if(range == '#d25')
		range = 'rho>1';
	
	var uni = $('.search-box').children("option:selected").val();
	$(tab_id).attr('src','../assets/viz/'+toggle+'/'+range+'/cost_'+toggle+'_'+uni+'.png');
	console.log(tab_id);
	console.log('../assets/viz/'+toggle+'/'+range+'/cost_'+toggle+'_'+uni);
	//$(this).attr("src", "./public/assets/cost_history/cost.png");
});


$('.toggle-slider').change(function(){
	status= $(this).prop("checked"); 
	if(status == "false")
		toggle = '2D';
	else
		toggle ='3D';
	console.log(toggle);
	var uni = $('.search-box').children("option:selected").val();
	$(range + ' img').attr('src','../assets/viz/'+toggle+'/'+range+'/cost_'+toggle+'_'+uni+'.png');
	console.log('../assets/viz/'+toggle+'/'+range+'/cost_'+toggle+'_'+uni+'.png')
})

function get_uni_dat(uni){

}