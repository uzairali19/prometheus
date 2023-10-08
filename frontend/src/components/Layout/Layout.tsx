import React from 'react';
import {LeftSide} from "../LeftSide";
import {RightSide} from "../RightSide";

const Layout: React.FC = () => {
    const currentYear:number = new Date().getFullYear();

    return (
        <div className="flex flex-col h-screen bg-gray-200">
            <header className="bg-gray-700 p-4 text-white text-center"> {/* Here, I'm giving a dark background and white text as an example */}
                <h1>UZAIR ALI</h1>
            </header>

            <main className="flex-grow flex">
                <LeftSide className="flex-grow bg-gray-200 mt-96"/>
                <RightSide className="flex-grow bg-gray-300"/>
            </main>
            <footer className="app-footer bg-gray-800 text-white p-4 text-center">
                © {currentYear} Prometheus. All rights reserved.
            </footer>

        </div>
    );
}

export default Layout;
