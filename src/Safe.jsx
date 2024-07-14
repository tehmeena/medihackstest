import React from 'react';
import './Safe.css';

const Safe = ({ users }) => {
    // Sample emergency contacts, replace with actual data
    const emergencyContacts = users.map(user => ({
        id: user.id,
        name: `${user.firstname} ${user.lastname}`
    }));

    const handleEmergencyContactChange = (e) => {
        const selectedContactId = parseInt(e.target.value);
        // Logic to handle selected emergency contact
        console.log(`Selected emergency contact ID: ${selectedContactId}`);
    };

    const handleSOSClick = () => {
        // Logic to trigger SOS alert
        console.log('SOS button clicked');
        // Example: Send alert to circle members and share location
        // Example: Initiate phone or video call to circle
    };

    return (
        <div className="safety-section">
            <h2>Safe Preferences</h2>
            <form>
                <label>
                    <input type="checkbox" name="locationPreference" />
                    Keep my location turned on to see resources near me
                </label>
                <br />
                <label>
                    Emergency Contact:
                    <select onChange={handleEmergencyContactChange}>
                        {emergencyContacts.map(contact => (
                            <option key={contact.id} value={contact.id}>
                                {contact.name}
                            </option>
                        ))}
                    </select>
                </label>
            </form>

            <div className="resource-of-the-week">
                <h2>Resource of the Week</h2>
                <p>
                    Insert YouTube link here
                </p>
            </div>

            <div className="local-tips">
                <h2>Local Tips and Guidelines for Emergencies</h2>
                <p>
                    Provide local emergency tips and guidelines here
                </p>
            </div>

            <div className="sos-button">
                <h2>SOS Button</h2>
                <button onClick={handleSOSClick}>
                    SOS - Alert Circle Members
                </button>
                <p>
                    If you're experiencing an emergency, this button will alert all members of your circle and share your location.
                    You can also make a phone or video call to your circle.
                </p>
            </div>
        </div>
    );
};

export default Safe;
