import React, { useState } from 'react';

const Forms = () => {
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showSignUpForm, setShowSignUpForm] = useState(false);

    const handleToggleForm = () => {
        setShowLoginForm(!showLoginForm);
        setShowSignUpForm(!showSignUpForm);
    };

    const handleSignupFormSubmit = (event) => {
        event.preventDefault();

        // Validating form fields
        const firstname = event.target['signup-firstname'].value.trim();
        const surname = event.target['signup-surname'].value.trim();
        const dob = event.target['signup-dob'].value.trim();
        const gender = event.target['signup-gender'].value;
        const country = event.target['signup-country'].value;
        const email = event.target['signup-email'].value.trim();
        const phone = event.target['signup-phone'].value.trim();
        const username = event.target['signup-username'].value.trim();
        const password = event.target['signup-password'].value.trim();
        const termsChecked = event.target['terms'].checked;

        // Validating password
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%&*(),.?]).{10,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must contain at least one letter, one number, and one special symbol (!@#$%&*(),.?) and be at least 10 characters long.');
            return;
        }

        // Validating phone number (only numbers allowed)
        const phoneRegex = /^[0-9]+$/;
        if (!phoneRegex.test(phone)) {
            alert('Phone number must contain only numbers.');
            return;
        }

        // Validating username
        const usernameRegex = /^[a-zA-Z0-9][a-zA-Z0-9._]+$/; // Username can start with letter or number, can include ._
        if (!usernameRegex.test(username) || username.length < 2 || !/[a-zA-Z]/.test(username)) {
            alert('Username must include at least one letter and be at least two characters long. Usernames can only include letters, numbers, periods, and underscores.');
            return;
        }

        // Terms and Conditions checked
        if (!termsChecked) {
            alert('Please agree to the terms and conditions.');
            return;
        }

        // If all validations pass, you can proceed to handle form submission
        // For now, let's just log the data
        console.log('Form submitted successfully');
        // Here you can proceed with storing the user data or other actions

        // Example: Redirecting to another page or updating state to show a dashboard
        // For prototype, let's update the state to show a success message or redirect
        setShowSignUpForm(false);
        // Assuming you have a state to manage successful sign-up message or redirect
        // setSuccessfulSignUp(true);
    };

    const signupForm = () => (
        <div>
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
                    <option value="female">Woman</option>
                    <option value="male">Man</option>
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
                <input type="tel" id="signup-phone" name="signup-phone" required />

                {/* Username and Password Fields */}
                <h3>Please create a username and password.</h3>
                <p>Username must include at least one letter. Usernames can start with a letter or number and can only include letters, numbers, periods, and underscores.</p>
                <p>Passwords must contain at least one letter, one number, and one special symbol (!@#$%&*(),.?). Password must be 10 characters long.</p>

                <label htmlFor="signup-username">Username:</label>
                <input type="text" id="signup-username" name="signup-username" required />

                <label htmlFor="signup-password">Password:</label>
                <input type="password" id="signup-password" name="signup-password" required />

                {/* Terms and Conditions Checkbox */}
                <label>
                    <input type="checkbox" id="terms" required /> I agree to the terms and conditions
                </label>

                <button type="submit">Sign Up</button>
                <p>Already have an account? <button onClick={handleToggleForm}>Login</button></p>
            </form>
        </div>
    );

    return (
        <div className="form-container">
            {showLoginForm && (
                <div>
                    <h2>Login</h2>
                    <form>
                        <label htmlFor="login-username">Username:</label>
                        <input type="text" id="login-username" name="login-username" required />

                        <label htmlFor="login-password">Password:</label>
                        <input type="password" id="login-password" name="login-password" required />

                        <button type="submit">Login</button>
                        <p>Don't have an account? <button onClick={handleToggleForm}>Sign Up</button></p>
                    </form>
                </div>
            )}

            {showSignUpForm && signupForm()}
        </div>
    );
};

export default Forms;
