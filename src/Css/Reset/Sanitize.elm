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
        , accessibility
        ]



{- Document
   ==========================================================================
-}


document : List Snippet
document =
    [ -- 1. Add border box sizing in all browsers (opinionated).
      -- 2. Backgrounds do not repeat by default (opinionated).
      each
        [ selector "::before"
        , selector "::after"
        ]
        [ boxSizing borderBox -- 1
        , backgroundRepeat noRepeat --2
        ]

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
       3. Breaks words to prevent overflow in all browsers (opinionated).
       4. Use a 4-space tab width in all browsers (opinionated).
       5. Remove the grey highlight on links in iOS (opinionated).
       6. Prevent adjustments of font size after orientation changes in iOS.
    -}
    , selector ":where(:root)"
        [ cursor default -- 1
        , lineHeight (num 1.5) -- 2
        , property "overflow-wrap" "break-word" -- 3
        , property "-moz-tab-size" "4" -- 4
        , property "tab-size" "4" -- 4
        , property "-webkit-tap-highlight-color" "transparent" -- 5
        , property "-webkit-text-size-adjust" "100%" -- 6
        ]
    ]



{- Sections
   ==========================================================================
-}


sections : List Snippet
sections =
    [ -- Remove the margin in all browsers (opinionated).
      selector ":where(body)"
        [ margin zero ]

    {- Correct the font size and margin on `h1` elements within `section` and
       `article` contexts in Chrome, Edge, Firefox, and Safari.
    -}
    , selector ":where(h1)"
        [ fontSize (Css.em 2)
        , margin2 (Css.em 0.67) zero
        ]
    ]



{- Grouping content
   ==========================================================================
-}


groupingContent : List Snippet
groupingContent =
    [ -- Remove the margin on nested lists in Chrome, Edge, and Safari.
      selector ":where(dl, ol, ul) :where(dl, ol, ul)"
        [ margin zero ]

    {- 1. Correct the inheritance of border color in Firefox.
       2. Add the correct box sizing in Firefox.
    -}
    , selector ":where(hr)"
        [ color inherit -- 1
        , height zero -- 2
        ]

    -- Remove the list style on navigation lists in all browsers (opinionated).
    , selector ":where(nav) :where(ol, ul)"
        [ property "list-style-type" "none"
        , padding zero
        ]

    -- Prevent VoiceOver from ignoring list semantics in Safari (opinionated).
    , selector ":where(nav li)::before"
        [ property "content" "\\200B"
        , float left
        ]

    {- 1. Correct the inheritance and scaling of font size in all browsers.
       2. Correct the odd `em` font sizing in all browsers.
       3. Prevent overflow of the container in all browsers (opinionated).
    -}
    , selector ":where(pre)"
        [ fontFamilies [ monospace.value, monospace.value ] -- 1
        , fontSize (Css.em 1) -- 2
        , overflow auto -- 3
        ]
    ]



{- Text-level semantics
   ==========================================================================
-}


textLevelSemantics : List Snippet
textLevelSemantics =
    [ -- Add the correct text decoration in Safari.
      selector ":where(abbr[title])"
        [ textDecoration underline
        , textDecoration2 underline dotted
        ]

    -- Add the correct font weight in Chrome, Edge, and Safari.
    , selector ":where(b, strong)"
        [ fontWeight bolder ]

    -- 1. Correct the inheritance and scaling of font size in all browsers.
    -- 2. Correct the odd `em` font sizing in all browsers.
    , selector ":where(code, kbd, samp)"
        [ fontFamilies [ monospace.value, monospace.value ] -- 1
        , fontSize (Css.em 1) -- 2
        ]

    -- Add the correct font size in all browsers.
    , selector ":where(small)"
        [ fontSize (pct 80) ]
    ]



{- Embedded content
   ========================================================================== */
-}


embeddedContent : List Snippet
embeddedContent =
    [ -- Change the alignment on media elements in all browsers (opinionated).
      selector ":where(audio, canvas, iframe, img, svg, video)"
        [ verticalAlign middle ]

    -- Remove the border on iframes in all browsers (opinionated).
    , selector ":where(iframe)"
        [ borderStyle none ]

    -- Change the fill color to match the text color in all browsers (opinionated).
    , selector ":where(svg:not([fill]))"
        [ property "fill" "currentColor" ]
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
      selector ":where(table)"
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
      selector ":where(button, input, select)"
        [ margin zero ]

    -- Correct the inability to style buttons in iOS and Safari.
    , selector """:where(button, [type="button" i], [type="reset" i], [type="submit" i])"""
        [ property "-webkit-appearance" "button" ]

    -- Change the inconsistent appearance in all browsers (opinionated).
    , selector ":where(fieldset)"
        [ border3 (px 1) solid (hex "#a0a0a0") ]

    -- Add the correct vertical alignment in Chrome, Edge, and Firefox.
    , selector ":where(progress)"
        [ verticalAlign baseline ]

    {- 1. Remove the margin in Firefox and Safari.
       3. Change the resize direction in all browsers (opinionated).
    -}
    , selector ":where(textarea)"
        [ margin zero -- 1
        , resize vertical -- 3
        ]

    -- 1. Correct the odd appearance in Chrome, Edge, and Safari.
    -- 2. Correct the outline style in Safari.
    , selector """:where([type="search" i])"""
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
    ]



{- Interactive
   ========================================================================== */
-}


interactive : List Snippet
interactive =
    [ -- Add the correct styles in Safari.
      selector ":where(dialog)"
        [ property "background-color" "white"
        , property "border" "solid"
        , property "color" "black"
        , property "height" "-moz-fit-content"
        , property "height" "fit-content"
        , left zero
        , margin auto
        , padding (Css.em 1)
        , position absolute
        , right zero
        , property "width" "-moz-fit-content"
        , property "width" "fit-content"
        ]
    , selector ":where(dialog:not([open]))"
        [ display none ]

    -- Add the correct display in Safari.
    , selector ":where(details > summary:first-of-type)"
        [ display listItem ]
    ]



{- Accessibility
   ========================================================================== */
-}


accessibility : List Snippet
accessibility =
    [ -- Change the cursor on busy elements in all browsers (opinionated).
      selector """:where([aria-busy="true" i])"""
        [ cursor Css.progress ]

    -- Change the cursor on control elements in all browsers (opinionated).
    , selector ":where([aria-controls])"
        [ cursor pointer ]

    {- Change the cursor on disabled, not-editable, or otherwise
       inoperable elements in all browsers (opinionated).
    -}
    , selector """:where([aria-disabled="true" i], [disabled])"""
        [ cursor notAllowed ]

    {- Change the display on visually hidden accessible elements
       in all browsers (opinionated).
    -}
    , selector """:where([aria-hidden="false" i][hidden])"""
        [ display initial ]
    , selector """:where([aria-hidden="false" i][hidden]:not(:focus))"""
        [ property "clip" "rect(0, 0, 0, 0)"
        , position absolute
        ]
    ]
