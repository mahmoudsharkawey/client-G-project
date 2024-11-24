import React from "react";

const TrendySection: React.FC = () => {
  return (  
    <section className="flex items-center justify-center py-10 bg-purple-100 mt-52">
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="md:w-1/2">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/hekto-a75a2.appspot.com/o/Cannon%20Mid%20Century%20Tufted%20Upholstered%20Loveseat%2FGray%2FCannon%20Mid%20Century%20Tufted%20Upholstered%20Loveseat-gray-1.png?alt=media&token=bd7e3991-572f-4b59-9078-54130cfdc345" // Replace with your image URL
            alt="Cannon Mid Century Tufted Upholstered Loveseat"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-6 flex flex-col items-center justify-center">
          {" "}
          {/* Centering added here */}
          <h2 className="text-3xl font-bold text-indigo-900 mb-11 text-center">
            {" "}
            {/* Centered text */}
            Unique Features Of Latest & Trending Products
          </h2>

          <ul className=" text-start list-disc list-inside mb-4 space-y-2">
            {" "}
            {/* Centered list */}
            <li className="text-gray-700">
              Made of plywood, rubberwood legs with medium espresso finish,
              steel, foam padding and polyester upholstery
            </li>
            <li className="text-gray-700">
              Available in Cream, Gray and Navy upholstery, sold separately
            </li>
            <li className="text-gray-700">
              Available in additional styles, sold separately
            </li>
          </ul>

          <div className="">
            <span className="text-xl font-semibold text-gray-800">
              Cannon Mid Century Tufted Upholstered Loveseat
            </span>

            <div className="flex justify-between items-center mt-14">
              <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition">
                Add To Cart
              </button>
              <span className="text-xl font-semibold text-gray-800">
                $799.99
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendySection;
