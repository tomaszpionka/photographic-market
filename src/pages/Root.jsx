import React from "react";

function Root() {
    return(
        <div>
            <h1>Strona główna</h1>
            <h2>Wyszukiwarka</h2>
            <form action="">
                <label>Wpisz szukaną frazę aby wyszukać:<input type="text"/></label>
                <button>Wyszukaj</button>
            </form>
        </div>
    )
}

export default Root;