module.exports = (template, {
  productName,
  image,
  quantity,
  price,
  country,
  nutrients,
  description,
  id,
  organic
}) => {
  // use a regular expression global to target all product names instances
  let output = template.replace(/{%PRODUCTNAME%}/g, productName)
  output = output.replace(/{%IMAGE%}/g, image)
  output = output.replace(/{%QUANTITY%}/g, quantity)
  output = output.replace(/{%PRICE%}/g, price)
  output = output.replace(/{%FROM%}/g, country)
  output = output.replace(/{%NUTRIENTS%}/g, nutrients)
  output = output.replace(/{%DESCRIPTION%}/g, description)
  output = output.replace(/{%ID%}/g, id)

  if (!organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
  }
  return output
}