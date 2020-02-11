import React from "react"

class Location extends React.Component {
    constructor(props) {
        super(props);

        this.state = {lat: null};

        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({lat: position.coords.latitude});
            },
            err => console.log(err)
        );
    }

    render() {

        return (
            <div>
                <h1>location h1</h1>

                latitude: {this.state.lat}</div>
        )
    }
}

export default Location;