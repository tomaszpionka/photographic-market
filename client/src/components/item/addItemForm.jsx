import React, { useState, useRef } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';


function AddItem() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const images = useRef([]);
    
    const usertoken = localStorage.token
    const decoded = jwt_decode(usertoken);

    const handleAdd = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("itemName", name);
        formData.append("userId", decoded.sub);
        formData.append("description", description);
        formData.append("category", category);
        
        for (let i = 0; i < images.current.files.length; i++) {
            formData.append("img", images.current.files[i]);  
        }
        
        // console.log(decoded)
        axios.post('http://localhost:5000/item', formData)
        .then(res => console.log('Success!'))
        .catch(e => console.log(e));
    }

    return (
        <form onSubmit={handleAdd}>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)} />
            <label htmlFor="category">Category:</label>
            <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                <option value="" disabled hidden>Choose category</option>
                <option value="">opcja1</option>
                <option value="o2">opcja2</option>
            </select>
            <label htmlFor="description">Description:</label>
            <textarea
                name="description"
                rows="5"
                onChange={(e) => setDescription(e.target.value)}></textarea>
            <label htmlFor="images">Add images:</label>
            <input
                name="images"
                type="file"
                accept="image/png, image/jpeg"
                multiple
                ref={images} />
            <button type="submit">Save</button>
        </form>
    )
}

export default AddItem;