import React, { Component } from 'react';

export default class Weather extends Component {
    render() {
        const { 
            city,
            celsius, 
            tempMin, 
            tempMax, 
            description, 
            weatherIcon 
        } = this.props;
        return (
            <div className="container">
                <div className="cards">
                    <h1>{city}</h1>
                    <h5 className="py-md-4 py-3">
                        <i className={"wi " + weatherIcon + " display-3"}></i>
                    </h5>
                    {celsius ? (<h1 className="py-md-2 py-1">{celsius}&deg;</h1>) : null}
                    {minMaxTemp(tempMin, tempMax)}
                    <h4 className="py-md-3 py-1 text-capitalize">{description}</h4>
                </div>
            </div>
        )
    }
};

// Отримання максимальної та мінімальної температури
function minMaxTemp(min, max) {
    if (min && max) {
        return (
            <h3>
                <span className="px-4">{min}&deg;</span>
                <span className="px-4">{max}&deg;</span>
            </h3>
        );
    };
};
