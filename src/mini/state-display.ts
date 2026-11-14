import { HomeAssistant } from "mushroom-cards/src/ha";
import { BtClimateEntity } from "../shared/climate";
import {
  ExternalSensorsConfig,
  formatHumidity,
  isDoorOpen,
  isWindowOpen,
} from "../shared/bt";
import { localize } from "../shared/localize";

export function formatMiniStateDisplay(
  hass: HomeAssistant,
  stateObj: BtClimateEntity,
  config?: ExternalSensorsConfig,
): string {
  const windowOpen = isWindowOpen(hass, stateObj, config);
  const doorOpen = isDoorOpen(stateObj);
  const summer = stateObj.attributes.call_for_heat === false;

  let stateDisplay = hass.formatEntityState(stateObj);
  if (
    stateObj.attributes.hvac_action &&
    stateObj.attributes.hvac_action !== "off"
  ) {
    stateDisplay = hass.formatEntityAttributeValue(stateObj, "hvac_action");
  }

  const statusLabel = windowOpen
    ? `(${localize({ hass, string: "extra_states.window_open" })})`
    : doorOpen
      ? `(${localize({ hass, string: "extra_states.door_open" })})`
      : summer
        ? `(${localize({ hass, string: "extra_states.summer" }) || "Summer"})`
        : "";

  let temperature = "";
  if (stateObj.attributes.current_temperature != null) {
    temperature =
      hass.formatEntityAttributeValue(stateObj, "current_temperature") ||
      `${stateObj.attributes.current_temperature} ${hass.config.unit_system.temperature}`;
  }

  const lead = [statusLabel, temperature].filter(Boolean).join(" ");
  const humidity = formatHumidity(hass, stateObj, config);
  const extras = [lead, humidity].filter(Boolean);
  if (extras.length) {
    stateDisplay += ` ⸱ ${extras.join(" ⸱ ")}`;
  }

  return stateDisplay;
}
