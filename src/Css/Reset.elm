module Css.Reset exposing (html5Doctor, ress)

import Css.Global exposing (global)
import Css.Reset.EricMeyer as EricMeyer
import Css.Reset.Html5Doctor as Html5Doctor
import Css.Reset.Normalize as Normalize
import Css.Reset.Ress as Ress
import Html exposing (Html)
import Html.Styled exposing (toUnstyled)


ericMeyer : Html msg
ericMeyer =
    EricMeyer.ericMeyer
        |> global
        |> toUnstyled


html5Doctor : Html msg
html5Doctor =
    Html5Doctor.html5Doctor
        |> global
        |> toUnstyled


normalize : Html msg
normalize =
    Normalize.normalize
        |> global
        |> toUnstyled


ress : Html msg
ress =
    Ress.ress
        |> global
        |> toUnstyled
