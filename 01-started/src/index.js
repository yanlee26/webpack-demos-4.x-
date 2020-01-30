import _ from 'lodash';
import {foo} from './foo'

function component() {
  let element = document.createElement('div');
  console.log('log: ok')
  foo('ok');
  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());