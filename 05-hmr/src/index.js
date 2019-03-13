import _ from 'lodash';
import printMe from './print.js';
import './style.css';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the console!';
  //NOTE:This is happening because the button's onclick event handler is still bound to the original printMe function.闭包
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

let element = component(); // Store the element to re-render on print.js changes
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    document.body.removeChild(element);
     element = component(); // Re-render the "component" to update the click handler
     document.body.appendChild(element);
  })
}