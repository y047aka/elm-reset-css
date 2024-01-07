module Css.Reset exposing
    ( ericMeyer
    , normalize_outdated, sanitize, ress, destyle
    , theNewCssReset
    , erc_Normalize
    , normalize, reset
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
@docs normalize_outdated, sanitize, ress, destyle
@docs theNewCssReset
@docs erc_Normalize

-}

import Css exposing (BackgroundClip, BorderCollapse, BorderStyle, BoxSizing, ColorValue, Cursor, Display, FontFamily, FontSize, FontWeight, Length, LengthOrMinMaxDimension, LengthOrNoneOrMinMaxDimension, NonMixable, Overflow, Pct, Position, Px, Resize, Visibility)
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
    , tabSize : Maybe Int
    }


type alias Body =
    { minHeight : Maybe (LengthOrMinMaxDimension {})
    , margin : Maybe String
    }


type alias GroupingContent =
    { ulOrOl : { listStyle : Maybe String }
    , hr :
        { boxSizing : Maybe (BoxSizing (Visibility {}))
        , height : Maybe String
        , overflow : Maybe (Overflow {})
        , borderTopWidth : Maybe (Length {} {})
        , color : Maybe String
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
    , abbr_title : { textDecoration : Maybe String }
    , bOrStrong : { fontWeight : Maybe (FontWeight {}) }
    , codeOrKbdOrSamp :
        { fontFamilies : Maybe (List (FontFamily {}))
        , fontSize : Maybe String
        }
    , small : { fontSize : Maybe String }
    , subOrSup :
        { fontSize : Maybe String
        , lineHeight : Maybe String
        , position : Maybe (Position {})
        , verticalAlign : Maybe String
        }
    , sub : { bottom : Maybe Px }
    , sup : { top : Maybe Px }
    }


type alias EmbeddedContent =
    { verticalAlign : Maybe String
    , imgOrPicture :
        { display : Maybe (Display {})
        , maxWidth : Maybe (LengthOrNoneOrMinMaxDimension {})
        , borderStyle : Maybe (BorderStyle {})
        }
    , iframe : { borderStyle : Maybe String }
    }


type alias Table =
    { table :
        { textIndent : Maybe String
        , borderCollapse : Maybe (BorderCollapse (Visibility {}))
        , borderColor : Maybe String
        }
    , caption : { textAlign : Maybe String }
    , thOrTd :
        { padding : Maybe (Length {} {})
        , textAlign : Maybe String
        , verticalAlign : Maybe String
        , fontWeight : Maybe String
        , border : Maybe (Length {} {})
        }
    }


type alias Form =
    { elements :
        { appearance : Maybe String
        , margin : Maybe String
        , font : Maybe String
        , fontFamily : Maybe String
        , fontSize : Maybe Pct
        , lineHeight : Maybe Float
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


normalize : List Snippet
normalize =
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
        |> toSnippets


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
        | boxSizing = Just Css.borderBox
        , borderWidth = Just Css.zero.value
        , margin = Just Css.zero.value
        , padding = Just Css.zero.value
    }


everything_normalize : Everything
everything_normalize =
    { everything_empty | boxSizing = Just Css.borderBox }


root_empty : Root
root_empty =
    { lineHeight = Nothing
    , textSizeAdjust = Nothing
    , tabSize = Nothing
    }


root_reset : Root
root_reset =
    { root_empty | lineHeight = Just (Css.num 1).value }


root_normalize : Root
root_normalize =
    { lineHeight = Just (Css.num 1.15).value
    , textSizeAdjust = Just (Css.pct 100).value
    , tabSize = Just 4
    }


body_empty : Body
body_empty =
    { minHeight = Nothing, margin = Nothing }


body_reset : Body
body_reset =
    body_empty


body_normalize : Body
body_normalize =
    { body_empty | margin = Just Css.zero.value }


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
    { groupingContent_empty
        | hr =
            { boxSizing = Nothing
            , height = Just Css.zero.value
            , overflow = Nothing
            , borderTopWidth = Nothing
            , color = Just Css.inherit.value
            }
        , pre =
            { fontFamilies = Just [ Css.monospace, Css.monospace ]
            , fontSize = Nothing
            }
    }


textLevel_empty : TextLevel
textLevel_empty =
    { a = { textDecoration = Nothing, color = Nothing }
    , abbr_title = { textDecoration = Nothing }
    , bOrStrong = { fontWeight = Nothing }
    , codeOrKbdOrSamp = { fontFamilies = Nothing, fontSize = Nothing }
    , small = { fontSize = Nothing }
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
        , codeOrKbdOrSamp =
            { fontFamilies = Just [ Css.monospace, Css.monospace ]
            , fontSize = Nothing
            }
        , subOrSup =
            { fontSize = Just (Css.pct 75).value
            , lineHeight = Just Css.zero.value
            , position = Just Css.relative
            , verticalAlign = Just "baseline"
            }
        , sub = { bottom = Just (Css.px -0.25) }
        , sup = { top = Just (Css.px -0.5) }
    }


textLevel_normalize : TextLevel
textLevel_normalize =
    { textLevel_empty
        | abbr_title = { textDecoration = Just "underline dotted" }
        , bOrStrong = { fontWeight = Just Css.bolder }
        , codeOrKbdOrSamp =
            { fontFamilies = Just [ Css.monospace, Css.monospace ]
            , fontSize = Just (Css.em 1).value
            }
        , small = { fontSize = Just (Css.pct 80).value }
        , subOrSup =
            { fontSize = Just (Css.pct 75).value
            , lineHeight = Just Css.zero.value
            , position = Just Css.relative
            , verticalAlign = Just "baseline"
            }
        , sub = { bottom = Just (Css.px -0.25) }
        , sup = { top = Just (Css.px -0.5) }
    }


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
    { embeddedContent_empty | verticalAlign = Just "bottom" }


embeddedContent_normalize : EmbeddedContent
embeddedContent_normalize =
    { embeddedContent_empty
        | verticalAlign = Just "middle"
        , iframe = { borderStyle = Just Css.none.value }
    }


table_empty : Table
table_empty =
    { table =
        { textIndent = Nothing
        , borderCollapse = Nothing
        , borderColor = Nothing
        }
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
    { table =
        { textIndent = Nothing
        , borderCollapse = Just Css.collapse
        , borderColor = Nothing
        }
    , caption = { textAlign = Just "left" }
    , thOrTd =
        { padding = Nothing
        , textAlign = Just "left"
        , verticalAlign = Nothing
        , fontWeight = Just Css.inherit.value
        , border = Nothing
        }
    }


table_normalize : Table
table_normalize =
    { table_empty
        | table =
            { textIndent = Just Css.zero.value
            , borderCollapse = Nothing
            , borderColor = Just Css.inherit.value
            }
    }


form_empty : Form
form_empty =
    { elements =
        { appearance = Nothing
        , margin = Nothing
        , font = Nothing
        , fontFamily = Nothing
        , fontSize = Nothing
        , lineHeight = Nothing
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
        , margin = Nothing
        , font = Just Css.inherit.value
        , fontFamily = Nothing
        , fontSize = Nothing
        , lineHeight = Nothing
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
    { form_empty
        | elements =
            { appearance = Nothing
            , margin = Just Css.zero.value
            , font = Nothing
            , fontFamily = Just Css.inherit.value
            , fontSize = Just (Css.pct 100)
            , lineHeight = Just 1.15
            , backgroundColor = Nothing
            , color = Nothing
            }
    }


toSnippets : Config -> List Snippet
toSnippets c =
    [ selectorIfNonEmpty "*, ::before, ::after"
        [ ( "box-sizing", Maybe.map .value c.everything.boxSizing )
        , ( "border-width", c.everything.borderWidth )
        ]
    , selectorIfNonEmpty "*"
        [ ( "margin", c.everything.margin )
        , ( "padding", c.everything.padding )
        ]

    -- Root
    , whereIfNonEmpty ":root"
        [ ( "line-height", c.root.lineHeight )

        -- text-size-adjust
        , ( "-moz-text-size-adjust", c.root.textSizeAdjust )
        , ( "-webkit-text-size-adjust", c.root.textSizeAdjust )
        , ( "text-size-adjust", c.root.textSizeAdjust )

        -- tab-size
        , ( "-moz-tab-size", Maybe.map String.fromInt c.root.tabSize )
        , ( "tab-size", Maybe.map String.fromInt c.root.tabSize )
        ]

    -- Body
    , whereIfNonEmpty "body"
        [ ( "min-height", Maybe.map .value c.body.minHeight )
        , ( "margin", c.body.margin )
        ]

    -- Headings
    , whereIfNonEmpty "h1, h2, h3, h4, h5, h6"
        [ ( "font-size", c.headings.fontSize )
        , ( "font-weight", c.headings.fontWeight )
        ]

    -- Grouping content
    , whereIfNonEmpty """ul[role="list"], ol[role="list"]"""
        [ ( "list-style", c.groupingContent.ulOrOl.listStyle ) ]
    , whereIfNonEmpty "hr"
        [ ( "box-sizing", Maybe.map .value c.groupingContent.hr.boxSizing )
        , ( "height", c.groupingContent.hr.height )
        , ( "overflow", Maybe.map .value c.groupingContent.hr.overflow )
        , ( "border-top-width", Maybe.map .value c.groupingContent.hr.borderTopWidth )
        , ( "color", c.groupingContent.hr.color )
        ]
    , whereIfNonEmpty "pre"
        [ ( "font-family", Maybe.map (List.map .value >> String.join ", ") c.groupingContent.pre.fontFamilies )
        , ( "font-size", Maybe.map .value c.groupingContent.pre.fontSize )
        ]
    , whereIfNonEmpty "address"
        [ ( "font-style", c.groupingContent.address.fontStyle ) ]

    -- Text-level
    , whereIfNonEmpty "a"
        [ ( "text-decoration", c.textLevel.a.textDecoration )
        , ( "color", c.textLevel.a.color )
        ]
    , whereIfNonEmpty "abbr[title]"
        [ ( "text-decoration", c.textLevel.abbr_title.textDecoration ) ]
    , whereIfNonEmpty "b, strong"
        [ ( "font-weight", Maybe.map .value c.textLevel.bOrStrong.fontWeight ) ]
    , whereIfNonEmpty "code, kbd, samp"
        [ ( "font-family", Maybe.map (List.map .value >> String.join ", ") c.textLevel.codeOrKbdOrSamp.fontFamilies ) ]
    , whereIfNonEmpty "small"
        [ ( "font-size", c.textLevel.small.fontSize ) ]
    , whereIfNonEmpty "sub, sup"
        [ ( "font-size", c.textLevel.subOrSup.fontSize )
        , ( "line-height", c.textLevel.subOrSup.lineHeight )
        , ( "position", Maybe.map .value c.textLevel.subOrSup.position )
        , ( "vertical-align", c.textLevel.subOrSup.verticalAlign )
        ]
    , whereIfNonEmpty "sub"
        [ ( "bottom", Maybe.map .value c.textLevel.sub.bottom ) ]
    , whereIfNonEmpty "sup"
        [ ( "top", Maybe.map .value c.textLevel.sup.top ) ]

    -- Embedded content
    , whereIfNonEmpty "img, svg, iframe, audio, embed, object"
        [ ( "vertical-align", c.embeddedContent.verticalAlign ) ]
    , whereIfNonEmpty "img, picture"
        [ ( "display", Maybe.map .value c.embeddedContent.imgOrPicture.display )
        , ( "max-width", Maybe.map .value c.embeddedContent.imgOrPicture.maxWidth )
        , ( "border-style", Maybe.map .value c.embeddedContent.imgOrPicture.borderStyle )
        ]
    , whereIfNonEmpty "iframe"
        [ ( "border-style", c.embeddedContent.iframe.borderStyle ) ]

    -- Table
    , whereIfNonEmpty "table"
        [ ( "text-indent", c.table.table.textIndent )
        , ( "border-collapse", Maybe.map .value c.table.table.borderCollapse )
        , ( "border-color", c.table.table.borderColor )
        ]
    , whereIfNonEmpty "caption"
        [ ( "text-align", c.table.caption.textAlign ) ]
    , whereIfNonEmpty "th, td"
        [ ( "padding", Maybe.map .value c.table.thOrTd.padding )
        , ( "text-align", c.table.thOrTd.textAlign )
        , ( "vertical-align", c.table.thOrTd.verticalAlign )
        , ( "font-weight", c.table.thOrTd.fontWeight )
        , ( "border", Maybe.map .value c.table.thOrTd.border )
        ]

    -- Form
    , whereIfNonEmpty "input, button, textarea, select, optgroup"
        [ ( "-webkit-appearance", c.form.elements.appearance )
        , ( "appearance", c.form.elements.appearance )
        , ( "margin", c.form.elements.margin )
        , ( "font", c.form.elements.font )
        , ( "font-family", c.form.elements.fontFamily )
        , ( "font-size", Maybe.map .value c.form.elements.fontSize )
        , ( "lineHeight", Maybe.map String.fromFloat c.form.elements.lineHeight )
        , ( "background-color", Maybe.map .value c.form.elements.backgroundColor )
        , ( "color", c.form.elements.color )
        ]
    , whereIfNonEmpty "textarea"
        [ ( "resize", Maybe.map .value c.form.textarea.resize ) ]
    , selectorIfNonEmpty "::placeholder"
        [ ( "color", c.form.placeholder.color ) ]
    , selectorIfNonEmpty """button, [type="button"], [type="reset"], [type="submit"]"""
        [ ( "cursor", Maybe.map .value c.form.cursor.default ) ]
    , selectorIfNonEmpty ":disabled"
        [ ( "cursor", Maybe.map .value c.form.cursor.disabled ) ]
    ]



-- DEPRECATED


{-| -}
ericMeyer : List Snippet
ericMeyer =
    EricMeyer.snippets


{-| -}
normalize_outdated : List Snippet
normalize_outdated =
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
