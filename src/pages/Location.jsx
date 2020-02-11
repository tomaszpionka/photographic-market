import React from "react"

class Location extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: null,
            long: null
        };

        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                });
            },
            err => console.log(err)
        );
    }

    render() {

        return (
            <div>
                <h1>location h1</h1>

                latitude: {this.state.lat}
                <br/>
                longitude: {this.state.long}
            </div>
        )
    }
}

export default Location;