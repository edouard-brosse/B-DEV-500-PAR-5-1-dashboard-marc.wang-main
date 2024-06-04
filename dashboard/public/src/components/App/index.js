import '../../App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from '../Header'
import Landing from '../Landing'
import Footer from '../Footer'
import MainPage from '../MainPage'
import Login from '../Login';
import Register from '../Register'
import ErrorPage from '../ErrorPage';
import ForgetPassword from '../ForgetPassword';

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/MainPage" component={MainPage}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/forgetpassword" component={ForgetPassword}/>
        <Route component={ErrorPage}/>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;