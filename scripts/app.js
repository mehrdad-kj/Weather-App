
//getting the form
const cityForm = document.querySelector('form');

//getting the info for updating UI
const card = document.querySelector('.card');
const details = document.querySelector('.details');

//getting the info for updating icons
const timeImg = document.querySelector('.card .time');
const iconImg = document.querySelector('.icon img');

//uapdate UI
const updateUI = data=>{
    console.log(data);

    // const cityDets = data.cityDets;
    // const cityWeth = data.cityWeth;

    //destructure properties of an object - the above line is same as the below
    const {cityDets, cityWeth} = data;

    details.innerHTML = `
        <h5 class="my-5">${cityDets.EnglishName}</h5>
        <div class="my-3">${cityWeth.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${cityWeth.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //we want to show the card after user submit
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    };

    //updating time image using ternary operator
    const timeSrc = cityWeth.IsDayTime ? 'images/day.svg' : 'images/night.svg';
    timeImg.setAttribute('src', timeSrc);

    //updating icons
    const iconSrc = `images/icons/${cityWeth.WeatherIcon}.svg`;
    iconImg.setAttribute('src', iconSrc);

};

//define a funcion that get cityName and pass it to the forecast.js
const updateCity = async (cityName) =>{

    const cityDets = await getCity(cityName);
    const cityWeth = await getWeather(cityDets.Key);

    //returning the cityDets & cityWeth datas as a object(promise)
    return {
        cityDets: cityDets,
        cityWeth: cityWeth
    };

    //in objects when property and value are same you can use object shorthand notation
    // return {cityDets, cityWeth};

}

//add submit event on cityForm
cityForm.addEventListener('submit', e =>{

    e.preventDefault();
    
    //getting the value of what user type in form
    const cityName = cityForm.city.value.trim();
    cityForm.reset();

    //call the function that pass the cityName into forecast.js
    updateCity(cityName)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

        localStorage.setItem('city', cityName);
});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
};











