module Css.Reset.Ress exposing (snippets)

{-| ress which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).

@docs snippets

-}

import Css exposing (..)
import Css.Global exposing (..)


{-| Compile it with your elm-css code.
-}
snippets : List Snippet
snippets =
    {- ress.css • v4.0.0
       MIT License
       github.com/filipelinhares/ress
    -}
    List.concat
        [ grobalSelectors
        , generalElements
        , forms
        , specifyMediaElementStyle
        , accessibility
        ]



-- =================================================================
-- Global selectors
-- =================================================================


grobalSelectors : List Snippet
grobalSelectors =
    [ html
        [ boxSizing borderBox
        , property "-webkit-text-size-adjust" "100%" -- Prevent adjustments of font size after orientation changes in iOS
        , property "word-break" "normal"
        , property "-moz-tab-size" "4"
        , property "tab-size" "4"
        ]
    , each
        [ everything
        , selector "::before"
        , selector "::after"
        ]
        [ backgroundRepeat noRepeat -- Set `background-repeat: no-repeat` to all elements and pseudo elements
        , boxSizing inherit
        ]
    , each
        [ selector "::before"
        , selector "::after"
        ]
        [ textDecoration inherit -- Inherit text-decoration and vertical align to ::before and ::after pseudo elements
        , property "vertical-align" "inherit"
        ]
    , everything
        [ padding zero -- Reset `padding` and `margin` of all elements
        , margin zero
        ]
    ]



-- =================================================================
-- General elements
-- =================================================================


generalElements : List Snippet
generalElements =
    [ hr
        [ overflow visible -- Show the overflow in Edge and IE
        , height zero -- Add the correct box sizing in Firefox
        , color inherit -- Correct border color in Firefox.
        ]
    , each
        [ details, main_ ]
        [ display block -- Render the `main` element consistently in IE.
        ]
    , summary
        [ display listItem -- Add the correct display in all browsers
        ]
    , Css.Global.small
        [ fontSize (pct 80) -- Set font-size to 80% in `small` elements
        ]
    , selector "[hidden]"
        [ display none -- Add the correct display in IE
        ]
    , selector "abbr[title]"
        [ property "border-bottom" "none" -- Remove the bottom border in Chrome 57

        -- Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari
        , textDecoration underline
        , textDecoration2 underline dotted
        ]
    , a
        [ backgroundColor transparent -- Remove the gray background on active links in IE 10
        ]
    , each
        [ selector "a:active"
        , selector "a:hover"
        ]
        [ outlineWidth zero -- Remove the outline when hovering in all browsers
        ]
    , each
        [ code
        , typeSelector "kbd"
        , Css.Global.pre
        , typeSelector "samp"
        ]
        [ fontFamilies [ monospace.value, monospace.value ] --/* Specify the font family of code elements
        ]
    , Css.Global.pre
        [ fontSize (Css.em 1) -- Correct the odd `em` font sizing in all browsers
        ]
    , each
        [ typeSelector "b"
        , strong
        ]
        [ fontWeight bolder -- Add the correct font weight in Chrome, Edge, and Safari
        ]

    -- https://gist.github.com/unruthless/413930
    , each
        [ typeSelector "sub"
        , typeSelector "sup"
        ]
        [ fontSize (pct 75)
        , lineHeight zero
        , position relative
        , verticalAlign baseline
        ]
    , typeSelector "sub"
        [ bottom (Css.em -0.25) ]
    , typeSelector "sup"
        [ top (Css.em -0.5) ]
    , Css.Global.table
        [ borderColor inherit -- Correct border color in all Chrome, Edge, and Safari.
        , textIndent zero -- Remove text indentation in Chrome, Edge, and Safari
        ]
    ]



-- =================================================================
-- Forms
-- =================================================================


forms : List Snippet
forms =
    [ input
        [ borderRadius zero ]

    -- Replace pointer cursor in disabled elements
    , selector "[disabled]"
        [ cursor default ]
    , each
        [ selector "[type='number']::-webkit-inner-spin-button"
        , selector "[type='number']::-webkit-outer-spin-button"
        ]
        [ height auto -- Correct the cursor style of increment and decrement buttons in Chrome
        ]
    , selector "[type='search']"
        [ property "-webkit-appearance" "textfield" -- Correct the odd appearance in Chrome and Safari
        , outlineOffset (px -2) -- Correct the outline style in Safari
        , pseudoElement "-webkit-search-decoration"
            [ property "-webkit-appearance" "none" -- Remove the inner padding in Chrome and Safari on macOS
            ]
        ]
    , textarea
        [ overflow auto -- Internet Explorer 11+
        , resize vertical -- Specify textarea resizability
        ]
    , each
        [ button
        , input
        , optgroup
        , select
        , textarea
        ]
        [ property "font" "inherit" -- Specify font inheritance of form elements
        ]
    , optgroup
        [ fontWeight bold -- Restore the font weight unset by the previous rule
        ]
    , button
        [ overflow visible -- Address `overflow` set to `hidden` in IE 8/9/10/11
        ]
    , each
        [ button
        , select
        ]
        [ textTransform none -- Firefox 40+, Internet Explorer 11-
        ]

    -- Apply cursor pointer to button elements
    , each
        [ button
        , selector "[type='button']"
        , selector "[type='reset']"
        , selector "[type='submit']"
        , selector "[role='button']"
        ]
        [ cursor pointer
        , color inherit
        ]

    -- Remove inner padding and border in Firefox 4+
    , each
        [ selector "button::-moz-focus-inner"
        , selector "[type='button']::-moz-focus-inner"
        , selector "[type='reset']::-moz-focus-inner"
        , selector "[type='submit']::-moz-focus-inner"
        ]
        [ borderStyle none
        , padding zero
        ]

    -- Replace focus style removed in the border reset above
    , each
        [ selector "button:-moz-focusring"
        , selector "[type='button']::-moz-focus-inner"
        , selector "[type='reset']::-moz-focus-inner"
        , selector "[type='submit']::-moz-focus-inner"
        ]
        [ property "outline" "1px dotted ButtonText"
        ]
    , each
        [ button
        , selector "html [type='button']" -- Prevent a WebKit bug where (2) destroys native `audio` and `video`controls in Android 4
        , selector "[type='reset']"
        , selector "[type='submit']"
        ]
        [ property "-webkit-appearance" "button" -- Correct the inability to style clickable types in iOS
        ]

    -- Remove the default button styling in all browsers
    , each
        [ button
        , input
        , select
        , textarea
        ]
        [ backgroundColor transparent
        , borderStyle none
        ]
    , each
        [ selector "a:focus"
        , selector "button:focus"
        , selector "input:focus"
        , selector "select:focus"
        , selector "textarea:focus"
        ]
        [ outlineWidth zero ]

    -- Style select like a standard input
    , select
        [ property "-moz-appearance" "none" -- Firefox 36+
        , property "-webkit-appearance" "none" -- Chrome 41+
        , pseudoElement "-ms-expand"
            [ display none -- Internet Explorer 11+
            ]
        , pseudoElement "-ms-value"
            [ color currentColor -- Internet Explorer 11+
            ]
        ]
    , legend
        [ border zero -- Correct `color` not being inherited in IE 8/9/10/11
        , color inherit -- Correct the color inheritance from `fieldset` elements in IE
        , display Css.table -- Correct the text wrapping in Edge and IE
        , maxWidth (pct 100) -- Correct the text wrapping in Edge and IE
        , whiteSpace normal -- Correct the text wrapping in Edge and IE
        , maxWidth (pct 100) -- Correct the text wrapping in Edge 18- and IE
        ]
    , selector "::-webkit-file-upload-button"
        [ -- Correct the inability to style clickable types in iOS and Safari
          property "-webkit-appearance" "button"
        , color inherit
        , property "font" "inherit" -- Change font properties to `inherit` in Chrome and Safari
        ]
    ]



-- =================================================================
-- Specify media element style
-- =================================================================


specifyMediaElementStyle : List Snippet
specifyMediaElementStyle =
    [ img
        [ borderStyle none -- Remove border when inside `a` element in IE 8/9/10
        ]

    -- Add the correct vertical alignment in Chrome, Firefox, and Opera
    , Css.Global.progress
        [ verticalAlign baseline ]
    ]



-- =================================================================
-- Accessibility
-- =================================================================


accessibility : List Snippet
accessibility =
    [ --  Specify the progress cursor of updating elements
      selector "[aria-busy='true']"
        [ cursor Css.progress ]

    -- Specify the pointer cursor of trigger elements
    , selector "[aria-controls]"
        [ cursor pointer ]

    -- Specify the unstyled cursor of disabled, not-editable, or otherwise inoperable elements
    , selector "[aria-disabled='true']"
        [ cursor default ]
    ]
