module Data.ResetCss exposing (ResetCss(..), all, fromString, toRootStyles, toSnippet, toString, toSummary)

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
    | ERC_HardReset
    | ERC_Normalize


type alias Summary =
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

        "ERC_HardReset" ->
            Just ERC_HardReset

        "ERC_Normalize" ->
            Just ERC_Normalize

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

        ERC_HardReset ->
            "ERC_HardReset"

        ERC_Normalize ->
            "ERC_Normalize"


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

        ERC_HardReset ->
            erc_HardReset

        ERC_Normalize ->
            erc_Normalize


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
            , lineHeight (num 1)
            ]

        Html5Doctor ->
            [ margin zero
            , padding zero
            , border zero
            , outline zero
            , fontSize (pct 100)
            , verticalAlign baseline
            , property "background" "transparent"
            , lineHeight (num 1)
            ]

        Destyle ->
            [ lineHeight (num 1.15)
            , property "-webkit-text-size-adjust" "100%"
            , property "-webkit-tap-highlight-color" "transparent"
            ]

        Normalize ->
            [ lineHeight (num 1.15)
            , property "-webkit-text-size-adjust" "100%"
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

        ERC_HardReset ->
            [ lineHeight (num 1) ]

        ERC_Normalize ->
            []


toSummary : ResetCss -> Summary
toSummary resetCss =
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
            , version = "v1.3.1"
            , updatedAt = "2021-10-28"
            , author = "Elad Shechter"
            , license = "MIT"
            , url = "https://github.com/elad2412/the-new-css-reset"
            }

        ERC_HardReset ->
            { name = "elm-reset-css (hard reset)"
            , version = "v2.3.0"
            , updatedAt = "2021-11-14"
            , author = "Yoshitaka Totsuka"
            , license = "MIT"
            , url = "https://github.com/y047aka/elm-reset-css"
            }

        ERC_Normalize ->
            { name = "elm-reset-css (normalize)"
            , version = "v2.3.0"
            , updatedAt = "2021-11-14"
            , author = "Yoshitaka Totsuka"
            , license = "MIT"
            , url = "https://github.com/y047aka/elm-reset-css"
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
    , ERC_HardReset
    , ERC_Normalize
    ]
