module Css.Reset exposing
    ( ericMeyer, html5Doctor, destyle
    , normalize, ress, sanitize, theNewCssReset
    )

{-| This module helps you to reset base styles. Compile it with your elm-css code.

  - Eric Meyer’s Reset CSS
  - html5doctor.com Reset Stylesheet
  - destyle.css
  - Normalize.css
  - ress
  - sanitize.css
  - The New CSS Reset

@docs ericMeyer, html5Doctor, destyle
@docs normalize, ress, sanitize, theNewCssReset

-}

import Css.Global exposing (Snippet)
import Css.Reset.Destyle as Destyle
import Css.Reset.EricMeyer as EricMeyer
import Css.Reset.Html5Doctor as Html5Doctor
import Css.Reset.Normalize as Normalize
import Css.Reset.Ress as Ress
import Css.Reset.Sanitize as Sanitize
import Css.Reset.TheNewCssReset as TheNewCssReset


{-| Eric Meyer’s Reset CSS which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).
-}
ericMeyer : List Snippet
ericMeyer =
    EricMeyer.snippets


{-| html5doctor.com Reset Stylesheet which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).
-}
html5Doctor : List Snippet
html5Doctor =
    Html5Doctor.snippets


{-| destyle.css which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).
-}
destyle : List Snippet
destyle =
    Destyle.snippets


{-| Normalize.css which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).
-}
normalize : List Snippet
normalize =
    Normalize.snippets


{-| ress which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).
-}
ress : List Snippet
ress =
    Ress.snippets


{-| sanitize.css which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).
-}
sanitize : List Snippet
sanitize =
    Sanitize.snippets


{-| The New CSS Reset which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).
-}
theNewCssReset : List Snippet
theNewCssReset =
    TheNewCssReset.snippets
