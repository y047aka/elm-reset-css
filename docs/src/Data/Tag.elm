module Data.Tag exposing (Tag(..), all, fromString, render, toString)

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (href, type_)


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
    | HtmlComments
    | Images
    | Audio
    | Video
    | Canvas
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

        "HtmlComments" ->
            HtmlComments

        "Images" ->
            Images

        "Audio" ->
            Audio

        "Video" ->
            Video

        "Canvas" ->
            Canvas

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

        HtmlComments ->
            "HtmlComments"

        Images ->
            "Images"

        Audio ->
            "Audio"

        Video ->
            "Video"

        Canvas ->
            "Canvas"

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


render : Tag -> Html msg
render tag =
    div [] <|
        case tag of
            Headings ->
                [ h1 [] [ text "Heading 1" ]
                , h2 [] [ text "Heading 2" ]
                , h3 [] [ text "Heading 3" ]
                , h4 [] [ text "Heading 4" ]
                , h5 [] [ text "Heading 5" ]
                , h6 [] [ text "Heading 6" ]
                ]

            Paragraphs ->
                [ p [] [ text "A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose." ] ]

            Blockquotes ->
                [ blockquote []
                    [ p [] [ text "A block quotation (also known as a long quotation or extract) is a quotation in a written document, that is set off from the main text as a paragraph, or block of text." ]
                    , p [] [ text "It is typically distinguished visually using indentation and a different typeface or smaller size quotation. It may or may not include a citation, usually placed at the bottom." ]
                    , cite [] [ a [ href "#!" ] [ text "Said no one, ever." ] ]
                    ]
                ]

            Address ->
                [ text "" ]

            Lists ->
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
                                    , li []
                                        [ text "List Item 2"
                                        , ol [ type_ "I" ]
                                            [ li [] [ text "List Item 1" ]
                                            , li []
                                                [ text "List Item 2"
                                                , ol [ type_ "i" ]
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
                            , li [] [ text "List Item 3" ]
                            ]
                        ]
                    , li [] [ text "List Item 3" ]
                    ]
                ]

            HorizontalRules ->
                [ hr [] [] ]

            TabularData ->
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

            Code ->
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

            InlineElements ->
                [ text "" ]

            HtmlComments ->
                [ text "" ]

            Images ->
                [ text "" ]

            Audio ->
                [ text "" ]

            Video ->
                [ text "" ]

            Canvas ->
                [ text "" ]

            Meter ->
                [ text "" ]

            Progress ->
                [ text "" ]

            InlineSvg ->
                [ text "" ]

            IFrames ->
                [ text "" ]

            InputFields ->
                [ text "" ]

            SelectMenus ->
                [ text "" ]

            Checkboxes ->
                [ text "" ]

            RadioButtons ->
                [ text "" ]

            Textareas ->
                [ text "" ]

            Html5Inputs ->
                [ text "" ]

            ActionButtons ->
                [ text "" ]


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
    , HtmlComments
    , Images
    , Audio
    , Video
    , Canvas
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
