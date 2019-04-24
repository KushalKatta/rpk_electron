export default `
mutation CreateProduct($tunch: Float!, $hisab: String!, $machine_weight: Float!, $gross_weight: Float!, $net_weight: Float!, $generic_item__item_code: String!, $stone_type: [StoneTypeEnum!], $tare_weight: [ExtraProductCreateInput!], $extra_weight: [ExtraProductCreateInput!], $extra_weight_average: Float, $accurate: Boolean)
{
    createProduct(data: {
        tunch: $tunch,
        hisab: $hisab,
        machine_weight: $machine_weight,
        gross_weight: $gross_weight,
        net_weight: $net_weight,
        genericItem: {
            connect: {
                item_code: $generic_item__item_code
            }
        },
        stone_type: {
            set: $stone_type
        },
        tare_weight: {
          create: $tare_weight
        },
        extra_weight: {
          create: $extra_weight
        },
        extra_weight_average: $extra_weight_average,
        accurate: $accurate
    }){
      id
      product_code
      genericItem {
        name
      }
    }
}`