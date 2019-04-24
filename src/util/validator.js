import React from 'react';
import { Button, } from 'antd';
import TareWeight from '../Component/TareWeight';

const handleValidateWeight = (rule, weight, callback) => {
    if (!weight || weight <= 0 || weight !== parseFloat(weight)) {
        callback("Weight can't be negative")
    }

    callback()
}

const calculateTotalExtraProduct = (extraProductState, name, formCollection, formResubmission) => {
    let total_tare_weight__weight = 0, total_tare_weight__amount = 0, tareWeightObjs = [];
    if(extraProductState) {
        
        extraProductState.forEach((obj, index) => {
        total_tare_weight__weight += obj.weight
        total_tare_weight__amount += obj.amount
        tareWeightObjs.push(
            <div key={index} className="elevation-inverse scrolling-wrapper--div" style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10, }}>
                <Button
                    icon="close"
                    onClick={() => formResubmission(null, index) }
                />
                <TareWeight key={index} ref={ ref=>formCollection[index]=ref } currentObj={obj} submitForm={(obj)=>{ formResubmission(obj, index) }}/>
            </div>
        );
        })

        total_tare_weight__weight = Math.round(total_tare_weight__weight * 1000) / 1000
        total_tare_weight__amount = Math.round(total_tare_weight__amount)
    }
    
    return {
        [`total_${name}_weight`]: total_tare_weight__weight,
        [`total_${name}_amount`]: total_tare_weight__amount,
        [`${name}ProductForms`]: tareWeightObjs
    }
}


export { handleValidateWeight, calculateTotalExtraProduct }