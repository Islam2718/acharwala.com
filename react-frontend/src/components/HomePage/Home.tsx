import React from 'react';
import Slider from './Sections/Slider';
import Category from './Sections/Category';
import Products  from './Sections/Products';
import OfferProducts from './Sections/OfferProducts';
// import Form from './Sections/Form';
const product = {
  id: 1,
  name: 'Product Name',
  price: Number(),
  quantity: 1,
  thumb: 'https://example.com/product.jpg',
};
const App: React.FC = () => {
  return (
    <div className="App">
      <Slider />
      <Category/>
      <Products product={ product}/>
      <OfferProducts product={ product}/>
      {/* <Form/> */}
    </div>
  );
}

export default App;