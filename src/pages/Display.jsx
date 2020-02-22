import React from "react";

const seasonConfig ={
    summer: {
        text:"hot as hell"
    },
    winter:{
        text:"baby it's so cold outside"
    }
};

const getSeason = (lat, month) => {
    if (month > 2 && month < 9){
        return lat > 0 ? "summer" : "winter";
    } else {
        return lat > 0 ? "winter" : "summer";
    }
};

const Display = (props) => {
    const season = getSeason(props.lat, new Date().getMonth());
    // console.log(props.lat, props.long);
    // console.log(season);
    const {text} = seasonConfig[season];

        return(
                <div>
                    <h1>location h1</h1>
                    latitude: {props.lat}
                    <br/>
                    longitude: {props.long}
                    <br/>
                    <h1>{text}</h1>
                </div>
        )
    };

export default Display;