import React, { useState } from 'react';


// Datos de prueba
const categories = [
  { id: 1, name: 'Globos' },
  { id: 2, name: 'Decoraciones' },
  { id: 3, name: 'Globos Artísticos' }
];

const products = [
  { id: 1, categoryId: 1, name: 'Globo Azul', price: 10 },
  { id: 2, categoryId: 1, name: 'Globo Rojo', price: 12 },
  { id: 3, categoryId: 2, name: 'Guirnalda', price: 20 },
  { id: 4, categoryId: 2, name: 'Confeti', price: 5 },
  { id: 5, categoryId: 3, name: 'Globo Arte 1', price: 15 },
  { id: 6, categoryId: 3, name: 'Globo Arte 2', price: 18 },
  { id: 7, categoryId: 3, name: 'Globo Arte 3', price: 25 },
  { id: 8, categoryId: 3, name: 'Globo Arte 4', price: 22 },
  { id: 9, categoryId: 3, name: 'Globo Arte 5', price: 30 }
];

// Simulación de puntos
const points = 500;

export default function CotizarUser() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [cart, setCart] = useState([]);
  const [pointsToUse, setPointsToUse] = useState('');

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    const filteredProducts = products.filter(prod => prod.categoryId === parseInt(categoryId));
    setAvailableProducts(filteredProducts);
    setSelectedProduct(''); // Reset product select
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleAddProduct = () => {
    const productToAdd = products.find(prod => prod.id === parseInt(selectedProduct));
    if (productToAdd) {
      setCart(prevCart => {
        const existingProduct = prevCart.find(item => item.id === productToAdd.id);
        if (existingProduct) {
          return prevCart.map(item =>
            item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevCart, { ...productToAdd, quantity: 1 }];
        }
      });
      setAvailableProducts(prevProducts => prevProducts.filter(prod => prod.id !== parseInt(selectedProduct)));
      setSelectedProduct('');
    }
  };

  const handleRemoveProduct = (id) => {
    setCart(prevCart => {
      const productToRemove = prevCart.find(item => item.id === id);
      if (productToRemove.quantity > 1) {
        return prevCart.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        setAvailableProducts(prevProducts => [...prevProducts, products.find(prod => prod.id === id)]);
        return prevCart.filter(item => item.id !== id);
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
    const maxDiscount = Math.floor(points / 200) * 10; // Max discount based on points
    const discount = Math.min(pointsToUse / 200 * 10, maxDiscount); // Discount based on points used
    const total = subtotal - discount;
    return { subtotal, discount, total };
  };

  const { subtotal, discount, total } = calculateTotals();

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
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </label>

            <label>
              Producto:
              <select value={selectedProduct} onChange={handleProductChange} disabled={!selectedCategory}>
                <option value="">Seleccione un producto</option>
                {availableProducts.map(prod => (
                  <option key={prod.id} value={prod.id}>{prod.name} - ${prod.price}</option>
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
                max={points}
                placeholder="0"
                className='pointsInput'
              />
              <span className='maxPoints'>Max: {points}</span>
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
                <tr key={item.id}>
                  <td>{categories.find(cat => cat.id === item.categoryId)?.name || 'Desconocido'}</td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <div className="quantity">
                      {item.quantity}
                      <button className='resta' onClick={() => handleRemoveProduct(item.id)}><i className="fas fa-minus"></i></button>
                      <button className='suma' onClick={() => setCart(cart.map(prod => prod.id === item.id ? { ...prod, quantity: prod.quantity + 1 } : prod))}><i className="fas fa-plus"></i></button>
                    </div>
                  </td>
                  <td><button className='eliminar' onClick={() => handleRemoveProduct(item.id)}><i className="fas fa-trash-alt"></i></button></td>
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
        </div>
      </div>
  );
};
              