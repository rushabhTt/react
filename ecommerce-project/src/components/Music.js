const productsArr = [
  {
    title: "Colors",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },
  {
    title: "Black and white Colors",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },
  {
    title: "Yellow and Black Colors",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },
  {
    title: "Blue Color",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

const Music = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Music
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
        </div>
        <Products products={productsArr} />
      </div>
    </section>
  );
};

const Products = ({ products }) => {
  return (
    <div className="flex flex-wrap -m-4">
      {products.map((product) => (
        <Product key={product.title} product={product} />
      ))}
    </div>
  );
};

const Product = ({ product }) => {
  return (
    <div className="xl:w-1/4 md:w-1/2 p-4">
      <div className="bg-gray-100 p-6 rounded-lg">
        <img
          className="h-40 rounded w-full object-cover object-center mb-6"
          src={product.imageUrl}
          alt="content"
        />
        <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
          Price: ₹{product.price}
        </h3>
        <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
          {product.title}
        </h2>
      </div>
    </div>
  );
};

export default Music;
