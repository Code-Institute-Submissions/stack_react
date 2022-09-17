import './App.css';
import NewQuestionForm from './components/NewQuestionForm';
import { Routes, Route } from 'react-router-dom';
import QuestionList from './components/QuestionList';
import QuestionDetail from './components/QuestionDetail';
import AnswerDetail from './components/AnswerDetail';
import NewAnswerForm from './components/NewAnswerForm';
import EditQuestionForm from './components/EditQuestionForm';
import EditAnswerForm from './components/EditAnswerForm';
import ProfileList from './components/ProfileList';
import ProfileDetail from './components/ProfileDetail';
import Register from './components/Register';
import Login from './components/Login';
import Test from './components/Test';
import './api/axiosDefaults';
import NavBar from './components/NavBar';
import About from './components/About';
import PageNotFound from './components/PageNotFound';


function App() {
   return (
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/newquestion" element={<NewQuestionForm />} />
            <Route path="/editquestion/:id" element={<EditQuestionForm />} />
            <Route path="/newanswer" element={<NewAnswerForm />} />
            <Route path="/editanswer/:id" element={<EditAnswerForm />} />
            <Route path="/questions" element={<QuestionList />} />
            <Route path="/questions/:id" element={<QuestionDetail />} />
            <Route path="/answers/:id" element={<AnswerDetail />} />
            <Route path="/profiles" element={<ProfileList />} />
            <Route path="/profiles/:id" element={<ProfileDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<PageNotFound />} />
            <Route />
          </Routes>
        </div>
  );
}

export default App;
