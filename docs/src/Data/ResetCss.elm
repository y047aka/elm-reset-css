module Data.ResetCss exposing (ResetCss(..), all, fromString, toRootStyles, toSnippet, toString, toSummary)

import Css exposing (..)
import Css.Global exposing (Snippet)
import Css.Reset exposing (destyle, ericMeyer, normalize, reset, ress, sanitize, theNewCssReset)
import Css.Reset.ElmResetCss as ERC exposing (ResetMode)
import Css.Reset.ModernCssResert as ModernCssResert
import Css.Reset.Ress


type ResetCss
    = EricMeyer
    | Destyle
    | Ress
    | Ress_v3
    | Sanitize
    | ModernCssResert
    | TheNewCssReset
    | ERC_Opinionated
    | ERC_FollowRessV3
    | Reset
    | Normalize


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

        "Destyle" ->
            Just Destyle

        "Ress" ->
            Just Ress

        "Ress_v3" ->
            Just Ress_v3

        "Sanitize" ->
            Just Sanitize

        "ModernCssResert" ->
            Just ModernCssResert

        "TheNewCssReset" ->
            Just TheNewCssReset

        "ERC_Opinionated" ->
            Just ERC_Opinionated

        "ERC_FollowRessV3" ->
            Just ERC_FollowRessV3

        "Reset" ->
            Just Reset

        "Normalize" ->
            Just Normalize

        _ ->
            Nothing


toString : ResetCss -> String
toString resetCss =
    case resetCss of
        EricMeyer ->
            "EricMeyer"

        Destyle ->
            "Destyle"

        Ress ->
            "Ress"

        Ress_v3 ->
            "Ress_v3"

        Sanitize ->
            "Sanitize"

        ModernCssResert ->
            "ModernCssResert"

        TheNewCssReset ->
            "TheNewCssReset"

        ERC_Opinionated ->
            "ERC_Opinionated"

        ERC_FollowRessV3 ->
            "ERC_FollowRessV3"

        Reset ->
            "Reset"

        Normalize ->
            "Normalize"


toSnippet : ResetCss -> List Snippet
toSnippet resetCss =
    case resetCss of
        EricMeyer ->
            ericMeyer

        Destyle ->
            destyle

        Ress ->
            ress

        Ress_v3 ->
            Css.Reset.Ress.v3

        Sanitize ->
            sanitize

        ModernCssResert ->
            ModernCssResert.snippets

        TheNewCssReset ->
            theNewCssReset

        ERC_Opinionated ->
            ERC.snippetsWith
                { margin = ERC.BrowserDefault
                , font = ERC.Opinionated
                , lineHeight = ERC.Opinionated
                , border = ERC.BrowserDefault
                , headings = ERC.BrowserDefault
                , lists = ERC.Opinionated
                , a = ERC.BrowserDefault
                , table = ERC.Reset
                , forms = ERC.Opinionated
                }

        ERC_FollowRessV3 ->
            ERC.snippetsWith
                { margin = ERC.Reset
                , font = ERC.BrowserDefault
                , lineHeight = ERC.BrowserDefault
                , border = ERC.Reset
                , headings = ERC.BrowserDefault
                , lists = ERC.Reset
                , a = ERC.BrowserDefault
                , table = ERC.BrowserDefault
                , forms = ERC.Opinionated
                }

        Reset ->
            reset

        Normalize ->
            normalize


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

        Destyle ->
            [ lineHeight (num 1.15)
            , property "-webkit-text-size-adjust" "100%"
            , property "-webkit-tap-highlight-color" "transparent"
            ]

        Ress ->
            [ boxSizing borderBox
            , property "-webkit-text-size-adjust" "100%" -- Prevent adjustments of font size after orientation changes in iOS
            , property "word-break" "normal"
            , property "-moz-tab-size" "4"
            , property "tab-size" "4"
            ]

        Ress_v3 ->
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

        ModernCssResert ->
            [ textRendering optimizeSpeed
            , lineHeight (num 1.5)
            ]

        TheNewCssReset ->
            [ Css.all unset
            , property "display" "revert"
            ]

        ERC_Opinionated ->
            [ fontFamilies [ "-apple-system", "BlinkMacSystemFont", qt "Helvetica Neue", "Arial", qt "Hiragino Kaku Gothic ProN", qt "Hiragino Sans", "Meiryo", "sans-serif" ]
            , lineHeight (num 1.5)
            ]

        ERC_FollowRessV3 ->
            []

        Reset ->
            [ lineHeight (num 1) ]

        Normalize ->
            [ lineHeight (num 1.15)
            , property "-moz-text-size-adjust" "100%"
            , property "-webkit-text-size-adjust" "100%"
            , property "text-size-adjust" "100%"
            , property "-moz-tab-size" "4"
            , property "tab-size" "4"
            ]


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

        Destyle ->
            { name = "destyle.css"
            , version = "v3.0.0"
            , updatedAt = "2021-09-06"
            , author = "Nicolas Cusan"
            , license = "MIT"
            , url = "https://github.com/nicolas-cusan/destyle.css"
            }

        Ress ->
            { name = "ress"
            , version = "v4.0.0"
            , updatedAt = "2021-04-21"
            , author = "Filipe Linhares"
            , license = "MIT"
            , url = "https://github.com/filipelinhares/ress"
            }

        Ress_v3 ->
            { name = "ress (v3)"
            , version = "v3.0.0"
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

        ModernCssResert ->
            { name = "A Modern CSS Reset"
            , version = "undefined"
            , updatedAt = "2019-10-01"
            , author = "Andy Bell"
            , license = "MIT"
            , url = "https://github.com/Andy-set-studio/modern-css-reset"
            }

        TheNewCssReset ->
            { name = "The New CSS Reset"
            , version = "v1.3.1"
            , updatedAt = "2021-10-28"
            , author = "Elad Shechter"
            , license = "MIT"
            , url = "https://github.com/elad2412/the-new-css-reset"
            }

        ERC_Opinionated ->
            { name = "elm-reset-css (opinionated)"
            , version = "v2.3.0"
            , updatedAt = "2021-11-14"
            , author = "Yoshitaka Totsuka"
            , license = "MIT"
            , url = "https://github.com/y047aka/elm-reset-css"
            }

        ERC_FollowRessV3 ->
            { name = "elm-reset-css (follow ress v3)"
            , version = "v2.3.0"
            , updatedAt = "2021-11-14"
            , author = "Yoshitaka Totsuka"
            , license = "MIT"
            , url = "https://github.com/y047aka/elm-reset-css"
            }

        Reset ->
            { name = "reset"
            , version = "v3.0.0"
            , updatedAt = "2023-12-27"
            , author = "Yoshitaka Totsuka"
            , license = "MIT"
            , url = "https://github.com/y047aka/elm-reset-css"
            }

        Normalize ->
            { name = "normalize"
            , version = "v3.0.0"
            , updatedAt = "2023-12-27"
            , author = "Yoshitaka Totsuka"
            , license = "MIT"
            , url = "https://github.com/y047aka/elm-reset-css"
            }


all : List ResetCss
all =
    [ EricMeyer
    , Destyle
    , Ress
    , Ress_v3
    , Sanitize
    , ModernCssResert
    , TheNewCssReset
    , ERC_Opinionated
    , ERC_FollowRessV3
    , Reset
    , Normalize
    ]
