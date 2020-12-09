import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Nav from './components/Nav';
import Loading from './components/Loading';
import { ThemeProvider } from './contexts/theme';

const Battle = React.lazy(() => import('./components/Battle'));
const Results = React.lazy(() => import('./components/Results'));
const Popular = React.lazy(() => import('./components/Popular'));

class App extends React.Component {

  state = {
    theme: 'dark',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light'
      }))
    }
  }

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />
              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path='/' component={Battle} />
                  <Route path='/results' component={Results} />
                  <Route path='/popular' component={Popular} />
                  <Route render={() => <h1>404</h1>} />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));