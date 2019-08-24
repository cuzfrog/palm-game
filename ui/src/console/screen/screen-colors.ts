import darken from "polished/lib/color/darken";
import lighten from "polished/lib/color/lighten";

const background = "#9ead86";
const active = "#161616";

export const ScreenColors = {
  active,
  activeLight: lighten(0.05, active),
  deactivated: darken(0.05, background),
  background,
};
