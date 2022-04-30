#!/bin/bash

awk 'FNR==63 {print FILENAME, $0}' *.svg > font_paths.txt
python3 generate_js.py


