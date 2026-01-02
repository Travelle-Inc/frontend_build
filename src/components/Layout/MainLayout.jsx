import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import GlobalChatBar from './GlobalChatBar';
import './MainLayout.css';

const MainLayout = ({
  children,
  secondarySidebar,
  activeTab,
  onTabChange,
  trips,
  onCreateTrip,
  onNavigateHome,
  onJourniiClick,
  uncategorizedChats,
  onOpenSettings,
  onChatStart,
  isPrimarySidebarCollapsed,
  onPrimarySidebarToggle,
  hasSecondarySidebar,
  isSecondarySidebarCollapsed
}) => {
  return (
    <>
      <div className="main-layout">
        <Sidebar
          activeTab={activeTab}
          onTabChange={onTabChange}
          trips={trips}
          onCreateTrip={onCreateTrip}
          onNavigateHome={onNavigateHome}
          onJourniiClick={onJourniiClick}
          uncategorizedChats={uncategorizedChats}
          onOpenSettings={onOpenSettings}
          isCollapsed={isPrimarySidebarCollapsed}
          onToggleCollapse={onPrimarySidebarToggle}
        />
        {secondarySidebar}
        <main className="content-area">
          {children}
        </main>
      </div>
      <GlobalChatBar
        activeTab={activeTab}
        onChatStart={onChatStart}
        isPrimarySidebarCollapsed={isPrimarySidebarCollapsed}
        hasSecondarySidebar={hasSecondarySidebar}
        isSecondarySidebarCollapsed={isSecondarySidebarCollapsed}
      />
    </>
  );
};

export default MainLayout;
