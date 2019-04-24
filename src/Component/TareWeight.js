import React, { Component } from 'react';
import {
    Form, Input, Button, InputNumber, Select, Switch
  } from 'antd';

import { enumWeightUnit } from '../util/util';

class TareWeight extends Component {
    constructor(props) {
        super(props);
        this.state = { disabledTare_weight_quantity: false };
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.props && nextProps.currentObj && nextProps.currentObj!==this.currentObj) {
            this.initForm(nextProps);
        }
    }

    componentDidMount() {
        if(this.props.currentObj) {
            this.initForm(this.props);
        }
    }

    initForm = (props) => {
        this.currentObj = props.currentObj;
        props.form.setFieldsValue(this.currentObj);
        this.disableQuantity(this.currentObj.unit);
        this.setQuantity();
    }

    submitForm = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(this.props.submitForm) this.props.submitForm(values)
                else console.log('Received values of form tare: ', values);
            }
        });
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="horizontal" labelCol={{ span: 4 }} wrapperCol={{ span: 25 }} onSubmit={(e)=> {
                e.preventDefault();
                this.submitForm()
            } }>
                <Form.Item
                    label="Name"
                    wrapperCol={{ span: 18 }}
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input Name!' }],
                    })(
                        <Input placeholder="Side Powai Moti" />
                    )}
                </Form.Item>
                <Form.Item
                    label="Weight"
                    wrapperCol={{ span: 18 }}
                >
                {getFieldDecorator('weight', {
                    initialValue: 0,
                    
                    validateTrigger:"onChange",
                    rules: [{ required: true, type: "number", message: 'Please enter Weight!' }],
                })(
                    <InputNumber precision={3} min={0} step={0.1} onChange={this.handleChangeWeight} style={{ width: '100%' }} />
                )}
                </Form.Item>

                <Form.Item
                    label="Quantity"
                    wrapperCol={{ span: 18 }}
                >
                    {getFieldDecorator('quantity', {
                        rules: [{ required: false, message: 'Please enter Quantity!' }],
                    })(
                        <InputNumber min={0} step={0.1} onChange={this.handleChangeQuantity} style={{ width: '50%' }} disabled={this.state.disabledTare_weight_quantity} />
                    )}
                    {getFieldDecorator('unit', {
                        rules: [{ required: false, message: 'Please select Unit!' }],
                    })(
                        <Select
                            style={{ width: '50%' }}
                            onChange={this.handleChangeUnit}
                            showSearch
                            placeholder="Select a Unit"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {enumWeightUnit.map(( weightUnit )=>(
                                <Select.Option key={weightUnit} value={weightUnit} >{ weightUnit }</Select.Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>
                    
                <Form.Item
                    label="Rate"
                    wrapperCol={{ span: 18 }}
                >
                    {getFieldDecorator('price', {
                        rules: [{ required: false, message: 'Please enter Rate!' }],
                    })(
                        <InputNumber min={0} step={1} onChange={val=>this.setAmount(undefined, val) } style={{ width: '100%' }} />
                    )}
                </Form.Item>
                <Form.Item
                    label="Amount"
                    wrapperCol={{ span: 18 }}
                >
                    {getFieldDecorator('amount', {
                        initialValue: 0,
                        rules: [{ required: false, message: 'Please enter Amount!' }],
                    })(
                        <InputNumber disabled style={{ width: '70%', marginRight: '5%' }} />
                    )}
                    {getFieldDecorator('lock_gross_weight', {
                        valuePropName: 'checked'
                    })(
                        <Switch checkedChildren="Locked" unCheckedChildren="Unlocked" style={{ width: '25%' }} />
                    )}
                </Form.Item>

                <Form.Item className="centerAlign" style={{ marginBottom: 0, marginTop: '0', display: 'flex' }}  >
                    <Button type="primary" htmlType="submit" >Submit</Button>
                </Form.Item>
            </Form>
        );
    }

    handleChangeUnit = (unit) => {
        this.disableQuantity(unit);
        this.setQuantity(unit);
    }

    handleChangeWeight = (weight) => {
        if(isNaN(weight)) {
            weight = parseFloat(weight || 0);
            this.props.form.setFieldsValue({weight});
        }
        this.setQuantity(undefined, weight);
    }
    
    handleChangeQuantity = (quantity) => {
        quantity = parseFloat(quantity || 0);
        this.setAmount(quantity);
    }


    disableQuantity = (unit) => {
        if(["GRAM", "TOLA", "CARAT"].includes(unit)) {
            this.setState({ disabledTare_weight_quantity: true });
        } else {
            this.setState({ disabledTare_weight_quantity: false });
        }
    }

    setQuantity = (unit, weight, quantity) => {
        if(!unit)
            unit = this.props.form.getFieldValue("unit")
        if(!weight)
            weight = this.props.form.getFieldValue("weight")
        if(!quantity)
            quantity = this.props.form.getFieldValue("quantity")
        if(unit === "GRAM") {
            quantity = Math.round(weight * 1000) / 1000
        } else if(unit === "TOLA") {
            quantity = Math.round(weight / 11.664 * 1000) / 1000
        } else if(unit === "CARAT") {
            quantity = Math.round(weight * 5 * 1000) / 1000
        } else {
            quantity = (quantity === Math.round(quantity)) ? quantity : 0
        }
        this.props.form.setFieldsValue({ quantity });
        this.setAmount();
    }

    setAmount = (quantity, price) => {
        if(!quantity)
            quantity = this.props.form.getFieldValue("quantity")
        if(!price)
            price = this.props.form.getFieldValue("price")

        let amount = 0
        if(quantity && price) {
            amount = Math.round(quantity * price);
        }

        this.props.form.setFieldsValue({ amount });
    }
}

const WrappedTareWeight = Form.create({ name: 'tare_weight_products' })(TareWeight);
export default WrappedTareWeight