import React, { Component } from 'react';

export default class Form extends Component {
    render() {
        const { loadWeather, error } = this.props;
        return (
            <div className="container">
                <div>{error ? errorMessage() : null}</div>
                <form onSubmit={loadWeather}>
                    <div className="row">
                        <div className="col-md-3 offset-md-2 my-md-4 my-2">
                            <input 
                                type="text" 
                                className="form-control" 
                                name="city"
                                autoComplete="off"
                                placeholder="City"
                            />
                        </div>
                        <div className="col-md-3 my-md-4 my-2">
                            <input 
                                type="text" 
                                className="form-control" 
                                name="country"
                                autoComplete="off"
                                placeholder="Country"
                            />
                        </div>
                        <div className="col-md-3 mt-md-0 text-md-left my-md-4 my-2">
                            <button className="btn btn-primary">Show Weather</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    };
};

// Видення інформації про помилку
function errorMessage() {
    return (
        <div className="alert alert-danger mx-5" role="alert">
            Please Enter City and Country
        </div>
    )
};