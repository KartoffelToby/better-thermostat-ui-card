# Changelog

## 3.2.0

### Fixed

- Garbled card when a non-BT climate entity (e.g. Daikin `daikin_onecta`) is in `fan_only`/`dry` mode and reports no target temperature: the dial now follows HA core's guard (feature bit **and** non-null value) and falls back to a readonly current-temperature dial, with the mode buttons still available to switch back.
- Off-state dial and inactive mode buttons previously referenced an invalid color (`var(--rgb-grey)` RGB triplet used as a color) — they are now genuinely grey.
- The dial height cap never took effect because the wrong element was measured; the dial now shrinks properly instead of being cut off.
- Preset overlay state is reset cleanly when a card is detached and re-attached (Lovelace edit mode, tab switches).

### Added

- **Custom colors**: new `colors:` option plus a "Colors" section in both visual editors — override any HVAC mode or Better Thermostat preset color with an HA theme color token or raw CSS color. Themes can override the same colors globally via `--bt-color-<key>` CSS variables. Defaults are unchanged; see the README.
- Editor layout restructured into sections (sensors / display / colors / interaction / features / warnings); the normal card's editor gained the `debug_*` toggles; each editor now only offers options its card actually reads.
- Tests (`bun test`), ESLint (flat config) and Prettier, wired into CI.

### Changed

- Build output now targets ES2021 (babel removed). Browsers/webviews without ES2021 support are no longer supported.
- `ha-frontend` git submodule removed and dependencies pruned (~50 packages); the bundle shrank from 444 K to ~390 K.
- Internals: shared `src/shared/` modules for both cards, HA-core-style state colors, cached localizer, `shouldUpdate` narrowing (cards no longer re-render on unrelated entity updates), memoized BT status parsing, stricter TypeScript (`as any` casts reduced from 82 to 8).

## Unreleased

- Eco toggle: use preset-based flow (preset_mode "eco") when available (requires better_thermostat >= 1.8.0). Falls back to legacy `better_thermostat.set_eco_mode` for older integrations.
- Minor: update README to document preset-based eco toggle.
