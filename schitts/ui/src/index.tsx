import {StrictMode, Suspense} from 'react';
import {hydrate, render} from "react-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {I18nextProvider} from 'react-i18next';
import {RootStoreProvider} from "contexts";
import i18n from '@i18next';
import "./sass/app.scss";

import {  QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");

if (rootElement?.hasChildNodes()) {
    hydrate(
        <Suspense fallback={() => <span>loading...</span>}>
            <StrictMode>
                <RootStoreProvider>
                    <I18nextProvider i18n={i18n}>
                        <QueryClientProvider client={queryClient}>
                            <App />
                        </QueryClientProvider>
                    </I18nextProvider>
                </RootStoreProvider>
            </StrictMode>
        </Suspense>,
        rootElement
    );
} else {
    render(
        <Suspense fallback={() => <span>loading...</span>}>
            <StrictMode>
                <RootStoreProvider>
                    <I18nextProvider i18n={i18n}>
                        <QueryClientProvider client={queryClient}>
                            <App />
                        </QueryClientProvider>
                    </I18nextProvider>
                </RootStoreProvider>
            </StrictMode>
        </Suspense>,
        rootElement
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
