module Data.Tag exposing (Tag(..), all, fromString, renderer, toString)

import Html.Styled exposing (..)
import Html.Styled.Attributes as Attributes exposing (alt, attribute, checked, cols, controls, datetime, for, height, href, id, multiple, name, placeholder, rows, src, title, type_, value)
import Svg.Styled exposing (circle, svg)
import Svg.Styled.Attributes exposing (cx, cy, fill, r)


type Tag
    = Headings
    | Paragraphs
    | Blockquotes
    | Address
    | Lists
    | HorizontalRules
    | TabularData
    | Code
    | InlineElements
      -- | HtmlComments
    | Images
    | Audio
    | Video
      -- | Canvas
    | Meter
    | Progress
    | InlineSvg
    | IFrames
    | InputFields
    | SelectMenus
    | Checkboxes
    | RadioButtons
    | Textareas
    | Html5Inputs
    | ActionButtons


fromString : String -> Tag
fromString str =
    case str of
        "Headings" ->
            Headings

        "Paragraphs" ->
            Paragraphs

        "Blockquotes" ->
            Blockquotes

        "Address" ->
            Address

        "Lists" ->
            Lists

        "HorizontalRules" ->
            HorizontalRules

        "TabularData" ->
            TabularData

        "Code" ->
            Code

        "InlineElements" ->
            InlineElements

        -- "HtmlComments" ->
        --     HtmlComments
        "Images" ->
            Images

        "Audio" ->
            Audio

        "Video" ->
            Video

        -- "Canvas" ->
        --     Canvas
        "Meter" ->
            Meter

        "Progress" ->
            Progress

        "InlineSvg" ->
            InlineSvg

        "IFrames" ->
            IFrames

        "InputFields" ->
            InputFields

        "SelectMenus" ->
            SelectMenus

        "Checkboxes" ->
            Checkboxes

        "RadioButtons" ->
            RadioButtons

        "Textareas" ->
            Textareas

        "Html5Inputs" ->
            Html5Inputs

        "ActionButtons" ->
            ActionButtons

        _ ->
            Headings


toString : Tag -> String
toString tag =
    case tag of
        Headings ->
            "Headings"

        Paragraphs ->
            "Paragraphs"

        Blockquotes ->
            "Blockquotes"

        Address ->
            "Address"

        Lists ->
            "Lists"

        HorizontalRules ->
            "HorizontalRules"

        TabularData ->
            "TabularData"

        Code ->
            "Code"

        InlineElements ->
            "InlineElements"

        -- HtmlComments ->
        --     "HtmlComments"
        Images ->
            "Images"

        Audio ->
            "Audio"

        Video ->
            "Video"

        -- Canvas ->
        --     "Canvas"
        Meter ->
            "Meter"

        Progress ->
            "Progress"

        InlineSvg ->
            "InlineSvg"

        IFrames ->
            "IFrames"

        InputFields ->
            "InputFields"

        SelectMenus ->
            "SelectMenus"

        Checkboxes ->
            "Checkboxes"

        RadioButtons ->
            "RadioButtons"

        Textareas ->
            "Textareas"

        Html5Inputs ->
            "Html5Inputs"

        ActionButtons ->
            "ActionButtons"


renderer : Tag -> Html msg
renderer tag =
    case tag of
        Headings ->
            headingsRenderer

        Paragraphs ->
            paragraphsRenderer

        Blockquotes ->
            blockquotesRenderer

        Address ->
            addressRenderer

        Lists ->
            listsRenderer

        HorizontalRules ->
            div [] [ hr [] [] ]

        TabularData ->
            tabularDataRenderer

        Code ->
            codeRenderer

        InlineElements ->
            inlineElementsRenderer

        -- HtmlComments ->
        --     [ text "" ]
        Images ->
            imagesRenderer

        Audio ->
            div [] [ audio [ controls True ] [ text "audio" ] ]

        Video ->
            div [] [ video [ controls True ] [ text "video" ] ]

        -- Canvas ->
        --     [ canvas [] [ text "canvas" ] ]
        Meter ->
            div [] [ meter [ value "2", Attributes.min "0", Attributes.max "10" ] [ text "2 out of 10" ] ]

        Progress ->
            div [] [ progress [] [ text "progress" ] ]

        InlineSvg ->
            inlineSvgRenderer

        IFrames ->
            div [] [ iframe [ src "index.html", height 300 ] [] ]

        InputFields ->
            inputFieldsRenderer

        SelectMenus ->
            selectMenusRenderer

        Checkboxes ->
            checkboxesRenderer

        RadioButtons ->
            radioButtonsRenderer

        Textareas ->
            textareasRenderer

        Html5Inputs ->
            html5InputsRenderer

        ActionButtons ->
            actionButtonsRenderer


headingsRenderer : Html msg
headingsRenderer =
    div []
        [ h1 [] [ text "Heading 1" ]
        , h2 [] [ text "Heading 2" ]
        , h3 [] [ text "Heading 3" ]
        , h4 [] [ text "Heading 4" ]
        , h5 [] [ text "Heading 5" ]
        , h6 [] [ text "Heading 6" ]
        ]


paragraphsRenderer : Html msg
paragraphsRenderer =
    div [] [ p [] [ text "A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose." ] ]


blockquotesRenderer : Html msg
blockquotesRenderer =
    div []
        [ blockquote []
            [ p [] [ text "A block quotation (also known as a long quotation or extract) is a quotation in a written document, that is set off from the main text as a paragraph, or block of text." ]
            , p [] [ text "It is typically distinguished visually using indentation and a different typeface or smaller size quotation. It may or may not include a citation, usually placed at the bottom." ]
            , cite [] [ a [ href "#!" ] [ text "Said no one, ever." ] ]
            ]
        ]


addressRenderer : Html msg
addressRenderer =
    div []
        [ address []
            [ text "Written by "
            , a [ href "mailto:webmaster@example.com" ] [ text "Jon Doe" ]
            , text "."
            , br [] []
            , text "Visit us at:"
            , br [] []
            , text "Example.com"
            , br [] []
            , text "Box 564, Disneyland"
            , br [] []
            , text "USA"
            ]
        ]


listsRenderer : Html msg
listsRenderer =
    div []
        [ h3 [] [ text "Definition list" ]
        , dl []
            [ dt [] [ text "Definition List Title" ]
            , dd [] [ text "This is a definition list division." ]
            ]
        , h3 [] [ text "Ordered List" ]
        , ol [ type_ "1" ]
            [ li [] [ text "List Item 1" ]
            , li []
                [ text "List Item 2"
                , ol [ type_ "A" ]
                    [ li [] [ text "List Item 1" ]
                    , li []
                        [ text "List Item 2"
                        , ol [ type_ "a" ]
                            [ li [] [ text "List Item 1" ]
                            , li [] [ text "List Item 2" ]
                            , li [] [ text "List Item 3" ]
                            ]
                        ]
                    , li [] [ text "List Item 3" ]
                    ]
                ]
            , li [] [ text "List Item 3" ]
            ]
        , h3 [] [ text "Unordered List" ]
        , ul []
            [ li [] [ text "List Item 1" ]
            , li []
                [ text "List Item 2"
                , ul []
                    [ li [] [ text "List Item 1" ]
                    , li []
                        [ text "List Item 2"
                        , ul []
                            [ li [] [ text "List Item 1" ]
                            , li [] [ text "List Item 2" ]
                            , li [] [ text "List Item 3" ]
                            ]
                        ]
                    , li [] [ text "List Item 3" ]
                    ]
                ]
            , li [] [ text "List Item 3" ]
            ]
        ]


tabularDataRenderer : Html msg
tabularDataRenderer =
    div []
        [ table []
            [ caption [] [ text "Table Caption" ]
            , thead []
                [ tr []
                    [ text "Table Heading 1"
                    , text "Table Heading 2"
                    , text "Table Heading 3"
                    , text "Table Heading 4"
                    , text "Table Heading 5"
                    ]
                ]
            , tfoot []
                [ tr []
                    [ text "Table Footer 1"
                    , text "Table Footer 2"
                    , text "Table Footer 3"
                    , text "Table Footer 4"
                    , text "Table Footer 5"
                    ]
                ]
            , tbody []
                [ tr []
                    [ text "Table Cell 1"
                    , text "Table Cell 2"
                    , text "Table Cell 3"
                    , text "Table Cell 4"
                    , text "Table Cell 5"
                    ]
                , tr []
                    [ text "Table Cell 1"
                    , text "Table Cell 2"
                    , text "Table Cell 3"
                    , text "Table Cell 4"
                    , text "Table Cell 5"
                    ]
                , tr []
                    [ text "Table Cell 1"
                    , text "Table Cell 2"
                    , text "Table Cell 3"
                    , text "Table Cell 4"
                    , text "Table Cell 5"
                    ]
                ]
            ]
        ]


codeRenderer : Html msg
codeRenderer =
    div []
        [ p [] [ strong [] [ text "Keyboard input:" ], text " ", kbd [] [ text "Cmd" ] ]
        , p [] [ strong [] [ text "Inline code:" ], text " ", code [] [ text "<div>code</div>" ] ]
        , p [] [ strong [] [ text "Sample output:" ], text " ", samp [] [ text "This is sample output from a computer program." ] ]
        , h2 [] [ text "Pre-formatted text" ]
        , pre [] [ text """P R E F O R M A T T E D T E X T
! " # $ % &amp; ' ( ) * + , - . /
0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ?
@ A B C D E F G H I J K L M N O
P Q R S T U V W X Y Z [ \\ ] ^ _
` a b c d e f g h i j k l m n o
p q r s t u v w x y z { | } ~ """ ]
        ]


inlineElementsRenderer : Html msg
inlineElementsRenderer =
    div []
        [ p [] [ a [ href "#!" ] [ text "This is a text link." ] ]
        , p [] [ strong [] [ text "Strong is used to indicate strong importance." ] ]
        , p [] [ em [] [ text "This text has added emphasis." ] ]
        , p [] [ text "The ", b [] [ text "b element" ], text " is stylistically different text from normal text, without any special importance." ]
        , p [] [ text "The ", i [] [ text "i element" ], text " is text that is offset from the normal text." ]
        , p [] [ text "The ", u [] [ text "u element" ], text " is text with an unarticulated, though explicitly rendered, non-textual annotation." ]
        , p [] [ del [] [ text "This text is deleted" ], text " and ", ins [] [ text "This text is inserted" ], text "." ]
        , p [] [ s [] [ text "This text has a strikethrough." ] ]
        , p [] [ text "Superscript", sup [] [ text "®" ], text "." ]
        , p [] [ text "Subscript for things like H", sub [] [ text "2" ], text "O." ]
        , p [] [ small [] [ text "This small text is small for fine print, etc." ] ]
        , p [] [ text "Abbreviation: ", abbr [ title "HyperText Markup Language" ] [ text "HTML" ] ]
        , p []
            [ q [ Attributes.cite "https://developer.mozilla.org/en-US/docs/HTML/Element/q" ]
                [ text "This text is a short inline quotation." ]
            ]
        , p [] [ cite [] [ text "This is a citation." ] ]
        , p [] [ text "The ", dfn [] [ text "dfn element" ], text " indicates a definition." ]
        , p [] [ text "The ", mark [] [ text "mark element" ], text " indicates a highlight." ]
        , p [] [ text "The ", var [] [ text "variable element" ], text ", such as ", var [] [ text "x" ], text " = ", var [] [ text "y." ] ]
        , p [] [ text "The time element: ", time [ datetime "2013-04-06T12:32+00:00" ] [ text "2 weeks ago" ] ]
        ]


imagesRenderer : Html msg
imagesRenderer =
    div []
        [ h3 [] [ text "Plain ", code [] [ text "<img>" ], text " element" ]
        , p [] [ img [ src "https://placekitten.com/280/280", alt "Photo of a kitten" ] [] ]
        , h3 [] [ code [] [ text "<figure>" ], text " element with ", code [] [ text "<img>" ], text " element" ]
        , figure [] [ img [ src "https://placekitten.com/280/280", alt "Photo of a kitten" ] [] ]
        , h3 [] [ code [] [ text "<figure>" ], text " element with ", code [] [ text "<img>" ], text " and ", code [] [ text "<figcaption>" ], text " elements" ]
        , figure []
            [ img [ src "https://placekitten.com/280/280", alt "Photo of a kitten" ] []
            , figcaption [] [ text "Here is a caption for this image." ]
            ]
        , h3 [] [ code [] [ text "<figure>" ], text " element with a ", code [] [ text "<picture>" ], text " element" ]
        , figure []
            [ Html.Styled.node "picture"
                []
                [ source [ attribute "srcset" "https://placekitten.com/280/280", Attributes.media "(min-width: 280px)" ] []
                , img [ src "https://placekitten.com/280/280", alt "Photo of a kitten" ] []
                ]
            ]
        ]


inlineSvgRenderer : Html msg
inlineSvgRenderer =
    div []
        [ svg [ Svg.Styled.Attributes.width "100px", Svg.Styled.Attributes.height "100px" ]
            [ circle [ cx "100", cy "100", r "100", fill "#1fa3ec" ] [] ]
        ]


inputFieldsRenderer : Html msg
inputFieldsRenderer =
    div []
        [ form []
            [ p []
                [ label [ for "input__text" ] [ text "Text Input" ]
                , br [] []
                , input [ id "input__text", type_ "text", placeholder "Text Input" ] []
                ]
            , p []
                [ label [ for "input__password" ] [ text "Password" ]
                , br [] []
                , input [ id "input__password", type_ "password", placeholder "Type your Password" ] []
                ]
            , p []
                [ label [ for "input__webaddress" ] [ text "Web Address" ]
                , br [] []
                , input [ id "input__webaddress", type_ "url", placeholder "https://yoursite.com" ] []
                ]
            , p []
                [ label [ for "input__emailaddress" ] [ text "Email Address" ]
                , br [] []
                , input [ id "input__emailaddress", type_ "email", placeholder "name@email.com" ] []
                ]
            , p []
                [ label [ for "input__phone" ] [ text "Phone Number" ]
                , br [] []
                , input [ id "input__phone", type_ "tel", placeholder "(999) 999-9999" ] []
                ]
            , p []
                [ label [ for "input__search" ] [ text "Search" ]
                , br [] []
                , input [ id "input__search", type_ "search", placeholder "Enter Search Term" ] []
                ]
            , p []
                [ label [ for "input__text2" ] [ text "Number Input" ]
                , br [] []
                , input [ id "input__text2", type_ "number", placeholder "Enter a Number" ] []
                ]
            , p []
                [ label [ for "input__file" ] [ text "File Input" ]
                , br [] []
                , input [ id "input__file", type_ "file" ] []
                ]
            ]
        ]


selectMenusRenderer : Html msg
selectMenusRenderer =
    div []
        [ p []
            [ label [ for "select" ] [ text "Select" ]
            , br [] []
            , select [ id "select" ]
                [ optgroup [ attribute "label" "Option Group" ]
                    [ option [] [ text "Option One" ]
                    , option [] [ text "Option Two" ]
                    , option [] [ text "Option Three" ]
                    ]
                ]
            ]
        , p []
            [ label [ for "select_multiple" ] [ text "Select (multiple)" ]
            , br [] []
            , select [ id "select_multiple", multiple True ]
                [ optgroup [ attribute "label" "Option Group" ]
                    [ option [] [ text "Option One" ]
                    , option [] [ text "Option Two" ]
                    , option [] [ text "Option Three" ]
                    ]
                ]
            ]
        ]


checkboxesRenderer : Html msg
checkboxesRenderer =
    div []
        [ label [ for "checkbox1" ] [ input [ id "checkbox1", name "checkbox", type_ "checkbox", checked True ] [], text "Choice A" ]
        , br [] []
        , label [ for "checkbox2" ] [ input [ id "checkbox2", name "checkbox", type_ "checkbox" ] [], text "Choice B" ]
        , br [] []
        , label [ for "checkbox3" ] [ input [ id "checkbox3", name "checkbox", type_ "checkbox" ] [], text "Choice C" ]
        ]


radioButtonsRenderer : Html msg
radioButtonsRenderer =
    div []
        [ label [ for "radio1" ] [ input [ id "radio1", name "radio", type_ "radio", checked True ] [], text "Option 1" ]
        , br [] []
        , label [ for "radio2" ] [ input [ id "radio2", name "radio", type_ "radio" ] [], text "Option 2" ]
        , br [] []
        , label [ for "radio3" ] [ input [ id "radio3", name "radio", type_ "radio" ] [], text "Option 3" ]
        ]


textareasRenderer : Html msg
textareasRenderer =
    div []
        [ p []
            [ label [ for "textarea" ] [ text "Textarea" ]
            , br [] []
            , textarea [ id "textarea", rows 8, cols 48, placeholder "Enter your message here" ] []
            ]
        ]


html5InputsRenderer : Html msg
html5InputsRenderer =
    div []
        [ p []
            [ label [ for "ic" ] [ text "Color input" ]
            , br [] []
            , input [ type_ "color", id "ic", value "#000000" ] []
            ]
        , p []
            [ label [ for "in" ] [ text "Number input" ]
            , br [] []
            , input [ type_ "number", id "in", Attributes.min "0", Attributes.max "10", value "5" ] []
            ]
        , p []
            [ label [ for "ir" ] [ text "Range input" ]
            , br [] []
            , input [ type_ "range", id "ir", value "10" ] []
            ]
        , p []
            [ label [ for "idd" ] [ text "Date input" ]
            , br [] []
            , input [ type_ "date", id "idd", value "1970-01-01" ] []
            ]
        , p []
            [ label [ for "idm" ] [ text "Month input" ]
            , br [] []
            , input [ type_ "month", id "idm", value "1970-01" ] []
            ]
        , p []
            [ label [ for "idw" ] [ text "Week input" ]
            , br [] []
            , input [ type_ "week", id "idw", value "1970-W01" ] []
            ]
        , p []
            [ label [ for "idt" ] [ text "Datetime input" ]
            , br [] []
            , input [ type_ "datetime", id "idt", value "1970-01-01T00:00:00Z" ] []
            ]
        , p []
            [ label [ for "idtl" ] [ text "Datetime-local input" ]
            , br [] []
            , input [ type_ "datetime-local", id "idtl", value "1970-01-01T00:00" ] []
            ]
        , p []
            [ label [ for "idl" ] [ text "Datalist" ]
            , br [] []
            , input [ type_ "text", id "idl", Attributes.list "example-list" ] []
            , datalist [ id "example-list" ]
                [ option [ value "Example #1" ] []
                , option [ value "Example #2" ] []
                , option [ value "Example #3" ] []
                ]
            ]
        ]


actionButtonsRenderer : Html msg
actionButtonsRenderer =
    div []
        [ p []
            [ input [ type_ "submit", value "<input type=submit>" ] []
            , input [ type_ "button", value "<input type=button>" ] []
            , input [ type_ "reset", value "<input type=reset>" ] []
            , input [ type_ "submit", value "<input disabled>", attribute "disabled" "" ] []
            ]
        , p []
            [ button [ type_ "submit" ] [ text "<button type=submit>" ]
            , button [ type_ "button" ] [ text "<button type=button>" ]
            , button [ type_ "reset" ] [ text "<button type=reset>" ]
            , button [ type_ "button", attribute "disabled" "" ] [ text "<button disabled>" ]
            ]
        ]


all : List Tag
all =
    [ Headings
    , Paragraphs
    , Blockquotes
    , Address
    , Lists
    , HorizontalRules
    , TabularData
    , Code
    , InlineElements

    -- , HtmlComments
    , Images
    , Audio
    , Video

    -- , Canvas
    , Meter
    , Progress
    , InlineSvg
    , IFrames
    , InputFields
    , SelectMenus
    , Checkboxes
    , RadioButtons
    , Textareas
    , Html5Inputs
    , ActionButtons
    ]
