# fivem-build-all
Build all typescript scripts for Fivem with one command.

## Installation
1. Place the script where you want (I would suggest putting it in the root of your server).
2. Replace the `checkInDir` parameters on line 5 with the correct location of the resources folder and the correct start of your files. In QBCore, it would be `qb-`, and in ESX, it would be `esx_`.
3. Run the build command
```bash
node build-all.js
```