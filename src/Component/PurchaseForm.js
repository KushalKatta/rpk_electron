import React, { Component } from 'react';
import DataEntryForm from './DataEntryForm';
import TareWeightForm from './TareWeightForm';

import { calculateTotalExtraProduct } from '../util/validator';
import { mutateCreateProduct } from '../util/util';
import barcodeFormat from '../util/barcodeFormat';
import getBarcodeData from '../util/barcodeData';

import { Modal } from 'antd';

class App extends Component {
    initialState = { lockGrossWeight: true, showTareWeightForm: false, showExtraWeightForm: false, tare_weight: [{ name: "RFID Label M5", weight: 0.15, quantity: 1, unit: "PIECE", price: 10, amount: 0, lock_gross_weight: true }], extra_weight: [] }

    resetState = (returnValue = false ) => {
        const newState = JSON.parse(JSON.stringify(this.initialState));     // Deep Clone of Objects
        if(returnValue) return newState;
        this.setState(newState);
    }
    state = this.resetState(true);
    tareProductForms = [];
    extraProductForms = [];
    render() {
        const extraProductsObj = this.calculateExtraProducts();
        return (
            <div>
                {this.state.showTareWeightForm && (
                    <TareWeightForm setShow={this.setShowExtraProductsForm.bind(null, "showTareWeightForm")} addExtraProduct={this.processExtraProductForm.bind(null, 'tare_weight')} name="Tare" />  
                )}
                {this.state.showExtraWeightForm && (
                    <TareWeightForm setShow={this.setShowExtraProductsForm.bind(null, "showExtraWeightForm")} addExtraProduct={this.processExtraProductForm.bind(null, 'extra_weight')} name="Extra" />  
                )}
                <div className="row" style={{ }}>
                    <div className="double-column" style={{ paddingLeft: '5%', paddingRight: '5%' }}>
                        <div className="elevation" style={{ paddingTop: '5%', paddingBottom: '5%', paddingLeft: '2%', paddingRight: '2%' }}>
                            <DataEntryForm wrappedComponentRef={ref=> this.dataEntryForm=ref} submitForm={this.submitForm} extraProductsObj={extraProductsObj} setShowExtraProductsForm={this.setShowExtraProductsForm} resetParentState={this.resetState} lockGrossWeight={this.state.lockGrossWeight} />
                        </div>
                    </div>
                    <div className="column" style={{ minWidth: "1px", marginRight: '1%', overflow: "auto" }}>
                        <div className="elevation scrolling-wrapper">
                            {this.tareProductForms}
                        </div>
                        <div className="elevation scrolling-wrapper" style={{  }} >
                            {this.extraProductForms}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    processExtraProductForm = (stateName, obj, index ) => {
        let array = this.state[stateName];

        console.log("OBJ: ", obj);
        if(obj && index === undefined) {
            // Create
            array.push({...obj});
        } else if(obj && index>=0) {
            // Update
            array[index] = obj;
        } else if(obj === null && index >= 0) {
            // Delete
            obj = { lock_gross_weight: array[index].lock_gross_weight }
            array.splice(index, 1);
            // delete array[index];
        }

        this.setState({ [stateName]: array, lockGrossWeight: obj.lock_gross_weight });
    }
    

    setShowExtraProductsForm = (stateName, bool ) => {
        this.setState({ [stateName]: bool })
    }
    
    submitForm = (obj) => {
        const tare_weight = JSON.parse(JSON.stringify(this.state.tare_weight));     // Deep Clone Array of Objects
        const extra_weight = JSON.parse(JSON.stringify(this.state.extra_weight));
        mutateCreateProduct({ ...obj, tare_weight , extra_weight })
        .then( data=> {
            const barcodeData = getBarcodeData({...data, ...obj, tare_weight , extra_weight });
            Modal.confirm({
                title: `Do you want to print barcode for ${data.product_code}?`,
                content: <div style={{ marginRight: '10%', marginLeft: '-10%' }}><img src={`http://api.labelary.com/v1/printers/8dpmm/labels/2.40157x0.669291/0/${barcodeFormat}${barcodeData}`} alt={data.product_code} style={{ maxWidth: 610, maxHeight: 170, width: '120%', height: 'auto', display: 'block' }}/></div>,
                onOk() {
                  const url = 'http://192.168.1.200:9100';
                  fetch(url, { method: "POST", body: barcodeData });
                },
                onCancel() {},
            });
        }).catch( ex => {
            console.log("ERROR: ", ex.message);
            Modal.error({
                title: 'Error Saving!',
                content: "Product couldn't be saved because of an error: ",
            });
        });
    }

    tareProductFormsRefs = [];
    extraProductFormsRefs = [];

    calculateExtraProducts = () => {
        let obj = calculateTotalExtraProduct(this.state.tare_weight, 'tare', this.tareProductFormsRefs, this.processExtraProductForm.bind(null, "tare_weight") );
        const { tareProductForms, ...otherTare } = obj;
        this.tareProductForms = tareProductForms;

        obj = calculateTotalExtraProduct(this.state.extra_weight, 'extra', this.extraProductFormsRefs, this.processExtraProductForm.bind(null, "extra_weight") );
        const { extraProductForms, ...otherExtra } = obj;
        this.extraProductForms = extraProductForms;

        return { ...otherTare, ...otherExtra }
    };

}

export default App