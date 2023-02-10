module Css.Reset.ElmResetCss exposing
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


{-| -}
type ResetMode
    = BrowserDefault
    | Reset
    | Normalize
    | Opinionated


{-| -}
type alias Config =
    { margin : ResetMode
    , font : ResetMode
    , lineHeight : ResetMode
    , border : ResetMode
    , headings : ResetMode
    , lists : ResetMode
    , a : ResetMode
    , table : ResetMode
    , forms : ResetMode
    }



-- SNIPPETS


{-| -}
snippetsWith : Config -> List Snippet
snippetsWith c =
    [ selector "*, ::before, ::after"
        [ boxSizing borderBox
        , backgroundRepeat noRepeat
        , batchIf (c.border == Reset) [ borderWidth zero ]
        ]
    , everything
        [ batchIf (c.margin == Reset) [ margin zero ] ]
    , where_ ":root"
        [ case c.font of
            BrowserDefault ->
                batch []

            Opinionated ->
                fontFamilies [ "-apple-system", "BlinkMacSystemFont", qt "Helvetica Neue", "Arial", qt "Hiragino Kaku Gothic ProN", qt "Hiragino Sans", "Meiryo", "sans-serif" ]

            _ ->
                fontFamilies [ "sans-serif" ]
        , case c.lineHeight of
            Reset ->
                lineHeight (num 1)

            Opinionated ->
                lineHeight (num 1.5)

            _ ->
                batch []
        ]

    -- Headings
    , whereIf (c.headings == Reset) "h1, h2, h3, h4, h5, h6" <|
        [ fontSize inherit
        , fontWeight inherit
        ]

    -- List
    , whereIf (c.lists == Reset) "ol, ul" <|
        [ padding zero
        , listStyle none
        ]

    -- Text-level semantics
    , whereIf (c.a == Reset) "a" <|
        [ textDecoration none
        , color inherit
        ]

    -- Grouping content
    , where_ "hr"
        [ borderWidth3 (px 1) zero zero ]
    , where_ "address"
        [ fontStyle inherit ]

    -- Table
    , where_ "table"
        [ borderCollapse collapse ]
    , whereIf (c.table == Reset) "caption" <|
        [ textAlign left ]
    , whereIf (c.table == Reset) "th, td" <|
        [ textAlign left
        , verticalAlign top
        , fontWeight normal
        ]

    -- Forms
    , whereIf (c.forms == Reset || c.forms == Opinionated) "button, input, optgroup, select, textarea" <|
        [ property "appearance" "none"
        , padding zero
        , property "font" "inherit"
        , backgroundColor transparent
        , color inherit
        ]
    , whereIf (c.forms == Opinionated) "textarea" <|
        [ resize vertical ]
    , where_ """button, [type="button"], [type="reset"], [type="submit"]"""
        [ cursor pointer ]
    , where_ """button:disabled, [type="button"]:disabled, [type="reset"]:disabled, [type="submit"]:disabled"""
        [ cursor default ]
    , where_ "label[for]"
        [ cursor pointer ]

    -- Navigation
    , selectorIf (c.lists == Opinionated) ":where(nav) :where(ol, ul)" <|
        [ padding zero
        , listStyle none
        ]

    -- Embedded content
    , where_ "iframe"
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


where_ : String -> List Style -> Snippet
where_ selector_ styles =
    selector (":where(" ++ selector_ ++ ")") styles


whereIf : Bool -> String -> List Style -> Snippet
whereIf bool selector_ styles =
    if bool then
        where_ selector_ styles

    else
        each [] []
