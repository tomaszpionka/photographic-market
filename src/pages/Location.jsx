import React from "react"

class Location extends React.Component {
    state = {
            lat: null,
            long: null,
            errorMessage: ""
        };


    componentDidMount() {
        console.log("my component was rendered to the screen");
        window.navigator.geolocation.getCurrentPosition(
            position =>
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                }),
            err => this.setState({errorMessage: err.message})
        );
    }

    componentDidUpdate() {
        console.log("my component was just updated");
    }

    render() {
        if(this.state.errorMessage && !this.state.lat){
            return (
                <div>
                    <h1>location h1</h1>
                    Error: {this.state.errorMessage}</div>
            )
        }
        if (!this.state.errorMessage && this.state.lat) {
            return (
                <div>
                    <h1>location h1</h1>
                latitude: {this.state.lat}
            <br/>
            longitude: {this.state.long}
                </div>
            )
        }
        return (
            <div>
                <h1>location h1</h1>
                <p>loading</p>
            </div>
        );
    }
}

export default Location;