import { Auth0Provider } from '@auth0/auth0-react';
import { MainLayout } from './features/main-layout';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from "react-router-dom";
import store from './store';

function App() {
 
  return (
    <Provider store={store}>
      <Auth0Provider
          domain="dev-wp2qkhtvpo4miom1.us.auth0.com"
          clientId="wpeSbyQheJfZyO5B86m7c22Ds9mDEkys"
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}>
        <Router>
          <MainLayout />
        </Router>
      </Auth0Provider>
    </Provider>
  )
}

export default App;
