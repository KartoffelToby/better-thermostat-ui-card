[![Version - 3.0.1](https://img.shields.io/badge/Version-3.0.1-009688?style=for-the-badge)](https://github.com/KartoffelToby/better-thermostat-ui-card)
[![Discord](https://img.shields.io/discord/925725316540923914.svg?style=for-the-badge)](https://discord.gg/9BUegWTG3K)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)

# UI Card for Better Thermostat

This is a advanced climate card for HA, but with some improvements for the custom [better_thermostat](https://github.com/KartoffelToby/better_thermostat) integration. (you need at least 1.8.0)

Note: The Eco toggle uses the preset-based API introduced in better_thermostat 1.8.0 (preset_mode "eco"). The card will prefer calling `climate.set_preset_mode` with `preset_mode: "eco"` when the preset is available; a fallback to the legacy `better_thermostat.set_eco_mode` service is kept for older installations.

As for now the main improvement is the ability to see the extra status from better_thermostat like if a window open is detected etc.
You can configure the cards as you like, we use the latest HA UI Configuration tool.

## Better Thermostat Normal UI Card

![Better Thermostat UI Card](/assets/3_1.png)
![](/assets/3_2.png)
![](/assets/3_3.png)
![](/assets/3_4.png)
![](/assets/3_5.png)
![](/assets/3_6.png)
![](/assets/3_7.png)
![](/assets/3_8.png)

## Better Thermostat Mini UI Card

![](/assets/3_9.png)
![](/assets/3_10.png)
![](/assets/3_11.png)
![](/assets/3_12.png)
![](/assets/3_13.png)
![](/assets/3_14.png)
![](/assets/3_15.png)
![](/assets/3_16.png)
![](/assets/3_17.png)
 
## Goals

- [X] Add better_thermostat support for showing the extra status
- [X] Improve the UI for Touch devices
- [X] Show also the Humidity in the UI

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
