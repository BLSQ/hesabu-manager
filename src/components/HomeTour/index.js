import React, { useEffect } from "react";
import ReactJoyride from "react-joyride";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { TOUR_CONFIG } from "../../constants/project";
import theme from "../../utils/theme";

const tourLocales = t => ({
  back: t("buttons.back"),
  close: t("buttons.close"),
  last: t("buttons.last"),
  next: t("buttons.next"),
  skip: t("buttons.skip"),
});

const HomeTour = () => {
  const { t } = useTranslation();
  const [cookies, setCookie] = useCookies(["name"]);
  useEffect(() => {
    if (!cookies.hadConfigTour) {
      setCookie("hadConfigTour", true);
    }
  }, [cookies, setCookie]);
  return (
    <ReactJoyride
      steps={TOUR_CONFIG(t)}
      run={!cookies.hadConfigTour}
      continuous={true}
      showProgress={true}
      disableScrolling={true}
      locale={tourLocales(t)}
      styles={{
        options: {
          arrowColor: "#fff",
          backgroundColor: "#fff",
          beaconSize: 36,
          overlayColor: "rgba(0, 0, 0, 0.5)",
          primaryColor: theme.palette.primary.main,
          spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
          textColor: "#333",
          width: undefined,
          zIndex: 100,
          textAlign: "left !important",
        },
        tooltipContainer: {
          textAlign: "left",
        },
        tooltipContent: {
          padding: theme.spacing(2, 0),
        },
      }}
    />
  );
};

export default HomeTour;
