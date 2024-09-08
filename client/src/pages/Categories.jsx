import React, { useState } from 'react';
import CategorySearch from '../homeAuth/components/admin/CategorySearch';
import ModalCreateCategory from '../homeAuth/components/admin/ModalCreateCategory';
import ModalEliminarCategory from '../homeAuth/components/admin/ModalEliminarCategory';
import useCategory from '../hooks/useCategory';
import { ToastContainer } from 'react-toastify';

export const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const { createCategory, updateCategory, deleteCategory, getCategories } = useCategory(); 
  
  const handleOpenModal = (category) => {
    setCategoryToEdit(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCategoryToEdit(null); // Limpiar la categoría a editar al cerrar
  };

  const handleOpenDeleteModal = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null); // Limpiar la categoría a eliminar al cerrar
  };

  const handleCreateOrUpdateCategory = async (categoryData) => {
    try {
      if (categoryData.id) {
        // Actualizar categoría existente
        await updateCategory(categoryData);
      } else {
        // Agregar nueva categoría
        await createCategory(categoryData);
      }
      // Actualizar la lista de categorías
      getCategories();
      handleCloseModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      getCategories();
      handleCloseDeleteModal();
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting the category.');
    }
  };

  return (
    <div className="container-categories">
    <ToastContainer />
      <CategorySearch onEdit={handleOpenModal} onDelete={handleOpenDeleteModal} />

      <button className="btn btn-primary positionFixed" onClick={() => handleOpenModal(null)}>
        Create New Category
      </button>

      {/* Modal para crear o editar una categoría */}
      <ModalCreateCategory
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreate={handleCreateOrUpdateCategory}
        categoryToEdit={categoryToEdit}
      />

      {/* Modal para eliminar una categoría */}
      <ModalEliminarCategory
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteCategory}
        categoryToDelete={categoryToDelete}
      />
    </div>
  );
};
