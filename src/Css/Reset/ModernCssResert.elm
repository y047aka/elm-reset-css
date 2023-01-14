module Css.Reset.ModernCssResert exposing (snippets)

{-| A Modern CSS Reset which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).

@docs snippets

-}

import Css exposing (..)
import Css.Global exposing (..)


{-| Compile it with your elm-css code.
-}
snippets : List Snippet
snippets =
    [ -- /* Box sizing rules */
      each
        [ everything
        , selector "*::before"
        , selector "*::after"
        ]
        [ boxSizing borderBox ]

    -- /* Remove default margin */
    , each [ body, h1, h2, h3, h4, p, typeSelector "figure", blockquote, dl, dd ]
        [ margin zero ]

    -- /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
    , each
        [ selector """ul[role="list"]"""
        , selector """ol[role="list"]"""
        ]
        [ listStyle none ]

    -- /* Set core root defaults */
    , selector "html:focus-within"
        [ property "scroll-behavior" "smooth" ]

    -- /* Set core body defaults */
    , body
        [ minHeight (vh 100)
        , textRendering optimizeSpeed
        , lineHeight (num 1.5)
        ]

    -- /* A elements that don't have a class get default styles */
    , selector "a:not([class])"
        [ property "text-decoration-skip-ink" "auto" ]

    -- /* Make images easier to work with */
    , each [ img, typeSelector "picture" ]
        [ maxWidth (pct 100)
        , display block
        ]

    -- /* Inherit fonts for inputs and buttons */
    , each [ input, button, textarea, select ]
        [ property "font" "inherit" ]

    -- /* Remove all animations and transitions for people that prefer not to see them */
    , mediaQuery [ "prefers-reduced-motion: reduce" ]
        [ selector "html:focus-within"
            [ property "scroll-behavior" "auto" ]
        , each
            [ everything
            , selector "*::before"
            , selector "*::after"
            ]
            [ property "animation-duration" "0.01ms" |> important
            , property "animation-iteration-count" "1" |> important
            , property "transition-duration" "0.01ms" |> important
            , property "scroll-behavior" "auto" |> important
            ]
        ]
    ]
