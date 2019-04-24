function getBarcodeData( dataObj ) {
    console.log("D: ", dataObj);
    let { product_code, genericItem, machine_weight, gross_weight, tunch, hisab, total_tare_amount, extra_weight_average, tare_weight, extra_weight } = dataObj;

    // product_code = product_code.toUpperCase()
    genericItem.name = genericItem.name.substring(0,10)
    
    if(!total_tare_amount) total_tare_amount=''
    else total_tare_amount = (""+total_tare_amount).padStart(6)
    
    gross_weight = ("Gross: " + gross_weight).padStart(13)
    
    if(!extra_weight_average) extra_weight_average = 0
    extra_weight_average = Math.round(extra_weight_average*10).toString().padStart(3, '0')
    
    if(tunch === 92) tunch = 'A'
    else if(tunch === 80) tunch = 'C'
    
    hisab = hisab.padStart(5)

    let theli_no = '';
    let extraWeightLine = ["     ", "/","     "];   // 0 -> Setting Count // 1 -> Powai Count
    let tareWeightLines = [];

    tare_weight.some( ({ name, weight, price, unit }, index, _arr) => {
        if(/theli/i.test(name)) {
            theli_no = name.substring(9);
        } else if(/rfid/i.test(name)) {}
        else {
            const line = weight + "G:" + price + unit.substring(0,1);
            tareWeightLines.push(line.padStart(13));
            return tareWeightLines.length >= 3;
        }
        return false;
    });
    extra_weight.forEach(extraProduct => {
        if(/setting/i.test(extraProduct.name)) {
            extraWeightLine[0] = (extraProduct.quantity + extraProduct.unit.substring(0,1)).padStart(5);
        } else if(/powai/i.test(extraProduct.name)) {
            extraWeightLine[2] = (extraProduct.quantity + extraProduct.unit.substring(0,1)).padEnd(5);
        }
    });
    extraWeightLine = extraWeightLine.join('').padStart(12)
    
    const barcodeData = `
        ^XA
        ^XFE:JEWm5.ZPL^FS
        ^FN1^FD${product_code}^FS
        ^FN2^FD${product_code}^FS
        ^FN3^FDHA,${product_code}^FS
        ^FN4^FD${genericItem.name}^FS
        ^FN5^FD${total_tare_amount}^FS
        ^FN6^FD${machine_weight}^FS
        ^FN7^FD${gross_weight}^FS
        ^FN8^FD${product_code}-${extra_weight_average}^FS
        ^FN9^FD${tunch}^FS
        ^FN10^FD${theli_no}^FS
        ^FN11^FD${hisab}^FS
        ^FN12^FD${tareWeightLines[0] ? tareWeightLines[0] : ''}^FS
        ^FN13^FD${tareWeightLines[1] ? tareWeightLines[1] : ''}^FS
        ^FN14^FD${tareWeightLines[2] ? tareWeightLines[2] : ''}^FS
        ^FN15^FD${extraWeightLine}^FS
        ^XZ
    `;
    return barcodeData;
}

export default getBarcodeData;