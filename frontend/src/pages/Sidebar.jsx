import React from "react";

const Sidebar = () => {
    return (
        <div className="bg-gradient-to-br from-blue-500 to-blue-800 text-white w-64 h-screen flex flex-col items-center p-4 transition-transform duration-500 hover:translate-x-0">
            {/* User Info */}
            <div className="flex flex-col items-center mb-8">
                <img
                    src="https://via.placeholder.com/100"
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full mb-4 shadow-lg"
                />
                <h3 className="text-lg font-semibold">John Doe</h3>
                <p className="text-sm text-blue-200">Software Engineer</p>
            </div>

            {/* Menu */}
            <ul className="w-full">
                <li className="mb-4">
                    <a
                        href="#"
                        className="block py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                    >
                        Dashboard
                    </a>
                </li>
                <li className="mb-4">
                    <a
                        href="#"
                        className="block py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                    >
                        Profile
                    </a>
                </li>
                <li className="mb-4">
                    <a
                        href="#"
                        className="block py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                    >
                        Messages
                    </a>
                </li>
                <li className="mb-4">
                    <a
                        href="#"
                        className="block py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                    >
                        Settings
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="block py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                    >
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
