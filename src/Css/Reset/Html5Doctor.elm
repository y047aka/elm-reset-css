module Css.Reset.Html5Doctor exposing (html5Doctor)

import Css exposing (..)
import Css.Global exposing (..)


{-|

    html5doctor.com Reset Stylesheet
    v1.6.1
    Last Updated: 2010-09-17
    Author: Richard Clark - http://richclarkdesign.com
    Twitter: @rich_clark

-}
html5Doctor : List Snippet
html5Doctor =
    [ each
        [ html
        , body
        , div
        , span
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
        , Css.Global.pre
        , typeSelector "abbr"
        , typeSelector "address"
        , typeSelector "cite"
        , code
        , typeSelector "del"
        , typeSelector "dfn"
        , Css.Global.em
        , img
        , typeSelector "ins"
        , typeSelector "kbd"
        , q
        , typeSelector "samp"
        , Css.Global.small
        , strong
        , typeSelector "sub"
        , typeSelector "sup"
        , typeSelector "var"
        , typeSelector "b"
        , i
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
        , Css.Global.table
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
        , typeSelector "figcaption"
        , typeSelector "figure"
        , footer
        , header
        , typeSelector "hgroup"
        , menu
        , nav
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
        , outline zero
        , fontSize (pct 100)
        , verticalAlign baseline
        , property "background" "transparent"
        ]
    , body
        [ lineHeight (int 1)
        ]
    , each
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
        [ display block
        ]
    , nav
        [ adjacentSiblings
            [ ul [ listStyle none ]
            ]
        ]
    , each
        [ blockquote, q ]
        [ property "quotes" "none" ]
    , each
        [ selector "blockquote::before"
        , selector "blockquote::after"
        , selector "q::before"
        , selector "q::after"
        ]
        [ property "content" "\"\""
        , property "content" "none"
        ]
    , a
        [ margin zero
        , padding zero
        , fontSize (pct 100)
        , verticalAlign baseline
        , property "background" "transparent"
        ]
    , -- change colours to suit your needs
      typeSelector "ins"
        [ backgroundColor (hex "#ff9")
        , color (hex "#000")
        , textDecoration none
        ]
    , -- change colours to suit your needs
      typeSelector "mark"
        [ backgroundColor (hex "#ff9")
        , color (hex "#000")
        , fontStyle italic
        , fontWeight bold
        ]
    , typeSelector "del"
        [ textDecoration lineThrough
        ]
    , each
        [ selector "abbr[title]", selector "dfn[title]" ]
        [ borderBottom2 (px 1) dotted
        , cursor help
        ]
    , Css.Global.table
        [ borderCollapse collapse
        , borderSpacing zero
        ]
    , -- change border colour to suit your needs
      hr
        [ display block
        , height (px 1)
        , border zero
        , borderTop3 (px 1) solid (hex "#ccc")
        , margin2 (Css.em 1) zero
        , padding zero
        ]
    , each
        [ input, select ]
        [ verticalAlign middle
        ]
    ]
