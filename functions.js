function countDecimals (number, decimalIndex) {
    decimalIndex = number.toString().indexOf('.');
    return decimalIndex >= 0 ? number.toString().length - decimalIndex - 1 : 0;
  }



module.exports = countDecimals