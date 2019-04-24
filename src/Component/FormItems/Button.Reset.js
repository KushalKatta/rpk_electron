import React from 'react';
import { Form, Button } from 'antd';

function App(props) {
    return (
        <Form.Item style={{ marginBottom: 0, marginTop: '0' }} >
            <Button onClick={ props.resetState }>Reset</Button>
        </Form.Item>
    );
}

export default App;