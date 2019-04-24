import React from 'react';
import { Form, Input } from 'antd';

function App(props) {
    return (
        <Form.Item
            label="Hisab"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            style={{ display: 'inline-block', width: '50%' }}
        >
            {props.getFieldDecorator('hisab', {
                rules: [{ required: true, message: 'Please enter Hisab!' }],
            })(
                <Input style={{ width: '100%' }} />
            )}
        </Form.Item>
    );
}

export default App;