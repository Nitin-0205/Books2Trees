import NewBook from './components/NewBook';
import BookHead from './components/BookHead'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookDetail from './components/BookDetail';
import BookByStatus from './components/BookByStatus';
import Profile from './components/Profile';
import ChangePass from './components/ChangePass';
import PdfView from './components/PdfView';
import Login, { ProtectedLogin, AuthApi } from "./containers/Login";
import OtpInput from './containers/OtpInput';
import NotFound from './components/NotFound';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
      
        <Route path='login/SubmitOtp' element={<OtpInput />}></Route>
      
        <Route path='/books' element={<BookHead />}> </Route>
      
        <Route exact path='/NewBook' element={<NewBook />} ></Route>
      
        <Route path='/Bookinfo/:bookid' element={<BookDetail />}></Route>
     
        <Route exact path='/Pending' element={<BookByStatus status="PENDING" />}></Route>
     
        <Route exact path='/Published' element={<BookByStatus status="PUBLISHED" />}></Route>

        <Route exact path='/Profile' element={<Profile/>}></Route>

        <Route exact path='/ChangePass' element={<ChangePass/>}></Route>

        <Route path  = '' element={<NotFound/>} ></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
