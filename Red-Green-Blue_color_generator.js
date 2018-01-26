//functions that produce a random color based on green, blue, or red
function colGen(color, opacity) {
  if(color === 'red') {
    var red = Math.floor(Math.random() * 100) + 155; //creates a red pixel value from 155-255
    var green = Math.floor(Math.random() * 75); //creates a green pixel value from 0-75
    var blue = Math.floor(Math.random() * 75); //creates a blue pixel value from 0-75
  }
  if(color === 'green') {
    var red = Math.floor(Math.random() * 75); //creates a red pixel value from 0-75
    var green = Math.floor(Math.random() * 100) + 155; //creates a green pixel value from 155-255
    var blue = Math.floor(Math.random() * 75); //creates a blue pixel value from 0-75
  }
  if(color === 'blue') {
    var red = Math.floor(Math.random() * 75); //creates a red pixel value from 0-75
    var green = Math.floor(Math.random() * 75); //creates a green pixel value from 0-75
    var blue = Math.floor(Math.random() * 100) + 155; //creates a blue pixel value from 155-255
  }

  var colString = 'rgba(' + red + ',' + green + ',' + blue + ',' + opacity + ')';
  return colString;
}
