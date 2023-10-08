import React from 'react';
import {LeftSide} from "../LeftSide";

const Layout:React.FC = () => {
return (
    <div className="app">
      <header className="app-header">
      </header>
        <main className="app-main">
            <LeftSide />
        </main>
        <footer className="app-footer">
        </footer>
    </div>
  );
}

export default Layout;