import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
	const { isLoggedIn, logOutUser } = useContext(AuthContext);
    const navigate = useNavigate();

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container-fluid'>
				<Link className='navbar-brand' to='/'>
					<img
						src='/myIcon.png'
						alt=''
						width='35'
						height='35'
						className='d-inline-block align-text-top mx-4'
					/>
					<span>Foodie</span>
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<Link className='nav-link active' aria-current='page' to='#'>
								Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='#'>
								About Us
							</Link>
						</li>
						{/* <li className='nav-item dropdown'>
							<Link
								className='nav-link dropdown-toggle'
								to='#'
								id='navbarDropdown'
								role='button'
								data-bs-toggle='dropdown'
								aria-expanded='false'
							>
								Dropdown
							</Link>
							<ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
								<li>
									<Link className='dropdown-item' to='#'>
										Action
									</Link>
								</li>
								<li>
									<Link className='dropdown-item' to='#'>
										Another action
									</Link>
								</li>
								<li>
									<hr className='dropdown-divider' />
								</li>
								<li>
									<Link className='dropdown-item' to='#'>
										Something else here
									</Link>
								</li>
							</ul>
						</li> */}
					</ul>
                    <form className='d-flex'>
						<input
							className='form-control me-2'
							type='search'
							placeholder='Search'
							aria-label='Search'
						/>
						<button className='btn btn-outline-success' type='submit'>
							Search
						</button>
					</form>
					<div className='navbar-nav mb-2 mb-lg-0 me-4'>
						{isLoggedIn && (
							<>
								<Link className='nav-link' to='#'>
									Dashboard 📉
								</Link>
								<button className='btn btn-outline-success px-2 mx-2' type='submit'>
									Cart 🛒
								</button>
								<button className='btn btn-primary mx-2 px-4' type='submit' onClick={logOutUser}>
									Log Out
								</button>
							</>
						)}
						{!isLoggedIn && (
							<>
								<button className='btn btn-outline-success mx-2' type='submit'>
									Cart 🛒
								</button>
                                
								<button className='btn btn-outline-primary mx-2 px-4' type='submit' >
									Log In
								</button>
								<button className='btn btn-primary mx-2 px-4' type='submit' >
									Sing Up
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
