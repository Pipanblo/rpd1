import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";


export const ProductsContext = createContext({
  products: [],
});
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  
  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
