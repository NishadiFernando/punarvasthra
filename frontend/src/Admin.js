import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function Admin() {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState('dashboard');

    const renderContent = () => {
        switch (activeMenu) {
            case 'dashboard':
                return (
                    <div className="dashboard-content">
                        <h1>Welcome to Admin Dashboard</h1>
                        <div className="stats-container">
                            <div className="stat-card">
                                <div className="stat-icon">📊</div>
                                <div className="stat-info">
                                    <h3>Total Sales</h3>
                                    <p>LKR 150,000</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">👗</div>
                                <div className="stat-info">
                                    <h3>Total Products</h3>
                                    <p>250 Sarees</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">⚠️</div>
                                <div className="stat-info">
                                    <h3>Low Stock</h3>
                                    <p>15 Items</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'analytics':
                return (
                    <div className="analytics-content">
                        <h2>Analytics Overview</h2>
                        <div className="analytics-cards">
                            <div className="analytics-card">
                                <h3>Top Selling Sarees</h3>
                                <ul>
                                    <li>Silk Saree - 50 units</li>
                                    <li>Cotton Saree - 45 units</li>
                                    <li>Georgette Saree - 30 units</li>
                                </ul>
                            </div>
                            <div className="analytics-card">
                                <h3>Popular Colors</h3>
                                <ul>
                                    <li>Red - 30%</li>
                                    <li>Blue - 25%</li>
                                    <li>Pink - 20%</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 'lowStock':
                return (
                    <div className="low-stock-content">
                        <h2>Low Stock Alerts</h2>
                        <div className="alert-list">
                            <div className="alert-item">
                                <span className="alert-icon">⚠️</span>
                                <div className="alert-details">
                                    <h4>Silk Saree - Blue</h4>
                                    <p>Only 2 pieces remaining</p>
                                </div>
                                <button className="restock-btn">Restock</button>
                            </div>
                            <div className="alert-item">
                                <span className="alert-icon">⚠️</span>
                                <div className="alert-details">
                                    <h4>Cotton Saree - Red</h4>
                                    <p>Only 3 pieces remaining</p>
                                </div>
                                <button className="restock-btn">Restock</button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="admin-dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>Admin Panel</h2>
                    <p className="admin-subtitle">Punarvasthra Management</p>
                </div>
                <ul className="sidebar-menu">
                    <li className={activeMenu === 'dashboard' ? 'active' : ''}>
                        <button onClick={() => setActiveMenu('dashboard')}>
                            <span className="menu-icon">📊</span>
                            Dashboard Overview
                        </button>
                    </li>
                    <li>
                        <button onClick={() => navigate('/admin/add')}>
                            <span className="menu-icon">➕</span>
                            Add a Saree
                        </button>
                    </li>
                    <li>
                        <button onClick={() => navigate('/admin/edit')}>
                            <span className="menu-icon">📝</span>
                            Update Inventory
                        </button>
                    </li>
                    <li className={activeMenu === 'analytics' ? 'active' : ''}>
                        <button onClick={() => setActiveMenu('analytics')}>
                            <span className="menu-icon">📈</span>
                            View Analytics
                        </button>
                    </li>
                    <li className={activeMenu === 'lowStock' ? 'active' : ''}>
                        <button onClick={() => setActiveMenu('lowStock')}>
                            <span className="menu-icon">⚠️</span>
                            Low Stock Alerts
                        </button>
                    </li>
                    <li className="back-to-site">
                        <button onClick={() => navigate('/')}>
                            <span className="menu-icon">🏠</span>
                            Back to Site
                        </button>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default Admin; 