import React from 'react';
import { Form, Select } from 'antd';
import { genericItems } from '../../util/util';

function App(props) {
    return (
        <Form.Item
            label="Item Name"
            wrapperCol={{ span: 18 }}
        >
            {props.getFieldDecorator('generic_item__item_code', {
                rules: [{ required: true, message: 'Please select Item Name!' }],
            })(
                <Select
                    style={{ width: '100%' }}
                    showSearch
                    placeholder="Select an Item Name"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {genericItems.map(( genericItem )=>(
                        <Select.Option key={genericItem.item_code} value={genericItem.item_code} >{ genericItem.name }</Select.Option>
                    ))}
                </Select>
            )}
        </Form.Item>
    );
}

export default App;