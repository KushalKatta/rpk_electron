import { GraphQLClient } from 'graphql-request'
import queryGenericItems from './queries/query.GenericItems';
import queryEnumStoneType from './queries/query.Enum.StoneType';
import queryEnumWeightUnit from './queries/query.Enum.WeightUnit';
import queryFavoritesExtraWeight from './queries/query.Favorites.ExtraWeight';
import queryFavoritesTareWeight from './queries/query.Favorites.TareWeight';
import mutationCreateProduct from './queries/mutate.CreateProduct';

const client = new GraphQLClient('http://192.168.1.100:4000/', { headers: {} })
export {client}


async function loadDataFromDatabase () {
    if(!genericItems) genericItems = await loadGenericItems();
    if(!enumStoneType) enumStoneType = await loadEnumStoneType();
    if(!enumWeightUnit) enumWeightUnit = await loadEnumWeightUnit();
    if(!favoritesExtraWeight) favoritesExtraWeight = await loadFavoritesExtraWeight();
    if(!favoritesTareWeight) favoritesTareWeight = await loadFavoritesTareWeight();
}

// let genericItems = null;
// let enumStoneType = null;
// let enumWeightUnit = null;
// let favoritesExtraWeight = null;
// let favoritesTareWeight = null;
let genericItems, enumStoneType, enumWeightUnit, favoritesExtraWeight, favoritesTareWeight;
export {genericItems, enumStoneType, enumWeightUnit, favoritesExtraWeight, favoritesTareWeight}

function loadGenericItems() {
    return client.request(queryGenericItems).then( data => data.genericItems )
}
function loadEnumStoneType() {
    return client.request(queryEnumStoneType).then( data => data.__type.enumValues.map(item=>item.name) )
}
function loadEnumWeightUnit() {
    return client.request(queryEnumWeightUnit).then( data => data.__type.enumValues.map(item=>item.name) )
}
function loadFavoritesExtraWeight() {
    return client.request(queryFavoritesExtraWeight).then( data => data.extraProducts )
}
function loadFavoritesTareWeight() {
    return client.request(queryFavoritesTareWeight).then( data => data.extraProducts )
}

// loadDataFromDatabase()

function getDatabaseStatus() {
    return loadDataFromDatabase();
}
export  { getDatabaseStatus }


function clearField(array) {
    array.forEach(tare_weight_obj=> {
        delete tare_weight_obj['amount'];
        delete tare_weight_obj['lock_gross_weight'];
    })

    // const newArray = array.map(({ amount, lock_gross_weight, ...keepAttrs}) => keepAttrs)
    // return newArray
}

function mutateCreateProduct(inputData) {
    clearField(inputData['tare_weight']);
    clearField(inputData['extra_weight']);
    console.log("inputData: ", inputData);
    delete inputData['total_tare_weight']
    delete inputData['total_tare_amount']
    delete inputData['total_extra_weight']
    delete inputData['total_extra_amount']

    return client.request(mutationCreateProduct, inputData)
    .then(data => data.createProduct);
}
export {mutateCreateProduct};



function isObjectEqual(objA, objB) {     
    // Create arrays of property names     
    var aProps = Object.getOwnPropertyNames(objA);     
    var bProps = Object.getOwnPropertyNames(objB);
    // If count of properties is different,     
    // objects are not equivalent     
    if (aProps.length !== bProps.length) {         
        return false;     
    }      
    for (var i = 0; i < aProps.length; i++) {         
         
         var propName = aProps[i];          
          // If values of same property are not equal,         
          // objects are not equivalent         
         if (objA[propName] !== objB[propName]) {             
             return false;         
         }     
    }
    // If we made it this far, objects     
    // are considered equivalent     
    return true; 
}
export { isObjectEqual }