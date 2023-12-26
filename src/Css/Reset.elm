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

import Css exposing (BackgroundClip, BorderCollapse, BorderStyle, BoxSizing, Color, Display, ExplicitLength, FontSize, FontStyle, FontWeight, IncompatibleUnits, Length, LengthOrAuto, LengthOrMinMaxDimension, LengthOrNoneOrMinMaxDimension, ListStyle, Overflow, Style, TextDecorationLine, Visibility, property)
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


type alias Config =
    { everything : Everything
    , root : Root
    , body : Body
    , headings : Headings
    , groupingContent : GroupingContent
    , textLevel : TextLevel
    , embeddedContent : EmbeddedContent
    , table : Table
    , form : Form
    }


type alias Everything =
    { boxSizing : Maybe (BoxSizing (BackgroundClip {}))
    , borderWidth : Maybe (Length {} {})
    }


type alias Root =
    { textSizeAdjust : Maybe String }


type alias Body =
    { minHeight : Maybe (LengthOrMinMaxDimension {}) }


type alias GroupingContent =
    { ulOrOl : { listStyle : Maybe (ListStyle {}) }
    , hr :
        { boxSizing : Maybe (BoxSizing (Visibility {}))
        , height : Maybe (LengthOrAuto {})
        , overflow : Maybe (Overflow {})
        , borderTopWidth : Maybe (Length {} {})
        , color : Maybe Color
        }
    , pre :
        { fontFamilies : Maybe (List String)
        , fontSize : Maybe (FontSize {})
        }
    , address : { fontStyle : Maybe (FontStyle {}) }
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


type alias EmbeddedContent =
    { imgOrPicture :
        { display : Maybe (Display {})
        , maxWidth : Maybe (LengthOrNoneOrMinMaxDimension {})
        , borderStyle : Maybe (BorderStyle {})
        }
    , iframe : { borderStyle : Maybe (BorderStyle {}) }
    }


type alias Table =
    { table :
        { borderCollapse : Maybe (BorderCollapse (Visibility {}))
        , borderSpacing : Maybe (Length {} {})
        }
    , thOrTd :
        { padding : Maybe (Length {} {})
        , textAlign : Maybe (ExplicitLength IncompatibleUnits -> Style)
        , verticalAlign : Maybe (ExplicitLength IncompatibleUnits -> Style)
        , fontWeight : Maybe (FontWeight {})
        , border : Maybe (Length {} {})
        }
    }


type alias Form =
    { elements :
        { appearance : Maybe String
        , font : Maybe String
        }
    }


init : Config
init =
    { everything = everything_empty
    , root = root_empty
    , body = body_empty
    , headings = headings_empty
    , groupingContent = groupingContent_empty
    , textLevel = textLevel_empty
    , embeddedContent = embeddedContent_empty
    , table = table_empty
    , form = form_empty
    }


everything_empty : Everything
everything_empty =
    { boxSizing = Nothing, borderWidth = Nothing }


root_empty : Root
root_empty =
    { textSizeAdjust = Nothing }


body_empty : Body
body_empty =
    { minHeight = Nothing }


headings_empty : Headings
headings_empty =
    { fontSize = Nothing, fontWeight = Nothing }


groupingContent_empty : GroupingContent
groupingContent_empty =
    { ulOrOl = { listStyle = Nothing }
    , hr =
        { boxSizing = Nothing
        , height = Nothing
        , overflow = Nothing
        , borderTopWidth = Nothing
        , color = Nothing
        }
    , pre = { fontFamilies = Nothing, fontSize = Nothing }
    , address = { fontStyle = Nothing }
    }


textLevel_empty : TextLevel
textLevel_empty =
    { a = { textDecoration = Nothing, color = Nothing }
    , b = { fontWeight = Nothing }
    , subOrSup = { fontSize = Nothing }
    }


embeddedContent_empty : EmbeddedContent
embeddedContent_empty =
    { imgOrPicture =
        { display = Nothing
        , maxWidth = Nothing
        , borderStyle = Nothing
        }
    , iframe = { borderStyle = Nothing }
    }


table_empty : Table
table_empty =
    { table =
        { borderCollapse = Nothing
        , borderSpacing = Nothing
        }
    , thOrTd =
        { padding = Nothing
        , textAlign = Nothing
        , verticalAlign = Nothing
        , fontWeight = Nothing
        , border = Nothing
        }
    }


form_empty : Form
form_empty =
    { elements = { appearance = Nothing, font = Nothing } }


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
        [ Maybe.map (property "-moz-text-size-adjust") c.root.textSizeAdjust
        , Maybe.map (property "-webkit-text-size-adjust") c.root.textSizeAdjust
        , Maybe.map (property "text-size-adjust") c.root.textSizeAdjust
        ]

    -- Body
    , whereIfNonEmpty "body"
        [ Maybe.map Css.minHeight c.body.minHeight ]

    -- Headings
    , whereIfNonEmpty "h1, h2, h3, h4, h5, h6"
        [ Maybe.map Css.fontSize c.headings.fontSize ]

    -- Grouping content
    , whereIfNonEmpty """ul[role="list"], ol[role="list"]"""
        [ Maybe.map Css.listStyle c.groupingContent.ulOrOl.listStyle ]
    , whereIfNonEmpty "hr"
        [ Maybe.map Css.boxSizing c.groupingContent.hr.boxSizing
        , Maybe.map Css.height c.groupingContent.hr.height
        , Maybe.map Css.overflow c.groupingContent.hr.overflow
        , Maybe.map Css.borderTopWidth c.groupingContent.hr.borderTopWidth
        , Maybe.map Css.color c.groupingContent.hr.color
        ]
    , whereIfNonEmpty "pre"
        [ Maybe.map Css.fontFamilies c.groupingContent.pre.fontFamilies
        , Maybe.map Css.fontSize c.groupingContent.pre.fontSize
        ]
    , whereIfNonEmpty "address"
        [ Maybe.map Css.fontStyle c.groupingContent.address.fontStyle ]

    -- Text-level
    , whereIfNonEmpty "a"
        [ Maybe.map Css.textDecoration c.textLevel.a.textDecoration
        , Maybe.map Css.color c.textLevel.a.color
        ]
    , whereIfNonEmpty "b, strong"
        [ Maybe.map Css.fontWeight c.textLevel.b.fontWeight ]
    , whereIfNonEmpty "sub, sup"
        [ Maybe.map Css.fontSize c.textLevel.subOrSup.fontSize ]

    -- Embedded content
    , whereIfNonEmpty "img, picture"
        [ Maybe.map Css.display c.embeddedContent.imgOrPicture.display
        , Maybe.map Css.maxWidth c.embeddedContent.imgOrPicture.maxWidth
        , Maybe.map Css.borderStyle c.embeddedContent.imgOrPicture.borderStyle
        ]
    , whereIfNonEmpty "iframe"
        [ Maybe.map Css.borderStyle c.embeddedContent.iframe.borderStyle ]

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
    , -- Form
      whereIfNonEmpty "input, button, textarea, select, optgroup"
        [ Maybe.map (property "-webkit-appearance") c.form.elements.appearance
        , Maybe.map (property "appearance") c.form.elements.appearance
        , Maybe.map (property "font") c.form.elements.font
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
