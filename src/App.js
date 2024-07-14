import React, { useState } from 'react';
import './App.css';
import Forms from './Forms';
import sampleUsers from './SampleUsers';
import { ProviderDashboard, PregnantDashboard, Dashboards } from './Dashboard.jsx';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [showRoleForm, setShowRoleForm] = useState(false);

    //const [users, setUsers] = useState([]);
    const [users, setUsers] = useState([...sampleUsers])
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedProfession, setSelectedProfession] = useState('');


    const handleLoginClick = () => {
        setShowLoginForm(true);
        setShowSignUpForm(false);
        setShowRoleForm(false);
    };

    const handleSignUpClick = () => {
        setShowLoginForm(false);
        setShowSignUpForm(true);
        setShowRoleForm(false);
    };

    const handleToggleForm = () => {
        setShowLoginForm(!showLoginForm);
        setShowSignUpForm(!showSignUpForm);
        setShowRoleForm(false);
    };

    const handleSignupFormSubmit = (e) => {
        e.preventDefault();
        if (users.length >= 4) {
            alert('User limit reached. No more sign-ups allowed.');
            return;
        }
        const newUser = {
            id: users.length + 1,
            firstname: e.target['signup-firstname'].value,
            middlename: e.target['signup-middlename'].value,
            lastname: e.target['signup-surname'].value,
            dob: e.target['signup-dob'].value,
            gender: e.target['signup-gender'].value,
            country: e.target['signup-country'].value,
            email: e.target['signup-email'].value,
            phone: e.target['signup-phone'].value,
            username: e.target['signup-username'].value,
            password: e.target['signup-password'].value,
            role: null,
            isLoggedIn: true,
            dashboard: '',
        };

        setUsers([...users, newUser]);
        setShowSignUpForm(false);
        setShowRoleForm(true);
        setIsLoggedIn(true);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const username = e.target['login-username'].value;
        const password = e.target['login-password'].value;
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            alert('Login successful');
            setIsLoggedIn(true);
            user.isLoggedIn = true;
        } else {
            alert('Invalid username or password');
        }
        setShowLoginForm(false);

    };


    const handleRoleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'role') {
            setSelectedRole(value);
            // Reset profession if the role is not 'provider'
            if (value !== 'provider') {
                setSelectedProfession('');
            }
        } else if (name === 'profession') {
            setSelectedProfession(value);
        }
    };

    const handleRoleFormSubmit = (e) => {
        e.preventDefault();

        // Assuming new users are added at the end of the users array
        const newUserIndex = users.length - 1; // Index of the new user
        const newUser = users[newUserIndex]; // Fetch the new user object


        //assign dashboard type for new user 
        let dashboard = '';
        if (selectedRole === 'provider') {
            dashboard = 'ProviderDashboard';
        } else if (selectedRole === 'pregnant') {
            dashboard = 'PregnantDashboard';
        } else {
            dashboard = ''; // Default dashboard for now 
        }

        // Update the role and additional details for the new user
        const updatedUsers = [...users];
        updatedUsers[newUserIndex] = {
            ...newUser,
            role: selectedRole,
            weeksPregnant: selectedRole === 'pregnant' ? e.target['weeks'].value : null,
            profession: selectedRole === 'provider' ? e.target['profession'].value : null,
            licenseNumber: selectedRole === 'provider' ? e.target['license'].value : null,
            dashboard: dashboard

        };
        setUsers(updatedUsers);
        alert(`Role: ${selectedRole}, Profession: ${selectedProfession}`);
        setShowRoleForm(false);

    };

    // Assuming a function to check user roles
    const getCurrentUser = () => {
        return users.find(user => user.isLoggedIn);
    };

    const currentUser = getCurrentUser();

    const Dashboards = ({ user }) => {
        switch (user.role) {
            case 'provider':
                return <ProviderDashboard user={user} />;
            case 'pregnant':
                return <PregnantDashboard user={user} />;
            default:
                return <div>No Dashboard Found</div>; // Handle other roles or errors
        }
    };

    return (
        <div>
            {!isLoggedIn && ( //Show welcome page as long as user is not logged in 
                <section id="section1">
                    <header>Welcome</header>
                    <p>Hello world for now!</p>
                    <button onClick={handleLoginClick}>Login</button>
                    <button onClick={handleSignUpClick}>Sign Up</button>
                </section>
            )}

            {/* Render dashboards component for current user */}
            {/* {users.map((user) => (
                <Dashboards key={currentUser.id} user={currentUser} />
            ))} */}

            {currentUser && currentUser.role ? (
                <Dashboards key={currentUser.id} user={currentUser} />
            ) : null}


            <Forms users={users} setUsers={setUsers} setIsLoggedIn={setIsLoggedIn}
                showLoginForm={showLoginForm}
                showSignUpForm={showSignUpForm}
                showRoleForm={showRoleForm}
                selectedRole={selectedRole}
                handleToggleForm={handleToggleForm}
                handleRoleChange={handleRoleChange}
                handleRoleFormSubmit={handleRoleFormSubmit}
                handleSignupFormSubmit={handleSignupFormSubmit}
                handleLoginSubmit={handleLoginSubmit}
            />

            {/* code to test registered users */}
            {/* <h2>Registered Users</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        {user.firstname} {user.lastname} - {user.username}
                        {user.isLoggedIn ? " (Logged In)" : " (Not Logged In)"}
                        {currentUser?.role ? `${currentUser.role}!` : "no role!"}
                    </li>
                ))}
            </ul> */}

        </div>
    );
};

export default App;
