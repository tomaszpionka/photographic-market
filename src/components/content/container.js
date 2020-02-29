import React, { Component } from 'react';
import { MDBContainer} from 'mdbreact';

class Container extends Component {
    render() {
        const container = {height: 1300}
        return(
            <div>
                <MDBContainer style={container} className="text-center mt-5 pt-5">
                    <h2>This Navbar is fixed</h2>
                    <h5>It will always stay visible on the top, even when you scroll down</h5>
                    <br/>
                    <p>Full page intro with background image will be always displayed in full screen mode, regardless of device</p>
                </MDBContainer>
            </div>
        );
    }
}

export default Container;