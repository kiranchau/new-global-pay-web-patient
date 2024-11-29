import React, { useMemo } from "react"
import { useHtmlClassService } from "../../_core/AppLayout"

export function Footer() {
  const uiService = useHtmlClassService()

  const layoutProps = useMemo(() => {
    return {
      footerClasses: uiService.getClasses("footer", true),
      footerContainerClasses: uiService.getClasses("footer_container", true),
    }
  }, [uiService])

  return (
    <div
      className={`${layoutProps.footerClasses}`}
      id="kt_footer"
    >
      <div className={`${layoutProps.footerContainerClasses}`}>
      
        
      </div>
    </div>
  )
}
