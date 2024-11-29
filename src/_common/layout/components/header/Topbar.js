
import React, { useMemo, useState } from "react";
import objectPath from "object-path";
import { useHtmlClassService } from "../../_core/AppLayout";

export function Topbar() {
  const [open_popup, setopen_popup] = useState(false)

  const uiService = useHtmlClassService();
  useMemo(() => {
    return {
      viewSearchDisplay: objectPath.get(
        uiService.config,
        "extras.search.display"
      ),
      viewNotificationsDisplay: objectPath.get(
        uiService.config,
        "extras.notifications.display"
      ),
      viewQuickActionsDisplay: objectPath.get(
        uiService.config,
        "extras.quick-actions.display"
      ),
      viewCartDisplay: objectPath.get(uiService.config, "extras.cart.display"),
      viewQuickPanelDisplay: objectPath.get(
        uiService.config,
        "extras.quick-panel.display"
      ),
      viewLanguagesDisplay: objectPath.get(
        uiService.config,
        "extras.languages.display"
      ),
      viewUserDisplay: objectPath.get(uiService.config, "extras.user.display"),
    };
  }, [uiService]);


  // method to open popup in SearchDropdown
  const toggle_popup = () => {
    setopen_popup(!open_popup)
  }


  return (
    <div></div>
  );
}
