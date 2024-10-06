
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Layout from '../components/Layout/Layout';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));

    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data));

    fetch('/api/slides')
      .then(response => response.json())
      .then(data => setSlides(data));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (

    <Layout title={'Home'}>

    
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
      {/* Hero Section */}
      <div className="hero-section mb-12">
        {slides.length > 0 ? (
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index} className="h-screen flex justify-center items-center">
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                  <h1 className="text-5xl font-bold text-white">{slide.title}</h1>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">No Slides Available</h2>
            <p className="text-lg">Please check back later for new slides.</p>
          </div>
        )}
      </div>

      {/* Featured Products Section */}
      <div className="featured-products-section mb-12">
        <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.slice(0, 8).map((product, index) => (
              <div key={index} className="bg-white shadow-md rounded p-4">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                <p className="text-lg mb-2">{product.price}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">No Featured Products Available</h2>
            <p className="text-lg">Please check back later for new products.</p>
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="categories-section mb-12">
        <h2 className="text-3xl font-bold mb-4">Categories</h2>
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="bg-white shadow-md rounded p-4">
                <h3 className="text-lg font-bold mb-2">{category.name}</h3>
                <p className="text-lg mb-2">{category.description}</p>
                <Link to={`/category/${category.slug}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View Category</Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">No Categories Available</h2>
            <p className="text-lg">Please check back later for new categories.</p>
          </div>
        )}
      </div>

      {/* Best Sellers Section */}
      <div className="best-sellers-section mb-12">
        <h2 className="text-3xl font-bold mb-4">Best Sellers</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.slice(8, 16).map((product, index) => (
              <div key={index} className="bg-white shadow-md rounded p-4">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                <p className="text-lg mb-2">{product.price}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">No Best Sellers Available</h2>
            <p className="text-lg">Please check back later for new products.</p>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="call-to-action-section mb-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
        <Link to="/shop" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start Shopping Now</Link>
      </div>
    </div>
    </Layout>
  );
};

export default Home;