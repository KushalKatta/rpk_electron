import React from 'react';
import { Form, Switch, InputNumber } from 'antd';
import { handleValidateWeight } from '../../util/validator';

function App(props) {
    return (
        <Form.Item
            label="Net Weight"
            wrapperCol={{ span: 18 }}
        >
            {props.getFieldDecorator('net_weight', {
                rules: [{ required: true, type: "number", validator: handleValidateWeight, message: 'Please enter correct Net Weight!'  }],
            })(
                <InputNumber disabled precision={3} step={0.1} style={{ width: '70%', marginRight: '5%' }} />
            )}
            {props.getFieldDecorator('accurate', {
                initialValue: false,
                rules: [{ required: true, message: 'Please select Net Details Accuracy!' }],
            })(
                <Switch checkedChildren="Accurate" unCheckedChildren="Approximate" style={{ width: '25%' }} />
            )}
        </Form.Item>
    );
}

export default App;