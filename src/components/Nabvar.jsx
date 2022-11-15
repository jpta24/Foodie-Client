import { Button, Nav, Navbar } from 'react-bootstrap'
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { CartContext } from '../context/cart.context';

import iconsCloud from '../data/icons.json'

const Nabvar2 = () => {
    const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
    const { cart } = useContext(CartContext)

  return (
    <Navbar className='px-4' bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect>
        <Navbar.Brand>
        <img src={iconsCloud[0].foodieIcon} width="40px" height="40px" alt='altLogo'/>{' '}
        Foodie
        </Navbar.Brand>

        <Navbar.Toggle className="coloring" />
        <Navbar.Collapse className='d-flex-lg justify-content-between '>
            <Nav>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#about-us">About Us</Nav.Link>
            </Nav>
            <Nav className='navbar-nav mb-2 mb-lg-0 me-4'>
            {/* <Nav.Link href="/markets">Markets 🏪</Nav.Link> */}
                {isLoggedIn && (
                    <>
                        <Nav.Link href="/dashboard">Dashboard 📉</Nav.Link>
                        <Button href={`/cart/${user._id}`} variant="outline-success" className='mx-2 my-1 position-relative' >Cart 🛒
                            {cart && cart.length > 0 &&
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success border border-dark">
                                {cart.map(prod=>prod.quantity).reduce((acc,val)=>{return acc + val},0)}
                                <span className="visually-hidden">unread messages</span>
                            </span>}
                        </Button>
                        <Button className='mx-2 my-1' onClick={logOutUser}>Log Out</Button>
                    </>
                )}
                {!isLoggedIn && (
                    <>
                        {/* <Button href='/cart' variant="outline-success" className='mx-2 my-1 position-relative'>Cart 🛒

                            {cart && cart.length > 0 &&
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success border border-dark">
                                {cart.length}
                                <span className="visually-hidden">unread messages</span>
                            </span>}
                        </Button> */}
                        <Button href='/login'  variant='outline-primary' className='mx-2 my-1'>Log In</Button>
                        <Button href='/signup'  className='mx-2 my-1'>Sign Up</Button>
                        
                    </>
                )}
            </Nav>
        </Navbar.Collapse>

    </Navbar>
  )
}

export default Nabvar2