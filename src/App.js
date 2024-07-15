import React, { useState, useEffect } from 'react';
import './App.css';
import Forms from './Forms';
import sampleUsers from './SampleUsers';
import { Dashboards } from './Dashboard.jsx';
import welcomeImage from './MamaCircle2.png'
import communityImage from './community.png'
import calmapImage from './calmap2.png'
import safetyImage from './safety.png'
import notebookImage from './notebook.png'
import logo from './mamacirclelogo.png'

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [showRoleForm, setShowRoleForm] = useState(false);

    //const [users, setUsers] = useState([]);
    const [users, setUsers] = useState([...sampleUsers])
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedProfession, setSelectedProfession] = useState('');

    const [showWelcome, setShowWelcome] = useState(false);
    const [showImage, setShowImage] = useState(false);


    useEffect(() => {
        // Show the image after a short delay
        const imageTimeout = setTimeout(() => {
            setShowImage(true);
        }, 1000); // Delay for image fade-in

        // Hide the image after it fades out
        const contentTimeout = setTimeout(() => {
            setShowImage(false);
            setShowWelcome(true);
        }, 5000); // Total animation time

        return () => {
            clearTimeout(imageTimeout);
            clearTimeout(contentTimeout);
        };
    }, []);

    const handleLoginClick = () => {
        console.log('Initial sampleUsers invite codes:', sampleUsers.map(user => user.inviteCode));
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
        if (users.length >= 10) {
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
            inviteCode: generateInviteCode(),
            connections: [],
            circles: [],
            pendingInvitations: [],
        };

        setUsers([...users, newUser]);
        setShowSignUpForm(false);
        setShowRoleForm(true);
        setIsLoggedIn(true);
    };

    //Circle creation code below: 
    //didn't get to finish implementing some of this this in practice!
    //generates a random invite code that's set for the user so they can add other users as connections later 
    //the idea would be that users have connections and can invite people to join their "circle" [of support]
    const generateInviteCode = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const createCircle = (user, circleName, members) => {
        const newCircle = {
            name: circleName,
            members
        };
        user.circles.push(newCircle);
        setUsers([...users]); // Update users state
    };

    const handleCircleCreation = (circleName, members) => {
        const currentUser = users.find(user => user.isLoggedIn);
        createCircle(currentUser, circleName, members);
    };



    //End circle creation code stuff 

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

    //avoids some potential bugs that could come up when user is selecting their role just in case 
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

        // Update the role and additional details for the new user
        const updatedUsers = [...users];
        updatedUsers[newUserIndex] = {
            ...newUser,
            role: selectedRole,
            weeksPregnant: selectedRole === 'pregnant' ? e.target['weeks'].value : null,
            profession: selectedRole === 'provider' ? e.target['profession'].value : null,
            licenseNumber: selectedRole === 'provider' ? e.target['license'].value : null,
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



    return (
        <div>
            {!isLoggedIn && ( //Show welcome page as long as user is not logged in 
                <section id="welcome-section">
                    <div className="welcome-container">
                        {/* Background color */}
                        <div className="background-color"></div>


                        {/* Image container with fade animation */}
                        <div className={`image-container ${showImage ? 'fade-in-out' : ''}`}>
                            {showImage && <img src={welcomeImage} alt="Welcome Image" />}
                        </div>

                        {/* Welcome content */}
                        <div className={`welcome-content ${showWelcome ? 'fade-in' : ''}`}>
                            {showWelcome && (
                                <>
                                    <header id="welcomefont">Welcome to MamaCircle.</header>
                                    <h4>24/7 Resources and Support. Anywhere. Anytime.</h4>
                                    <div className="logo-container">
                                        <img src={logo} alt="Logo" className="logo" />
                                    </div>
                                    <div className="container-wrapper">
                                        {/* Container 1 */}
                                        <div className="welcome-item">
                                            {<img src={communityImage} alt="cartoon image of a community" />}
                                            <p>Invite your family members, providers, or even expecting friends into your circle and connect with your community. Share announcements and resources. Stay informed with weekly updates on your prenatal development. Receive critical safety alerts for your area, including local health advisories like prescription drug and food recalls.</p>
                                        </div>
                                        {/* Container 2 */}
                                        <div className="welcome-item">
                                            {<img src={calmapImage} alt="cartoon image of a calendar with a map pin" />}
                                            <p>Easy access to clinics and resources centers near you. Track all your appointments, and check out educational or community events near you.</p>
                                        </div>
                                        {/* Container 3 */}
                                        <div className="welcome-item">
                                            {<img src={safetyImage} alt="cartoon image safety shield with a plus cross in the middle" />}
                                            <p>Access training, health management tips, and emergency guidelines tailored to your community, online or offline. Built-in SOS system to alert your circle and community members to aid in life-saving care.</p>
                                        </div>
                                        {/* Container 4 */}
                                        <div className="welcome-item">
                                            {<img src={notebookImage} alt="cartoon image of a notebook with a heart on it" />}
                                            <p>Need a consolidated, organized tool to save your medical records, immunizations, pregnancy antenatal cards, receipts, scripts, and referrals? A place to track all your health trackers? We've got you covered.<br /><br />Are you healthcare provider?
                                                We've got tools for you to keep track of all your notes and documents too. </p>
                                        </div>
                                    </div>
                                    <button onClick={handleLoginClick}>Login</button>
                                    <button onClick={handleSignUpClick}>Sign Up</button>
                                </>
                            )}
                        </div>
                    </div>
                </section>
            )}


            {currentUser && currentUser.role ? (
                <Dashboards
                    users={users}
                    user={currentUser}
                    setUsers={setUsers}
                    key={currentUser.id}
                    selectedRole={selectedRole}
                    sampleUsers={sampleUsers}
                />
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
            {/* <h2>Registered Users</h2> */}
            {/* <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        {user.firstname} {user.lastname} - {user.username} {user.inviteCode}
                        {user.isLoggedIn ? " (Logged In)" : " (Not Logged In)"}
                        {user.role ? `${user.role}!` : "no role!"}
                        {user.inviteCode ? `${user.inviteCode}!` : "no code!"}
                        {user.pendingInvitations.length > 0 && (
                            <span> Pending Invitations: {user.pendingInvitations.length}</span>
                        )}
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default App;
