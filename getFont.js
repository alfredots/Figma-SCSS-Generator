import searchTree from './searchTree'

export default function (stylesArtboard) {
  // get "palette" artboard
  const tokens = {}
  const fontAtrboard = stylesArtboard.filter(item => {
      return item.name === "Font";
  });

  const tokensItems = fontAtrboard[0].children.filter(item => {
    return item.name.includes('$token')
  })

  //font sizes
  for (let item of tokensItems) {
    const fontName = searchTree(item,'$font')
    const fontValue = searchTree(item,'px')

    if(fontName && fontValue) {
      tokens[fontName.name] = fontValue.name
    }
  }

  //font sizes
  for (let item of tokensItems) {
    const fontName = searchTree(item,'$font-family')
    const fontValue = searchTree(item,'Variável')

    if(fontName && fontValue) {
      tokens[fontName.name] = fontValue.children[0].style.fontFamily
    }
  }

  //line height
  for (let item of tokensItems) {
    const fontName = searchTree(item,'$line-height')
    const fontVar = searchTree(item,'Variável')
    const fontValue = searchTree(fontVar,'%')

    if(fontName && fontValue) {
      tokens[fontName.name] = fontValue.name
    }
  }

  //line spacing
  for (let item of tokensItems) {
    
    const fontName = searchTree(item,'$letter-spacing')
    const fontVar = searchTree(item,'Variável')
    const fontValue = searchTree(fontVar,'px')

    if(fontName && fontValue) {
      tokens[fontName.name] = fontValue.name
    }
  }

  console.log(tokens)
  return tokens
}