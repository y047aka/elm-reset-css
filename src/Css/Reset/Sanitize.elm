module Css.Reset.Sanitize exposing (sanitize)

{-| sanitize.css which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).

@docs sanitize

-}

import Css exposing (..)
import Css.Global exposing (..)


{-| Compile it with your elm-css code.
-}
sanitize : List Snippet
sanitize =
    List.concat
        [ document
        , sections
        , groupingContent
        , textLevelSemantics
        , embeddedContent
        , tabularData
        , forms
        , interactive
        , scripting
        , userInteraction
        , accessibility
        ]



{- Document
   ==========================================================================
-}


document : List Snippet
document =
    [ -- Add border box sizing in all browsers (opinionated).
      each
        [ selector "::before"
        , selector "::after"
        ]
        [ boxSizing borderBox ]

    -- 1. Add text decoration inheritance in all browsers (opinionated).
    -- 2. Add vertical alignment inheritance in all browsers (opinionated).
    , each
        [ selector "::before"
        , selector "::after"
        ]
        [ textDecoration inherit -- 1
        , property "vertical-align" "inherit" -- 2
        ]

    {- 1. Use the default cursor in all browsers (opinionated).
       2. Change the line height in all browsers (opinionated).
       3. Use a 4-space tab width in all browsers (opinionated).
       4. Remove the grey highlight on links in iOS (opinionated).
       5. Prevent adjustments of font size after orientation changes in
          IE on Windows Phone and in iOS.
       6. Breaks words to prevent overflow in all browsers (opinionated).
    -}
    , html
        [ cursor default -- 1
        , lineHeight (num 1.5) -- 2
        , property "-moz-tab-size" "4" -- 3
        , property "tab-size" "4" -- 3
        , property "-webkit-tap-highlight-color" "transparent" -- 4
        , property "-ms-text-size-adjust" "100%" -- 5
        , property "-webkit-text-size-adjust" "100%" -- 5
        , property "word-break" "break-word" -- 6
        ]
    ]



{- Sections
   ==========================================================================
-}


sections : List Snippet
sections =
    [ -- Remove the margin in all browsers (opinionated).
      body
        [ margin zero ]

    {- Correct the font size and margin on `h1` elements within `section` and
       `article` contexts in Chrome, Edge, Firefox, and Safari.
    -}
    , h1
        [ fontSize (Css.em 2)
        , margin2 (Css.em 0.67) zero
        ]
    ]



{- Grouping content
   ==========================================================================
-}


groupingContent : List Snippet
groupingContent =
    [ -- Remove the margin on nested lists in Chrome, Edge, IE, and Safari.
      each
        [ selector "dl dl"
        , selector "dl ol"
        , selector "dl ul"
        , selector "ol dl"
        , selector "ul dl"
        ]
        [ margin zero ]

    -- Remove the margin on nested lists in Edge 18- and IE.
    , each
        [ selector "ol ol"
        , selector "ol ul"
        , selector "ul ol"
        , selector "ul ul"
        ]
        [ margin zero ]

    {- 1. Correct the inheritance of border color in Firefox.
       2. Add the correct box sizing in Firefox.
       3. Show the overflow in Edge 18- and IE.
    -}
    , hr
        [ color inherit -- 1
        , height zero -- 2
        , overflow visible -- 3
        ]

    -- Add the correct display in IE.
    , main_
        [ display block ]

    -- Remove the list style on navigation lists in all browsers (opinionated).
    , each
        [ selector "nav ol"
        , selector "nav ul"
        ]
        [ listStyle none
        , padding zero
        ]

    -- Prevent VoiceOver from ignoring list semantics in Safari (opinionated).
    , selector "nav li::before"
        [ property "content" "\\200B" ]

    {- 1. Correct the inheritance and scaling of font size in all browsers.
       2. Correct the odd `em` font sizing in all browsers.
       3. Prevent overflow of the container in all browsers (opinionated).
    -}
    , Css.Global.pre
        [ fontFamilies [ monospace.value, monospace.value ] -- 1
        , fontSize (Css.em 1) -- 2
        , overflow auto -- 3
        , property "-ms-overflow-style" "scrollbar" -- 3
        ]
    ]



{- Text-level semantics
   ==========================================================================
-}


textLevelSemantics : List Snippet
textLevelSemantics =
    [ -- Remove the gray background on active links in IE 10.
      a
        [ backgroundColor transparent ]

    -- Add the correct text decoration in Edge 18-, IE, and Safari.
    , selector "abbr[title]"
        [ textDecoration underline
        , textDecoration2 underline dotted
        ]

    -- Add the correct font weight in Chrome, Edge, and Safari.
    , each
        [ typeSelector "b"
        , strong
        ]
        [ fontWeight bolder ]

    -- 1. Correct the inheritance and scaling of font size in all browsers.
    -- 2. Correct the odd `em` font sizing in all browsers.
    , each
        [ code
        , typeSelector "kbd"
        , typeSelector "samp"
        ]
        [ fontFamilies [ monospace.value, monospace.value ] -- 1
        , fontSize (Css.em 1) -- 2
        ]

    -- Add the correct font size in all browsers.
    , Css.Global.small
        [ fontSize (pct 80) ]
    ]



{- Embedded content
   ========================================================================== */
-}


embeddedContent : List Snippet
embeddedContent =
    [ -- Change the alignment on media elements in all browsers (opinionated).
      each
        [ audio
        , canvas
        , typeSelector "iframe"
        , img
        , svg
        , video
        ]
        [ verticalAlign middle ]

    -- Add the correct display in IE 9-.
    , each
        [ audio
        , video
        ]
        [ display inlineBlock ]

    -- Add the correct display in iOS 4-7.
    , selector "audio:not([controls])"
        [ display none
        , height zero
        ]

    -- Remove the border on iframes in all browsers (opinionated).
    , typeSelector "iframe"
        [ borderStyle none ]

    -- Remove the border on images inside links in IE 10-.
    , img
        [ borderStyle none ]

    -- Change the fill color to match the text color in all browsers (opinionated).
    , selector "svg:not([fill])"
        [ property "fill" "currentColor" ]

    -- Hide the overflow in IE.
    , selector "svg:not(:root)"
        [ overflow hidden ]
    ]



{- Tabular data
   ========================================================================== */
-}


tabularData : List Snippet
tabularData =
    [ {- 1. Collapse border spacing in all browsers (opinionated).
         2. Correct table border color inheritance in all Chrome, Edge, and Safari.
         3. Remove text indentation from table contents in Chrome, Edge, and Safari.
      -}
      Css.Global.table
        [ borderCollapse collapse -- 1
        , borderColor inherit -- 2
        , textIndent zero -- 3
        ]
    ]



{- Forms
   ========================================================================== */
-}


forms : List Snippet
forms =
    [ -- Remove the margin on controls in Safari.
      each
        [ button
        , input
        , select
        ]
        [ margin zero ]

    -- 1. Show the overflow in IE.
    -- 2. Remove the inheritance of text transform in Edge 18-, Firefox, and IE.
    , button
        [ overflow visible -- 1
        , property "text-transform" "none" -- 2
        ]

    -- Correct the inability to style buttons in iOS and Safari.
    , each
        [ button
        , selector "[type=\"button\"]"
        , selector "[type=\"reset\"]"
        , selector "[type=\"submit\"]"
        ]
        [ property "-webkit-appearance" "button"
        ]

    -- 1. Change the inconsistent appearance in all browsers (opinionated).
    -- 2. Correct the padding in Firefox.
    , fieldset
        [ border3 (px 1) solid (hex "#a0a0a0") -- 1
        , padding3 (Css.em 0.35) (Css.em 0.75) (Css.em 0.625) -- 2
        ]

    -- Show the overflow in Edge 18- and IE.
    , input
        [ overflow visible ]

    -- 1. Correct the text wrapping in Edge 18- and IE.
    -- 2. Correct the color inheritance from `fieldset` elements in IE.
    , legend
        [ color inherit -- 2
        , display Css.table -- 1
        , maxWidth (pct 100) -- 1
        , whiteSpace normal -- 1
        ]

    -- 1. Add the correct display in Edge 18- and IE.
    -- 2. Add the correct vertical alignment in Chrome, Edge, and Firefox.
    , Css.Global.progress
        [ display inlineBlock -- 1
        , verticalAlign baseline -- 2
        ]

    -- Remove the inheritance of text transform in Firefox.
    , select
        [ property "text-transform" "none" ]

    {- 1. Remove the margin in Firefox and Safari.
       2. Remove the default vertical scrollbar in IE.
       3. Change the resize direction in all browsers (opinionated).
    -}
    , textarea
        [ margin zero -- 1
        , overflow auto -- 2
        , resize vertical -- 3
        , property "resize" "block" -- 3
        ]

    -- Remove the padding in IE 10-.
    , each
        [ selector "[type=\"checkbox\"]"
        , selector "[type=\"radio\"]"
        ]
        [ padding zero ]

    -- 1. Correct the odd appearance in Chrome, Edge, and Safari.
    -- 2. Correct the outline style in Safari.
    , selector "[type=\"search\"]"
        [ property "-webkit-appearance" "textfield" -- 1
        , outlineOffset (px -2) -- 2
        ]

    -- Correct the cursor style of increment and decrement buttons in Safari.
    , each
        [ selector "::-webkit-inner-spin-button"
        , selector "::-webkit-outer-spin-button"
        ]
        [ height auto ]

    -- Correct the text style of placeholders in Chrome, Edge, and Safari.
    , selector "::-webkit-input-placeholder"
        [ color inherit
        , opacity (num 0.54)
        ]

    -- Remove the inner padding in Chrome, Edge, and Safari on macOS.
    , selector "::-webkit-search-decoration"
        [ property "-webkit-appearance" "none" ]

    -- 1. Correct the inability to style upload buttons in iOS and Safari.
    -- 2. Change font properties to `inherit` in Safari.
    , selector "::-webkit-file-upload-button"
        [ property "-webkit-appearance" "button" -- 1
        , property "font" "inherit" -- 2
        ]

    -- Remove the inner border and padding of focus outlines in Firefox.
    , selector "::-moz-focus-inner"
        [ borderStyle none
        , padding zero
        ]

    -- Restore the focus outline styles unset by the previous rule in Firefox.
    , selector ":-moz-focusring"
        [ property "outline" "1px dotted ButtonText" ]

    -- Remove the additional :invalid styles in Firefox.
    , selector ":-moz-ui-invalid"
        [ boxShadow none ]
    ]



{- Interactive
   ========================================================================== */
-}


interactive : List Snippet
interactive =
    [ -- Add the correct display in Edge 18- and IE.
      details
        [ display block ]

    -- Add the correct styles in Edge 18-, IE, and Safari.
    , typeSelector "dialog"
        [ property "background-color" "white"
        , property "border" "solid"
        , property "color" "black"
        , display block
        , property "height" "-moz-fit-content"
        , property "height" "-webkit-fit-content"
        , property "height" "fit-content"
        , left zero
        , margin auto
        , padding (Css.em 1)
        , position absolute
        , right zero
        , property "width" "-moz-fit-content"
        , property "width" "-webkit-fit-content"
        , property "width" "fit-content"
        ]
    , selector "dialog:not([open])"
        [ display none ]

    -- Add the correct display in all browsers.
    , summary
        [ display listItem ]
    ]



{- Scripting
   ========================================================================== */
-}


scripting : List Snippet
scripting =
    [ -- Add the correct display in IE 9-.
      canvas
        [ display inlineBlock ]

    -- Add the correct display in IE.
    , typeSelector "template"
        [ display none ]
    ]



{- User interaction
   ========================================================================== */
-}


userInteraction : List Snippet
userInteraction =
    [ -- Remove the tapping delay in IE 10.
      each
        [ a
        , typeSelector "area"
        , button
        , input
        , label
        , select
        , summary
        , textarea
        , selector "[tabindex]"
        ]
        [ property "-ms-touch-action" "manipulation" ]

    -- Add the correct display in IE 10-.
    , selector "[hidden]"
        [ display none ]
    ]



{- Accessibility
   ========================================================================== */
-}


accessibility : List Snippet
accessibility =
    [ -- Change the cursor on busy elements in all browsers (opinionated).
      selector "[aria-busy=\"true\"]"
        [ cursor Css.progress ]

    -- Change the cursor on control elements in all browsers (opinionated).
    , selector "[aria-controls]"
        [ cursor pointer ]

    {- Change the cursor on disabled, not-editable, or otherwise
       inoperable elements in all browsers (opinionated).
    -}
    , each
        [ selector "[aria-disabled=\"true\"]"
        , selector "[disabled]"
        ]
        [ cursor notAllowed ]

    {- Change the display on visually hidden accessible elements
       in all browsers (opinionated).
    -}
    , selector "[aria-hidden=\"false\"][hidden]"
        [ display initial ]
    , selector "[aria-hidden=\"false\"][hidden]:not(:focus)"
        [ property "clip" "rect(0, 0, 0, 0)"
        , position absolute
        ]
    ]
