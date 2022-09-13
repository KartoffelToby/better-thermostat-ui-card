[![Version - 0.1.3](https://img.shields.io/badge/Version-0.1.3-009688?style=for-the-badge)](https://github.com/KartoffelToby/better-thermostat-ui-card)

# UI Card for Better Thermostat

This project is in a early stage of development. Its a 1:1 adaption of the default HA Thermostat Card, but with some improvements for the custom [better_thermostat](https://github.com/KartoffelToby/better_thermostat) integration. (you need at least 1.0.0)

As for now the main improvment is the ability to see the extra status from ai_thermostat like if a window open is deteteced, or nightmode is on or summer mode.

<img style="width:200px; height:200px; object-fit:cover;" src="assets/1.png" width="200px"><img style="width:200px; height:200px; object-fit:cover;" src="assets/2.png" width="200px"><img style="width:200px; height:200px; object-fit:cover;" src="assets/3.png" width="200px"><img style="width:200px; height:200px; object-fit:cover;" src="assets/4.png" width="200px">
 
## Goals

- [X] Add ai_thermostat support for showing the extra status
- [ ] Improve the UI for Touch devices
- [ ] Show also the Humidity in the UI

## Options

| Name                 | Type    | Default      | Description                                                                                            |
| -------------------- | ------- | ------------ | ------------------------------------------------------------------------------------------------------ |
| type                 | string  | **Required** | `custom:better-thermostat-ui-card`                                                                          |
| entity               | string  | **Required** | The entity id of climate entity (must be a ai_thermostat entity). Example: `climate.hvac`                                               |


## Help wanted!

It would be awsome if you help me to translate this card to other languages.

Create a PR, the Translation is done in json files checkout the en translation [here](src/localize/languages/en.json)

Please add your language to this list as well while you are making your PR. put it in alfabetical order and according to [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).

What we have so far:
- en - Reference 
- bg
- cn
- cs
- da
- de
- el
- es
- fi
- fr
- hu
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
<a href="https://www.buymeacoffee.com/kartoffeltoby" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
