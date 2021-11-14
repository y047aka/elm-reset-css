module Html.ResetCss exposing
    ( ericMeyer, html5Doctor, destyle
    , normalize, ress, sanitize, theNewCssReset
    , erc_HardReset, erc_Normalize
    )

{-| This module helps you to reset base styles. You can use them with elm/html.

  - Eric Meyer’s Reset CSS
  - html5doctor.com Reset Stylesheet
  - destyle.css
  - Normalize.css
  - ress
  - sanitize.css
  - The New CSS Reset

@docs ericMeyer, html5Doctor, destyle
@docs normalize, ress, sanitize, theNewCssReset
@docs erc_HardReset, erc_Normalize

-}

import Css.Global exposing (global)
import Css.Reset.Destyle as Destyle
import Css.Reset.ERC as ERC
import Css.Reset.EricMeyer as EricMeyer
import Css.Reset.Html5Doctor as Html5Doctor
import Css.Reset.Normalize as Normalize
import Css.Reset.Ress as Ress
import Css.Reset.Sanitize as Sanitize
import Css.Reset.TheNewCssReset as TheNewCssReset
import Html exposing (Html)
import Html.Styled exposing (toUnstyled)


{-| Eric Meyer’s Reset CSS
-}
ericMeyer : Html msg
ericMeyer =
    EricMeyer.snippets
        |> global
        |> toUnstyled


{-| html5doctor.com Reset Stylesheet
-}
html5Doctor : Html msg
html5Doctor =
    Html5Doctor.snippets
        |> global
        |> toUnstyled


{-| destyle.css
-}
destyle : Html msg
destyle =
    Destyle.snippets
        |> global
        |> toUnstyled


{-| Normalize.css
-}
normalize : Html msg
normalize =
    Normalize.snippets
        |> global
        |> toUnstyled


{-| ress
-}
ress : Html msg
ress =
    Ress.snippets
        |> global
        |> toUnstyled


{-| sanitize.css
-}
sanitize : Html msg
sanitize =
    Sanitize.snippets
        |> global
        |> toUnstyled


{-| The New CSS Reset
-}
theNewCssReset : Html msg
theNewCssReset =
    TheNewCssReset.snippets
        |> global
        |> toUnstyled


{-| ElmResetCss
-}
erc_HardReset : Html msg
erc_HardReset =
    ERC.hardReset
        |> global
        |> toUnstyled


{-| ElmResetCss
-}
erc_Normalize : Html msg
erc_Normalize =
    ERC.normalize
        |> global
        |> toUnstyled
