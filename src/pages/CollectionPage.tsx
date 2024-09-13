import { useEffect, useState } from "react";
import ProductList, { Product } from "../components/card";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { ArrowRightIcon } from "lucide-react";

const CollectionPage = () => {
  useEffect(() => {
    // fetch products from backend
    axios
      .get(`${BASE_URL}/product`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const [products, setProducts] = useState<Product[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortOption, setSortOption] = useState("relevant");
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
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
      updatedProducts = updatedProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter products based on search term
    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );
    }

    // Sort products based on the selected sort option
    if (sortOption === "low-high") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [products, selectedCategories, sortOption, searchTerm]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-6 sm:pt-10 border-t p-4 sm:p-16 rounded-lg">
        {/* Filter */}
        <div className="w-full sm:w-60 mb-4 sm:mb-0">
          <button 
            onClick={() => setShowFilter(!showFilter)} 
            className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 text-xl text-indigo-900 bg-gray-100 p-3 rounded-lg sm:bg-transparent sm:p-0"
          >
            Filters
            <ArrowRightIcon className={`h-3 transition-transform duration-300 ${showFilter ? "rotate-180" : ""} sm:hidden`} />
          </button>
          {/* Category Filter */}
          <div
            className={`${
              showFilter ? "block" : "hidden"
            } sm:block mt-4 sm:mt-6 border border-gray-300 rounded-lg p-4`}
          >
            <p className="mb-3 text-sm font-medium text-indigo-900">Categories</p>
            <div className="flex flex-col gap-2 text-sm font-light text-indigo-900">
              {[
                "bedroom",
                "kitchen",
                "dining_room",
                "living_room",
                "children_room",
              ].map((category) => (
                <label className="flex items-center gap-2 cursor-pointer" key={category}>
                  <input
                    className="w-4 h-4"
                    type="checkbox"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span>{category.replace("_", " ").toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900">ALL COLLECTION</h1>
            {/* Product Sort */}
            <select
              className="w-full sm:w-auto border-2 border-gray-300 text-sm p-2 rounded-lg"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="relevant">Relevant</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border-2 border-gray-300 p-3 rounded-lg"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {/* Product List */}
          <ProductList products={filteredProducts} />
        </div>                                                                                                          
      </div>
    </>
  );
};

export default CollectionPage;
