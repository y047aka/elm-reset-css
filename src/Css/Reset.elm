module Css.Reset exposing (ericMeyer, html5Doctor, normalize, ress, sanitize)

{-| This module helps you to reset base styles. You can use them with elm/html.

  - Eric Meyer’s Reset CSS
  - html5doctor.com Reset Stylesheet
  - Normalize.css
  - ress
  - sanitize.css

@docs ericMeyer, html5Doctor, normalize, ress, sanitize

-}

import Css.Global exposing (global)
import Css.Reset.EricMeyer as EricMeyer
import Css.Reset.Html5Doctor as Html5Doctor
import Css.Reset.Normalize as Normalize
import Css.Reset.Ress as Ress
import Css.Reset.Sanitize as Sanitize
import Html exposing (Html)
import Html.Styled exposing (toUnstyled)


{-| Eric Meyer’s Reset CSS

  - Version: 2.0
  - License: none (public domain)
  - Last Updated: 2011-01-26
  - Author: Eric Meyer
  - <https://meyerweb.com/eric/tools/css/reset/>

-}
ericMeyer : Html msg
ericMeyer =
    EricMeyer.ericMeyer
        |> global
        |> toUnstyled


{-| html5doctor.com Reset Stylesheet

  - Version: 1.6.1
  - License: Free of charge under a CC0 Public Domain Dedication and MIT License
  - Last Updated: 2010-09-17
  - Author: Richard Clark
  - <https://github.com/richclark/HTML5resetCSS>

-}
html5Doctor : Html msg
html5Doctor =
    Html5Doctor.html5Doctor
        |> global
        |> toUnstyled


{-| Normalize.css

  - Version: 8.0.1
  - License: MIT
  - Last Updated: 2018-11-05
  - Author: Nicolas Gallagher
  - <https://github.com/necolas/normalize.css/>

-}
normalize : Html msg
normalize =
    Normalize.normalize
        |> global
        |> toUnstyled


{-| ress

  - Version: 2.0.4
  - License: MIT
  - Last Updated: 2020-01-18
  - Author: Filipe Linhares
  - <https://github.com/filipelinhares/ress>

-}
ress : Html msg
ress =
    Ress.ress
        |> global
        |> toUnstyled


{-| sanitize.css

  - Version: 10.0.0
  - License: CC0 1.0 Universal
  - Last Updated: 2019-06-04
  - Author: CSS Tools
  - <https://github.com/csstools/sanitize.css>

-}
sanitize : Html msg
sanitize =
    Sanitize.sanitize
        |> global
        |> toUnstyled
