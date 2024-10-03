import { useEffect, useState } from "react";

interface Category {
  _id: number;
  name: string;
  image: string;
}

const CategorySection = () => {
  const [categories, setCategories] = useState<Category[]>([]); // Specify the type for categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/categories");
        const data: Category[] = await response.json(); // Specify the type for data
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <section className="m-auto w-full sm:w-3/4 py-5"> 
      <h2 className="text-3xl sm:text-4xl text-center font-bold text-indigo-900 mb-6"> 
        Top Categories
      </h2>
      <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4"> 
        {categories.map((category) => (
          <div
            key={category._id} // Use category.id instead of index for key
            className="flex flex-col items-center bg-white rounded-full shadow-lg p-4 h-72 w-full sm:w-96 relative group" // Change width to full on small screens
          >
            <div className="bg-gray-200 rounded-full p-6 flex items-center justify-center">
              <img
                src={category.image}
                alt={category.name}
                className="w-32 h-32 object-cover rounded-full"
              />
            </div>
            <h3 className="text-lg font-semibold mt-4">{category.name}</h3>
            <button className="text-sm absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-1 px-10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View
            </button>{" "}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
