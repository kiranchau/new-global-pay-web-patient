/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */
import React, {useState} from "react";

export function QuickPanel() {
  const [selectedTab, setSelectedTab] = useState("AuditLogs");

  const setTab = _tabName => {
    setSelectedTab(_tabName);
  };

  return (
     <div></div>
  );
}
