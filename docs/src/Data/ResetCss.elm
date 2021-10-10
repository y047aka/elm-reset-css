module Data.ResetCss exposing (ResetCss(..), all, fromString, toLibrary, toRootStyles, toSnippet, toString)

import Css exposing (..)
import Css.Global exposing (Snippet)
import Css.Reset exposing (..)


type ResetCss
    = EricMeyer
    | Html5Doctor
    | Destyle
    | Normalize
    | Ress
    | Sanitize
    | TheNewCssReset


type alias Library =
    { author : String
    , license : String
    , name : String
    , updatedAt : String
    , url : String
    , version : String
    }


fromString : String -> Maybe ResetCss
fromString str =
    case str of
        "EricMeyer" ->
            Just EricMeyer

        "Html5Doctor" ->
            Just Html5Doctor

        "Destyle" ->
            Just Destyle

        "Normalize" ->
            Just Normalize

        "Ress" ->
            Just Ress

        "Sanitize" ->
            Just Sanitize

        "TheNewCssReset" ->
            Just TheNewCssReset

        _ ->
            Nothing


toString : ResetCss -> String
toString resetCss =
    case resetCss of
        EricMeyer ->
            "EricMeyer"

        Html5Doctor ->
            "Html5Doctor"

        Destyle ->
            "Destyle"

        Normalize ->
            "Normalize"

        Ress ->
            "Ress"

        Sanitize ->
            "Sanitize"

        TheNewCssReset ->
            "TheNewCssReset"


toSnippet : ResetCss -> List Snippet
toSnippet resetCss =
    case resetCss of
        EricMeyer ->
            ericMeyer

        Html5Doctor ->
            html5Doctor

        Destyle ->
            destyle

        Normalize ->
            normalize

        Ress ->
            ress

        Sanitize ->
            sanitize

        TheNewCssReset ->
            theNewCssReset


toRootStyles : ResetCss -> List Style
toRootStyles resetCss =
    case resetCss of
        EricMeyer ->
            [ margin zero
            , padding zero
            , border zero
            , fontSize (pct 100)
            , property "font" "inherit"
            , verticalAlign baseline
            , lineHeight (int 1)
            ]

        Html5Doctor ->
            [ margin zero
            , padding zero
            , border zero
            , outline zero
            , fontSize (pct 100)
            , verticalAlign baseline
            , property "background" "transparent"
            , lineHeight (int 1)
            ]

        Destyle ->
            [ lineHeight (num 1.15)
            , property "-webkit-text-size-adjust" "100%"
            , property "-webkit-tap-highlight-color" "transparent"
            ]

        Normalize ->
            [ lineHeight (num 1.15) -- 1
            , property "-webkit-text-size-adjust" "100%" -- 2
            ]

        Ress ->
            [ boxSizing borderBox
            , property "-webkit-text-size-adjust" "100%" -- Prevent adjustments of font size after orientation changes in iOS
            , property "word-break" "normal"
            , property "-moz-tab-size" "4"
            , property "tab-size" "4"
            ]

        Sanitize ->
            [ cursor default
            , lineHeight (num 1.5)
            , property "overflow-wrap" "break-word"
            , property "-moz-tab-size" "4"
            , property "tab-size" "4"
            , property "-webkit-tap-highlight-color" "transparent"
            , property "-webkit-text-size-adjust" "100%"
            ]

        TheNewCssReset ->
            [ Css.all unset
            , property "display" "revert"
            ]


toLibrary : ResetCss -> Library
toLibrary resetCss =
    case resetCss of
        EricMeyer ->
            { name = "Eric Meyer’s Reset CSS"
            , version = "v2.0"
            , updatedAt = "2011-01-26"
            , author = "Eric Meyer"
            , license = "none (public domain)"
            , url = "https://meyerweb.com/eric/tools/css/reset/"
            }

        Html5Doctor ->
            { name = "html5doctor.com Reset Stylesheet"
            , version = "v1.6.1"
            , updatedAt = "2010-09-17"
            , author = "Richard Clark"
            , license = "Free of charge under a CC0 Public Domain Dedication and MIT License"
            , url = "https://github.com/richclark/HTML5resetCSS"
            }

        Destyle ->
            { name = "destyle.css"
            , version = "v3.0.0"
            , updatedAt = "2021-09-06"
            , author = "Nicolas Cusan"
            , license = "MIT"
            , url = "https://github.com/nicolas-cusan/destyle.css"
            }

        Normalize ->
            { name = "Normalize.css"
            , version = "v8.0.1"
            , updatedAt = "2018-11-05"
            , author = "Nicolas Gallagher"
            , license = "MIT"
            , url = "https://github.com/necolas/normalize.css/"
            }

        Ress ->
            { name = "ress"
            , version = "v4.0.0"
            , updatedAt = "2021-04-21"
            , author = "Filipe Linhares"
            , license = "MIT"
            , url = "https://github.com/filipelinhares/ress"
            }

        Sanitize ->
            { name = "sanitize.css"
            , version = "v13.0.0"
            , updatedAt = "2021-09-14"
            , author = "CSS Tools"
            , license = "CC0 1.0 Universal"
            , url = "https://github.com/csstools/sanitize.css"
            }

        TheNewCssReset ->
            { name = "The New CSS Reset"
            , version = "v1.2.0"
            , updatedAt = "2021-07-23"
            , author = "Elad Shechter"
            , license = "MIT"
            , url = "https://github.com/elad2412/the-new-css-reset"
            }


all : List ResetCss
all =
    [ EricMeyer
    , Html5Doctor
    , Destyle
    , Normalize
    , Ress
    , Sanitize
    , TheNewCssReset
    ]
