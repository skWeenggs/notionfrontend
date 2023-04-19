import './App.css';
import NavHeader from './Component/Pages/nav';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './Component/Pages/home';
import NotionPage from './Component/Constant/NotionPage';
import About from './Component/Pages/About';
import NotFound from './Component/Pages/notFound';
import Page from './Component/Pages/Page';
import PrivateComponent from './Component/Constant/PrivateComponent'
import Login from './Component/Pages/Authentication/Login';
import AdminComponent from './Component/Constant/AdminComponent';
import Dashboard from './Component/Admin/Dashboard';
import UserList from './Component/Admin/UserList';
import RegisterUser from './Component/Pages/RegisterUser';
import Blog from './Component/Pages/Blog';
import Helper from './Component/Pages/Helper';

function App() {
 
  return (
    <div className="App">
      <Router>
        <NavHeader />
        <Routes >
          {/* <Route element={<PrivateComponent />}> */}
            <Route path='/' element={<Home />}></Route>
            <Route path=':abc' element={<NotionPage  /> }  />
            <Route path='/docs' element={<Helper />}/>
            <Route path='/about' element={<About  /> }  />         
            <Route path='/blog' element={<Blog  /> }  />
          {/* </Route> */}
          <Route element={<AdminComponent />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/userlist' element={<UserList />} />
          </Route>
         <Route path='/' element={<Home />}></Route>
         <Route path='/register' element={<RegisterUser />} />
         <Route path='/templates' element={<Page  /> }  />
         <Route path='/login' element={<Login />}></Route>
         <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
