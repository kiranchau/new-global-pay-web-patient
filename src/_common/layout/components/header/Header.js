import React, {useMemo} from "react";
import objectPath from "object-path";
import {useHtmlClassService} from "../../_core/AppLayout";
import {Topbar} from "./Topbar";
import {HeaderMenuWrapper} from "./header-menu/HeaderMenuWrapper";

export function Header() {
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      headerClasses: uiService.getClasses("header", true),
      headerAttributes: uiService.getAttributes("header"),
      headerContainerClasses: uiService.getClasses("header_container", true),
      menuHeaderDisplay: objectPath.get(
        uiService.config,
        "header.menu.self.display"
      )
    };
  }, [uiService]);

  return (
    <>
      {/*begin::Header*/}
      <div
        {...layoutProps.headerAttributes}
      >
        {/*begin::Container*/}
          {/*begin::Header Menu Wrapper*/}
          {layoutProps.menuHeaderDisplay && <HeaderMenuWrapper />}
          {!layoutProps.menuHeaderDisplay && <div />}
          {/*end::Header Menu Wrapper*/}

          {/*begin::Topbar*/}
          <Topbar />
          {/*end::Topbar*/}
        </div>
        {/*end::Container*/}
      <Topbar />
      {/*end::Header*/}
    </>
  );
}
