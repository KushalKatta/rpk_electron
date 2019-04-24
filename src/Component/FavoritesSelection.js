import React, { Component } from 'react';
import { favoritesTareWeight, favoritesExtraWeight } from '../util/util';
import FavoritesList from './FavoritesList';

class App extends Component {

  state = { selectedItem: null };

  rfidFavorites = [];
  theliFavorites = []
  sidePowaiFavorites = []
  otherFavorites = []
  settingStoneFavorites = []
  powaiStoneFavorites = []

  componentWillMount() {
    const { arrayName } = this.props;
    let favoritesArray = [];
    if(arrayName === 'Tare') favoritesArray = favoritesTareWeight
    else if(arrayName === 'Extra') favoritesArray = favoritesExtraWeight
    favoritesArray.forEach(obj => {
      if( /RFID/i.test(obj.name) || /Tag/i.test(obj.name) )
        this.rfidFavorites.push({...obj, lock_gross_weight: true})
      else if( /Theli/i.test(obj.name) )
        this.theliFavorites.push({...obj, lock_gross_weight: true})
      else if( /Side Powai/i.test(obj.name) )
        this.sidePowaiFavorites.push(obj)
      else if( /Setting Stone/i.test(obj.name) )
        this.settingStoneFavorites.push(obj)
      else if( /Powai Stone/i.test(obj.name) )
        this.powaiStoneFavorites.push(obj)
      else
        this.otherFavorites.push(obj)
    })
  }

  setSelectedItem = (selectedItem) => this.setState({ selectedItem });
  
  render() {
    const selectedItem = this.state.selectedItem;
    return (
      <div>
        <div>Favorites</div>
        <div className="scrolling-wrapper columnDirection" style={{ maxHeight: '10px' }}>
          <FavoritesList data={this.theliFavorites} name="Theli" state={{selectedItem, setSelectedItem: this.setSelectedItem}} {...this.props}/>
          <FavoritesList data={this.rfidFavorites} name="RFID" state={{selectedItem, setSelectedItem: this.setSelectedItem}} {...this.props}/>
          <FavoritesList data={this.sidePowaiFavorites} name="Side Powai" state={{selectedItem, setSelectedItem: this.setSelectedItem}} {...this.props}/>
          <FavoritesList data={this.settingStoneFavorites} name="Setting Stone" state={{selectedItem, setSelectedItem: this.setSelectedItem}} {...this.props}/>
          <FavoritesList data={this.powaiStoneFavorites} name="Powai Stone" state={{selectedItem, setSelectedItem:this.setSelectedItem}} {...this.props}/>
          <FavoritesList data={this.otherFavorites} name="Other" state={{selectedItem, setSelectedItem: this.setSelectedItem}} {...this.props}/>
        </div> 
      </div>
    )
  }
}

export default App;