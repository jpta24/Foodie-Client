import { createContext, useState, useEffect, useContext } from 'react';

import languages from '../data/language.json';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/cart.context';
import axios from 'axios';

const AuthContext = createContext();

function AuthProviderWrapper(props) {
	const navigate = useNavigate();

	const { getCartData, setCart } = useContext(CartContext);
	// 1. State variables are initialized
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState(null);

	/* 
    Functions for handling the authentication status (isLoggedIn, isLoading, user)
    will be added here later in the next step
  */
	const storeToken = (token) => {
		localStorage.setItem('authToken', token);
	};

	const authenticateUser = (url) => {
		// Get the stored token from the localStorage
		const storedToken = localStorage.getItem('authToken'); // will return either the token or null
		// If the token exists in the localStorage
		if (storedToken) {
			// We must send the JWT token in the request's "Authorization" Headers
			axios
				.get(`${process.env.REACT_APP_SERVER_URL}/auth/verify`, {
					headers: { Authorization: `Bearer ${storedToken}` },
				})
				.then((response) => {
					// If the server verifies that JWT token is valid
					const user = response.data;
					// Update state variables
					setIsLoggedIn(true);
					setIsLoading(false);
					setUser(user);
					getCartData();
					if (url) {
						navigate(user.business
							? `/business-dashboard/${user.business.name
									.split(' ')
									.join('-')}`
							: `/user-dashboard/${user._id}`);
					}

					return axios.get(
						`${process.env.REACT_APP_SERVER_URL}/users/language/${user._id}`,
						{ headers: { Authorization: `Bearer ${storedToken}` } }
					);
				})
				.then((response) => {
					const lang = response.data;
					setLanguage(lang.lang);
				})
				.catch((error) => {
					// If the server sends an error response (invalid token)
					// Update state variables
					setIsLoggedIn(false);
					setIsLoading(false);
					setUser(null);
				}); //
		} else {
			// If the token is not available (or is removed)
			setIsLoggedIn(false);
			setIsLoading(false);
			setUser(null);
		}
	};

	const removeToken = () => {
		// Upon logout, remove the token from the localStorage
		localStorage.removeItem('authToken');
	};

	const logOutUser = () => {
		// To log out the user, remove the token
		removeToken();
		// and update the state variables
		authenticateUser();
		setCart(null);
	};

	// 3. Checks if we have a JWT token in localStorage
	// If yes, update our state variables accordingly
	// If not, update our state variable isLoading to false
	useEffect(() => {
		authenticateUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// LANGUAGE
	const [language, setLanguage] = useState('En');
	const changeLanguage = (lang) => {
		localStorage.setItem('lang', lang);
		if (user) {
			const storedToken = localStorage.getItem('authToken');
			const requestBody = { lang };
			axios
				.put(
					`${process.env.REACT_APP_SERVER_URL}/users/language/${user._id}`,
					requestBody,
					{ headers: { Authorization: `Bearer ${storedToken}` } }
				)
				.then(() => {
					setLanguage(lang);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			setLanguage(lang);
		}
		document.title = languages[0][lang].navbar.title;
	};
	useEffect(() => {
		if (user) {
			const storedToken = localStorage.getItem('authToken');
			axios
				.get(`${process.env.REACT_APP_SERVER_URL}/user/language/${user._id}`, {
					headers: { Authorization: `Bearer ${storedToken}` },
				})
				.then((response) => {
					const lang = response.data;
					setLanguage(lang.lang);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			const lang = localStorage.getItem('lang') || 'En';
			setLanguage(lang);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

    // DARK MODE
    const [isDark, setIsDark] = useState(true);
	
	const handleMode = (mode) => {
		localStorage.setItem('mode', mode);
		if (user) {
			const storedToken = localStorage.getItem('authToken');
			const requestBody = { mode};
			axios
				.put(
					`${process.env.REACT_APP_SERVER_URL}/users/mode/${user._id}`,
					requestBody,
					{ headers: { Authorization: `Bearer ${storedToken}` } }
				)
				.then(() => {
					setIsDark(mode);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			setIsDark(mode);
		}
	};
	useEffect(() => {
		if (user) {
			const storedToken = localStorage.getItem('authToken');
			axios
				.get(`${process.env.REACT_APP_SERVER_URL}/user/mode/${user._id}`, {
					headers: { Authorization: `Bearer ${storedToken}` },
				})
				.then((response) => {
					const mode = response.data;
					setIsDark(mode.mode);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			const mode = localStorage.getItem('mode') || true;
			setIsDark(mode);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				isLoading,
				user,
				storeToken,
				authenticateUser,
				logOutUser,
				language,
				changeLanguage,
                isDark,
                handleMode
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export { AuthProviderWrapper, AuthContext };
