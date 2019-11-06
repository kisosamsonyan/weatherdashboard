
//need two ajax calls 
//1 for current weather and one for the 5 day forecast


$(document).ready(function(){
    $("#searchBtn").click(function(){
        var city = $("#searchInput").val();
        var key = "2f7f0622c159b6538e357020a773dfbf";
  

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather",
            dataType: 'json',
            type: 'GET',
            data: {q:city, appid: key, untis: "imperial"},
            
            success: function(data){
                console.log(data);

            }
        });
    });
});




