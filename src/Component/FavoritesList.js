import React from 'react';
import { List, Row, Col } from 'antd';

function App(props) {
    if(!props.data.length>0) return (null);
    return(
        <List
            style={{ marginBottom: 5 }}
            size="small"
            header={<div style={{ fontWeight: "bold", textAlign: "center" }}>{props.name}</div>}
            bordered
            dataSource={props.data}
            renderItem={renderListItem.bind(null, props.state.selectedItem, handleOnClick.bind(null, props))}
        />
    );

}
const handleOnClick = (props, values, submitClose) => {
    if (!('lock_gross_weight' in values)) values['lock_gross_weight'] = false;  // Set Default Value
    const {extraProduct_code, ...other} = values;
    const { state, changeFormValues, submitForm } = props;
    state.setSelectedItem(extraProduct_code);
    changeFormValues(other);
    if(submitClose) submitForm();

}

const renderListItem = (selectedItem, handleOnClick, values) => {
    const {extraProduct_code, name, price = 0, unit, weight="0"} = values;
    return (
      <List.Item
        onClick={() => { handleOnClick( values, false ) }}
        onDoubleClick={()=> { handleOnClick( values, true ) }}
        style={{ backgroundColor: `${selectedItem === extraProduct_code ? '#dff0f5' : 'transparent'}` }}
      >
        <Row gutter={2} type="flex" style={{ flex: 1 }}>
            <Col span={13} style={{ "textAlign":"left" }} >{ name }</Col>
            <Col span={4} style={{ "textAlign":"center" }} >{ unit }</Col>
            <Col span={7} style={{ "textAlign":"right" }} >{ weight>0 ? (price>0 ? weight + "@ ₹" + price : weight) : (price>0 ? "₹" + price : "") }</Col>
        </Row>
      </List.Item>
    )
  }

export default App;