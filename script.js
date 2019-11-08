
  //Displaying Current Date
               
  const date = document.getElementById("date");

  const now = moment();
  const humanReadable = now.format('MMMM Do YYYY');
  date.textContent = humanReadable;

  function updateTime() {

  const now = moment();
  const humanReadable = now.format('MMMM Do YYYY');
  date.textContent = humanReadable;

  }
  setInterval(updateTime, 1000);
  updateTime();

//need multiple ajax calls 
//one for current weather one for the 5 day forecast and one for uv index api

$(document).ready(function(){
    $("#searchBtn").click(function(){
        var city = $("#searchInput").val();
        var key = "2f7f0622c159b6538e357020a773dfbf";
  

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather",
            dataType: 'json',
            type: 'GET',
            data: {q:city, appid: key},
            
            success: function(data){
                console.log(data);
                // Converting temp units from kelvin to F
                var tempUnit = data.main.temp;
                var tempImperial = (tempUnit - 273.15) * 9/5 + 32;
                tempImperial = Math.floor(tempImperial);
                
                //Displaying City Name
                var cityName = data.name;
                var cityHeader = $("#cityHeader");
                $(cityHeader).append(cityName);

                //Displaying the Img Icon
                //!!!!!!!!!!!!!!console showing the link but not displaying the actual image on page!!!!!!!!!!!!!
                var img = data.weather["0"].icon;
                console.log(img)
                var iconImg = $("#iconImage");
                iconImg= 'http://openweathermap.org/img/wn/' + img + '@2x.png';
                console.log(iconImg)

                //Displaying Temperature of Current City
                var temp = $("#temperature")
                $(temp).append("Temperature: " + tempImperial + " " + "°F");

                //Displaying Humidity
                var humid = "Humidity: " + data.main.humidity + "%";
                var humidity = $("#humidity");
                $(humidity).append(humid);

                //Displaying Wind Speed
                var wind = "Wind: " + data.wind.speed + " " + "mph";
                var windSpeed = $("#windSpeed");
                $(windSpeed).append(wind);
                

                
            }
            

        });


        //Api Call for Opencage Api converting long/lat to city name 
        
        // var cageKey= "127a5350d909486082e7e2f2c2610141";
        // $.ajax ({
        //     url: "https://https://api.opencagedata.com/geocode/v1/json",
        //     dataType: 'json',
        //     type: 'GET',
        //     data: {q: city, appid: cageKey },

        //     success: function(data){
        //         console.log(data)
        //     }

        // });


        // !!!!!!!!!!!!!!!!! UV Index API 404 !!!!!!!!!!!!!!!!!!!//
        //Ajax call for UV Index
        // $.ajax ({
        // url: "https://api.openweathermap.org/data/2.5/uvi?lat&lon",
        // dataType: 'json',
        // type: 'GET',
        // data: {appid: key},
        
        // success: function(data){
        //     console.log(data);

        // }
        
        // });


        
        //Ajax call for 5 day forecast
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast",
            dataType: 'json',
            type: 'GET',
            data: {q:city, appid: key},
            
            success: function(data){
                console.log(data);
        

                //Day 1
                var temp1 = $("#temp1");
                var day1Temp = data.list["0", "1", "2", "3", "4", "5", "6"].dt_txt;
                $(temp1).append(day1Temp);


            }
            

        });

    });
});
