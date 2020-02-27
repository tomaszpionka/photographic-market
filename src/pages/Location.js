import React from "react"
import Display from "./Display";

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

    renderContent() {
        if(this.state.errorMessage && !this.state.lat){
            return (
                <div>Error: {this.state.errorMessage}</div>
            )
        }
        if (!this.state.errorMessage && this.state.lat) {
            return (
                <Display lat={this.state.lat} long={this.state.long}/>
            )
        }
        return (<div><h1>please accept location request</h1></div>)
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default Location;