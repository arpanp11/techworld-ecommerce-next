import React from 'react';
import Link from 'next/link';

import { AiOutlineShopping } from 'react-icons/ai';
import { Cart } from './';
import { useStateContext } from '../context/stateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQty } = useStateContext();

  return (
    <div className='navbar-container'>
      {/* logo */}
      <p className='logo'>
        <Link href='/'>Tech World</Link>
      </p>

      {/* cart */}
      <button
        className='cart-icon'
        type='button'
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQty}</span>
      </button>

      {/* cart component */}
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
