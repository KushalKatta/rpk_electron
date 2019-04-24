import React, { Component } from 'react';
// import FavoritesSelection from './FavoritesSelection';
import TareWeight from './TareWeight';
import FavoritesSelection from './FavoritesSelection';
import { Modal } from 'antd';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

export default class TareWeightForm extends Component {
    state = {currentObj: null};

    changeFormValues = (currentObj) => {
        this.setState({currentObj});
    }

    submitForm = () => {
        this.form.getForm().validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.addExtraProduct(values);
                this.props.setShow(false);
            }
        });
    }

    render() {
        return (
            <Modal
                title={`Add ${ this.props.name } Weight Product`}
                centered
                width="80%"
                visible={true}
                onOk={()=>this.submitForm()}
                onCancel={() => this.props.setShow(false)}
            >
                <div className="row" direction="row" pad="small" gap="medium">
                    <div className="column">
                        <TareWeight submitForm={this.submitForm} ref={ ref=>this.form=ref } currentObj={this.state.currentObj} />
                    </div>
                    <div className="column">
                        <FavoritesSelection submitForm={this.submitForm} changeFormValues={this.changeFormValues} arrayName={this.props.name} />
                    </div>
                </div>
            </Modal>
        );
    }

    
}