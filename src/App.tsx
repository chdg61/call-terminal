import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import {ProviderAppWithRouter as ProviderApp} from './components/ProviderApp';
import { MainConnected } from './pages/Main';
import { RefillBalanceConnected } from './pages/RefillBalance';
import { LoaderConnected } from './components/Loader';
import { Alert } from './components/Alert';
import {NotFound} from "./components/NotFound";

class App extends React.Component {

    private get fallback(): NonNullable<React.ReactNode> {
        return (
            <div />
        );
    }

    render() {
        return (
            <React.Suspense fallback={this.fallback}>
                <BrowserRouter>
                    <ProviderApp>
                        <Switch>
                            <Route exact path="/" component={MainConnected} />
                            <Route path="/refill/:slug" component={RefillBalanceConnected} />
                            <Route component={NotFound} />
                        </Switch>
                        <Alert />
                        <LoaderConnected />
                    </ProviderApp>
                </BrowserRouter>
            </React.Suspense>
        );
    }
}

export default App;
