import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from "./store";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense('MzA4MDk0MkAzMjMwMmUzNDJlMzBWMVdXNVV4ckR0MkEyQmlLd2ZVZ3dHK0pGKzZaYlhUaWIyWFpLc0czWThBPQ==;MzA4MDk0M0AzMjMwMmUzNDJlMzBDOWZyc0hwTktWbzc5L0JkdzhJR2tPVnRlc2c5OHdrU09WYWwzOGN0TUcwPQ==;Mgo+DSMBaFt/QHRqVVhlWFpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQFljS35Rd0dnXHxcdX1VRg==;Mgo+DSMBPh8sVXJ0S0J+XE9BclRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS3pTdEVhWH1adXdXQGBZVw==;ORg4AjUWIQA/Gnt2VVhkQlFac1tJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxXdkdjW35cdHFWRGZeUEY=;NRAiBiAaIQQuGjN/V0Z+WE9EaFpGVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RckVhWX1fcnBQRWJaU0V0;MzA4MDk0OEAzMjMwMmUzNDJlMzBFZXlFUFo3Qnl2em5tK2dsUGdDcEUyOGM3Mm9ldGtuUENtNkFQWHRHOTk0PQ==;MzA4MDk0OUAzMjMwMmUzNDJlMzBsakRKZzZmck9JTm9FbkJzMm1COWhsWEMrUjVxbWVEUzAzaEkrQkVuUnI4PQ==;Mgo+DSMBMAY9C3t2VVhkQlFac1tJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxXdkdjW35cdHFWRGZUVUw=;MzA4MDk1MUAzMjMwMmUzNDJlMzBJVGNmNlBkZlRCdXkySnpIREdLNWJCZjhNNWZ1d091UThoZTQwczM2ZWc0PQ==;MzA4MDk1MkAzMjMwMmUzNDJlMzBPcXRIeTljZURCZjhCMVIwYmM2bnJWK2VRN3J2eUJqYThCWDN6bVB4dXNNPQ==;MzA4MDk1M0AzMjMwMmUzNDJlMzBFZXlFUFo3Qnl2em5tK2dsUGdDcEUyOGM3Mm9ldGtuUENtNkFQWHRHOTk0PQ==');


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={configureStore({})}>
    <React.Fragment>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </React.Fragment>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
