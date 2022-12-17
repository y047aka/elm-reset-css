module Css.Reset.EricMeyer exposing (snippets)

{-| Eric Meyer’s Reset CSS which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).

@docs snippets

-}

import Css exposing (baseline, block, border, borderCollapse, borderSpacing, collapse, display, fontSize, lineHeight, listStyle, margin, none, num, padding, pct, property, verticalAlign, zero)
import Css.Global exposing (..)


{-| Compile it with your elm-css code.
-}
snippets : List Snippet
snippets =
    {- http://meyerweb.com/eric/tools/css/reset/
       v2.0 | 20110126
       License: none (public domain)
    -}
    [ each
        [ html
        , body
        , div
        , span
        , typeSelector "applet"
        , typeSelector "object"
        , typeSelector "iframe"
        , h1
        , h2
        , h3
        , h4
        , h5
        , h6
        , p
        , blockquote
        , pre
        , a
        , typeSelector "abbr"
        , typeSelector "acronym"
        , typeSelector "address"
        , typeSelector "big"
        , typeSelector "cite"
        , code
        , typeSelector "del"
        , typeSelector "dfn"
        , em
        , img
        , typeSelector "ins"
        , typeSelector "kbd"
        , q
        , typeSelector "s"
        , typeSelector "samp"
        , small
        , typeSelector "strike"
        , strong
        , typeSelector "sub"
        , typeSelector "sup"
        , typeSelector "tt"
        , typeSelector "var"
        , typeSelector "b"
        , typeSelector "u"
        , i
        , typeSelector "center"
        , dl
        , dt
        , dd
        , ol
        , ul
        , li
        , fieldset
        , form
        , label
        , legend
        , table
        , caption
        , tbody
        , tfoot
        , thead
        , tr
        , th
        , td
        , article
        , aside
        , canvas
        , details
        , typeSelector "embed"
        , typeSelector "figure"
        , typeSelector "figcaption"
        , footer
        , header
        , typeSelector "hgroup"
        , menu
        , nav
        , typeSelector "output"
        , typeSelector "ruby"
        , section
        , summary
        , time
        , typeSelector "mark"
        , audio
        , video
        ]
        [ margin zero
        , padding zero
        , border zero
        , fontSize (pct 100)
        , property "font" "inherit"
        , verticalAlign baseline
        ]
    , -- HTML5 display-role reset for older browsers
      each
        [ article
        , aside
        , details
        , typeSelector "figcaption"
        , typeSelector "figure"
        , footer
        , header
        , typeSelector "hgroup"
        , menu
        , nav
        , section
        ]
        [ display block ]
    , body
        [ lineHeight (num 1) ]
    , each [ ol, ul ]
        [ listStyle none ]
    , each [ blockquote, q ]
        [ property "quotes" "none" ]
    , each
        [ selector "blockquote:before"
        , selector "blockquote:after"
        , selector "q:before"
        , selector "q:after"
        ]
        [ property "content" "''"
        , property "content" "none"
        ]
    , typeSelector "table"
        [ borderCollapse collapse
        , borderSpacing zero
        ]
    ]
