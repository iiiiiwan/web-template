<br>

# About

<br>

> hogehoge

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