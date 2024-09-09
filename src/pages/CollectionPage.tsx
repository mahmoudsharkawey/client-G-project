import { useEffect, useState } from "react";
import ProductList, { Product } from "../components/card";
import axios from "axios";

const CollectionPage = () => {
  useEffect(() => {
    // fetch products from backend
    axios.get('http://localhost:3000/product')
    .then(response => {
      setProducts(response.data);
      console.log(products)
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
  }, []);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  console.log(filteredProducts);
  const [sortOption, setSortOption] = useState("relevant");
  const [searchTerm, setSearchTerm] = useState("");
  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)? selectedCategories.filter((cat) => cat !== category): [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  useEffect(() => {
    let updatedProducts = [...products];

    // Filter products based on selected categories
    if (selectedCategories.length > 0) {
      updatedProducts = updatedProducts.filter((product) => selectedCategories.includes(product.category));
    }

    // Filter products based on search term
    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) => product.title.toLowerCase().includes(searchTerm));
    }

    // Sort products based on the selected sort option
    if (sortOption === "low-high") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  },
  [products,selectedCategories, sortOption , searchTerm]
);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t p-16">
        {/* Filter */}
        <div onClick={() => setShowFilter(!showFilter)} className="min-w-60">
          <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
            Filters
            <img className={`h-3 sm-hidden ${showFilter ? "rotate-90" : ""}`}/>
          </p>
          {/* Category Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
            <p className="mb-3 text-sm font-medium">Categories</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">{["bedroom", "kitchen", "dining_room", "living_room", "children_room"].map(
                (category) => (
                  <p className="flex gap-2" key={category}>
                    <input
                      className="w-3"
                      type="checkbox"
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />{" "}
                    {category.replace("_", " ").toUpperCase()}
                  </p>
                )
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between text-base sm-text-2xl mb-4">
            {/* <h1>All Collection</h1> */}
            <h1 className="text-2xl font-bold ">All Collection</h1>
            {/* Product Sort */}
            <select className="border-2 border-gray-300 text-sm px-2" value={sortOption} onChange={handleSortChange}> 
              <option value="relevant">Relevant</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input type="text" placeholder="Search products..." className="border-2 border-gray-300 p-2 w-full" value={searchTerm} onChange={handleSearchChange}/>
          </div>
          {/* Product List */}
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </>
  );
};

export default CollectionPage;
