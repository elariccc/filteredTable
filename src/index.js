import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './containers/app/index';

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);