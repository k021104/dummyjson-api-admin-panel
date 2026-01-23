import React from 'react'
import { useEffect, useState } from "react";

export default function Products() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const limit = 5;

    useEffect(() => {
        setLoading(true);

        const url =
            selectedCategory === "all"
                ? `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`
                : `https://dummyjson.com/products/category/${selectedCategory}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            });
    }, [page, selectedCategory]);

    useEffect(() => {
        fetch("https://dummyjson.com/products/categories")
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            });
    }, []);

    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            selectedCategory === "all" || p.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <h2 className="page-title">Products</h2>

            {/* Search Box */}
            <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ marginBottom: "15px", padding: "8px", width: "300px" }}
            />

            <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                style={{
                    marginBottom: "15px",
                    marginLeft: "10px",
                    padding: "8px",
                    width: "220px"
                }}
            >
                <option value="all">All Categories</option>

                {categories.map(cat => (
                    <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                    </option>
                ))}
            </select>

            {loading ? (
                <div className="loading">Loading products...</div>
            ) : (
                <div class="table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Rating</th>
                                <th>Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length === 0 ? (
                                <p>
                                    No products found matching your search.
                                </p>
                            ) : (filteredProducts.map(p => (
                                <tr key={p.id}>
                                    <td><img src={p.thumbnail} alt={p.title} className="product-img" /></td>
                                    <td>{p.title}</td>
                                    <td>₹{p.price}</td>
                                    <td>{p.rating}</td>
                                    <td>{p.stock}</td>
                                </tr>
                            )))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            <div style={{ marginTop: "15px" }}>
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    style={{ marginRight: "10px", padding: "8px 12px" }}
                >
                    Prev
                </button>
                <button
                    onClick={() => setPage(prev => prev + 1)}
                    style={{ padding: "8px 12px" }}
                >
                    Next
                </button>
            </div>
        </>
    );
}
