import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Weather from './components/Weather';
import Form from './components/Form'


const apiKey = "afc842e2e6679af41ea34c2a036f38cd";

class App extends Component {
  constructor() {
    super();
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  state = {
    city: undefined,
    icon: undefined,
    main: undefined,
    celsius: undefined,
    tempMax: undefined,
    tempMin: undefined,
    description: "",
    error: false
  };

  // Конвертація градусів Фаренгейта в градусів Цельсія
  convertToCelsius(temperature) {
    let cell = Math.floor(temperature - 273.15);
    return cell;
  }

  // Отримання картинки погоди взалежності від погоди
  getWeatherIcon(icons, rangeId) {
    switch(true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({icon: this.weatherIcon.ThunderStorm})
        break;

      case rangeId >= 300 && rangeId <= 321:
        this.setState({icon: this.weatherIcon.Drizzle})
        break;

      case rangeId >= 500 && rangeId <= 531:
        this.setState({icon: this.weatherIcon.Rain})
        break;

      case rangeId >= 600 && rangeId <= 622:
        this.setState({icon: this.weatherIcon.Snow})
        break;

      case rangeId >= 701 && rangeId <= 781:
        this.setState({icon: this.weatherIcon.Atmosphere})
        break;

      case rangeId === 800:
        this.setState({icon: this.weatherIcon.Clear})
        break;

      case rangeId >= 801 && rangeId <= 804:
        this.setState({icon: this.weatherIcon.Clouds})
        break;

      default:
        this.setState({icon: undefined})
        break;
    }
  }

  // Отримання повної інформації про погоду
  getWeather = async(e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    
    if (city && country) {
      const apiCall = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+ city + ',' + country + '&appid=' + apiKey);
    

      const response = await apiCall.json();

      console.log(response);

      this.setState({
        city: '' + response.name + ', ' + response.sys.country,
        celsius: this.convertToCelsius(response.main.temp),
        tempMax: this.convertToCelsius(response.main.temp_max),
        tempMin: this.convertToCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });

      this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
      } else {
        this.setState({
          city: undefined,
          icon: undefined,
          main: undefined,
          celsius: undefined,
          tempMax: undefined,
          tempMin: undefined,
          description: "",
          error: true
        });
    };
  };

  render () {
    return (
      <div className="App">
        <Form 
          loadWeather={this.getWeather}
          error={this.state.error}
        />
        <Weather 
          city={this.state.city} 
          weatherIcon={this.state.icon}
          main={this.state.main}
          celsius={this.state.celsius}
          tempMax={this.state.tempMax}
          tempMin={this.state.tempMin}
          description={this.state.description}
          error={this.state.error}
        />
      </div>
    );
  };
};

export default App;