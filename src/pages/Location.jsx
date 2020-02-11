import React from "react"

class Location extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: null,
            long: null,
            errorMessage: ""
        };

        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                });
            },
            err => {
                this.setState({errorMessage: err.message})
            }
        );
    }

    render() {

        return (
            <div>
                <h1>location h1</h1>

                latitude: {this.state.lat}
                <br/>
                longitude: {this.state.long}
                <br/>
                Error: {this.state.errorMessage}
            </div>
        )
    }
}

export default Location;