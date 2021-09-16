module Css.Reset.TheNewCssReset exposing (theNewCssReset)

{-| The New CSS Reset which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).

@docs theNewCssReset

-}

import Css exposing (all, borderBox, borderCollapse, boxSizing, collapse, listStyle, maxWidth, none, pct, property, unset)
import Css.Global exposing (..)


{-| Compile it with your elm-css code.
-}
theNewCssReset : List Snippet
theNewCssReset =
    -- The new CSS Reset - version 1.2.0 (last updated 23.7.2021)
    [ -- Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property
      selector "*:where(:not(iframe, canvas, img, svg, video):not(svg *))"
        [ all unset
        , property "display" "revert"
        ]

    -- Preferred box-sizing value
    , each
        [ everything
        , selector "*::before"
        , selector "*::after"
        ]
        [ boxSizing borderBox ]

    -- Remove list styles (bullets/numbers)
    , each
        [ ol, ul ]
        [ listStyle none ]

    -- For images to not be able to exceed their container
    , img
        [ maxWidth (pct 100) ]

    -- removes spacing between cells in tables
    , table
        [ borderCollapse collapse ]

    -- revert the 'white-space' property for textarea elements on Safari
    , textarea [ property "white-space" "revert" ]
    ]
