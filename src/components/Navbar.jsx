import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaCaretDown } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {
        const updateCartCount = () => {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const uniqueProductNames = [...new Set(cartItems.map(item => item.name))];
            setCartCount(uniqueProductNames.length);
        };

        updateCartCount();
        window.addEventListener('storage', updateCartCount);

        return () => window.removeEventListener('storage', updateCartCount);
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            const searchPath = user?.roles?.includes('seller') ? `/seller-search/${searchTerm}` : `/buyer-search/${searchTerm}`;
            navigate(searchPath);
        } else {
            const homePath = user?.roles?.includes('seller') ? '/home1' : '/home';
            navigate(homePath);
        }
    };

    const handleBrandClick = () => {
        if (user) {
            if (user.roles.includes('seller')) {
                navigate('/home1');
            } else {
                navigate('/home');
            }
        } else {
            navigate('/home');
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        navigate('/login');
    };

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    return (
        <nav className="navbar">
            <div className="nav-item" id="brand">
                <a className="nav-logo" onClick={handleBrandClick}>Cheap</a>
            </div>
            <form className="nav-item search-container" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search for products, brands and more"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="icon">
                    <FaSearch className="search-icon" />
                </button>
            </form>
            {user && !user.roles.includes('seller') && (
                <div className="nav-item">
                    <button onClick={() => navigate('/cart')} className="icon cart-icon-container">
                        <FaShoppingCart className="cart-icon" />
                        {cartCount > 0 && <span className="cart-icon-badge">{cartCount}</span>}
                    </button>
                </div>
            )}
            <div className="login-register nav-item">
                {user ? (
                    <div className="user-info" onClick={toggleDropdown}>
                        {user.username} <FaCaretDown />
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <Link to={`/my-account/${user.username}`} className="dropdown-item">My Account</Link>
                                {!user.roles.includes('seller') && (
                                    <Link to={`/my-purchases/${user.username}`} className="dropdown-item">My Purchases</Link>
                                )}
                                {user.roles.includes('seller') && (
                                    <Link to={`/my-sales/${user.username}`} className="dropdown-item">My Sales</Link>
                                )}
                                <Link to="/settings" className="dropdown-item">Settings</Link>
                                <Link to="/login" onClick={handleLogout} className="dropdown-item">Logout</Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
