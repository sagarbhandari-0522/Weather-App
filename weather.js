 const key1 = 'KhGluJNub2RQXK0daVOj6YhX4JCbSbK0';
 let city = document.querySelector('form')
 let update = document.querySelector('.card')

 const getKey = async city => {
     const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
     const query = `?apikey=${key1}&q=${city}`;
     const response = await fetch(base + query);
     if (response.status !== 200) {
         alert()
         throw new Error('cannot fetch the data');
     }
     const data = await response.json();
     if (data.length === 0) {
         alert("Enter the valid city name FUCK YOU!!!!!!!!!!!!!!!!")
     }
     console.log(data)
     return (data)
 }
 const getTemp = async key => {
     const base = `http://dataservice.accuweather.com/currentconditions/v1/${key}`;
     const query = `?apikey=${key1}`
     const response = await fetch(base + query);
     const data = await response.json();
     console.log(data)
     return (data)
 }
 city.addEventListener('submit', e => {
     e.preventDefault();
     getKey(e.target.location.value.trim()).then(data => {
             let key = data[0].Key;
             return getTemp(key)
         }).then(data => {
             let a;
             if (data[0].IsDayTime) {
                 a = 'img/dayTime.avif'
             } else a = 'img/nightTime.jpeg'

             update.innerHTML =

                 `<img src="${a}"alt="" class="card-img-top img-fluid">
                  <img src="img/icons/${data[0].WeatherIcon}.svg" alt="" height="100px" width="100px"class="img-fluid mx-auto rounded-circle top-0px icon">
                 <div class="card-body">

            <div class="card-title">${e.target.location.value}</div>
             <p class="lead">${data[0].WeatherText}</p>
             <p class="display-1">${data[0].Temperature.Metric.Value}&deg; C</p></div>`
             city.reset()
             console.log(data[0].Temperature.Metric.Value)
         })
         .catch(err => {
             console.log(err.message)
         })
     console.log(e.target.location.value)
     console.log('sagar bhandari')
         //city.reset()
 })