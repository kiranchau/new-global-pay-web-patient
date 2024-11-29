import React, {useMemo} from "react";
import objectPath from "object-path";
import {useHtmlClassService} from "../_core/AppLayout";
import {Header} from "./header/Header";
import {HeaderMobile} from "./header-mobile/HeaderMobile";
import {Aside} from "./aside/Aside";
import {Footer} from "./footer/Footer";
import {LayoutInit} from "./LayoutInit";
import {QuickPanel} from "./extras/offcanvas/QuickPanel";
import {QuickUser} from "./extras/offcanvas/QuickUser";
import {ScrollTop} from "./extras/ScrollTop";
import {StickyToolbar} from "./extras/StickyToolbar";

export function Layout({ children }) {
    const uiService = useHtmlClassService();
    const layoutProps = useMemo(() => {
        return {
            layoutConfig: uiService.config,
            selfLayout: objectPath.get(uiService.config, "self.layout"),
            asideDisplay: objectPath.get(uiService.config, "aside.self.display"),
            subheaderDisplay: objectPath.get(uiService.config, "subheader.display"),
            desktopHeaderDisplay: objectPath.get(
                uiService.config,
                "header.self.fixed.desktop"
            ),
            contentCssClasses: uiService.getClasses("content", true),
            contentContainerClasses: uiService.getClasses("content_container", true),
            contentExtended: objectPath.get(uiService.config, "content.extended")
        };
    }, [uiService]);

    return layoutProps.selfLayout !== "blank" ? (
        <>
            {/*begin::Main*/}
            <HeaderMobile/>
            <div>
                {/*begin::Page*/}
                    {layoutProps.asideDisplay && (<Aside/>)}
                    {/*begin::Wrapper*/}
                        <Header/>
                        {/*begin::Content*/}
                            {/*begin::Entry*/}
                                    <div>
                                        {children}
                                    </div>
                            {layoutProps.contentExtended && {children}}
                            {/*end::Entry*/}
                        {/*end::Content*/}
                        <Footer/>
                    {/*end::Wrapper*/}
                {/*end::Page*/}
            </div>
            <QuickUser/>
            <QuickPanel/>
            <ScrollTop/>
            <StickyToolbar/>
            {/*end::Main*/}
            <LayoutInit />
        </>
    ) : (
        // BLANK LAYOUT
        <div >{children}</div>
    );
}
