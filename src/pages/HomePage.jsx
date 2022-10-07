import { Button } from 'react-bootstrap'

import iconsCloud from '../data/icons.json'

function HomePage() {
  return (
    <div className="container">
      <div className="d-flex flex-column justify-content-between align-items-start col-12 m-" 
          style={{  
              backgroundImage: `url('/homeBg.png')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: '558px',
          }}>
            <h1 className='m-5' style={{  
              fontSize:'5rem',
              fontWeight:'bolder',
          }}>Foodie!</h1>
          {window.innerWidth > 400 && 
          <h2 className='m-5 col-2' style={{  
                  fontSize:'2rem',
                  fontWeight:'bolder',
              }}>Create your Business and bring your clients to you!
              </h2>}
          <div>
            <div className="d-flex flex-column justify-content-around">
            <div></div>
              
            </div>
              
          </div>
        </div>
        {window.innerWidth < 400 && <>
          <h2 className='m-auto col-11' style={{  
                  fontSize:'1.5rem',
                  fontWeight:'bolder',
              }}>Create your Business and bring your clients to you!
              </h2>
              <Button href='/signup' size='lg' className='mx-2 my-3'>Sign Up</Button>
              <Button href='/login'  size='lg' variant='outline-primary' className='mx-2 my-3'>Log In</Button></>
              }
    </div>
  );
}

export default HomePage;
