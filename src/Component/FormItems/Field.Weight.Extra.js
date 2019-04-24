import React from 'react';
import { Form, Button, InputNumber } from 'antd';

function App(props) {
    return (
        <Form.Item
            label="Extra Weight"
            wrapperCol={{ span: 18 }}
        >
            {props.getFieldDecorator('total_extra_weight', {
                rules: [{ required: false, type: "number", message: 'Please enter correct Extra Weight!' }],
            })(
                <InputNumber disabled precision={3} step={0.1} style={{ width: '40%' }} />
            )}
            {props.getFieldDecorator('total_extra_amount', {
            })(
                <InputNumber disabled step={1} style={{ width: '40%', marginRight: '5%' }} />
            )}
            <Button onClick={() => props.setShowExtraWeightForm(true) } type="primary" size="large" shape="circle" icon="plus" />
        </Form.Item>
    );
}

export default App;