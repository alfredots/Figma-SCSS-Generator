import searchTree from './searchTree'

export default function (stylesArtboard) {
  // get "palette" artboard
  const tokens = {}
  const fontAtrboard = stylesArtboard.filter(item => {
      return item.name === "Border";
  });

  const tokensItems = fontAtrboard[0].children.filter(item => {
    return item.name.includes('$token')
  })


  //font sizes
  for (let item of tokensItems) {
    const fontName = searchTree(item,'$border')
    const fontVar = searchTree(item,'Variável')
    const fontValue = searchTree(fontVar,'px')

    if(fontName && fontValue) {
      console.log(fontValue)
      tokens[fontName.name] = fontValue.name
    }
  }

  for (let item of tokensItems) {
    const fontName = searchTree(item,'$border')
    const fontVar = searchTree(item,'Variável')
    const fontValue = searchTree(fontVar,'%')

    if(fontName && fontValue) {
      console.log(fontValue)
      tokens[fontName.name] = fontValue.name
    }
  }

  console.log(tokens)
  return tokens
}