import React, {useMemo} from "react";
import objectPath from "object-path";
import {useHtmlClassService} from "../../_core/AppLayout";
import { useSelector, shallowEqual } from "react-redux"

export function HeaderMobile() {
  const uiService = useHtmlClassService();
  const logo = useSelector((state) => state.auth.logo, shallowEqual)

  const layoutProps = useMemo(() => {
    return {
      headerLogo: uiService.getStickyLogo(),
      asideDisplay: objectPath.get(uiService.config, "aside.self.display"),
      headerMenuSelfDisplay:
      objectPath.get(uiService.config, "header.menu.self.display") === true,
      headerMobileCssClasses: uiService.getClasses("header_mobile", true),
      headerMobileAttributes: uiService.getAttributes("header_mobile")
    };
  }, [uiService]);

  return (
      <>
        {/*begin::Header Mobile*/}
      
 



        
        {/*end::Header Mobile*/}
      </>
  );
}
