import React from 'react';
import { Form, InputNumber } from 'antd';
import { handleValidateWeight } from '../../util/validator';

function App(props) {
    return (
        <Form.Item
            label="Machine Weight"
            wrapperCol={{ span: 18 }}
        >
            {props.getFieldDecorator('machine_weight', {
                validateTrigger:"onChange",
                rules: [{ required: true, type: "number", validator: handleValidateWeight, message: 'Please enter correct Machine Weight!' }],
            })(
                <InputNumber onChange={props.calculateGrossWeight} precision={3} min={0} step={0.1} style={{ width: '100%' }} />
            )}
        </Form.Item>
    );
}

export default App;