import React from 'react';
import { Form, Select } from 'antd';
import { enumStoneType } from '../../util/util';

function App(props) {
    return (
        <Form.Item
            label="Stones"
            wrapperCol={{ span: 18 }}
        >
            {props.getFieldDecorator('stone_type', {
                rules: [{ required: false, message: 'Please select Stones!' }],
            })(
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select Stones"
                    // defaultValue={}
                >
                    {enumStoneType.map(( stoneType )=>(
                        <Select.Option key={stoneType} value={stoneType} >{ stoneType }</Select.Option>
                    ))}
                </Select>
            )}
        </Form.Item>
    );
}

export default App;