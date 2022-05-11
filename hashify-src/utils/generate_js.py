#!/usr/bin/env python3
#-*- coding:utf-8 -*-


template = """class {0} extends mojs.CustomShape {{
  getShape () {{
    return '<path d="{3}"></path>';
  }}
}}
mojs.addShape('{0}', {0});
mojs.addShape('{1}', {0});
mojs.addShape('{2}', {0});


"""

filename = "font_paths.txt"
outputJs = "custom_fonts.js"

if __name__ == "__main__":
    
    with open(filename) as f:
        with open(outputJs, 'w') as w:
            for line in f:
                char_font_name, char_path = line.replace('"', '').replace('\n', '').split('.svg        d=')
                char_single = char_font_name[0]
                char_class = "char_" + char_single
                
                w.write(template.format(char_class, char_single, char_font_name, char_path))


