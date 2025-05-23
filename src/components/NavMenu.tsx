import React from 'react';

interface NavMenuProps {
  isOpen: boolean;
  isLoaded: boolean;
}

const NavMenu: React.FC<NavMenuProps> = ({ isOpen, isLoaded }) => {
  const menuItems = ['People', 'Places', 'Things', 'Clients', 'About', 'Connect', 'Shop'];

  return (
    <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
      <ul className={`md:flex md:space-x-8 bg-black/90 md:bg-transparent absolute md:relative left-0 right-0 top-16 md:top-0 p-4 md:p-0 transition-opacity duration-1000 delay-500 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        {menuItems.map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="block py-2 md:py-0 text-white hover:text-gray-300 transition-colors"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavMenu;