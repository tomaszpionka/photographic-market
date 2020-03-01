import React from 'react';
import { useState } from 'react';

function AddItem() {
    const [itemData, setItemData] = useState({
        name: '',
        category: '',
        description: ''
    });

    const handleChange = (e) => {
        const target = e.target;
        const key = target.name;
        const value = target.value;

        setItemData({ ...itemData,
            [key]: value
        });
    }
    const handleAdd = (e) => {
        console.log(itemData);
        e.preventDefault();
    }

    return (
        <form onSubmit={handleAdd}>
            <label htmlFor="name">Nazwa:</label>
            <input 
                type="text"
                name="name"
                onChange={handleChange} />
            <label htmlFor="category">Kategoria:</label>
            <select 
                name="category"
                value={itemData.category}
                onChange={handleChange}>
                <option value="o1">opcja1</option>
                <option value="o2">opcja2</option>
            </select>
            <label htmlFor="description">Opis:</label>
            <textarea 
            name="description"
            rows="5"
            onChange={handleChange}>Opis produktu</textarea>
            <label htmlFor="images">Dodaj zdjęcia:</label>
            <input name="images" type="file" accept="image/png, image/jpeg" multiple/>
            <button type="submit">Dodaj</button>
        </form>
    )
}

export default AddItem;