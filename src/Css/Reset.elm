module Css.Reset exposing
    ( ericMeyer, html5Doctor
    , normalize, sanitize, ress, destyle
    , theNewCssReset
    , erc_HardReset, erc_Normalize
    )

{-| Compile it with your [elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/) code.

    module Main exposing (main)

    import Browser
    import Css.Global
    import Css.Reset
    import Html.Styled exposing (..)


    main : Program Never Model Msg
    main =
        Browser.sandbox
            { init = init
            , update = update
            , view = view >> Html.Styled.toUnstyled
            }

    ...

    view : Model -> Html.Styled.Html Msg
    view model =
        div []
            [ Css.Global.global Css.Reset.sanitize
            , header [] [ text "My site." ]
            , main_ []
                [ article []
                    [ h1 [] [ text "Title" ]
                    , text "My contents."
                    ]
                ]
            , footer [] [ text "©2021 y047aka" ]
            ]

@docs ericMeyer, html5Doctor
@docs normalize, sanitize, ress, destyle
@docs theNewCssReset
@docs erc_HardReset, erc_Normalize

-}

import Css exposing (BackgroundClip, BoxSizing, Color, FontSize, FontWeight, Length, ListStyle, TextDecorationLine, property)
import Css.Global exposing (Snippet)
import Css.Reset.Destyle as Destyle
import Css.Reset.ElmResetCss as ERC exposing (ResetMode(..))
import Css.Reset.EricMeyer as EricMeyer
import Css.Reset.Html5Doctor as Html5Doctor
import Css.Reset.Normalize as Normalize
import Css.Reset.Ress as Ress
import Css.Reset.Sanitize as Sanitize
import Css.Reset.TheNewCssReset as TheNewCssReset
import Internal exposing (selectorIfNonEmpty, whereIfNonEmpty)
import Internal.Table as Table exposing (Table)


type alias Config =
    { everything : Everything
    , root : Root
    , headings : Headings
    , groupingContent : GroupingContent
    , textLevel : TextLevel
    , table : Table
    }


type alias Everything =
    { boxSizing : Maybe (BoxSizing (BackgroundClip {}))
    , borderWidth : Maybe (Length {} {})
    }


type alias Root =
    { webkitTextSizeAdjust : Maybe String }


type alias GroupingContent =
    { olOrUl : {}
    , listItem : { listStyle : Maybe (ListStyle {}) }
    }


type alias Headings =
    { fontSize : Maybe (FontSize {})
    , fontWeight : Maybe (FontWeight {})
    }


type alias TextLevel =
    { a :
        { textDecoration : Maybe (TextDecorationLine {})
        , color : Maybe Color
        }
    , b : { fontWeight : Maybe (FontWeight {}) }
    , subOrSup : { fontSize : Maybe (FontSize {}) }
    }


init : Config
init =
    { everything = init_everything
    , root = init_root
    , headings = init_headings
    , groupingContent = init_groupingContent
    , textLevel = init_textLevel
    , table = Table.init
    }


init_everything : Everything
init_everything =
    { boxSizing = Nothing, borderWidth = Nothing }


init_root : Root
init_root =
    { webkitTextSizeAdjust = Nothing }


init_headings : Headings
init_headings =
    { fontSize = Nothing, fontWeight = Nothing }


init_groupingContent : GroupingContent
init_groupingContent =
    { olOrUl = {}
    , listItem = { listStyle = Nothing }
    }


init_textLevel : TextLevel
init_textLevel =
    { a = { textDecoration = Nothing, color = Nothing }
    , b = { fontWeight = Nothing }
    , subOrSup = { fontSize = Nothing }
    }


config : Config
config =
    { init
        | everything = (\ev -> { ev | boxSizing = Just Css.borderBox }) init.everything
    }


toSnippets : Config -> List Snippet
toSnippets c =
    [ selectorIfNonEmpty "*, ::before, ::after"
        [ Maybe.map Css.boxSizing c.everything.boxSizing
        , Maybe.map Css.borderWidth c.everything.borderWidth
        ]

    -- Root
    , whereIfNonEmpty ":root"
        [ Maybe.map (property "-webkit-text-size-adjust") c.root.webkitTextSizeAdjust ]

    -- Headings
    , whereIfNonEmpty "h1, h2, h3, h4, h5, h6"
        [ Maybe.map Css.fontSize c.headings.fontSize ]

    -- Grouping content
    , whereIfNonEmpty "li"
        [ Maybe.map Css.listStyle c.groupingContent.listItem.listStyle ]

    -- Text-level
    , whereIfNonEmpty "a"
        [ Maybe.map Css.textDecoration c.textLevel.a.textDecoration
        , Maybe.map Css.color c.textLevel.a.color
        ]
    , whereIfNonEmpty "b, strong"
        [ Maybe.map Css.fontWeight c.textLevel.b.fontWeight ]
    , whereIfNonEmpty "sub, sup"
        [ Maybe.map Css.fontSize c.textLevel.subOrSup.fontSize ]

    -- Table
    , whereIfNonEmpty "table"
        [ Maybe.map Css.borderCollapse c.table.table.borderCollapse
        , Maybe.map Css.borderSpacing c.table.table.borderSpacing
        ]
    , whereIfNonEmpty "th, td"
        [ Maybe.map Css.padding c.table.thOrTd.padding
        , Maybe.map Css.textAlign c.table.thOrTd.textAlign
        , Maybe.map Css.verticalAlign c.table.thOrTd.verticalAlign
        , Maybe.map Css.fontWeight c.table.thOrTd.fontWeight
        , Maybe.map Css.border c.table.thOrTd.border
        ]
    ]



-- DEPRECATED


{-| -}
ericMeyer : List Snippet
ericMeyer =
    EricMeyer.snippets


{-| -}
html5Doctor : List Snippet
html5Doctor =
    Html5Doctor.snippets


{-| -}
normalize : List Snippet
normalize =
    Normalize.snippets


{-| -}
sanitize : List Snippet
sanitize =
    Sanitize.v13


{-| -}
ress : List Snippet
ress =
    Ress.v5


{-| -}
destyle : List Snippet
destyle =
    Destyle.v4


{-| -}
theNewCssReset : List Snippet
theNewCssReset =
    TheNewCssReset.snippets


{-| -}
erc_HardReset : List Snippet
erc_HardReset =
    ERC.snippetsWith
        { margin = Reset
        , font = Reset
        , lineHeight = Reset
        , border = Reset
        , headings = Reset
        , lists = Reset
        , a = Reset
        , table = Reset
        , forms = Reset
        }


{-| -}
erc_Normalize : List Snippet
erc_Normalize =
    ERC.snippetsWith
        { margin = BrowserDefault
        , font = Reset
        , lineHeight = BrowserDefault
        , border = BrowserDefault
        , headings = BrowserDefault
        , lists = BrowserDefault
        , a = BrowserDefault
        , table = Normalize
        , forms = BrowserDefault
        }
