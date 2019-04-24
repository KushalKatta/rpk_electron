import React from 'react';
import { Form, InputNumber } from 'antd';
import { handleValidateWeight } from '../../util/validator';

function App(props) {
    return (
        <Form.Item
            label="Gross Weight"
            wrapperCol={{ span: 18 }}
        >
            {props.getFieldDecorator('gross_weight', {
                rules: [{ required: true, type: "number", validator: handleValidateWeight, message: 'Please enter correct Gross Weight!' }],
            })(
                <InputNumber disabled precision={3} step={0.1} style={{ width: '100%' }} />
            )}
        </Form.Item>
    );
}

export default App;