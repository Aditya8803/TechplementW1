document.addEventListener("DOMContentLoaded", async () => {
    let name = "Jaipur"
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; 
    const year = currentDate.getFullYear();
    document.getElementById('date').textContent = `${year}/${month}/${day}`;
    await loading(name);
});
const loading = async (name)=>{
    const data = await fetchdata(name);
    if(data!==null){
        document.getElementById('local_time').textContent = "Local Time : "+ data.location.localtime;
        document.getElementById('last_updated').textContent = "Last Update: "+ data.current.last_updated;
        document.getElementById('wind_mph').textContent = "Wind (mph ) : "+ data.current.wind_mph +" " + data.current.wind_dir;
        document.getElementById('wind_kph').textContent = "Wind ( kph ) : "+ data.current.wind_kph + " "+ data.current.wind_dir;
        document.getElementById('name').textContent = data.location.name + ", ";
        document.getElementById('region').textContent = data.location.country;
        document.getElementById('temperature').textContent = data.current.temp_c+"°c"+" / "+data.current.temp_f+"°f";
        document.getElementById('time').textContent = data.location.localtime.slice(11,16);
        document.getElementById('liveTemprature').textContent = data.current.temp_c+"°c";
        document.getElementById('condition').textContent = data.current.condition.text;
        document.getElementById('realFeel').textContent =  data.current.feelslike_c +"°c";
        document.getElementById('humidity').textContent =   data.current.humidity;
        document.getElementById('visibility').textContent =  + data.current.vis_km + " km";
        document.getElementById('precipitation').textContent =  + data.current.precip_mm + " mm";
        document.getElementById('go').onclick = function(){
            name = document.getElementById('searchBar').value;
            loading(name);
        }
    }else{
        alert("Invalid search");
    }
}
async function fetchdata(name){
    try{
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=3c88e2b7f077456fb4c194240240306&q=${name}&aqi=no`);
        if(response.ok === false){
            throw error;
        }
        const data = await response.json()
        return data;
    }catch(error){
        return null;
    }
}


