
  //Displaying Current Date with moment.js
               
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
        $("#cityHistory").append("<li>"+city+"</li>");
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
                $(cityHeader).html(cityName);

                //Displaying the Img Icon
                getIcon(data.weather[0].icon); 
                var icon = getIcon(data.weather[0].icon); 
                $("#iconImage").attr("src", icon);

                //Icon Linking
                function getIcon(icon){
                    var link = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
                    return link

                }

                //Displaying Temperature of Current City
                var temp = $("#temperature")
                $(temp).html("Temperature: " + tempImperial + " " + "°F");

                //Displaying Humidity
                var humid = "Humidity: " + data.main.humidity + "%";
                var humidity = $("#humidity");
                $(humidity).html(humid);

                //Displaying Wind Speed
                var wind = "Wind: " + data.wind.speed + " " + "mph";
                var windSpeed = $("#windSpeed");
                $(windSpeed).html(wind);
                

                
            }
            

        });

        //!!!!!!!!!!!!!!!!!!!!Error message!!!!!!!!!!!!!!!!!!!!
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
        

                //changing the format of the default date 
                function dateFormat(i){
                    var date = data.list[i].dt_txt;
                    var year = date.slice(0,4);
                    var day = date.slice(5,7);
                    var month = date.slice(8,10);

                    var newDateFormat = day + "/" + month + "/" + year;
                    console.log(newDateFormat);
                    return newDateFormat;
                }

                
                //////Day 1/////
                $("#day1").html(dateFormat(7));
                //Icon 1
                getIcon(data.list[4].weather[0].icon); 
                var icon = getIcon(data.list[4].weather[0].icon);
                $("#icon1").attr("src", icon);
                //Temp1
                $("#temp1").html(calculateAvgTemp);
                //Humidity 1
                $("#humid1").html(calculateAvgHum);


                //Temp Average
                function calculateAvgTemp(){
                    let avgTemp = 0;
                    for (i = 0; i < 8; i++){
                    avgTemp += data.list[i].main.temp;
                    console.log(avgTemp);
                    }
                    var response = avgTemp/8;
                    var tempImperial = (response - 273.15) * 9/5 + 32;
                    tempImperial = Math.floor(tempImperial);
                    tempImperial = "Temp: " + tempImperial + "°F";
                    return tempImperial;
                }

                //Humidity Average

                function calculateAvgHum(){
                    let avgHum = 0;
                    for(i= 0; i< 8; i++){
                    avgHum += data.list[i].main.humidity;
                    console.log(avgHum);
                    }
                    var response = avgHum/8;
                    response = Math.floor(response);
                    response = "Humidity: " + response + "%"
                    return response;

                }
              
                //Icon Linking
                function getIcon(icon){
                    var link = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
                    return link

                }


                /////Day 2/////
                $("#day2").html(dateFormat(15));
                //Icon 2
                getIcon(data.list[12].weather[0].icon); 
                var icon = getIcon(data.list[12].weather[0].icon);
                $("#icon2").attr("src", icon);
                //Temp 2
                $("#temp2").html(calculateAvgTemp2);


                function calculateAvgTemp2(){
                    let avgTemp = 8;
                    for (i = 0; i < 8; i++){
                    avgTemp += data.list[i].main.temp;
                    console.log(avgTemp)
                    }
                    var response = avgTemp/8;
                    var tempImperial = (response - 273.15) * 9/5 + 32;
                    tempImperial = Math.floor(tempImperial);
                    tempImperial = "Temp: " + tempImperial + "°F";
                    return tempImperial;
                }

                //Humidity 2

                $("#humid2").html(calculateAvgHum2);

                function calculateAvgHum2(){
                    let avgHum = 8;
                    for(i= 0; i< 8; i++){
                    avgHum += data.list[i].main.humidity;
                    console.log(avgHum);
                    }
                    var response = avgHum/8;
                    response = Math.floor(response);
                    response = "Humidity: " + response + "%"
                    return response;

                }



                /////Day 3/////
                $("#day3").html(dateFormat(23));
                //Icon 3
                getIcon(data.list[19].weather[0].icon); 
                var icon = getIcon(data.list[19].weather[0].icon);
                $("#icon3").attr("src", icon);
                //Temp 3
                $("#temp3").html(calculateAvgTemp3);


                function calculateAvgTemp3(){
                    let avgTemp = 16;
                    for (i = 0; i < 8; i++){
                    avgTemp += data.list[i].main.temp;
                    console.log(avgTemp)
                    }
                    var response = avgTemp/8;
                    var tempImperial = (response - 273.15) * 9/5 + 32;
                    tempImperial = Math.floor(tempImperial);
                    tempImperial = "Temp: " + tempImperial + "°F";
                    return tempImperial;
                }

                //Humidity 3

                $("#humid3").html(calculateAvgHum3);

                function calculateAvgHum3(){
                    let avgHum = 16;
                    for(i= 0; i< 8; i++){
                    avgHum += data.list[i].main.humidity;
                    console.log(avgHum);
                    }
                    var response = avgHum/8;
                    response = Math.floor(response);
                    response = "Humidity: " + response + "%"
                    return response;

                }


                /////Day 4/////
                $("#day4").html(dateFormat(31));
                //Icon 4
                getIcon(data.list[28].weather[0].icon); 
                var icon = getIcon(data.list[28].weather[0].icon);
                $("#icon4").attr("src", icon);
                //Temp 4
                $("#temp4").html(calculateAvgTemp4);


                function calculateAvgTemp4(){
                    let avgTemp = 24;
                    for (i = 0; i < 8; i++){
                    avgTemp += data.list[i].main.temp;
                    console.log(avgTemp)
                    }
                    var response = avgTemp/8;
                    var tempImperial = (response - 273.15) * 9/5 + 32;
                    tempImperial = Math.floor(tempImperial);
                    tempImperial = "Temp: " + tempImperial + "°F";
                    return tempImperial;
                }

                //Humidity 4

                $("#humid4").html(calculateAvgHum4);

                function calculateAvgHum4(){
                    let avgHum = 24;
                    for(i= 0; i< 8; i++){
                    avgHum += data.list[i].main.humidity;
                    console.log(avgHum);
                    }
                    var response = avgHum/8;
                    response = Math.floor(response);
                    response = "Humidity: " + response + "%"
                    return response;

                }


                /////Day 5/////
                $("#day5").html(dateFormat(39));
                //Icon 5
                getIcon(data.list[36].weather[0].icon); 
                var icon = getIcon(data.list[36].weather[0].icon);
                $("#icon5").attr("src", icon);
                //Temp 5
                $("#temp5").html(calculateAvgTemp5);


                function calculateAvgTemp5(){
                    let avgTemp = 32;
                    for (i = 0; i < 8; i++){
                    avgTemp += data.list[i].main.temp;
                    console.log(avgTemp)
                    }
                    var response = avgTemp/8;
                    var tempImperial = (response - 273.15) * 9/5 + 32;
                    tempImperial = Math.floor(tempImperial);
                    tempImperial = "Temp: " + tempImperial + "°F";
                    return tempImperial;
                }

                //Humidity 5

                $("#humid5").html(calculateAvgHum5);

                function calculateAvgHum5(){
                    let avgHum = 32;
                    for(i= 0; i< 8; i++){
                    avgHum += data.list[i].main.humidity;
                    console.log(avgHum);
                    }
                    var response = avgHum/8;
                    response = Math.floor(response);
                    response = "Humidity: " + response + "%"
                    return response;

                }


            }
            

        });

    });
});
