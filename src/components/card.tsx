import React from "react";

export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  stock: number;
  category: string;
  rating: number; 
  discount?: number; 
}


const ProductCard: React.FC<{ product: Product }> = ({ 
  product: { title, image, price, stock, rating, discount } 
}) => {
  const finalPrice = discount ? price - (price * (discount / 100)) : price;

  return (
    <div className="flex flex-col items-start bg-gray-100 relative w-[250px] p-4 rounded-lg shadow-lg">
      <div className="w-full h-[200px] mb-2 relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
        <button 
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 transition-transform duration-150 ease-in-out active:scale-90"
          onClick={() => console.log(`Added ${title} to wishlist`)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <h2 className="text-sm font-normal text-gray-800 mb-1 px-2">{title}</h2>

      {/* Rating */}
      <div className="flex items-center text-sm text-yellow-400 mb-1 px-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            fill={index < Math.floor(rating) ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      {/* Stock Status */}
      <p className={`text-sm font-medium px-2 mb-1 ${stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
        {stock > 0 ? 'In Stock' : 'Out of Stock'}
      </p>

      {/* Price and Discount */}
      <p className="text-sm font-semibold text-gray-900 px-2 mb-8">
        ${finalPrice.toFixed(2)}{" "}
        {discount ? <span className="line-through text-red-500   ml-2">${price.toFixed(2)}</span> : ''}
      </p>
      
      <button 
        className="absolute bottom-2 right-2 bg-blue-500 text-white p-1.5 rounded-full transition-transform duration-150 ease-in-out active:scale-90 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => console.log(`Added ${title} to cart`)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </button>
    </div>
  );
};


const ProductList: React.FC<{ products: Product[] }> = ({ products }) => (
  <section className="container mx-auto px-4 py-8 text-center">
    {/* <h1 className="text-2xl font-bold mb-6">ALL COLLECTIONS</h1> */}
    <div className="flex flex-wrap justify-center gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
);

export default ProductList;
