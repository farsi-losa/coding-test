import { useState, useEffect } from "react";
import SalesTable from "../component/salesTable"
import ChatAi from "../component/chatAi"

export default function Home() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div style={{ padding: "2rem" }}>
      <section style={{ marginBottom: "2rem" }}>
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
            <li className="me-2" role="presentation" onClick={() => setActiveTab("tab1")}>
              <button className={`${activeTab === 'tab1' ? 'text-blue-600 hover:text-blue-600 dark:text-blue-500' : ''} inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`} id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Sales Data</button>
            </li>
            <li className="me-2" role="presentation" onClick={() => setActiveTab("tab2")}>
              <button className={`${activeTab === 'tab2' ? 'text-blue-600 hover:text-blue-600 dark:text-blue-500' : ''}inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`} id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Chat AI</button>
            </li>

          </ul>
        </div>
        <div id="default-tab-content">
          <div className={`${activeTab === 'tab1' ? '' : 'hidden'}  p-4 `} id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <SalesTable/>
          </div>
          <div className={`${activeTab === 'tab2' ? '' : 'hidden'} p-4 `} id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
            <ChatAi/>
          </div>
        </div>
      </section>
      
    </div>
  );
}
