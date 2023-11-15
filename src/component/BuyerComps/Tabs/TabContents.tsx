import React, { ReactNode } from 'react';

interface TabProps {
  id: string;
  activeTab?: string;
  comps?: ReactNode;
}

function TabContents({ id, activeTab, comps }: TabProps) {
  return activeTab === id ? <div className=''> {comps} </div> : '';
}

export default TabContents;
