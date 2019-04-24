import React from 'react';
import { Form, InputNumber } from 'antd';

function App(props) {
    return (
        <Form.Item
            label="Stone Average"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ display: 'inline-block', width: '50%' }}
        >
            {props.getFieldDecorator('extra_weight_average', {
                rules: [{ required: false, type: "number", message: 'Please enter Stone Average!' }],
            })(
                <InputNumber min={0} max={100} step={0.1} style={{ width: '100%' }} />
            )}
        </Form.Item>
    );
}

export default App;