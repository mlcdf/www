Title: Dark mode
Date: 2019-03-30 10:20
Category: Articles


Dark mode is finally coming to CSS, and you can start experimenting with it thanks to Safari Technology Preview. With their latest release, the experimental browser includes support for the prefers-color-scheme media query. Variables in CSS are also coming, making dynamic light and dark modes for your visitors easier than ever.

Here’s an abbreviated set of the variables and media query I’ve put to use for my sites.

```css
:root {
  --body-bg: #fafafa;
  --body-color: #555;
  --link-color: #222;
  --link-color-hover: #000;
}
@media (prefers-color-scheme: dark) {
  :root {
    --body-bg: #212529;
    --body-color: #6c757d;
    --link-color: #dee2e6;
    --link-color-hover: #fff;
  }
}
```

### Callbaut

You should use this time to experiment with how you’d adapt your own styles to put the new media query to work. For example, picking the dark colors for my site wasn’t too difficult, but I found screenshots were far too intense for comfortable reading. A quick opacity and transition brings some added comfort while reading at night.

Let’s go for the next 100000 tweets!
