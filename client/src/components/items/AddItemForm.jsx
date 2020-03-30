import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Icon, Image } from 'semantic-ui-react';

// import axios from 'axios';


function AddItem() {

    const [id, setId] = useState("");

    const getProfile = async () => {
        try {
            const res = await fetch("http://localhost:5000/dashboard", {
                method: "GET",
                headers: { jwt_token: localStorage.token }
            });

            const parseData = await res.json();
            setId(parseData.user_id);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [imgs, setImgs] = useState([]);
    const images = useRef([]);

    const categoriesNames = ['film', 'lens', 'camera', 'accessories'];
    const categoryOptions = categoriesNames.map(category => ({
        key: category,
        text: category,
        value: category
    }
    ));

    const handleAdd = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("itemName", name);
        formData.append("userId", id);
        formData.append("description", description);
        formData.append("category", category);

        for (let i = 0; i < images.current.files.length; i++) {
            formData.append("img", images.current.files[i]);
        }
        console.log(formData);
        // axios.post('http://localhost:5000/items', formData)
        // .then(res => console.log('Success!'))
        // .catch(e => console.log(e));
    }

    const showThumbnails = () => {
        for (let [key, value] of Object.entries(imgs)) {
            return (
                <Image 
                    key={key} 
                    src={URL.createObjectURL(value)} 
                    style={{ height: '60px' }} 
                    />
            )
        }
    };

    return (
        <Form onSubmit={handleAdd}>
            <Form.Input
                required
                fluid
                placeholder="Name"
                label="Name"
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)} />
            <Form.Dropdown
                required
                fluid
                selection
                placeholder="Select category"
                label="Category"
                name="category"
                options={categoryOptions}
                onChange={(e) => setCategory(e.target.value)} />
            <Form.TextArea
                required
                fluid
                placeholder="Add description"
                label="Description"
                name="description"
                onChange={(e) => setDescription(e.target.value)} />
            <div>
                {imgs.length > 0 ? showThumbnails() : <p>No file selected!</p>}

            </div>
            <Button as="label" htmlFor="file" type="button" >
                <Icon name="file image" />
                    Add images
            </Button>
            <input
                type="file"
                id="file"
                hidden
                multiple
                ref={images}
                onChange={(e) => setImgs(e.target.files)}
            />
            
            <Form.Button>Save</Form.Button>
        </Form>
    )
}

export default AddItem;