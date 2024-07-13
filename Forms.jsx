import React from 'react';

const LoginForm = ({ handleToggleForm, handleLoginSubmit }) => (
    <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
            <label htmlFor="login-username">Username:</label>
            <input type="text" id="login-username" name="login-username" required />

            <label htmlFor="login-password">Password:</label>
            <input type="password" id="login-password" name="login-password" required />

            <button type="submit">Login</button>
            <p>Don't have an account? <button onClick={handleToggleForm}>Sign Up</button></p>
        </form>
    </div>
);

const SignUpForm = ({ handleToggleForm, handleSignupFormSubmit }) => (
    <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignupFormSubmit}>
            {/* Name Fields */}
            <h3>Please enter your full legal name.</h3>
            <label htmlFor="signup-firstname">Given Name (First Name):</label>
            <input type="text" id="signup-firstname" name="signup-firstname" required />

            <label htmlFor="signup-middlename">Middle Name:</label>
            <input type="text" id="signup-middlename" name="signup-middlename" />

            <label htmlFor="signup-surname">Surname (Last Name):</label>
            <input type="text" id="signup-surname" name="signup-surname" required />

            {/* DOB Field */}
            <h3>Please enter your date of birth</h3>
            <label htmlFor="signup-dob">Date of Birth:</label>
            <input type="date" id="signup-dob" name="signup-dob" required />

            {/* Gender */}
            <h3>Please enter your gender identity</h3>
            <select id="signup-gender" name="signup-gender" required>
                <option value="" disabled selected>Select your gender</option>
                <option value="woman">Woman</option>
                <option value="man">Man</option>
                <option value="transwoman">Transgender Woman</option>
                <option value="transman">Transgender Man</option>
                <option value="intersex">Intersex</option>
                <option value="twospirit">Two Spirit</option>
                <option value="non-binary">Non-Binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
                <option value="other">Other</option>
            </select>

            {/* Country */}
            <h3>Please enter your country of residence</h3>
            <select id="signup-country" name="signup-country" required>
                <option value="" disabled selected>Select your country</option>
                <option value="unitedstates">United States</option>
            </select>

            {/* Email Field */}
            <h3>Please enter a valid email address</h3>
            <label htmlFor="signup-email">Email:</label>
            <input type="email" id="signup-email" name="signup-email" required />

            {/* Phone Number */}
            <h3>Please enter a valid phone number</h3>
            <label htmlFor="signup-phone">Phone Number:</label>
            <input type="tel" id="signup-phone" name="signup-phone" pattern="[0-9]*" required />

            {/* Username and Password Fields */}
            <h3>Please create a username and password.</h3>
            <p>Username must include at least one letter. Usernames can start with a letter or number and can only include letters, numbers, periods, and underscores.</p>
            <p>Password must be 8-20 characters long and include at least one letter, one number, and one of the following special symbols: !@#$%&*(),.?</p>

            <label htmlFor="signup-username">Username:</label>
            <input type="text" id="signup-username" name="signup-username" pattern="[a-zA-Z0-9][a-zA-Z0-9_\.]{1,}" minLength="2" required />

            <label htmlFor="signup-password">Password:</label>
            <input type="password" id="signup-password" name="signup-password" pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%&*(),.?])[A-Za-z\d!@#$%&*(),.?]{8,20}$" required />

            {/* Terms and Conditions Checkbox */}
            <label>
                <input type="checkbox" required /> I agree to the terms and conditions
            </label>

            <button type="submit">Sign Up</button>
            <p>Already have an account? <button onClick={handleToggleForm}>Login</button></p>
        </form>
    </div>
);

const RoleForm = ({ selectedRole, selectedProfession, handleRoleChange, handleRoleFormSubmit }) => (
    <div className="form-container">
        <h2>Select Your Role</h2>
        <form onSubmit={handleRoleFormSubmit}>
            <div id="role-selection">
                <label htmlFor="role">Select Your Role:</label>
                <select id="role" name="role" value={selectedRole} onChange={handleRoleChange} required>
                    <option value="" disabled>Select your role</option>
                    <option value="pregnant">Pregnant</option>
                    <option value="provider">A Healthcare Provider or Healthcare Support Professional</option>
                    <option value="friendfamily">A friend or family member</option>
                    <option value="member">A member of an organization, non-profit, or company</option>
                    <option value="learner">Someone who wants to learn more</option>
                </select>
            </div>

            {/*role-specific questions based on the selected role */}
            {selectedRole === 'pregnant' && (
                <div id="pregnant-questions">
                    <label htmlFor="weeks">How many weeks have you been pregnant?</label>
                    <input type="number" id="weeks" name="weeks" />
                </div>
            )}

            {selectedRole === 'provider' && (
                <div id="provider-questions">
                    <h3>Please select your profession</h3>
                    <select id="profession" name="profession" value={selectedProfession} onChange={handleRoleChange} required>
                        <option value="" disabled>Select your profession</option>
                        <option value="physician">Medical Physician</option>
                        <option value="naturopathic">Naturopathic Doctor</option>
                        <option value="np">Nurse Practitioner</option>
                        <option value="aprn">Advanced Practice Registered Nurse</option>
                        <option value="nurse">Nurse</option>
                        <option value="nursemidwife">Nurse Midwife</option>
                        <option value="midwife">Non-Nurse Midwife</option>
                        <option value="aide">Nurse or Home Health Aide</option>
                        <option value="physicaltherapist">Physical Therapist</option>
                        <option value="occupationaltherapist">Occupational Therapist</option>
                        <option value="chiro">Chiropractor</option>
                        <option value="socialworker">Social Worker</option>
                        <option value="doula">Doula</option>
                        <option value="dietitian">Dietitian</option>
                        <option value="nutritionist">Nutritionist</option>
                    </select>

                    <label htmlFor="license">Please enter your license number</label>
                    <input type="text" id="license" name="license" />
                </div>
            )}

            {/* shows submit button only when a role is selected */}
            {selectedRole && (
                <button type="submit">Submit</button>
            )}
        </form>
    </div>
);

const Forms = ({
    showLoginForm,
    showSignUpForm,
    showRoleForm,
    selectedRole,
    selectedProfession,
    handleToggleForm,
    handleRoleChange,
    handleRoleFormSubmit,
    handleSignupFormSubmit,
    handleLoginSubmit
}) => {
    return (
        <>
            {showLoginForm && <LoginForm handleToggleForm={handleToggleForm} handleLoginSubmit={handleLoginSubmit} />}
            {showSignUpForm && <SignUpForm handleToggleForm={handleToggleForm} handleSignupFormSubmit={handleSignupFormSubmit} />}
            {showRoleForm && <RoleForm selectedRole={selectedRole} selectedProfession={selectedProfession} handleRoleChange={handleRoleChange} handleRoleFormSubmit={handleRoleFormSubmit} />}
        </>
    );
};

export default Forms;
