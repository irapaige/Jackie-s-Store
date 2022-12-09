import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import {useContext, useState} from 'react';
import { Store } from './Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import CartScreen from './screens/CartScreen';
import Container from 'react-bootstrap/Container';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import { LinkContainer } from 'react-router-bootstrap';

import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  const [sidebarIsOpen,setSidebarIsOpen]=useState(false)
  return (
    <BrowserRouter>
      <div>
        <ToastContainer position='bottom-center' limit={1} />
        <header>
          <Navbar bg='dark' variant='dark' expand='lg'>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>Jackie's Store</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto  w-100  justify-content-end'>
                  <Link to='/cart' className='nav-link'>
                    <img src={"/Images/shopping-cart.jpg"} alt={"shopping-cart"}/>
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg='danger'>
                        {cart.cartItems.reduce((a, c) => a + c.qty, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/orderhistory'>
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className='dropdown-item'
                        to='#signout'
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className='nav-link' to='/signin'>
                      Sign In
                    </Link>
                  )}
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/product/:slug' element={<ProductScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/signin' element={<SigninScreen />} />
              <Route path='/signup' element={<SignupScreen />} />
              <Route path='/shipping' element={<ShippingAddressScreen />} />
              <Route path='/payment' element={<PaymentMethodScreen />}></Route>

 <Route path='/' element={<HomeScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />

             
              <Route path='/order/:id' element={<OrderScreen />}></Route>
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/cart' element={<CartScreen />} />

              <Route path='/order/:id' element={<OrderScreen />}></Route>
              <Route
                path='/orderhistory'
                element={<OrderHistoryScreen />}
              ></Route>
            </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center'>All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
export default App;
