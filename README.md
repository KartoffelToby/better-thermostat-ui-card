[![Version - 2.2.1](https://img.shields.io/badge/Version-2.2.1-009688?style=for-the-badge)](https://github.com/KartoffelToby/better-thermostat-ui-card)
[![Discord](https://img.shields.io/discord/925725316540923914.svg?style=for-the-badge)](https://discord.gg/9BUegWTG3K)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)

# UI Card for Better Thermostat

This is a advanced climate card for HA, but with some improvements for the custom [better_thermostat](https://github.com/KartoffelToby/better_thermostat) integration. (you need at least 1.3.0)

As for now the main improvement is the ability to see the extra status from better_thermostat like if a window open is detected, or nightmode is on or summer mode.

![Better Thermostat UI Card](/assets/1.png)
![](/assets/2.png)
![](/assets/3.png)
![](/assets/4.png)
![](/assets/5.png)
![](/assets/6.png)
![](/assets/7.png)
![](/assets/8.png)

 
## Goals

- [X] Add better_thermostat support for showing the extra status
- [X] Improve the UI for Touch devices
- [X] Show also the Humidity in the UI

## Options

| Name                 | Type    | Default      | Description                                                                                            |
| -------------------- | ------- | ------------ | ------------------------------------------------------------------------------------------------------ |
| type                 | string  | **Required** | `custom:better-thermostat-ui-card`                                                                     |
| entity               | string  | **Required** | The entity id of climate entity (must be a better_thermostat entity). Example: `climate.hvac`          |
| eco_temperature      | number  | **optional** | target temp for night/away/eco mode triggerd by ui button                                              |
| disable_window      | boolean  | **optional** | turn off the window open indicator                                                                     |
| disable_summer      | boolean  | **optional** | turn off the summer indicator                                                                          |
| disable_heat        | boolean  | **optional** | turn off the on/heat button                                                                          |
| disable_eco         | boolean  | **optional** | turn off the eco button                                                                          |
| disable_off         | boolean  | **optional** | turn off the off button                                                                         |
| disable_buttons         | boolean  | **optional** | turn off the plus/minus buttons                                                                        |
| name                | string/boolean  | **optional** | override the default entity name, us false to 

## Help wanted!

It would be awsome if you help me to translate this card to other languages.

Create a PR, the Translation is done in json files checkout the en translation [here](https://github.com/KartoffelToby/better-thermostat-ui-card/blob/master/src/localize/languages/en.json)

Please add your language to this list as well while you are making your PR. Put it in alphabetical order and according to [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).

## Translations

[INLANG Editor](https://fink.inlang.com/github.com/KartoffelToby/better-thermostat-ui-card)

[![inlang status badge](https://badge.inlang.com/?url=github.com/KartoffelToby/better-thermostat-ui-card)](https://fink.inlang.com/github.com/KartoffelToby/better-thermostat-ui-card?ref=badge)

What we have so far:
- en - Reference 
- bg
- ca
- cn
- cs
- da
- de
- el
- es
- fi
- fr
- hu
- it
- lv
- nl
- no
- pl
- pt
- ro
- ru
- sv
- sl
- sk
- tr
- uk

## Support me
<a href="https://www.buymeacoffee.com/kartoffeltoby"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=kartoffeltoby&button_colour=0ac982&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"></a>
