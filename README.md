# Peptidic and Nucleic sequences analysis

This project allows to install the website:

https://mstools.epfl.ch/am2s/

This project is a simple application of "The Visualizer", an IDE allowing to create quickly
scientific applications in the browser.

The source code of "The Visualizer" is accessible from: https://github.com/npellet/visualizer.

When developing using this framework the full application is a 'view' that is stored as a JSON named 'view.json'.
This file contains the description of all the sued modules as well as the relation between them.
If you want to learn more about "The Visualizer" you may have a look on their website as well as the Tutorial menu
of the website http://www.cheminfo.org/.

All the calculations and analysis of the mass spectra are done using the library https://github.com/cheminfo/molecular-formula. This library can be used in the browser as well as in nodejs.

Other open-source libraries used in this project are loaded from the CND https://www.lactame.com. The corresponding source code
are available on one of the 3 following github organizations:

- https://github.com/mljs
- https://github.com/cheminfo
- https://github.com/cheminfo-js

## Installation

Simply clone this project on a webserver (apache, nginx or other) and point the the page html/index.html. The local application is
loaded from the file 'html/view.json'. Internet access is required to load the examples and some libraries from the CDN.
