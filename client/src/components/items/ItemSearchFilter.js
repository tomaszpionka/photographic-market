import React from 'react';
import { Form } from 'semantic-ui-react';

function SearchFilter() {
    return (
        <Form onSubmit={search} style={{ margin: '0 auto', width: '40%' }}>
            <Form.Input action >
                <input
                    type="text"
                    placeholder="Search user..."
                    onChange={e => setQuery(e.target.value)} />
                <Form.Select />
                <Form.Button
                    type="submit"
                    icon="search"
                    primary
                    content="Search" />
            </Form.Input>
            <Form.Dropdown />
        </Form>

    )
}

export default SearchFilter;