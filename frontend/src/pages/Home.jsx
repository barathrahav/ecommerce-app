import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to CodeCrest Store
      </h1>
      <p className="text-gray-600 mb-6">
        Quality products. Seamless shopping.
      </p>

      <Link
        to="/products"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Browse Products
      </Link>
    </div>
  );
};

export default Home;
