module Css.Reset exposing (ericMeyer, html5Doctor, normalize, ress, sanitize)

{-| This module helps you to reset base styles. Compile it with your elm-css code.

  - Eric Meyer’s Reset CSS
  - html5doctor.com Reset Stylesheet
  - Normalize.css
  - ress
  - sanitize.css

@docs ericMeyer, html5Doctor, normalize, ress, sanitize

-}

import Css.Global exposing (Snippet)
import Css.Reset.EricMeyer as EricMeyer
import Css.Reset.Html5Doctor as Html5Doctor
import Css.Reset.Normalize as Normalize
import Css.Reset.Ress as Ress
import Css.Reset.Sanitize as Sanitize


{-| Eric Meyer’s Reset CSS which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).
-}
ericMeyer : List Snippet
ericMeyer =
    EricMeyer.ericMeyer


{-| html5doctor.com Reset Stylesheet which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).
-}
html5Doctor : List Snippet
html5Doctor =
    Html5Doctor.html5Doctor


{-| Normalize.css which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).
-}
normalize : List Snippet
normalize =
    Normalize.normalize


{-| ress which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).
-}
ress : List Snippet
ress =
    Ress.ress


{-| sanitize.css which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).
-}
sanitize : List Snippet
sanitize =
    Sanitize.sanitize
