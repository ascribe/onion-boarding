Onionboarding
=============

Onboarding mini-app for Onion that can be injected into a static page :zap:

Usage
-----

Onionboarding was designed with flexibility and ease of installation in
mind, however, there are some nuances (mostly just with setting it up so
your static page can access your built version). Installing Onionboarding
onto a static page is a three step process:

  1. [Build package](#build)
  1. [Load Onionboarding through an iframe](#load-onionboarding)
  1. Wait to profit from all those signups!

#### Build

TODO: Not sure how we'll actually send this to AWS / etc as part of a
static site. Should we git clone the repo there and then run the build?
Or should we git clone the repo locally, build, and then just send the
built files? How to deal with the env variables?

Building the package for production is as simple as running `npm run
build:dist`. The production .html, .js, .css files will be available in the
/dist folder afterwards to link to or move to a more appropriate
location. If moving the files, all the files should be kept together in
the same location.

**NOTE**: The build for Onionboarding relies on number of environment
variables which should be set accordingly on your local instance or
production environment. See the [template](./.env_template) for which
values are used.

#### Load Onionboarding

Load the built `index.html` file you built from the [build](#build)
step into your static page into an iframe and Onionboarding should
now appear :zap:!

The `index.html` file will load any necessary dependencies so you
shouldn't have do anything extra.

An example iframe to use:

```html
<iframe
    name="Onionboarding"
    frameborder="no"
    height="675"
    width="100%"
    style="border: 0; margin: 0"
    src="./path-to-onionboarding/index.html">
</iframe>
```

Or see how the [demo page](./demo/index.html) does it.

**NOTE**: Onionboarding is flexible in regards to the sizing of its
container, but it's not quite your shaman-level yoga-guru in terms of
fitting into something. The iframe container should have:

  * A height of at least 650px, but ideally 675px (which more or less
    occupies the entirety of a monitor whose total avilable CSS height
    is 800px, given toolbars and etc.).
  * (TODO: confirm) A width of at least 360px, but ideally more if
    you'd like to see it in desktop mode.

Development
-----------

For now, the final bundle is not too big so we're not optimizing it,
but in the future it woudl be nice to optimize for common assets
between apps (ie. React, React Components, etc.).

The only thing to keep in mind is that in the end, everything should be
loaded by the `index.html` that's generated from its
[template](./src/index_template.html) by
[HTML-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin).
For the most part, this should be automatic.

#### Demo server

You can launch the demo server by simply running `npm run start`.

#### JS Style guide

See the [ascribe/javascript](https://github.com/ascribe/javascript) styleguide.

#### CSS / SASS

Every component should be styled using their own
[CSS module](https://github.com/css-modules/css-modules) in a
`[component_name].scss` file that's located in the same folder as the
component. Variables and mixins should be used when something can be
generalized for multiple components or be used in the future to more
easily extend or customize styles. Pure SASS script files (ie.
variables and mixins) should be placed in the [styles](./src/styles/)
folder.

We use [React CSS Modules](https://github.com/gajus/react-css-modules)
to make it easier to apply styles from a component's CSS module.

#### Assets

For icons, svgs are preferred and we use
[svg-react-loader](https://github.com/jhamlet/svg-react-loader) to load
the svgs from [styles/icons](./src/styles/icons) as React components.
[Image-webpack-loader](https://github.com/tcoopman/image-webpack-loader)
is used to optimize the svg upon loading it, but it's still good to hand
optimize the svg and put it through
[SVGOMG](https://jakearchibald.github.io/svgomg/) before commiting to
avoid cruft being saved in the repo.

Other assets are placed in [styles/assets](./src/styles/assets). For
now, only pngs have an associated loader and are optimized with
[image-webpack-loader](https://github.com/tcoopman/image-webpack-loader).
