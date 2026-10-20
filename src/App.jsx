import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AIAssistant from './components/AIAssistant';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import UserDirectory from './pages/UserDirectory';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddPost from './pages/AddPost';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

export default function App(){
 return <div className="app-shell"><Navbar/><Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/users" element={<UserDirectory/>}/>
   <Route path="/users/:id" element={<UserProfile/>}/>
   <Route path="/login" element={<Login/>}/>
   <Route path="/signup" element={<Signup/>}/>
   <Route path="/add-post" element={<ProtectedRoute><AddPost/></ProtectedRoute>}/>
   <Route path="/admin" element={<ProtectedRoute adminOnly><Admin/></ProtectedRoute>}/>
   <Route path="*" element={<NotFound/>}/>
 </Routes><AIAssistant/></div>;
}
