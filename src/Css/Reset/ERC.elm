module Css.Reset.ERC exposing
    ( Config, ResetMode(..)
    , snippetsWith
    )

{-| ElmResetCss which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).

@docs Config, ResetMode
@docs snippetsWith

-}

import Css exposing (..)
import Css.Global exposing (Snippet, each, everything, selector)



-- Config


type ResetMode
    = BrowserDefault
    | Reset
    | Normalize


type alias Config =
    { margin : ResetMode
    , lineHeight : ResetMode
    , border : ResetMode
    , headings : ResetMode
    , lists : ResetMode
    , a : ResetMode
    , forms : ResetMode
    }


defaultConfig : Config
defaultConfig =
    { margin = Reset
    , lineHeight = Reset
    , border = Reset
    , headings = Reset
    , lists = Reset
    , a = Reset
    , forms = Reset
    }



-- SNIPPETS


snippetsWith : Config -> List Snippet
snippetsWith c =
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
    , selectorIf (c.headings == Reset) ":where(h1, h2, h3, h4, h5, h6)" <|
        [ fontSize inherit
        , fontWeight inherit
        ]

    -- List
    , selectorIf (c.lists == Reset) ":where(ol, ul)" <|
        [ padding zero
        , listStyle none
        ]

    -- Text-level semantics
    , selectorIf (c.a == Reset) ":where(a)" <|
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
    , selectorIf (c.forms == Reset) ":where(button, input, optgroup, select, textarea)" <|
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


selectorIf : Bool -> String -> List Style -> Snippet
selectorIf bool selector_ styles =
    if bool then
        selector selector_ styles

    else
        each [] []
