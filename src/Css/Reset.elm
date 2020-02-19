module Css.Reset exposing (html5Doctor, ress)

import Css.Global exposing (global)
import Css.Reset.Html5Doctor as Html5Doctor
import Css.Reset.Ress as Ress
import Html exposing (Html)
import Html.Styled exposing (toUnstyled)


html5Doctor : Html msg
html5Doctor =
    Html5Doctor.html5Doctor
        |> global
        |> toUnstyled


ress : Html msg
ress =
    Ress.ress
        |> global
        |> toUnstyled
