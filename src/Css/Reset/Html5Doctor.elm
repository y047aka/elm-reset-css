module Css.Reset.Html5Doctor exposing (html5Doctor)

{-| html5doctor.com Reset Stylesheet which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).

@docs html5Doctor

-}

import Css
    exposing
        ( backgroundColor
        , baseline
        , block
        , bold
        , border
        , borderBottom2
        , borderCollapse
        , borderSpacing
        , borderTop3
        , collapse
        , color
        , cursor
        , display
        , dotted
        , fontSize
        , fontStyle
        , fontWeight
        , height
        , help
        , hex
        , int
        , italic
        , lineHeight
        , lineThrough
        , listStyle
        , margin
        , margin2
        , middle
        , none
        , outline
        , padding
        , pct
        , property
        , px
        , solid
        , textDecoration
        , verticalAlign
        , zero
        )
import Css.Global exposing (..)


{-| Compile it with your elm-css code.
-}
html5Doctor : List Snippet
html5Doctor =
    {- html5doctor.com Reset Stylesheet
       v1.6.1
       Last Updated: 2010-09-17
       Author: Richard Clark - http://richclarkdesign.com
       Twitter: @rich_clark
    -}
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
        , pre
        , typeSelector "abbr"
        , typeSelector "address"
        , typeSelector "cite"
        , code
        , typeSelector "del"
        , typeSelector "dfn"
        , em
        , img
        , typeSelector "ins"
        , typeSelector "kbd"
        , q
        , typeSelector "samp"
        , small
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
    , table
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
