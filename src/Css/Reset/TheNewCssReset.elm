module Css.Reset.TheNewCssReset exposing (snippets)

{-| The New CSS Reset which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).

@docs snippets

-}

import Css exposing (all, borderBox, borderCollapse, boxSizing, collapse, listStyle, maxWidth, none, pct, property, unset)
import Css.Global exposing (..)


{-| Compile it with your elm-css code.
-}
snippets : List Snippet
snippets =
    -- The new CSS Reset - version 1.3.1 (last updated 28.10.2021)
    [ {- Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property
         - The "symbol *" part is to solve Firefox SVG sprite bug
      -}
      selector "*:where(:not(iframe, canvas, img, svg, video):not(svg *, symbol *))"
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
