
import React from 'react';
import { Product } from '../../types';
import CourseCard from './CourseCard';

interface CatalogProps {
  products: Product[];
  onSelectCourse: (courseName: string) => void;
}

const Catalog: React.FC<CatalogProps> = ({ products, onSelectCourse }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      {products.map((product) => (
        <CourseCard
          key={product.id}
          product={product}
          onSelectCourse={onSelectCourse}
        />
      ))}
    </div>
  );
};

export default Catalog;
