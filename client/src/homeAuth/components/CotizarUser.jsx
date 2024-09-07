import { useEffect, useState } from "react";
import useProducts from "../../hooks/useProducts";
import usePoint from "../../hooks/usePoints";
import useOrder from "../../hooks/useOrder";
import useAuth from "../../hooks/useAuth";
import useHome from "../../hooks/useHome";

export default function CotizarUser() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [cart, setCart] = useState([]);
  const [pointsToUse, setPointsToUse] = useState('');

  const { products, getProducts, categories, getCategories } = useProducts();
  const { points, getPoints } = usePoint();
  const { crearOrder } = useOrder();
  const { auth } = useAuth();
  const { setMenuSidebar } = useHome();

  useEffect(() => {
    getProducts(); 
    getPoints();
    getCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
  
    const filteredProducts = products.filter(prod => prod.category_id && prod.category_id._id === categoryId);
    setAvailableProducts(filteredProducts);
    setSelectedProduct(''); 
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleAddProduct = () => {
    const productToAdd = availableProducts.find(prod => prod._id === selectedProduct);
    if (productToAdd) {
      setCart(prevCart => {
        const existingProduct = prevCart.find(item => item._id === productToAdd._id);
        if (existingProduct) {
          return prevCart.map(item =>
            item._id === productToAdd._id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevCart, { ...productToAdd, quantity: 1 }];
        }
      });
      setAvailableProducts(prevProducts => prevProducts.filter(prod => prod._id !== selectedProduct));
      setSelectedProduct('');
    }
  };

  const handleRemoveProduct = (id) => {
    setCart(prevCart => {
      const productToRemove = prevCart.find(item => item._id === id);
      if (productToRemove.quantity > 1) {
        return prevCart.map(item =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        setAvailableProducts(prevProducts => [...prevProducts, products.find(prod => prod._id === id)]);
        return prevCart.filter(item => item._id !== id);
      }
    });
  };

  const handlePointsChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) {
      setPointsToUse(parseInt(value, 10));
    } else {
      setPointsToUse('');
    }
  };

  const calculateTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const maxDiscount = Math.floor(points.accumulated / 200) * 10;
    const discount = Math.min(pointsToUse / 200 * 10, maxDiscount);

    const total = subtotal - (isNaN(discount) || discount === null ? 0 : discount);

    return { subtotal, discount, total };
  };

  const { subtotal, discount, total } = calculateTotals();

  // Función para enviar la orden
  const handleCreateOrder = async () => {
    const orderData = {
      items: cart.map(item => ({
        product_id: item._id,
        quantity: item.quantity,
        price: item.price
      })),
      user_id: auth._id,
      pointsUsed: pointsToUse,
      subtotal,
      discount,
      total
    };

    try {
      await crearOrder(orderData);
      setMenuSidebar('dashboard');
    } catch (error) {
      console.log("Error al crear la orden:", error);
    }
  };

  return (
    <div className="container-cotizar-homeAuth">
      <div className="modal-content">
        <h2>Formulario de Cotización</h2>
        <form>
          <label>
            Categoría:
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Seleccione una categoría</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </label>

          <label>
            Producto:
            <select value={selectedProduct} onChange={handleProductChange} disabled={!selectedCategory}>
              <option value="">Seleccione un producto</option>
              {availableProducts.map(prod => (
                <option key={prod._id} value={prod._id}>{prod.name} - ${prod.price}</option>
              ))}
            </select>
            <button type="button" onClick={handleAddProduct} disabled={!selectedProduct}>
              <i className="fas fa-plus"></i> Agregar
            </button>
          </label>

          <label className='labelPoints'>
            Puntos a usar:
            <input
              type="number"
              value={pointsToUse}
              onChange={handlePointsChange}
              min="0"
              max={points.accumulated}
              placeholder="0"
              className='pointsInput'
            />
            <span className='maxPoints'>Max: {points.accumulated}</span>
          </label>
        </form>

        <table>
          <thead>
            <tr>
              <th>Categoría</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item._id}>
                <td>{categories.find(cat => cat.id === item.category_id)?.name || 'Desconocido'}</td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <div className="quantity">
                    {item.quantity}
                    <button className='resta' onClick={() => handleRemoveProduct(item._id)}>
                      <i className="fas fa-minus"></i>
                    </button>
                    <button className='suma' onClick={() => setCart(cart.map(prod => prod._id === item._id ? { ...prod, quantity: prod.quantity + 1 } : prod))}>
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </td>
                <td>
                  <button className='eliminar' onClick={() => handleRemoveProduct(item._id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3">Subtotal</td>
              <td>${isNaN(subtotal) ? '0' : subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="3">Descuento</td>
              <td>${isNaN(discount) ? '0' : discount.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="3">Total</td>
              <td>${isNaN(total) ? '0' : total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <button onClick={handleCreateOrder} className="confirm-order-btn">
          Confirmar Orden
        </button>
      </div>
    </div>
  );
}
