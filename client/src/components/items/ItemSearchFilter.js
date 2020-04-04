import React from 'react';
import { Form } from 'semantic-ui-react';

function SearchFilter() {
    return (
        <Form onSubmit={search} style={{ margin: '0 auto', width: '40%' }}>
            <Form.Input
                type="text"
                placeholder="Search user..."
                onChange={e => setQuery(e.target.value)}
                action={{
                    type: 'submit',
                    icon: 'search',
                    color: 'primary',
                    content: 'Search'
                }} />
            <Form.Dropdown />
        </Form>

    )
}

export default SearchFilter;