import React, { useState, useEffect } from 'react';
import './Safety.css';

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
        console.log('SOS button clicked');
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
                    <select multiple onChange={handleHealthDataConsentChange}>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.firstname} {user.lastname}
                            </option>
                        ))}
                    </select>
                </label>
            </form>

            <button onClick={handleExportData}>Export my health data</button>
            <button onClick={handleExportAndDeleteData}>Export and delete my health data</button>
            <button onClick={handleDeleteData}>Delete my health data</button>
            <br />
            <button onClick={handleDeleteAccount}>Delete my account</button>

            <form onSubmit={handlePasskeySubmit}>
                <label>
                    Add passkey to access utilities:
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

            <div className="resource-of-the-week">
                <h3>Resource of the Week</h3>
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/tgbNymZ7vqY"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <div className="local-tips">
                <h2>Local Tips & Guidelines</h2>
                <ul>
                    <li>Know the location of the nearest hospitals and clinics.</li>
                    <li>Keep a list of emergency contacts and important phone numbers.</li>
                    <li>Prepare an emergency kit with essential supplies.</li>
                    <li>Stay informed about local weather conditions and alerts.</li>
                    <li>Have a plan for evacuating your home if necessary.</li>
                </ul>
            </div>

            <button className="sos-button" onClick={handleSOSClick}>SOS</button>
        </div>
    );
};

export default Safety;
