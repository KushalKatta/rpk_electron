import React, { Component } from 'react';
import { Form, Radio, InputNumber } from 'antd';

class App extends Component {
    state = { disableTunch: true };

    render() {
        return (
            <Form.Item
                label="Tunch"
                wrapperCol={{ span: 18 }}
            >
                <Radio.Group defaultValue={92} onChange={this.handleChangeTunchRadio} style={{ width: '70%' }} >
                    <Radio value={92}>A</Radio>
                    <Radio value={80}>C</Radio>
                    <Radio value={''}>Other</Radio>
                </Radio.Group>
                {this.props.getFieldDecorator('tunch', {
                    initialValue: 92.0,
                    rules: [{ required: true, type: "number", message: 'Please select Tunch!' }],
                })(
                    <InputNumber disabled={this.state.disableTunch} min={0} max={100} step={0.1} style={{ width: '30%' }} />
                )}
            </Form.Item>
        );
    }

    handleChangeTunchRadio = (obj) => {
        let tunch = ''
        if(obj.target.value) {
            tunch = parseFloat(obj.target.value)
            if(!this.state.disableTunch)
                this.setState({disableTunch: true});
        } else {
            if(this.state.disableTunch)
                this.setState({disableTunch: false});
        }
        this.props.setFieldsValue({
            tunch
        });
    }
}

export default App;