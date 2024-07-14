import React from 'react';

//ProviderDashboard 
const ProviderDashboard = ({ user }) => {
    const handleMessagesClick = () => {
        // Navigate to messages/chat functionality
        // Example: Implement routing or show specific chat component
    };

    return (
        <div>
            <h2>Welcome, {user.firstname}!</h2>
            <button onClick={handleMessagesClick}>Messages</button>
            {/* Add other tools or features for providers */}
        </div>
    );
};

// PregnantDashboard 
const PregnantDashboard = ({ user }) => {
    const handleMedicalRecordsClick = () => {
        // Navigate to medical records functionality
        // Example: Implement routing or show specific medical records component
    };

    return (
        <div>
            <h2>Welcome, {user.firstname}!</h2>
            <button onClick={handleMedicalRecordsClick}>Medical Records</button>
            {/* Add other tools or features for pregnant users */}
        </div>
    );
};

// Define Dashboards component to render based on user's dashboard property which is in the App.js 
const Dashboards = ({ user }) => {
    switch (user.dashboard) {
        case 'ProviderDashboard':
            return <ProviderDashboard user={user} />;
        case 'PregnantDashboard':
            return <PregnantDashboard user={user} />;
        default:
            return <div>No Dashboard Found</div>; // Handle other roles or errors
    }
};

export { ProviderDashboard, PregnantDashboard, Dashboards };
