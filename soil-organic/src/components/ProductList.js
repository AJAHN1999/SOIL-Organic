import React, { useEffect,useContext } from 'react';
import { initProducts, getProducts } from '../data/products';
import useCart from '../hooks/useCart';
import UserContext from "../hooks/context";
import Notification from '../utils/notifications';

/**
 * Renders a list of products that can be filtered by a minimum rating.
 * It allows users to add products to a shopping cart.
 * 
 * @param {Object} props - Component props
 * @param {number} props.filterRating - Minimum rating to filter products.
 */
function ProductList({filterRating}) {
    const { addToCart } = useCart();    // Hook to interact with the shopping cart
    const [products, setProducts] = React.useState([]); // Local state to store products
    let { currentloggedInUser } = useContext(UserContext);  // Context to access the currently logged-in user
    const [notification, setNotification] = React.useState(''); // State for displaying notifications

    // Effect to fetch products and apply rating filter
    useEffect(() => {
        initProducts();  // Initialize products in local storage if not already initialized
        setProducts(getProducts());  // Load products from local storage into state
        let fetchedProducts = getProducts();
        if(filterRating){
            // Apply the rating filter if specified
            fetchedProducts = fetchedProducts.filter(product => product.product_rating > filterRating);
        }
        setProducts(fetchedProducts);
    }, [filterRating]);

    /**
     * Handles adding a product to the cart.
     * @param {Object} product - Product to add to the cart.
     */
    const handleAddToCart = (product) => {
        addToCart({
            ...product,
            quantity: 1  // Set initial quantity to 1 when adding to cart
        });
        setNotification(`Added ${product.product_name} to cart!`);
        setTimeout(() => setNotification(''), 3000);  // Clear notification after 3 seconds
    };

    return (
            <div className="flex flex-wrap justify-center">
                {products.map(product => (
                    <div key={product.product_id} className="border border-primary text-orange-600 rounded-lg p-4 m-4 w-64 shadow-lg">
                        <img src={product.product_image} alt={product.product_name} className="w-full h-40 object-cover rounded-t-lg"/>
                        <h3 className="text-lg font-bold" >{product.product_name} - ${product.product_price.toFixed(2)}</h3>
                        <p className="text-md text-primary">{product.product_description}</p>
                        <p className="text-md font-bold">Quantity: {product.product_quantity}</p>
                        <p className="text-md font-bold">Rating: {product.product_rating} stars</p>
                        {currentloggedInUser && (
                        <button onClick={() => handleAddToCart(product)} className="mt-4  hover:bg-teal-300 text-primary font-bold py-2 px-4 rounded-lg border border-primary">
                            Add to cart
                        </button>
                    )}
                </div>
            ))}
            {notification && <Notification message={notification} />}
        </div>
    );
}

export default ProductList;