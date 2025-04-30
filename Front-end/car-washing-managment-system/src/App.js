import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/LoginPage';
import UserDashboard from './components/User_UI/UserDashboard';
import EmpDashboard from './components/Emp_UI/EmpDashboard';
import UserForm from './components/User_UI/UserForm';
import EmpForm from './components/Emp_UI/EmpForm';
import SlotBooking from './components/User_UI/SlotBooking';
import BookingHistory from './components/User_UI/BookingHistory';
import { Routes, Route } from "react-router-dom";
import TodaysTask from './components/Emp_UI/TodaysTask';
import CancelBooking from './components/Emp_UI/CancelBooking';
import SearchByName from './components/Emp_UI/SearchByName';
import SearchByStatus from './components/Emp_UI/SearchByStatus';
import UserProfile from './components/User_UI/UserProfile';
import EmpProfile from './components/Emp_UI/EmpProfile';
import AdminDashboard from './components/Admin_UI/AdminDashboard';
import UpdateUser from './components/Admin_UI/UpdateUser';
import EmpHistory from './components/Emp_UI/EmpHistory';
import RequestedList from './components/Admin_UI/RequestedList';
import SearchByID from './components/Emp_UI/SearchByID';

function App() {
  return (
   
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/user-dashboard" element={<UserDashboard />}/>
        <Route path="/emp-dashboard" element={<EmpDashboard/>}/>
        <Route path="/user-form" element={<UserForm/>}/>
        <Route path="/emp-form" element={<EmpForm/>}/>
        <Route path="/user-dashboard/slot-booking" element={<SlotBooking/>}/>
        <Route path="/user-dashboard/history" element={<BookingHistory/>}/>
        <Route path="/emp-dashboard/todayTask" element={<TodaysTask/>}/>
        <Route path="/emp-dashboard/cancelBooking" element={<CancelBooking/>}/>
        <Route path="/emp-dashboard/searchByName" element={<SearchByName/>}/>
        <Route path="/emp-dashboard/searchByStatus" element={<SearchByStatus/>}/>
        <Route path="/user-dashboard/profile" element={<UserProfile/>}/>
        <Route path="/emp-dashboard/profile" element={<EmpProfile/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="/admin-dashboard/UserUpdate" element={<UpdateUser/>}/>
        <Route path="/admin-dashboard/AddUser" element={<UserForm/>}/>
        <Route path="/admin-dashboard/AddEmployee" element={<EmpForm/>}/>
        <Route path="/emp-dashboard/history" element={<EmpHistory/>}/>
        <Route path="/admin-dashboard/TodayTask" element={<TodaysTask/>}/>
        <Route path="/admin-dashboard/BookingCancel" element={<CancelBooking/>}/>
        <Route path="/admin-dashboard/requested-list" element={<RequestedList/>}/>
        <Route path="/admin-dashboard/seachName" element={<SearchByName/>}/>
        <Route path="/admin-dashboard/status" element={<SearchByStatus/>}/>
        <Route path="/admin-dashboard/searchByID" element={<SearchByID/>}/>
        <Route path="/emp-dashboard/searchByID" element={<SearchByID/>}/>
      </Routes>
    
  );
}

export default App;
