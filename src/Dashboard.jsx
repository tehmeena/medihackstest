import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Calendar from './Calendar.jsx';
import Map from './Map.jsx';
import './Safety.css';
import './ToolKit.css';
import contactsIcon from './directory.png';
import circleIcon from './circle.png';
import commIcon from './communitybrown.png';
import './CommunityFeed.css';
import './chatbox.css'

//This is the dashboard code where every user gets redirected by logging or by completing the sign up process. 
//The dashboard has a few components:
// a community feed where they get updates and connect with others
// their profile, which also contains a randomly set invite code that they can share with others to connect with them 
// a map/calendar tab where they can keep track of appointments, events, and see what resources are near them or if any events are happening nearby 
//a safety section - which includes local tips and guidelines tailored to the user's location (in this case I'm just using some info relevant to NYC)
//the safety section also can include training modules or educational resources, as well as an SOS feature
//there's also a ToolKit section to keep record of all important documents, notes, and health trackers 

//the features of the dashboard are common to different types of users, but there would be some specific characteristics of the dashboard...
//...depending on the user's selected role. 


// Menu component for displaying navigation buttons
const Menu = ({ onSelect }) => {
    return (
        <div className="menu">
            <button onClick={() => onSelect('profile')}>Profile</button>
            <button onClick={() => onSelect('communityFeed')}>Community Feed</button>
            <button onClick={() => onSelect('safety')}>Safety</button>
            <button onClick={() => onSelect('toolkit')}>ToolKit</button>
        </div>
    );
};

// Form component for submitting invite codes
const InviteCodeForm = ({ handleInviteCodeSubmit }) => {
    const [inviteCode, setInviteCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleInviteCodeSubmit(inviteCode);
        setInviteCode('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter invite code"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

// Component for rotating alerts which will go in the alerts container of the safety section of the dashboard 


// Directory component for displaying user's connections, which will go into the communityfeed section 



const Directory = ({ users }) => {
    return (
        <div className="directory">
            <h3>Directory</h3>
            <ul className="user-list">
                {users.map((user) => (
                    <li key={user.id} className="user-item">
                        <span className="user-name">{`${user.firstname} ${user.lastname}, `}</span>
                        <span className="user-role">{user.role}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};


const ChatBox = (user) => {
    // Dummy data for demonstration (replace with actual chat data)
    const conversations = [
        { id: 1, sender: 'You', message: 'Hello there!' },
        { id: 2, sender: 'Jane Smith', message: 'Hi John, how are you?' },
        { id: 3, sender: 'You', message: 'Im doing great, thanks!' },
        // Add more messages as needed
    ];



    return (
        <div className="chatbox-container">
            <h3 className="chatbox-title">Conversations</h3>
            <div className="chatbox">
                {conversations.map((message) => (
                    <div key={message.id} className="message">
                        <span className="sender">{message.sender}: </span>
                        <span className="text">{message.message}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};



{/* <div className="resource-of-the-week">
<div>
    <h2>Resource of the Week</h2>
    <a href="https://www.youtube.com/watch?v=YE0RoETf0DM">Click here if you cannot see the video below</a>
    <div className="youtube-video">
        <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/YE0RoETf0DM?si=4jB_FUOA5GJQpya-"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen></iframe>
    </div>
</div>
</div> */}



/***** BEGIN COMMUNITY FEED COMPONENT *******/
const CommunityFeed = ({ selectedRole, users }) => {
    const [activeWidget, setActiveWidget] = useState(null);

    const handleButtonClick = (index) => {
        setActiveWidget(index);
    };

    const Newsfeed = () => {
        return (
            <div className="newsfeed-container">
                <div className="discussion-forum">
                    <h2>Discussion Forum</h2>
                    <p>Start or join discussions about topics related to women's health.</p>
                    {/* Add forum components here */}
                </div>
                <div className="health-centers-article">
                    <h2>Women's Health Centers Near You</h2>
                    <p>Discover articles about women's health centers in your area.</p>
                    {/* Add article components here */}
                </div>
                <div className="youtube-video">
                    <h2>Featured YouTube Video</h2>
                    <div className="video-container">
                        <iframe
                            width="100%"
                            height="315"
                            src="https://www.youtube.com/embed/YE0RoETf0DM?si=4jB_FUOA5GJQpya-"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className="community-section">

            <div className="position-side">
                <div className="button-container">
                    <button className={`community-button ${activeWidget === 0 ? 'active' : ''}`} onClick={() => handleButtonClick(0)}>
                        <img src={contactsIcon} alt="Contacts Icon" />
                        My Contacts
                    </button>
                    <button className={`community-button ${activeWidget === 1 ? 'active' : ''}`} onClick={() => handleButtonClick(1)}>
                        <img src={circleIcon} alt="Circle Icon" />
                        My Circles
                    </button>
                    <button className={`community-button ${activeWidget === 2 ? 'active' : ''}`} onClick={() => handleButtonClick(2)}>
                        <img src={commIcon} alt="Community Icon" />
                        My Community
                    </button>
                </div>

                {/* Widget Container */}
                <div className="widget-container">
                    {activeWidget === 0 && (
                        <div className="widget">
                            <Directory users={users} />
                        </div>
                    )}

                    {activeWidget === 1 && (
                        <div className="widget">
                            <ChatBox />
                        </div>
                    )}

                    {activeWidget === 2 && (
                        <div className="widget">
                            <Newsfeed />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};








/***** END COMMUNITY FEED COMPONENT *******/







//  Profile content

const Profile = ({ user, handleInviteCodeSubmit }) => {
    return (
        <div className="profile-card">
            <h2>Profile</h2>
            <div className="profile-details">
                <p><span className="bold">First Name:</span> {user.firstname}</p>
                <p><span className="bold">Last Name:</span> {user.lastname}</p>
                <p><span className="bold">Date of Birth:</span> {user.dob}</p>
                <p><span className="bold">Gender:</span> {user.gender}</p>
                <p><span className="bold">Role:</span> {user.role}</p>
                {user.role === 'Provider' && <p><span className="bold">License Number:</span> {user.licenseNumber}</p>}
                {user.role === 'Pregnant' && <p><span className="bold">Weeks Pregnant:</span> {user.weeksPregnant}</p>}
                <p><span className="bold">Invite Code:</span> {user.inviteCode}</p>
            </div>
            <InviteCodeForm handleInviteCodeSubmit={handleInviteCodeSubmit} />
        </div>
    );
};


// const Safety = ({ users, user, emergencyContacts }) => {
//     <div classname="safety">
//         <Safety users={users} user={user} emergencyContacts={emergencyContacts} />

//     </div>

// };


//Safety section of the dashboard! Sorry for hard coding it here oops 
const Safety = ({ users }) => {
    const emergencyContacts = users.map(user => ({
        id: user.id,
        name: `${user.firstname} ${user.lastname}`
    }));

    const handleEmergencyContactChange = (e) => {
        const selectedContactId = parseInt(e.target.value);
        console.log(`Selected emergency contact ID: ${selectedContactId}`);
    };

    const handleSOSClick = () => {
        // Perform the notification action
        alert("All members of your circle have been notified. Head to your circle chat if you would like to make a phone or video call.");

        // Navigate back to the community section
        window.location.href = "#community-section"; // Replace with the actual ID of your community section
    };

    const handleHealthDataConsentChange = (e) => {
        const selectedUserId = parseInt(e.target.value);
        console.log(`Health data consent granted to user ID: ${selectedUserId}`);
    };

    const handleExportData = () => {
        const confirmation = window.confirm('Are you sure you wish to proceed? Make sure you have your records saved somewhere safe if you need them in the future.');
        if (confirmation) {
            console.log('Exporting health data');
        }
    };

    const handleExportAndDeleteData = () => {
        const confirmation = window.confirm('Are you sure you wish to proceed? Make sure you have your records saved somewhere safe if you need them in the future.');
        if (confirmation) {
            console.log('Exporting and deleting health data');
        }
    };

    const handleDeleteData = () => {
        const confirmation = window.confirm('Are you sure you wish to proceed? Make sure you have your records saved somewhere safe if you need them in the future.');
        if (confirmation) {
            console.log('Deleting health data');
        }
    };

    const handleDeleteAccount = () => {
        const confirmation = window.confirm('Are you sure you wish to delete your account?');
        if (confirmation) {
            console.log('Account deleted');
        }
    };

    const handlePasskeySubmit = (e) => {
        e.preventDefault();
        const passkey = e.target.passkey.value;
        console.log(`Passkey submitted: ${passkey}`);
    };

    const RotatingAlerts = () => {
        const alerts = [
            "Baby formula brand XYZ recall - Check your supplies for affected batches.",
            "Anonymous report of attack on ABC Hospital - Stay cautious if in the vicinity.",
            "Blood donation request at  MaternityClinic on 123 Street. Your donation can save a life."
        ];

        const [currentAlertIndex, setCurrentAlertIndex] = useState(0);


        // Automatically rotate alerts every 5 seconds
        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentAlertIndex((prevIndex) => (prevIndex + 1) % alerts.length);
            }, 3000);
            return () => clearInterval(interval);
        }, [alerts.length]);

        return <p>{alerts[currentAlertIndex]}</p>;
    };

    return (
        <div className="safety-section">
            <h2>Safe Preferences</h2>
            <form>
                <label>
                    <input type="checkbox" name="locationPreference" />
                    Do you want to enable location services to find nearby resources and services? (You can also download data offline!)
                </label>
                <br />
                <label>
                    Select your emergency contact:
                    <select onChange={handleEmergencyContactChange}>
                        {emergencyContacts.map(contact => (
                            <option key={contact.id} value={contact.id}>
                                {contact.name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Who do you consent to share your health data with if necessary?
                </label>
                <div className="checkbox-list">
                    {users.map(user => (
                        <label key={user.id}>
                            <input
                                type="checkbox"
                                value={user.id}
                                onChange={handleHealthDataConsentChange}
                            />
                            {user.firstname} {user.lastname}
                        </label>
                    ))}
                </div>
            </form>
            <div className="safety-section">
                <h2>Safe Preferences</h2>
                <form>
                    {/* Other form elements */}
                </form>

                <div className="button-container">
                    <button className="safety-button" onClick={handleExportData}>Export my health data</button>
                    <button className="safety-button" onClick={handleExportAndDeleteData}>Export and delete my health data</button>
                    <button className="safety-button" onClick={handleDeleteData}>Delete my health data</button>
                    <button className="safety-button" onClick={handleDeleteAccount}>Delete my account</button>
                </div>

                {/* Rest of your safety section */}
            </div>

            <form onSubmit={handlePasskeySubmit}>
                <label>
                    Add password to safeguard your ToolKit:
                    <input type="text" name="passkey" />
                </label>
                <button type="submit">Submit</button>
            </form>

            <div className="info-container">
                <h2>Resources for Mothers in New York City</h2>
                <div className="info-card">
                    <h3>NYC Department of Health and Mental Hygiene:</h3>
                    <p>
                        <strong>Maternal and Child Health Services:</strong> Provides a range of services including prenatal care, breastfeeding support, and early childhood health. <br />
                        Website: <a href="https://www1.nyc.gov/site/doh/health/health-topics/maternal-infant-reproductive-health.page" target="_blank" rel="noopener noreferrer">NYC Health</a>
                    </p>

                    <h3>NYC Emergency Management:</h3>
                    <p>
                        <strong>Ready New York for Kids:</strong> Offers guides and resources tailored for families to prepare for emergencies. <br />
                        Website: <a href="https://www1.nyc.gov/site/em/ready/kids.page" target="_blank" rel="noopener noreferrer">NYC Emergency Management</a>
                    </p>

                    <h3>Family Shelters and Support:</h3>
                    <p>
                        <strong>Department of Homeless Services (DHS):</strong> Provides shelter and services for families in need. <br />
                        Website: <a href="https://www1.nyc.gov/site/dhs/index.page" target="_blank" rel="noopener noreferrer">NYC DHS</a> <br />
                        <strong>Homelessness Prevention:</strong> Call 311 for assistance with finding a family shelter or accessing emergency housing services.
                    </p>

                    <h3>Women, Infants, and Children (WIC) Program:</h3>
                    <p>
                        <strong>Nutritional Support:</strong> Offers nutritional assistance and counseling for pregnant women, new mothers, and young children. <br />
                        Website: <a href="https://www.health.ny.gov/prevention/nutrition/wic/" target="_blank" rel="noopener noreferrer">WIC Program</a>
                    </p>

                    <h3>Parenting and Family Support:</h3>
                    <p>
                        <strong>NYC Administration for Children's Services (ACS):</strong> Provides resources and programs for child welfare, family support, and foster care. <br />
                        Website: <a href="https://www1.nyc.gov/site/acs/index.page" target="_blank" rel="noopener noreferrer">NYC ACS</a>
                    </p>

                    <h3>Mental Health Services:</h3>
                    <p>
                        <strong>NYC Well:</strong> A confidential mental health support line providing counseling and referrals for mothers experiencing stress, anxiety, or postpartum depression. <br />
                        Phone: 1-888-NYC-WELL (1-888-692-9355) <br />
                        Website: <a href="https://nycwell.cityofnewyork.us/en/" target="_blank" rel="noopener noreferrer">NYC Well</a>
                    </p>

                    <h3>Emergency Situations Specific to NYC:</h3>
                    <h4>Severe Weather:</h4>
                    <p>
                        <strong>Evacuation Zones:</strong> Know your flood zone and have an evacuation plan. Visit <a href="https://www1.nyc.gov/site/em/ready/flooding.page" target="_blank" rel="noopener noreferrer">NYC Flood Hazard Mapper</a>. <br />
                        <strong>Cooling Centers:</strong> During heatwaves, find nearby cooling centers by calling 311 or visiting the <a href="https://www1.nyc.gov/site/em/ready/extreme-heat.page" target="_blank" rel="noopener noreferrer">NYC Cooling Centers webpage</a>.
                    </p>

                    <h4>Power Outages:</h4>
                    <p>
                        <strong>Backup Plans:</strong> Ensure you have battery-operated fans and a supply of non-perishable food that doesn't require cooking. <br />
                        <strong>NYC Emergency Management Alerts:</strong> Stay updated on power outages and restoration efforts via <a href="https://a858-nycnotify.nyc.gov/notifynyc/" target="_blank" rel="noopener noreferrer">Notify NYC</a>.
                    </p>

                    <h4>Public Health Emergencies:</h4>
                    <p>
                        <strong>Vaccinations:</strong> Keep up with recommended vaccinations for yourself and your children. <br />
                        <strong>Pandemic Preparedness:</strong> Follow guidelines from <a href="https://www1.nyc.gov/site/doh/covid/covid-19-main.page" target="_blank" rel="noopener noreferrer">NYC Health</a> for staying safe during outbreaks and pandemics.
                    </p>

                    <h3>Asiyah Women's Center:</h3>
                    <p>
                        <strong>Support for Women in Crisis:</strong> Provides a safe haven for women and children facing domestic violence or other crises. <br />
                        Website: <a href="https://www.asiyahwomenscenter.org/" target="_blank" rel="noopener noreferrer">Asiyah Women's Center</a>
                    </p>

                    <h3>Birthing Classes and Support:</h3>
                    <p>
                        <strong>NYC Health + Hospitals:</strong> Offers prenatal classes, breastfeeding support, and childbirth education at various locations. <br />
                        Website: <a href="https://www.nychealthandhospitals.org/patients-visitors/maternity/" target="_blank" rel="noopener noreferrer">NYC Health + Hospitals Maternity Services</a> <br />
                        <strong>NYC Department of Health:</strong> Provides information on local birthing classes and resources. <br />
                        Website: <a href="https://www1.nyc.gov/site/doh/health/health-topics/pregnancy-and-childbirth.page" target="_blank" rel="noopener noreferrer">NYC Pregnancy and Childbirth Resources</a>
                    </p>

                    <h3>Family Shelters and Support:</h3>
                    <p>
                        <strong>Department of Homeless Services (DHS):</strong> Provides shelter and services for families in need. <br />
                        Website: <a href="https://www1.nyc.gov/site/dhs/index.page" target="_blank" rel="noopener noreferrer">NYC DHS</a>
                    </p>
                </div>
            </div>

            <div className="bottom-container" id="alert">
                <h3>ALERTS</h3>
                <RotatingAlerts />
            </div>

            <button className="sos-button" onClick={handleSOSClick}>SOS</button>
            <p className="sos-text">In case of an emergency, pressing the SOS button will alert your circle members and share your location.</p>
        </div>
    );
};






//ToolKit section for tracker tools and record keeping of all sorts!  

const ToolKit = () => {
    const [trackerName, setTrackerName] = useState('');
    const [trackFrequency, setTrackFrequency] = useState('');
    const [syncToCalendar, setSyncToCalendar] = useState(false);
    const [trackerNotes, setTrackerNotes] = useState('');
    const [counterValue, setCounterValue] = useState(0);
    const [trackerList, setTrackerList] = useState([]);

    const handleSubmitTracker = (e) => {
        e.preventDefault();
        const newTracker = {
            name: trackerName,
            frequency: trackFrequency,
            syncToCalendar,
            notes: trackerNotes,
        };
        setTrackerList([...trackerList, newTracker]);
        setTrackerName('');
        setTrackFrequency('');
        setSyncToCalendar(false);
        setTrackerNotes('');
    };

    const handleCounterChange = (e) => {
        setCounterValue(e.target.value);
    };

    const incrementCounter = () => {
        setCounterValue((prevValue) => parseInt(prevValue) + 1);
    };

    const decrementCounter = () => {
        setCounterValue((prevValue) => (prevValue > 0 ? parseInt(prevValue) - 1 : 0));
    };

    return (
        <div className="toolkit-container">
            <div className="toolkit">
                {/* Dropdown menu for viewing options */}
                <div className="dropdown section">
                    <h3>View My Documents</h3>
                    <select>
                        <option value="medical_records">Medical Records</option>
                        <option value="antenatal_cards">Pregnancy Antenatal Cards</option>
                        <option value="receipts">Receipts</option>
                        <option value="scripts">Scripts</option>
                        <option value="referrals">Referrals</option>
                        <option value="reimbursements">Reimbursements</option>
                        <option value="patient_notes">Patient Notes</option>
                        <option value="health_insur">Health Insurance Card</option>
                        <option value="id_card">Identification Card</option>
                    </select>
                </div>

                {/* Tracker form */}
                <div className="tracker section">
                    <h3>Create Tracker</h3>
                    <form onSubmit={handleSubmitTracker}>
                        <label htmlFor="trackerName">What are you tracking?</label>
                        <input
                            type="text"
                            id="trackerName"
                            value={trackerName}
                            onChange={(e) => setTrackerName(e.target.value)}
                            required
                        />

                        <label htmlFor="trackFrequency">How often do you want to track it?</label>
                        <select
                            id="trackFrequency"
                            value={trackFrequency}
                            onChange={(e) => setTrackFrequency(e.target.value)}
                            required
                        >
                            <option value="">Select Frequency</option>
                            <option value="hourly">Hourly</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="bi-annually">Bi-Annually</option>
                            <option value="annually">Annually</option>
                        </select>

                        <label>
                            <input
                                type="checkbox"
                                checked={syncToCalendar}
                                onChange={(e) => setSyncToCalendar(e.target.checked)}
                            />
                            Would you like to sync your notes to your calendar?
                        </label>

                        <label htmlFor="trackerNotes">Notes</label>
                        <textarea
                            id="trackerNotes"
                            value={trackerNotes}
                            onChange={(e) => setTrackerNotes(e.target.value)}
                        />

                        <button type="submit">Create Tracker</button>
                    </form>
                </div>

                {/* Counter section */}
                <div className="counter section">
                    <h3>Counter</h3>
                    <label htmlFor="counterInput">Contractions/Baby kicks/Nausea...</label>
                    <input
                        type="number"
                        id="counterInput"
                        value={counterValue}
                        onChange={handleCounterChange}
                    />
                    <button onClick={incrementCounter}>+</button>
                    <button onClick={decrementCounter}>-</button>
                </div>

                {/* Display created trackers */}
                <div className="section">
                    <h3>Trackers</h3>
                    <ul className="tracker-list">
                        {trackerList.map((tracker, index) => (
                            <li key={index} className="tracker-item">
                                <h4>{tracker.name}</h4>
                                <p><strong>Frequency:</strong> {tracker.frequency}</p>
                                <p><strong>Sync to Calendar:</strong> {tracker.syncToCalendar ? 'Yes' : 'No'}</p>
                                <p><strong>Notes:</strong> {tracker.notes}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="toolkit-extras">
                <Calendar />
                <Map />
            </div>
        </div>
    );
};

const DashboardLayout = ({ user, users, setUsers, selectedRole

}) => {
    const [selectedSection, setSelectedSection] = useState('communityFeed');

    const handleInviteCodeSubmit = (inviteCode) => {
        console.log('Before handling invite submission:');
        console.log(`User ${user.username} has ${user.connections.length} connections.`);
        console.log('Received invite code:', inviteCode);
        const invitedUser = users.find(user => user.inviteCode === inviteCode.trim());
        console.log('Invited user details:', invitedUser);
        if (invitedUser) {
            // Notify the invited user
            alert(`${invitedUser.firstname} has been notified of your connection request.`);
            // Logic to notify the user and handle acceptance

            //invited user and inviter user get added to each other's connections 
            invitedUser.connections.push(user.username);
            user.connections.push(invitedUser.username);

            setUsers([...users]);
            console.log('After handling invite submission:');
            console.log(`User ${user.username} now has ${user.connections.length} connections.`);
            console.log(`Invited user ${invitedUser.username} now has ${invitedUser.connections.length} connections.`);

        } else {
            alert('Invalid invite code.');
        }
    };

    const emergencyContacts = users.map(user => ({
        id: user.id,
        name: `${user.firstname} ${user.lastname}`
    }));


    // Function to render content based on selected section
    const renderContent = () => {
        switch (selectedSection) {
            case 'profile':
                return <Profile user={user} handleInviteCodeSubmit={handleInviteCodeSubmit} />;
            case 'communityFeed':
                return <CommunityFeed selectedRole={selectedRole} user={user} users={users} Directory={Directory} />;
            case 'safety':
                return <Safety user={user} users={users} emergencyContacts={emergencyContacts} />;
            case 'toolkit':
                return <ToolKit user={user} users={users} setUsers={setUsers} />;
            default:
                return <CommunityFeed selectedRole={selectedRole} user={user} users={users} />;
        }
    };

    return (
        <div className="dashboard-layout">
            <Menu onSelect={setSelectedSection} />
            <div className="content-area">
                {renderContent()}
            </div>
        </div>
    );
};


const Dashboards = ({ user, users, handleInviteCodeSubmit, setUsers, selectedRole, emergencyContacts }) => {

    return <DashboardLayout
        user={user}
        handleInviteCodeSubmit={handleInviteCodeSubmit}
        users={users}
        setUsers={setUsers}
        selectedRole={selectedRole}
        emergencyContacts={emergencyContacts}>


    </DashboardLayout>;

};

export { Dashboards };