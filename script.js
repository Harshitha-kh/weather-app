    const searchBtn = document.querySelector("#search");
        const searchInput = document.querySelector("input");
        const temparatureEle = document.querySelector(".temp");
        const locationEle = document.querySelector(".location");
        const timeEle = document.querySelector(".time");
        const dayEle = document.querySelector(".day");
        const dateEle = document.querySelector(".date");
        const iconEle = document.querySelector(".icon img");
        const conditionEle = document.querySelector(".condition");

        searchBtn.addEventListener("click",function() {
            const location = searchInput.value;
            if(location) {
                // getting data and updating inside dom
                 fetchWeather(location).then((data) => {
                    if(data==null) {

                    } else {
                        updateDOM(data);
                    }
                 })
                searchInput.value="";
            }
        })
            async function fetchWeather(location) {
              const url = `https://api.weatherapi.com/v1/current.json?key=8d59fdf835074982a43142556250410&q=${location}&aqi=no`;
               const response = await fetch(url);
               if(response.status == 400) {
                alert("location is invalid");
                return null;
               } else if (response.status == 200) {
                const data = await response.json();
                console.log(data);
                return data;
               }
               
        }
            function updateDOM(data) {
                console.log("update dom");
                const temp = data.current.temp_c;
                const location = data.location.name;
                const timeData = data.location.localtime;
                const [date,time] = timeData.split(" ");
                const iconLink = data.current.condition.icon;
                const condition = data.current.condition.text;
                temparatureEle.textContent = temp;
                locationEle.textContent = location;
                timeEle.textContent = time;
                dateEle.textContent = date;
                
                
                iconEle.src=iconLink;
                conditionEle.textContent = condition;
                 
            } 
