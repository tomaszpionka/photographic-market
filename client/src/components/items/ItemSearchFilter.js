import React, { useState } from 'react';
import { Form, Select, Button } from 'semantic-ui-react';

function SearchFilter() {
    const [name, setName] = useState();
    const [category, setCategory] = useState('all');

    const categoriesNames = ["all", "film", "lens", "camera", "accessories"];
    const categoryOptions = categoriesNames.map(category => ({
        key: category,
        text: category,
        value: category
    }
    ));

    const search = async e => {
        e.preventDefault();
        let url = `http://localhost:5000/items/find/?category=${category}`;
        if (name !== undefined) {
            url += `&name=${name}`};
        console.log(url)
        try {
            const response = await fetch(url);

            const parseResponse = await response.json();

            console.log(parseResponse)
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Form onSubmit={search} style={{ width: '50%' }}>
            <Form.Input action >
                <input
                    type="text"
                    placeholder="Search item..."
                    onChange={e => setName(e.target.value)} />
                <Select 
                    options={categoryOptions}
                    defaultValue="all"
                    onChange={(e, { value }) => setCategory(value)} />
                <Button
                    type="submit"
                    icon="search"
                    primary
                    content="Search" />
            </Form.Input>
        </Form>

    )
}

export default SearchFilter;