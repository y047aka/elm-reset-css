module Css.Reset.ERC exposing (snippets)

{-| ElmResetCss which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).

@docs snippets

-}

import Css exposing (..)
import Css.Global exposing (Snippet, everything, selector)



-- Config


type ResetMode
    = Reset
    | Normalize


type alias Config =
    { margin : ResetMode
    , lineHeight : ResetMode
    , border : ResetMode
    }


defaultConfig : Config
defaultConfig =
    { margin = Reset
    , lineHeight = Reset
    , border = Reset
    }



-- SNIPPETS


snippets : List Snippet
snippets =
    let
        c =
            defaultConfig
    in
    [ selector "*, ::before, ::after"
        [ boxSizing borderBox
        , backgroundRepeat noRepeat
        , batchIf (c.border == Reset) [ borderWidth zero ]
        ]
    , everything
        [ batchIf (c.margin == Reset) [ margin zero ] ]
    , selector ":where(:root)"
        [ batchIf (c.lineHeight == Reset) [ lineHeight (num 1) ] ]

    -- Headings
    , selector ":where(h1, h2, h3, h4, h5, h6)"
        [ fontSize inherit
        , fontWeight inherit
        ]

    -- List
    , selector ":where(ol, ul)"
        [ padding zero
        , listStyle none
        ]

    -- Text-level semantics
    , selector ":where(a)"
        [ textDecoration none
        , color inherit
        ]

    -- Grouping content
    , selector ":where(hr)"
        [ borderWidth3 (px 1) zero zero ]
    , selector ":where(address)"
        [ fontStyle inherit ]

    -- Table
    , selector ":where(table)"
        [ borderCollapse collapse ]
    , selector ":where(caption)"
        [ textAlign left ]
    , selector ":where(th, td)"
        [ textAlign left
        , verticalAlign top
        , fontWeight normal
        ]

    -- Forms
    , selector ":where(button, input, optgroup, select, textarea)"
        [ property "appearance" "none"
        , padding zero
        , property "font" "inherit"
        , backgroundColor transparent
        , color inherit
        ]
    , selector ":where(textarea)"
        [ resize vertical ]
    , selector """:where(button, [type="button"], [type="reset"], [type="submit"])"""
        [ cursor pointer ]
    , selector """:where(button:disabled, [type="button"]:disabled, [type="reset"]:disabled, [type="submit"]:disabled)"""
        [ cursor default ]
    , selector ":where(label[for])"
        [ cursor pointer ]

    -- Embedded content
    , selector ":where(iframe)"
        [ borderStyle none ]
    ]



-- HELPERS


batchIf : Bool -> List Style -> Style
batchIf bool styles =
    if bool then
        batch styles

    else
        batch []
