Title: 5 steps to faster web fonts
Date: 2022-05-22
Category: Links
Link: https://iainbean.com/posts/2021/5-steps-to-faster-web-fonts/

> Use the most modern file formats

<div></div>

> By subsetting a font, we can generate a new smaller font file which only includes the glyphs (a glyph is an individual character or symbol) we need.

En suivant ces deux recommandations, j'ai drastiquement réduit la taille des polices que j'embarque sur ce site :

- taille d'une police en TTF téléchargée sur Google Fonts : ~250Ko
- conversion en WOFF : ~110Ko
- soustraction des glyphes unitilisés : ~40Ko.

*[WOFF]: Web Open Font Format
*[TTF]: True Type Font
