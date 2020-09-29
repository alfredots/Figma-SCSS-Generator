import getPalette from './getPallete'
import getFont from './getFont'
import getBorder from './getBorder';

const request = require("request");
const secret = require('./secret');

const start = Date.now();
var options = { method: 'GET',
  url: 'https://api.figma.com/v1/files/Y2D4uEWjnrkz5ZeTmwXqRc',
  headers: 
   {'X-Figma-Token': secret["X-Figma-Token"] }
  };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  const data = JSON.parse(body).document.children
  
  const stylesArtboard = data.filter(item => {
      return item.name === "Tokens e Componentes";
  })[0].children;

  const baseTokeensJSON = {
      token: {
          grids: {},
          spacers: {},
          colors: {},
          fonts: {},
          borders: {}
      }
  };

  Object.assign(baseTokeensJSON.token.colors, getPalette(stylesArtboard));
  Object.assign(baseTokeensJSON.token.fonts, getFont(stylesArtboard));
  Object.assign(baseTokeensJSON.token.borders, getBorder(stylesArtboard));
  
  console.log(baseTokeensJSON);

  const end = Date.now();
  const time = ((end - start)/1000).toFixed(2)
  console.log('Completed in:', time + 's')
})
