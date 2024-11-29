import React from 'react'
import { useTranslation } from 'react-i18next'

export const Footer = () => {
  const { t } = useTranslation(["Common"]);
  return (
    <footer className="footer footer-fixed">
      <div className="footer-inner">
        <p>{t("Copyright © 2021-2025")} | {t("GlobalPAY Participant Portal")} | {t("All right reserved")} | <a href="https://realtime-ctms.com/privacy-policy/"  rel="noopener noreferrer"  target="_blank">
          {t("Privacy policy")}</a> |<a href="https://realtime-ctms.com/cookies-policy/"  rel="noopener noreferrer"  target="_blank"> {t("Cookies policy")} </a></p>
      </div>
    </footer>
  )
}
