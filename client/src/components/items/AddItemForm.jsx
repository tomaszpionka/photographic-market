import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Icon, Image } from 'semantic-ui-react';

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
    const images = useRef();

    const categoriesNames = ["film", "lens", "camera", "accessories"];
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
        console.log(id);

        return fetch("http://localhost:5000/items/", {
            method: "POST",
            body: formData
        }).then(res => res.json())
        .then(res => console.log(res))
        .catch(e => console.log(e));
    }

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
                value={category}
                placeholder="Select category"
                label="Category"
                name="category"
                options={categoryOptions}
                onChange={(e, {value}) => setCategory(value)} />
            <Form.TextArea
                required
                fluid
                placeholder="Add description"
                label="Description"
                name="description"
                onChange={(e) => setDescription(e.target.value)} />
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
            />
            
            <Form.Button>Save</Form.Button>
        </Form>
    )
}

export default AddItem;