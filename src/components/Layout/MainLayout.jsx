import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import GlobalChatBar from './GlobalChatBar';
import MobileNav from './MobileNav';
import { useResponsive } from '../../hooks/useResponsive';
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
  const { isMobile } = useResponsive();

  return (
    <>
      <div className={`main-layout ${isMobile ? 'mobile' : ''}`}>
        {/* Desktop/Tablet: Show sidebar */}
        {!isMobile && (
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
        )}

        {/* Desktop/Tablet: Show secondary sidebar inline */}
        {!isMobile && secondarySidebar}

        <main className="content-area">
          {children}
        </main>
      </div>

      {/* Desktop/Tablet: Show GlobalChatBar */}
      {!isMobile && (
        <GlobalChatBar
          activeTab={activeTab}
          onChatStart={onChatStart}
          isPrimarySidebarCollapsed={isPrimarySidebarCollapsed}
          hasSecondarySidebar={hasSecondarySidebar}
          isSecondarySidebarCollapsed={isSecondarySidebarCollapsed}
        />
      )}

      {/* Mobile: Show bottom navigation and FAB */}
      {isMobile && (
        <>
          <MobileNav
            activeTab={activeTab}
            onTabChange={onTabChange}
            trips={trips}
            onCreateTrip={onCreateTrip}
            onNavigateHome={onNavigateHome}
            onJourniiClick={onJourniiClick}
            onOpenSettings={onOpenSettings}
          />
          <GlobalChatBar
            activeTab={activeTab}
            onChatStart={onChatStart}
            isMobile={true}
          />
        </>
      )}
    </>
  );
};

export default MainLayout;
