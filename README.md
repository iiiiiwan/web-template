<br>

# About

<br>

This is a template for web page via gulp.

<br>
---
<br>

# Build

<br>

| Module         | Version  |
|----------------|----------|
| node.js        | 4.2.1    |
| gulp [ CLI ]   | 3.9.0    |
| gulp [ LOCAL ] | 3.9.0    |

<br>

| Command      | Detail                            |
|--------------|-----------------------------------|
| gulp         | Build For Dev. Environment        |
| gulp publish | Build For Pub. Environment        |

<br>

| Task       | Command                   | Detail                            |
|------------|---------------------------|-----------------------------------|
| concat     | gulp modern_jslibs_concat | Generate 'libs.js'                |
| concat     | gulp legacy_jslibs_concat | Generate 'legacy.libs.js'         |
| jade       | gulp jade                 | Build '.html'                     |
| browserify | gulp browserify           | Build '.js'                       |
| refine     | gulp refine               | Delete Console From '.js'         |
| sass       | gulp sass                 | Build '.css'                      |
| sprite     | gulp sprite               | Generate Splited Image + SCSS     |
| imagemin   | gulp imagemin             | Compress Images                   |
| watch      | gulp watch                | Watch                             |
| docs       | gulp docs                 | Generate Document For '.js'       |

<br>
---
<br>

# Directory Structure

```
docs                                     - Document For JavaScript

htdocs                                   - Pub. Root
  └ index.html
  └ assets
    └ css
      └ template.css
    └ img
      └ sample.gif
      └ sprite.png
    └ js
      └ legacy.libs.js
      └ libs.js
      └ template.js

src                                      - Dev. Root
  └ index.jade
  └ assets
    └ img
      └ splite
        └ 1.png
        └ 2.png
        └ 3.png
        └ 4.png
      └ sample.gif
    └ js
      └ libs
        └ jquery.easing.1.3.js
        └ jquery-1.11.3.min.js
        └ jquery-2.1.4.min.js
        └ jquery-migrate-1.2.1.js
        └ velocity.easeplus.min.js
        └ velocity.min.js
      └ module
        └ template.js
    └ scss
      └ _sprite.scss
      └ template.scss

src_parts                                - Dev. Sub Root
  └ data.json
  └ docs_template
  └ jade
    └ common_libs.jade
    └ common_meta.jade
    └ custom_meta.jade
    └ custom_script.jade
    └ custom_style.jade
    └ footer.jade
    └ header.jade
    └ samples.jade
  └ js
    └ common.js
    └ config.js
    └ validate.js
    └ klass
      └ Slick.js
    └ sub_libs
      └ d3.js
      └ jquery.mousewheel.js
      └ jquery.swipe.js
      └ slick.js
      └ underscore.js
    └ template
      └ klass.template.js
      └ plugin.template.js
  └ scss
    └ _animate.scss
    └ _common.scss
    └ _filter.scss
    └ _font_face.scss
    └ _hover.scss
    └ _media_query.scss
    └ _mixin.scss
    └ _reset.scss
    └ _samples.scss
    └ _settings.scss
    └ _slick.scss

gulpfile.js                              - Task Runner

package.json                             - Module List

README.md
```

<br>
---
<br>