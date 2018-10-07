import { colors } from "./constants";

export const themes = {
  light: {
    "daterangepicker-flyout-background": colors.WHITE,
    "daterangepicker-flyout-foreground": colors.BLACK,
    "daterangepicker-flyout-box-shadow-color": colors["LIGHT-GREY"],
    "daterangepicker-flyout-border-color": colors["LIGHT-GREY"],
    "daterangepicker-date-hover": colors["LIGHT-GREY"],
    "daterangepicker-date-selected": colors["LIGHT-GREY"],
    "daterangepicker-input-background": colors.WHITE,
    "daterangepicker-input-foreground": colors.BLACK,
    "daterangepicker-input-box-shadow-color": "rgba(0,0,0,.075)",
    "daterangepicker-input-border-color": colors["LIGHT-GREY"],
    "daterangepicker-icon-color": colors.BLACK,
    "daterangepicker-font-size": "14px"
  },
  dark: {
    "daterangepicker-flyout-background": colors.BLACK,
    "daterangepicker-flyout-foreground": colors.WHITE,
    "daterangepicker-flyout-box-shadow-color": colors["LIGHT-GREY"],
    "daterangepicker-flyout-border-color": colors["LIGHT-GREY"],
    "daterangepicker-date-hover": colors["LIGHT-GREY"],
    "daterangepicker-date-selected": colors["LIGHT-GREY"],
    "daterangepicker-input-background": colors.BLACK,
    "daterangepicker-input-foreground": colors.WHITE,
    "daterangepicker-input-box-shadow-color": "rgba(0,0,0,.075)",
    "daterangepicker-input-border-color": colors["MID-GREY"],
    "daterangepicker-icon-color": colors.WHITE,
    "daterangepicker-font-size": "14px"
  }
};
