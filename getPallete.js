import Color from './Color';
import searchTree from './searchTree'

function rgbToHex(data) {
  console.log(data.fills[0])
  const rgbToInt = (value) => { return Math.round(value * 255) }

  const intToHex = (int) => { 
      let hex = Number(int).toString(16);
      if (hex.length < 2) { hex = "0" + hex; }
      return hex;
  }

  const rgba = {
    r: rgbToInt(data.fills[0].color.r),
    g: rgbToInt(data.fills[0].color.g),
    b: rgbToInt(data.fills[0].color.b),
    a: data.fills[0].opacity
  }

  const red = intToHex(rgba.r);
  const green = intToHex(rgba.g);
  const blue = intToHex(rgba.b);
  const hexFinal = red+green+blue;
  if (rgba.a) {
    return `rgba(${hexFinal}, ${rgba.a.toFixed(2)})`
  } else {
    return `#${hexFinal}`
  }
}

export default function (stylesArtboard) {
  // get "palette" artboard
  const colorTokens = {}
  const paletteAtrboard = stylesArtboard.filter(item => {
      return item.name === "Color";
  });

  const colorsArtBoard = paletteAtrboard[0].children.filter(item => {
    return item.name.includes('$token')
  })

  for (let item of colorsArtBoard) {
    const description = searchTree(item,'description')
    const colorName = searchTree(description,'$color').name
    const colorVal = searchTree(item,'Color')
    colorTokens[colorName] = rgbToHex(colorVal)
  }

  console.log(colorTokens)
}