import React, { useState } from 'react';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
  AiFillStar,
} from 'react-icons/ai';

import { Product } from '../../components';
import { client, urlFor } from '../../lib/client';
import { useStateContext } from '../../context/stateContext';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;

  const [index, setIndex] = useState(0);

  const { qty, incrementQty, decrementQty, addToCart, setShowCart } =
    useStateContext();

  const buynowHandler = () => {
    addToCart(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          {/* image */}
          <div className='image-container'>
            <img
              src={urlFor(image && image[index])}
              alt='product'
              className='product-detail-image'
            />
          </div>
          {/* image carousle */}
          <div className='small-images-container'>
            {image &&
              image.map((image, idx) => (
                <img
                  key={idx}
                  src={urlFor(image)}
                  alt='product'
                  className={
                    idx === index ? 'small-image selected-image' : 'small-image'
                  }
                  onMouseEnter={() => setIndex(idx)}
                />
              ))}
          </div>
        </div>

        {/* product description */}
        <div className='product-detail-desc'>
          {/* name */}
          <h1>{name}</h1>
          {/* reviews */}
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          {/* details */}
          <h4>Details: </h4>
          <p>{details}</p>
          <p className='price'>${price}</p>
          {/* quantity */}
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decrementQty}>
                <AiOutlineMinus />
              </span>
              <span className='num'>{qty}</span>
              <span className='plus' onClick={incrementQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          {/* buttons */}
          <div className='buttons'>
            <button
              type='button'
              className='add-to-cart'
              onClick={() => addToCart(product, qty)}
            >
              Add to Cart
            </button>
            <button type='button' className='buy-now' onClick={buynowHandler}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* related/may like products */}
      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const products = await client.fetch(
    '*[_type == "product"] { slug {current} }'
  );

  const paths = products.map((product) => ({
    params: { slug: product.slug.current },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  // single product
  const product = await client.fetch(
    `*[_type == "product" && slug.current == "${slug}"][0]`
  );
  //   query all products
  const products = await client.fetch('*[_type == "product"]');

  return {
    props: {
      product,
      products,
    },
  };
};

export default ProductDetails;
