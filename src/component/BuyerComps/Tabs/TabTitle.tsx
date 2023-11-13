interface TabProps {
  id: string;
  title: string;
  activeTab?: string | boolean;
  setActiveTab?: (id: string) => void;
}

function TabTitle({ id, title, activeTab = "", setActiveTab }: TabProps) {
  console.log(id);

  const handTabSwitch = (id: string) => {
    if (setActiveTab) {
      setActiveTab(id);
    }
  };

  return (
    <main
      onClick={() => handTabSwitch(id)}
      className={activeTab === id ? 'active' : 'notActive'}
    >
      <ul className=' tabTitle'>
        <li className='d-flex flex-row align-items-center '>
          <h4>{title}</h4>
        </li>
      </ul>
    </main>
  );
}

export default TabTitle;
