module Css.Reset exposing
    ( ericMeyer
    , normalize, sanitize, ress, destyle
    , theNewCssReset
    , erc_Normalize
    , reset
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

@docs ericMeyer
@docs normalize, sanitize, ress, destyle
@docs theNewCssReset
@docs erc_Normalize

-}

import Css exposing (BackgroundClip, BorderCollapse, BorderStyle, BoxSizing, Color, ColorValue, Cursor, Display, ExplicitLength, FontFamily, FontSize, FontWeight, IncompatibleUnits, Length, LengthOrAuto, LengthOrMinMaxDimension, LengthOrNoneOrMinMaxDimension, NonMixable, Overflow, Position, Px, Resize, Style, Visibility, property)
import Css.Global exposing (Snippet)
import Css.Reset.Destyle as Destyle
import Css.Reset.ElmResetCss as ERC exposing (ResetMode(..))
import Css.Reset.EricMeyer as EricMeyer
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
    , borderWidth : Maybe String
    , margin : Maybe String
    , padding : Maybe String
    }


type alias Root =
    { lineHeight : Maybe String
    , textSizeAdjust : Maybe String
    }


type alias Body =
    { minHeight : Maybe (LengthOrMinMaxDimension {}) }


type alias GroupingContent =
    { ulOrOl : { listStyle : Maybe String }
    , hr :
        { boxSizing : Maybe (BoxSizing (Visibility {}))
        , height : Maybe (LengthOrAuto {})
        , overflow : Maybe (Overflow {})
        , borderTopWidth : Maybe (Length {} {})
        , color : Maybe Color
        }
    , pre :
        { fontFamilies : Maybe (List (FontFamily {}))
        , fontSize : Maybe (FontSize {})
        }
    , address : { fontStyle : Maybe String }
    }


type alias Headings =
    { fontSize : Maybe String
    , fontWeight : Maybe String
    }


type alias TextLevel =
    { a :
        { textDecoration : Maybe String
        , color : Maybe String
        }
    , b : { fontWeight : Maybe (FontWeight {}) }
    , codeOrKbdOrSamp : { fontFamilies : Maybe (List (FontFamily {})) }
    , subOrSup :
        { fontSize : Maybe String
        , lineHeight : Maybe String
        , position : Maybe (Position {})
        , verticalAlign : Maybe (ExplicitLength IncompatibleUnits -> Style)
        }
    , sub : { bottom : Maybe Px }
    , sup : { top : Maybe Px }
    }


type alias EmbeddedContent =
    { verticalAlign : Maybe (ExplicitLength IncompatibleUnits -> Style)
    , imgOrPicture :
        { display : Maybe (Display {})
        , maxWidth : Maybe (LengthOrNoneOrMinMaxDimension {})
        , borderStyle : Maybe (BorderStyle {})
        }
    , iframe : { borderStyle : Maybe (BorderStyle {}) }
    }


type alias Table =
    { table : { borderCollapse : Maybe (BorderCollapse (Visibility {})) }
    , caption : { textAlign : Maybe (ExplicitLength IncompatibleUnits -> Style) }
    , thOrTd :
        { padding : Maybe (Length {} {})
        , textAlign : Maybe (ExplicitLength IncompatibleUnits -> Style)
        , verticalAlign : Maybe (ExplicitLength IncompatibleUnits -> Style)
        , fontWeight : Maybe String
        , border : Maybe (Length {} {})
        }
    }


type alias Form =
    { elements :
        { appearance : Maybe String
        , font : Maybe String
        , backgroundColor : Maybe (ColorValue NonMixable)
        , color : Maybe String
        }
    , textarea : { resize : Maybe (Resize {}) }
    , placeholder : { color : Maybe String }
    , cursor :
        { default : Maybe (Cursor {})
        , disabled : Maybe (Cursor {})
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


reset : List Snippet
reset =
    { everything = everything_reset
    , root = root_reset
    , body = body_reset
    , headings = headings_reset
    , groupingContent = groupingContent_reset
    , textLevel = textLevel_reset
    , embeddedContent = embeddedContent_reset
    , table = table_reset
    , form = form_reset
    }
        |> toSnippets


normalize_ : Config
normalize_ =
    { everything = everything_normalize
    , root = root_normalize
    , body = body_normalize
    , headings = headings_normalize
    , groupingContent = groupingContent_normalize
    , textLevel = textLevel_normalize
    , embeddedContent = embeddedContent_normalize
    , table = table_normalize
    , form = form_normalize
    }


everything_empty : Everything
everything_empty =
    { boxSizing = Nothing
    , borderWidth = Nothing
    , margin = Nothing
    , padding = Nothing
    }


everything_reset : Everything
everything_reset =
    { everything_empty
        | borderWidth = Just Css.zero.value
        , margin = Just Css.zero.value
        , padding = Just Css.zero.value
    }


everything_normalize : Everything
everything_normalize =
    everything_empty


root_empty : Root
root_empty =
    { lineHeight = Nothing
    , textSizeAdjust = Nothing
    }


root_reset : Root
root_reset =
    { root_empty | lineHeight = Just (Css.num 1).value }


root_normalize : Root
root_normalize =
    root_empty


body_empty : Body
body_empty =
    { minHeight = Nothing }


body_reset : Body
body_reset =
    body_empty


body_normalize : Body
body_normalize =
    body_empty


headings_empty : Headings
headings_empty =
    { fontSize = Nothing, fontWeight = Nothing }


headings_reset : Headings
headings_reset =
    { fontSize = Just Css.inherit.value
    , fontWeight = Just Css.inherit.value
    }


headings_normalize : Headings
headings_normalize =
    headings_empty


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


groupingContent_reset : GroupingContent
groupingContent_reset =
    { groupingContent_empty
        | ulOrOl = { listStyle = Just Css.none.value }
        , pre =
            { fontFamilies = Just [ Css.monospace, Css.monospace ]
            , fontSize = Nothing
            }
        , address = { fontStyle = Just Css.inherit.value }
    }


groupingContent_normalize : GroupingContent
groupingContent_normalize =
    groupingContent_empty


textLevel_empty : TextLevel
textLevel_empty =
    { a = { textDecoration = Nothing, color = Nothing }
    , b = { fontWeight = Nothing }
    , codeOrKbdOrSamp = { fontFamilies = Nothing }
    , subOrSup =
        { fontSize = Nothing
        , lineHeight = Nothing
        , position = Nothing
        , verticalAlign = Nothing
        }
    , sub = { bottom = Nothing }
    , sup = { top = Nothing }
    }


textLevel_reset : TextLevel
textLevel_reset =
    { textLevel_empty
        | a =
            { textDecoration = Just Css.none.value
            , color = Just Css.inherit.value
            }
        , codeOrKbdOrSamp = { fontFamilies = Just [ Css.monospace, Css.monospace ] }
        , subOrSup =
            { fontSize = Just (Css.pct 75).value
            , lineHeight = Just Css.zero.value
            , position = Just Css.relative
            , verticalAlign = Just Css.baseline
            }
        , sub = { bottom = Just (Css.px -0.25) }
        , sup = { top = Just (Css.px -0.5) }
    }


textLevel_normalize : TextLevel
textLevel_normalize =
    textLevel_empty


embeddedContent_empty : EmbeddedContent
embeddedContent_empty =
    { verticalAlign = Nothing
    , imgOrPicture =
        { display = Nothing
        , maxWidth = Nothing
        , borderStyle = Nothing
        }
    , iframe = { borderStyle = Nothing }
    }


embeddedContent_reset : EmbeddedContent
embeddedContent_reset =
    { embeddedContent_empty | verticalAlign = Just Css.bottom }


embeddedContent_normalize : EmbeddedContent
embeddedContent_normalize =
    embeddedContent_empty


table_empty : Table
table_empty =
    { table = { borderCollapse = Nothing }
    , caption = { textAlign = Nothing }
    , thOrTd =
        { padding = Nothing
        , textAlign = Nothing
        , verticalAlign = Nothing
        , fontWeight = Nothing
        , border = Nothing
        }
    }


table_reset : Table
table_reset =
    { table = { borderCollapse = Just Css.collapse }
    , caption = { textAlign = Just Css.left }
    , thOrTd =
        { padding = Nothing
        , textAlign = Just Css.left
        , verticalAlign = Nothing
        , fontWeight = Just Css.inherit.value
        , border = Nothing
        }
    }


table_normalize : Table
table_normalize =
    table_empty


form_empty : Form
form_empty =
    { elements =
        { appearance = Nothing
        , font = Nothing
        , backgroundColor = Nothing
        , color = Nothing
        }
    , textarea = { resize = Nothing }
    , placeholder = { color = Nothing }
    , cursor = { default = Nothing, disabled = Nothing }
    }


form_reset : Form
form_reset =
    { elements =
        { appearance = Just Css.none.value
        , font = Just Css.inherit.value
        , backgroundColor = Just Css.transparent
        , color = Just Css.inherit.value
        }
    , textarea = { resize = Just Css.vertical }
    , placeholder = { color = Just Css.inherit.value }
    , cursor =
        { default = Just Css.pointer
        , disabled = Just Css.default
        }
    }


form_normalize : Form
form_normalize =
    form_empty


toSnippets : Config -> List Snippet
toSnippets c =
    [ selectorIfNonEmpty "*, ::before, ::after"
        [ Maybe.map Css.boxSizing c.everything.boxSizing
        , Maybe.map (property "border-width") c.everything.borderWidth
        ]
    , selectorIfNonEmpty "*"
        [ Maybe.map (property "margin") c.everything.margin
        , Maybe.map (property "padding") c.everything.padding
        ]

    -- Root
    , whereIfNonEmpty ":root"
        [ Maybe.map (property "line-height") c.root.lineHeight
        , Maybe.map (property "-moz-text-size-adjust") c.root.textSizeAdjust
        , Maybe.map (property "-webkit-text-size-adjust") c.root.textSizeAdjust
        , Maybe.map (property "text-size-adjust") c.root.textSizeAdjust
        ]

    -- Body
    , whereIfNonEmpty "body"
        [ Maybe.map Css.minHeight c.body.minHeight ]

    -- Headings
    , whereIfNonEmpty "h1, h2, h3, h4, h5, h6"
        [ Maybe.map (property "font-size") c.headings.fontSize
        , Maybe.map (property "font-weight") c.headings.fontWeight
        ]

    -- Grouping content
    , whereIfNonEmpty """ul[role="list"], ol[role="list"]"""
        [ Maybe.map (property "list-style") c.groupingContent.ulOrOl.listStyle ]
    , whereIfNonEmpty "hr"
        [ Maybe.map Css.boxSizing c.groupingContent.hr.boxSizing
        , Maybe.map Css.height c.groupingContent.hr.height
        , Maybe.map Css.overflow c.groupingContent.hr.overflow
        , Maybe.map Css.borderTopWidth c.groupingContent.hr.borderTopWidth
        , Maybe.map Css.color c.groupingContent.hr.color
        ]
    , whereIfNonEmpty "pre"
        [ Maybe.map (List.map .value >> Css.fontFamilies) c.groupingContent.pre.fontFamilies
        , Maybe.map Css.fontSize c.groupingContent.pre.fontSize
        ]
    , whereIfNonEmpty "address"
        [ Maybe.map (property "font-style") c.groupingContent.address.fontStyle ]

    -- Text-level
    , whereIfNonEmpty "a"
        [ Maybe.map (property "text-decoration") c.textLevel.a.textDecoration
        , Maybe.map (property "color") c.textLevel.a.color
        ]
    , whereIfNonEmpty "b, strong"
        [ Maybe.map Css.fontWeight c.textLevel.b.fontWeight ]
    , whereIfNonEmpty "code, kbd, samp"
        [ Maybe.map (List.map .value >> Css.fontFamilies) c.textLevel.codeOrKbdOrSamp.fontFamilies ]
    , whereIfNonEmpty "sub, sup"
        [ Maybe.map (property "font-size") c.textLevel.subOrSup.fontSize
        , Maybe.map (property "line-height") c.textLevel.subOrSup.lineHeight
        , Maybe.map Css.position c.textLevel.subOrSup.position
        , Maybe.map Css.verticalAlign c.textLevel.subOrSup.verticalAlign
        ]
    , whereIfNonEmpty "sub"
        [ Maybe.map Css.bottom c.textLevel.sub.bottom ]
    , whereIfNonEmpty "sup"
        [ Maybe.map Css.top c.textLevel.sup.top ]

    -- Embedded content
    , whereIfNonEmpty "img, svg, iframe, audio, embed, object"
        [ Maybe.map Css.verticalAlign c.embeddedContent.verticalAlign ]
    , whereIfNonEmpty "img, picture"
        [ Maybe.map Css.display c.embeddedContent.imgOrPicture.display
        , Maybe.map Css.maxWidth c.embeddedContent.imgOrPicture.maxWidth
        , Maybe.map Css.borderStyle c.embeddedContent.imgOrPicture.borderStyle
        ]
    , whereIfNonEmpty "iframe"
        [ Maybe.map Css.borderStyle c.embeddedContent.iframe.borderStyle ]

    -- Table
    , whereIfNonEmpty "table"
        [ Maybe.map Css.borderCollapse c.table.table.borderCollapse ]
    , whereIfNonEmpty "caption"
        [ Maybe.map Css.textAlign c.table.caption.textAlign ]
    , whereIfNonEmpty "th, td"
        [ Maybe.map Css.padding c.table.thOrTd.padding
        , Maybe.map Css.textAlign c.table.thOrTd.textAlign
        , Maybe.map Css.verticalAlign c.table.thOrTd.verticalAlign
        , Maybe.map (property "font-weight") c.table.thOrTd.fontWeight
        , Maybe.map Css.border c.table.thOrTd.border
        ]

    -- Form
    , whereIfNonEmpty "input, button, textarea, select, optgroup"
        [ Maybe.map (property "-webkit-appearance") c.form.elements.appearance
        , Maybe.map (property "appearance") c.form.elements.appearance
        , Maybe.map (property "font") c.form.elements.font
        , Maybe.map Css.backgroundColor c.form.elements.backgroundColor
        , Maybe.map (property "color") c.form.elements.color
        ]
    , whereIfNonEmpty "textarea"
        [ Maybe.map Css.resize c.form.textarea.resize ]
    , selectorIfNonEmpty "::placeholder"
        [ Maybe.map (property "color") c.form.placeholder.color ]
    , selectorIfNonEmpty """button, [type="button"], [type="reset"], [type="submit"]"""
        [ Maybe.map Css.cursor c.form.cursor.default ]
    , selectorIfNonEmpty ":disabled"
        [ Maybe.map Css.cursor c.form.cursor.disabled ]
    ]



-- DEPRECATED


{-| -}
ericMeyer : List Snippet
ericMeyer =
    EricMeyer.snippets


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
