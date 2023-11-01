import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface TabProps {
  label: string;
  route: string;
  selected?: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, route, selected = false, onClick }) => {
  return (
    <Link to={route}>
      <button
        className={`text-slate-700 z-30 mb-0 flex w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out ${selected ? 'active' : ''}`}
        role="tab"
        aria-selected={selected}
        onClick={onClick}
      >
        <span className="ml-1">{label}</span>
      </button>
    </Link>
  );
};

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    { label: 'Store details', route: '/settings/store_details' },
    { label: 'Plan', route: '/settings/plan' },
    { label: 'Billing', route: '/settings/billing' },
    { label: 'User & Permission', route: '/settings/user-permission' },
    { label: 'Payment', route: '/settings/payment' },
  ];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="relative items-center bg-white p-3 rounded-lg">
      <ul className="relative flex list-none flex-wrap rounded-lg bg-blue-gray-50/60 p-1" role="list">
        {tabs.map((tab, index) => (
          <li key={index} className="z-30 flex-auto text-center">
            <Tab
              label={tab.label}
              route={tab.route}
              selected={index === activeTab}
              onClick={() => handleTabClick(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
