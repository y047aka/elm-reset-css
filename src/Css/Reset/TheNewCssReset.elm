module Css.Reset.TheNewCssReset exposing (snippets)

{-| The New CSS Reset which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).

@docs snippets

-}

import Css exposing (all, borderBox, borderCollapse, boxSizing, breakWord, collapse, color, display, listStyle, maxWidth, none, overflowWrap, pct, property, unset)
import Css.Global exposing (Snippet, a, button, each, everything, img, input, menu, ol, selector, table, textarea, typeSelector, ul)


{-| Compile it with your elm-css code.
-}
snippets : List Snippet
snippets =
    {- The new CSS reset - version 1.7.3 (last updated 7.8.2022)
       GitHub page: https://github.com/elad2412/the-new-css-reset
    -}
    [ {- Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property
         - The "symbol *" part is to solve Firefox SVG sprite bug
      -}
      selector "*:where(:not(html, iframe, canvas, img, svg, video, audio):not(svg *, symbol *))"
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

    -- Reapply the pointer cursor for anchor tags
    , each [ a, button ]
        [ property "cursor" "revert" ]

    -- Remove list styles (bullets/numbers)
    , each
        [ ol, ul, menu ]
        [ listStyle none ]

    -- For images to not be able to exceed their container
    , img
        [ maxWidth (pct 100) ]

    -- removes spacing between cells in tables
    , table
        [ borderCollapse collapse ]

    -- Safari - solving issue when using user-select:none on the <body> text input doesn't working
    , each [ input, textarea ]
        [ property "-webkit-user-select" "auto"
        ]

    -- revert the 'white-space' property for textarea elements on Safari
    , textarea [ property "white-space" "revert" ]

    -- minimum style to allow to style meter element
    , typeSelector "meter"
        [ property "-webkit-appearance" "revert"
        , property "appearance" "revert"
        ]

    -- reset default text opacity of input placeholder
    , selector "::placeholder"
        [ color unset
        ]

    {- fix the feature of 'hidden' attribute.
       display:revert; revert to element instead of attribute
    -}
    , selector ":where([hidden])"
        [ display none
        ]

    {- revert for bug in Chromium browsers
       - fix for the content editable attribute will work properly.
       - webkit-user-select: auto; added for Safari in case of using user-select:none on wrapper element
    -}
    , selector """:where([contenteditable]:not([contenteditable="false"]))"""
        [ property "-moz-user-modify" "read-write"
        , property "-webkit-user-modify" "read-write"
        , overflowWrap breakWord
        , property "-webkit-line-break" "after-white-space"
        , property "-webkit-user-select" "auto"
        ]

    -- apply back the draggable feature - exist only in Chromium and Safari
    , selector """:where([draggable="true"])"""
        [ property "-webkit-user-drag" "element"
        ]
    ]
