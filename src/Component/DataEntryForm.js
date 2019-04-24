import React, { Component } from 'react';
// import { genericItems, enumStoneType, enumWeightUnit, favoritesExtraWeight, favoritesTareWeight } from '../util/util';

import { Form } from 'antd';
import { isObjectEqual } from '../util/util';
// import _ from 'lodash';

import { FieldItemName, FieldTunch, FieldStoneType, FieldMachineWeight, FieldTareWeight, FieldGrossWeight, FieldExtraWeight, FieldNetWeight, FieldStoneAverage, FieldHisab, ButtonSubmit, ButtonReset } from './FormItems';

class App extends Component {
    
    componentDidMount() {
        this.props.form.setFieldsValue(this.props.extraProductsObj);
    }
    extraProductsObj = {};
    componentWillReceiveProps(props) {
        // console.log("PROPS: ", props);
        if(!isObjectEqual(this.extraProductsObj, props.extraProductsObj)){
            this.extraProductsObj = props.extraProductsObj
            props.form.setFieldsValue(this.extraProductsObj);
            if(props.lockGrossWeight) this.calculateMachineWeight();
            else this.calculateGrossWeight();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={e=>{
                e.preventDefault();
                this.props.form.validateFields((err, values) => {
                    if (!err) {
                        this.props.submitForm(values);
                    }
                });
            }} labelCol={{ span: 5 }} wrapperCol={{ span: 20 }} >
                <FieldItemName getFieldDecorator={getFieldDecorator} />
                <FieldTunch getFieldDecorator={getFieldDecorator} setFieldsValue={this.props.form.setFieldsValue}/>
                <FieldStoneType getFieldDecorator={getFieldDecorator} />
                <FieldMachineWeight getFieldDecorator={getFieldDecorator} calculateGrossWeight={this.calculateGrossWeight} />
                <FieldTareWeight getFieldDecorator={getFieldDecorator} setShowTareWeightForm={this.props.setShowExtraProductsForm.bind(null, "showTareWeightForm")} />
                <FieldGrossWeight getFieldDecorator={getFieldDecorator} />
                <FieldExtraWeight getFieldDecorator={getFieldDecorator} setShowExtraWeightForm={this.props.setShowExtraProductsForm.bind(null, "showExtraWeightForm")}/>
                <FieldNetWeight getFieldDecorator={getFieldDecorator} />
                <Form.Item wrapperCol={{ offset: 0, span: 25 }} >
                    <FieldStoneAverage getFieldDecorator={getFieldDecorator} />
                    <FieldHisab getFieldDecorator={getFieldDecorator} />
                </Form.Item>
                <div className="centerAlign" >
                    <ButtonSubmit />
                    <ButtonReset resetState={this.resetState}/>
                </div>
            </Form>
        )
    }

    initialState = { generic_item__item_code: undefined, tunch: 92.0, stone_type: undefined, machine_weight: undefined, accurate: false, extra_weight_average: undefined, hisab: undefined }
    resetState = () => {
        this.props.form.setFieldsValue(this.initialState);
        this.props.resetParentState();
    }

    calculateMachineWeight = () => {
        const { form } = this.props;

        const total_tare_weight = form.getFieldValue("total_tare_weight");
        const gross_weight = form.getFieldValue("gross_weight");

        form.setFields({
            machine_weight: {
                value: parseFloat(total_tare_weight+gross_weight),
                ...this.validateWeight(total_tare_weight+gross_weight)
            }
        });
    }
    calculateGrossWeight = (machine_weight, total_tare_weight) => {
        const { form } = this.props;
        if(!machine_weight) {
            machine_weight = form.getFieldValue("machine_weight");
        }
        if(!total_tare_weight) {
            total_tare_weight = form.getFieldValue("total_tare_weight");
        }
        let gross_weight = Math.round((machine_weight - total_tare_weight) * 1000) / 1000;
        // form.setFieldsValue({
        //     gross_weight: parseFloat(gross_weight),
        // });

        form.setFields({
            gross_weight: {
                value: parseFloat(gross_weight),
                ...this.validateWeight(gross_weight)
            }
        });
        this.calculateNetWeight(gross_weight);
        return gross_weight
    }
    calculateNetWeight = (gross_weight, total_extra_weight) => {
        const { form } = this.props;
        if(!gross_weight) {
            gross_weight = form.getFieldValue("gross_weight");
        }
        if(!total_extra_weight) {
            total_extra_weight = form.getFieldValue("total_extra_weight");
        }
        let net_weight = Math.round((gross_weight - total_extra_weight) * 1000) / 1000;
        form.setFields({
            net_weight: {
                value: parseFloat(net_weight),
                ...this.validateWeight(net_weight)
            }
        });
        return net_weight;
    }
    validateWeight = (weight) => {
        if (weight > 0) {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
        return {
            validateStatus: 'error',
            errors: [new Error("Weight can't be negative")],
        };
    }


}

const WrappedApp = Form.create({ name: 'main_form' })(App);
export default WrappedApp