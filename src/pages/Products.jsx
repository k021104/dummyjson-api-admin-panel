// import React, { useEffect, useState } from "react";
// import './Products.css';

// export default function Products() {

//     const [showForm, setShowForm] = useState(false);
//     const [editingProduct, setEditingProduct] = useState(null);

//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         price: "",
//         stock: "",
//         rating: "",
//         brand: "",
//         category: "",
//         thumbnail: ""
//     });

//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState("all");
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [search, setSearch] = useState("");

//     /* ---------------- LOCAL STORAGE ---------------- */

//     const saveToLocalStorage = (data) => {
//         localStorage.setItem("products", JSON.stringify(data));
//     };

//     /* ---------------- CRUD ---------------- */

//     const addProduct = (product) => {
//         const newProduct = {
//             ...product,
//             id: Date.now(),
//             rating: product.rating || 0,
//             thumbnail: product.thumbnail || "https://via.placeholder.com/150"
//         };
//         const updated = [newProduct, ...products];
//         setProducts(updated);
//         saveToLocalStorage(updated);
//     };

//     const updateProduct = (id, updatedData) => {
//         const updated = products.map(p =>
//             p.id === id ? { ...p, ...updatedData } : p
//         );

//         setProducts(updated);
//         saveToLocalStorage(updated);
//     };

//     const deleteProduct = (id) => {
//         if (window.confirm("Delete this product?")) {
//             const updated = products.filter(p => p.id !== id);
//             setProducts(updated);
//             saveToLocalStorage(updated);
//         }
//     };

//     /* ---------------- LOAD DATA ---------------- */

//     useEffect(() => {

//         fetch("https://dummyjson.com/products/categories")
//             .then(res => res.json())
//             .then(data => setCategories(data));

//         const stored = localStorage.getItem("products");

//         if (stored) {
//             setProducts(JSON.parse(stored));
//             setLoading(false);
//         } else {
//             fetch("https://dummyjson.com/products?limit=0")
//                 .then(res => res.json())
//                 .then(data => {
//                     setProducts(data.products);
//                     saveToLocalStorage(data.products);
//                     setLoading(false);
//                 });
//         }

//     }, []);

//     /* ---------------- FILTER ---------------- */

//     const filteredProducts = products.filter(p => {
//         const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
//         const matchCategory =
//             selectedCategory === "all" ||
//             p.category === selectedCategory;

//         return matchSearch && matchCategory;
//     });

//     /* ---------------- UI ---------------- */

//     return (
//         <div className="products-page">

//             <header className="page-header">
//                 <div className="header-text">
//                     <h2 className="page-title">Inventory</h2>
//                     <p>Manage your store products and stock levels</p>
//                 </div>

//                 <button className="add-btn-premium" onClick={() => {
//                     setShowForm(true);
//                     setEditingProduct(null);
//                     setFormData({
//                         title: "", price: "", stock: "", rating: "", brand: "", category: "", thumbnail: "", description: ""
//                     });
//                 }}>
//                     <i className="fa-solid fa-plus"></i> Add Product
//                 </button>
//             </header>

//             <div className="filter-bar">

//                 <div className="search-box">
//                     <i className="fa-solid fa-magnifying-glass"></i>
//                     <input
//                         type="text"
//                         placeholder="Search products..."
//                         value={search}
//                         onChange={e => setSearch(e.target.value)}
//                     />
//                 </div>

//                 <div className="category-wrapper">
//                     <select
//                         value={selectedCategory}
//                         onChange={e => setSelectedCategory(e.target.value)}
//                         className="premium-select"
//                     >
//                         <option value="all">All Categories</option>
//                         {categories.map(cat => (
//                             <option key={cat} value={cat}>
//                                 {cat}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//             </div>

//             {loading ? (
//                 <div className="loader-wrapper">
//                     <div className="spinner"></div>
//                 </div>
//             ) : (

//                 <div className="table-container-outer">

//                     <div className="table-responsive">

//                         <table className="premium-table">

//                             <thead>
//                                 <tr>
//                                     <th>Product</th>
//                                     <th>Category</th>
//                                     <th>Price</th>
//                                     <th>Stock</th>
//                                     <th>Rating</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>

//                             <tbody>

//                                 {filteredProducts.map(p => (

//                                     <tr key={p.id}>

//                                         <td>
//                                             <div className="product-info">
//                                                 <img src={p.thumbnail} alt="" className="table-thumb" />
//                                                 <span className="p-name">{p.title}</span>
//                                             </div>
//                                         </td>

//                                         <td><span className="cat-badge">{p.category}</span></td>

//                                         <td className="price-tag">${p.price}</td>

//                                         <td>
//                                             <span className={`stock-status ${p.stock < 20 ? 'danger' : 'success'}`}>
//                                                 {p.stock}
//                                             </span>
//                                         </td>

//                                         <td><span className="rating-pill">⭐ {p.rating}</span></td>

//                                         <td>
//                                             <div className="action-group">

//                                                 <button className="icon-btn edit" onClick={() => {
//                                                     setEditingProduct(p);
//                                                     setFormData({ ...p });
//                                                     setShowForm(true);
//                                                 }}>
//                                                     <i className="fa-solid fa-pen"></i>
//                                                 </button>

//                                                 <button className="icon-btn delete" onClick={() => deleteProduct(p.id)}>
//                                                     <i className="fa-solid fa-trash"></i>
//                                                 </button>

//                                             </div>
//                                         </td>

//                                     </tr>

//                                 ))}

//                             </tbody>

//                         </table>
//                     </div>
//                 </div>

//             )}

//             {showForm && (

//                 <div className="modal-overlay">

//                     <div className="modal-content">

//                         <div className="modal-header">
//                             <h3 style={{ color: '#fff' }}>{editingProduct ? "Edit Product" : "New Product"}</h3>
//                             <button className="close-modal" onClick={() => setShowForm(false)}>&times;</button>
//                         </div>

//                         <div className="modal-body">

//                             <div className="input-field">
//                                 <label>Product Name</label>
//                                 <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
//                             </div>

//                             <div className="input-field">
//                                 <label>Price</label>
//                                 <input value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
//                             </div>

//                             <div className="input-field">
//                                 <label>Stock</label>
//                                 <input value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} />
//                             </div>

//                         </div>

//                         <div className="modal-footer">

//                             <button className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>

//                             <button className="btn-primary" onClick={() => {
//                                 editingProduct ? updateProduct(editingProduct.id, formData) : addProduct(formData);
//                                 setShowForm(false);
//                             }}>
//                                 Save
//                             </button>

//                         </div>

//                     </div>

//                 </div>

//             )}

//         </div>
//     );
// }


import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import './Products.css';

export default function Products() {

    const staticCategories = [
        "beauty", "fragrances", "furniture", "groceries",
        "home-decoration", "kitchen-accessories", "laptops",
        "mens-shirts", "mens-shoes", "smartphones"
    ];

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    /* --- Pagination States --- */
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [formData, setFormData] = useState({
        title: "", price: "", stock: "", category: "", thumbnail: "", rating: ""
    });

    useEffect(() => {
        const stored = localStorage.getItem("my_products_v3");
        if (stored) {
            setProducts(JSON.parse(stored));
            setLoading(false);
        } else {
            fetch("https://dummyjson.com/products?limit=194")
                .then(res => res.json())
                .then(data => {
                    setProducts(data.products);
                    localStorage.setItem("my_products_v3", JSON.stringify(data.products));
                    setLoading(false);
                });
        }
    }, []);

    const saveToLocal = (data) => {
        localStorage.setItem("my_products_v3", JSON.stringify(data));
    };

    /* --- Logic for Filtering & Pagination --- */
    const filteredProducts = products.filter(p => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
        const matchCategory = selectedCategory === "all" || p.category === selectedCategory;
        return matchSearch && matchCategory;
    });

    // Pagination Calculations
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    // Reset to page 1 when searching or filtering
    useEffect(() => {
        setCurrentPage(1);
    }, [search, selectedCategory]);

    /* --- CRUD Functions --- */
    const handleSave = () => {
        if (!formData.title || !formData.category) return alert("Fill required fields");
        let updated;
        if (editingProduct) {
            updated = products.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p);
            toast.success("Product updated successfully!");
        } else {
            const newP = { ...formData, id: Date.now(), rating: formData.rating || 0 };
            updated = [newP, ...products];
            toast.success("Product added successfully!");
        }
        setProducts(updated);
        saveToLocal(updated);
        setShowForm(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete product?")) {
            const updated = products.filter(p => p.id !== id);
            setProducts(updated);
            saveToLocal(updated);
            toast.success("Product deleted successfully!");
        }
    };

    return (
        <div className="products-page">
            <header className="page-header">
                <div className="header-text">
                    <h2 className="page-title">Inventory Dashboard</h2>
                    <p>Page {currentPage} of {totalPages || 1} ({filteredProducts.length} items)</p>
                </div>
                <button className="add-btn-premium" onClick={() => {
                    setEditingProduct(null);
                    setFormData({ title: "", price: "", stock: "", category: "", thumbnail: "", rating: "" });
                    setShowForm(true);
                }}>
                    <i className="fa-solid fa-plus"></i> Add Product
                </button>
            </header>

            <div className="filter-bar">
                <div className="search-box">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="category-wrapper">
                    <select className="premium-select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                        <option value="all">All Categories</option>
                        {staticCategories.map(cat => <option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
                    </select>
                </div>
            </div>

            {loading ? <div className="loader-wrapper"><div className="spinner"></div></div> : (
                <div className="table-container-outer">
                    <div className="table-responsive">
                        <table className="premium-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(p => (
                                    <tr key={p.id}>
                                        <td>
                                            <div className="product-info">
                                                <img src={p.thumbnail} alt="" className="table-thumb" />
                                                <span className="p-name">{p.title}</span>
                                            </div>
                                        </td>
                                        <td><span className="cat-badge">{p.category}</span></td>
                                        <td className="price-tag">${p.price}</td>
                                        <td><span className={`stock-status ${p.stock < 15 ? 'danger' : 'success'}`}>{p.stock}</span></td>
                                        <td>
                                            <div className="action-group">
                                                <button className="icon-btn edit" onClick={() => { setEditingProduct(p); setFormData({ ...p }); setShowForm(true); }}><i className="fa-solid fa-pen"></i></button>
                                                <button className="icon-btn delete" onClick={() => handleDelete(p.id)}><i className="fa-solid fa-trash"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* --- PAGINATION FOOTER --- */}
                    <div className="pagination-footer">
                        <button
                            className="nav-link"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                            Previous
                        </button>
                        <div className="page-numbers" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                            Step {currentPage} of {totalPages}
                        </div>
                        <button
                            className="nav-link"
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Modal for Add/Edit */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 style={{ color: '#fff' }}>{editingProduct ? "Edit" : "Add"} Product</h3>
                            <button className="close-modal" onClick={() => setShowForm(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="input-field"><label>Image URL</label><input value={formData.thumbnail} onChange={e => setFormData({ ...formData, thumbnail: e.target.value })} /></div>
                            <div className="input-field"><label>Product Name</label><input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} /></div>
                            <div className="input-row three" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div className="input-field"><label>Price</label><input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} /></div>
                                <div className="input-field"><label>Stock</label><input type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} /></div>
                                <div className="input-field"><label>Rating</label><input type="number" step="0.1" value={formData.rating} onChange={e => setFormData({ ...formData, rating: e.target.value })} /></div>
                                <div className="input-field">
                                    <label>Category</label>
                                    <select className="premium-select" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                        <option value="">Select</option>
                                        {staticCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                            <button className="btn-primary" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}