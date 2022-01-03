import './App.css';

import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//region Dashboard components
import NavBar from "./components/dashboard/nav-bar";
import Sidebar from "./components/dashboard/sidebar";
import Footer from "./components/dashboard/footer";
//endregion

//region Auth pages
import LoginPage from "./components/pages/LoginPage";
//endregion

//region CRUD pages
import HomePage from "./components/pages/HomePage";
import CreateUserPage from "./components/pages/CreateUserPage";
import DetailUserPage from "./components/pages/DetailUserPage";
import EditUser from "./components/pages/EditUser";
//endregion

function App() {
    return (
        <Router>
            <>
                <header className="page-header" style={{display: 'flex', height: '100vh', overflow: 'scroll initial'}}>
                    <Sidebar/>
                </header>
                <section className="page-content">
                    <NavBar/>
                    <section className="mt-6">
                        {/* Home base root */}
                        <Route exact path="/">
                            <HomePage/>
                        </Route>
                        {/* List */}
                        <Route exact path="/users">
                            <HomePage/>
                        </Route>
                        {/* Create */}
                        <Route exact path="/users/create">
                            <CreateUserPage/>
                        </Route>
                        {/* Read */}
                        <Route exact path="/users/read/:user">
                            <DetailUserPage/>
                        </Route>
                        {/* Update */}
                        <Route exact path="/users/edit/:user">
                            <EditUser/>
                        </Route>
                        {/* Login */}
                        <Route exact path="/login">
                            <LoginPage/>
                        </Route>
                    </section>
                    <Footer/>
                </section>
            </>
        </Router>
    );
}

export default App;
