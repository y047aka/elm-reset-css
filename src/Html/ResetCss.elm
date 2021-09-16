module Html.ResetCss exposing
    ( ericMeyer, html5Doctor, destyle
    , normalize, ress, sanitize
    )

{-| This module helps you to reset base styles. You can use them with elm/html.

  - Eric Meyer’s Reset CSS
  - html5doctor.com Reset Stylesheet
  - destyle.css
  - Normalize.css
  - ress
  - sanitize.css

@docs ericMeyer, html5Doctor, destyle
@docs normalize, ress, sanitize

-}

import Css.Global exposing (global)
import Css.Reset.Destyle as Destyle
import Css.Reset.EricMeyer as EricMeyer
import Css.Reset.Html5Doctor as Html5Doctor
import Css.Reset.Normalize as Normalize
import Css.Reset.Ress as Ress
import Css.Reset.Sanitize as Sanitize
import Html exposing (Html)
import Html.Styled exposing (toUnstyled)


{-| Eric Meyer’s Reset CSS
-}
ericMeyer : Html msg
ericMeyer =
    EricMeyer.ericMeyer
        |> global
        |> toUnstyled


{-| html5doctor.com Reset Stylesheet
-}
html5Doctor : Html msg
html5Doctor =
    Html5Doctor.html5Doctor
        |> global
        |> toUnstyled


{-| destyle.css
-}
destyle : Html msg
destyle =
    Destyle.destyle
        |> global
        |> toUnstyled


{-| Normalize.css
-}
normalize : Html msg
normalize =
    Normalize.normalize
        |> global
        |> toUnstyled


{-| ress
-}
ress : Html msg
ress =
    Ress.ress
        |> global
        |> toUnstyled


{-| sanitize.css
-}
sanitize : Html msg
sanitize =
    Sanitize.sanitize
        |> global
        |> toUnstyled
