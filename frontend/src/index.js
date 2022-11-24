import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import {StoreProvider} from "./Store";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StoreProvider>
        <HelmetProvider>
            <PayPalScriptProvider deferLoading={true}>
                <App />
            </PayPalScriptProvider>
        </HelmetProvider>
    </StoreProvider>
);


