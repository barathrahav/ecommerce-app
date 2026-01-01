const ProductSidebar = ({ categories, selectedCategory, setParams }) => {
  return (
    <div className="space-y-6">
      
      {/* PRICE FILTER (UI only for now) */}
      <div className="border rounded p-4">
        <h3 className="font-semibold mb-3">Price Filter</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="cursor-pointer hover:text-blue-600">All</li>
          <li className="cursor-pointer hover:text-blue-600">₹0 – ₹500</li>
          <li className="cursor-pointer hover:text-blue-600">₹500 – ₹1000</li>
          <li className="cursor-pointer hover:text-blue-600">₹1000+</li>
        </ul>
      </div>

      {/* HIGHLIGHTS */}
      <div className="border rounded p-4">
        <h3 className="font-semibold mb-3">Highlights</h3>
        <ul className="space-y-2 text-sm">
          <li>All Products</li>
          <li>Best Sellers</li>
          <li>New Arrivals</li>
          <li>Sale</li>
          <li>Hot Items</li>
        </ul>
      </div>

      {/* CATEGORY FILTER */}
      <div className="border rounded p-4">
        <h3 className="font-semibold mb-3">Filter by Categories</h3>

        <ul className="space-y-2 text-sm">
          <li
            className={`cursor-pointer ${
              !selectedCategory ? "font-bold text-blue-600" : ""
            }`}
            onClick={() => setParams({})}
          >
            All Categories
          </li>

          {categories.map((cat) => (
            <li
              key={cat._id}
              className={`cursor-pointer hover:text-blue-600 ${
                selectedCategory === cat.slug
                  ? "font-bold text-blue-600"
                  : ""
              }`}
              onClick={() => setParams({ category: cat.slug })}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductSidebar;
