import React from 'react';

function AddItem() {

    return (
        <form >
            <label htmlFor="item-name">Nazwa:</label><input type="text" name="item-name" />
            <label htmlFor="category">Kategoria:</label>
            <select name="category">
                <option value="o1">opcja1</option>
                <option value="o2">opcja2</option>
            </select>
            <label htmlFor="description">Opis:</label>
            <textarea name="description" rows="5"></textarea>
            <label htmlFor="images">Dodaj zdjęcia:</label>
            <input name="images" type="file" accept="image/png, image/jpeg" multiple/>
            <button type="submit">Dodaj</button>
        </form>
    )
}

export default AddItem;