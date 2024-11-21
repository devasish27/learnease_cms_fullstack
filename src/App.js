import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { Navigate } from 'react-router-dom';
import LoginPage from './pages/home/login';
import HomePage1 from './pages/home/home1';
import HomePage2 from './pages/admin/home2';
import HomePage3 from './pages/student/stuhome';
import DetailsPage from './pages/home/details';
import AboutPage from './pages/home/about';
import Faculty from './pages/admin/staff';
import ContactUsPage from './pages/contact';
import BranchList from "./pages/admin/branch";
import Student from './pages/admin/student';
import StudentPage from './pages/admin/profile';
import HomePage4 from './pages/faculty/fachome';
import Branchl from './pages/student/stubranch'
// import Stu from './pages/student/stuprofile';
import Fac from './pages/student/stfaclty';
import PrivateRoute from './PrivateRoute';
import HOD from './pages/admin/hod';
import NotFound from './pages/errorpage';
import Library from './pages/student/library';
import HomePage5 from './pages/hod/hodhome';
import CreateQuiz from './pages/admin/createquiz';
import HodStudent from './pages/hod/hodstudent';
import HodFaculty from './pages/hod/hodfaculty';
import TakeQuiz from './pages/student/takequiz';
import  Dashboard  from './pages/admin/dashboard';
import Bran from './pages/faculty/facbranch';
import Facc from './pages/faculty/facltyy';
import Fstudent from './pages/faculty/facstudent';
import Dashboard2 from './pages/hod/hoddashboard';

function App() {
  
  return (
    <Router>

      <Routes>
      <Route path="/" element={<HomePage1 />} /> 
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/details" element={<DetailsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactUsPage />} />

      {/* Private Routes for role-based access */}
      <Route path="/home2" element={
        <PrivateRoute allowedRoles={['admins']}>
          <HomePage2 />
        </PrivateRoute>
      } />

      <Route path="/stuhome" element={
        <PrivateRoute allowedRoles={['students']}>
          <HomePage3 />
        </PrivateRoute>
      } />

      <Route path="/fachome" element={
        <PrivateRoute allowedRoles={['faculty']}>
          <HomePage4 />
        </PrivateRoute>
      } />

      <Route path="/hodhome" element={
        <PrivateRoute allowedRoles={['hod']}>
          <HomePage5 />
        </PrivateRoute>
      } />

      <Route path="/branch" element={<BranchList />} />
      <Route path="/student" element={<Student />} />
      <Route path="/staff" element={<Faculty />} />

      <Route path="/profile/:id" element={<StudentPage />} />
      <Route path="/stubranch" element={<Branchl />} />
      {/* <Route path="/stuprofile" element={<Stu />} /> */}
      <Route path="/stfaclty" element={<Fac />} />
      <Route path="/library" element={<Library />} />

      <Route path="/hod" element={<HOD />} />
      <Route path="/hodstudent" element={<HodStudent />} />
      <Route path='/hodfaculty' element={<HodFaculty />} />

      <Route path="/createquiz" element={<CreateQuiz/>} />
      <Route path='/takequiz' element={<TakeQuiz />} />

      <Route path="/facbranch" element={<Bran />} />
      <Route path="/facltyy" element={<Facc />} />
      <Route path='/facstudent' element={<Fstudent />} />

      <Route path='/dashboard' element={<Dashboard />} />
      <Route path="/hoddashboard" element={<Dashboard2 />} />


      </Routes>

    </Router>
  );
}

export default App;
