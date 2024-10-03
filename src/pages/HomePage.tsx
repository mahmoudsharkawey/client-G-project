import { useEffect, useState } from "react";
import ProductList, { Product } from "../components/card";
import { EmblaCarousel } from "../components/Carousel";
import axios from "axios";
import { BASE_URL } from "../../constants";
import CategorySection from "../components/CategotySection";
import NewsletterSection from "../components/NewsletterSection";
import TrendySection from "../components/TrendySection";
const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/product`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  return (
    <>
      <div className="container mx-auto px-4 py-8 text-center m-auto w-[90%]">
        <EmblaCarousel />
        <CategorySection />
        <h1 className="text-4xl text-indigo-900 font-bold mb-6 mt-32">
          ALL COLLECTIONS
        </h1>
        <ProductList products={products} />
        <TrendySection/>
        <NewsletterSection/>
      </div>
    </>
  );
};

export default HomePage;
