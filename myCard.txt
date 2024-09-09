import React from "react";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  stock: number;
}

const products: Product[] = [
  {
    id: 1,
    title: "Smartphone",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img14.png",
    price: 599.99,
    stock: 50,
  },
  {
    id: 2,
    title: "Laptop",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img14.png",
    price: 999.99,
    stock: 30,
  },
  {
    id: 3,
    title: "Headphones",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img14.png",
    price: 149.99,
    stock: 100,
  },
];

const ProductCard: React.FC<{ product: Product }> = ({ product: { title, image, price } }) => (
  <div className="flex flex-col items-start bg-white relative w-[200px]">
    <div className="w-full h-[200px] mb-2 relative overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
      />
      <button 
        className="absolute top-2 right-2 text-gray-600 hover:text-red-500
                   transition-transform duration-150 ease-in-out
                   active:scale-90"
        onClick={() => console.log(`Added ${title} to wishlist`)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
    <h2 className="text-sm font-normal text-gray-800 mb-1 px-2">{title}</h2>
    <p className="text-sm font-semibold text-gray-900 px-2 mb-8">${price.toFixed(2)}</p>
    <button 
      className="absolute bottom-2 right-2 bg-blue-500 text-white p-1.5 rounded-full 
                 transition-transform duration-150 ease-in-out 
                 active:scale-90 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      onClick={() => console.log(`Added ${title} to cart`)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </button>
  </div>
);

const ProductList: React.FC = () => (
  <section className="container mx-auto px-4 py-8 text-center">
    <h1 className="text-2xl font-bold mb-6">ALL COLLECTIONS</h1>
    <div className="flex flex-wrap justify-center gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
);

export default ProductList;
