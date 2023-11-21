import { TabProps } from '@/interface';

// interface TabProps {
//   id: string;
//   title: string;
//   activeClass: string;
//   notActiveClass: string;
//   activeTab?: string;
//   setActiveTab?: (id: string) => void;
// }

function TabTitle({
  id,
  title,
  activeClass,
  notActiveClass,
  activeTab,
  setActiveTab,
}: TabProps) {
  console.log(id);

  const handTabSwitch = (id: string) => {
    if (setActiveTab) {
      setActiveTab(id);
    }
  };

  return (
    <main
      onClick={() => handTabSwitch(id)}
      className={activeTab === id ? activeClass : notActiveClass}
    >
      <ul className=' tabTitle'>
        <li className=''>
          <h4>{title}</h4>
        </li>
      </ul>
    </main>
  );
}

export default TabTitle;
