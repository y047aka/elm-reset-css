module Css.Reset exposing (ress)

import Css.Global exposing (global)
import Css.Reset.Ress as Ress
import Html exposing (Html)
import Html.Styled exposing (toUnstyled)


ress : Html msg
ress =
    toUnstyled <| global Ress.ress
