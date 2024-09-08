import React, { useState, useEffect } from 'react';
import ModalProducts from '../homeAuth/components/admin/ModalProducts';
import ProductSearch from '../homeAuth/components/admin/ProductSearch';
import { ToastContainer } from 'react-toastify';
import useProducts from '../hooks/useProducts';
import ModalEliminarProduct from '../homeAuth/components/admin/ModalEliminarProduct';

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const { createProduct, updateProduct, deleteProduct, getProducts } = useProducts();

  useEffect(() => {
    getProducts(); // Cargar los productos al montar el componente
  }, []);

  const handleOpenModal = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  const handleSaveProduct = (productData) => {
    if (productToEdit) {
      updateProduct(productData);
      console.log('Updating product:', productData);
    } else {
      createProduct(productData);
      console.log('Creating product:', productData);
    }
    handleCloseModal();
  };

  const handleOpenDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      await getProducts(); // Volver a cargar productos después de eliminar
      console.log('Deleted product with ID:', productId);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
    handleCloseDeleteModal();
  };

  return (
    <div className='productsContainerGeneral'>
      <ToastContainer />
      <ProductSearch
        onEdit={handleOpenModal}
        onDelete={handleOpenDeleteModal}
      />
      <button className="btn btn-primary positionFixed" onClick={() => handleOpenModal(null)}>
        Create New Product
      </button>
      <ModalProducts
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
      />
      <ModalEliminarProduct
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteProduct}
        productToDelete={productToDelete}
      />
    </div>
  );
}
