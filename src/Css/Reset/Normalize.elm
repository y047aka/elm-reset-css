module Css.Reset.Normalize exposing (snippets)

{-| Normalize.css which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).

@docs snippets

-}

import Css exposing (..)
import Css.Global exposing (..)


{-| Compile it with your elm-css code.
-}
snippets : List Snippet
snippets =
    -- normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css
    List.concat
        [ document
        , sections
        , groupingContent
        , textLevelSemantics
        , embeddedContent
        , forms
        , interactive
        , misc
        ]



{- Document
   ==========================================================================
-}


document : List Snippet
document =
    -- 1. Correct the line height in all browsers.
    -- 2. Prevent adjustments of font size after orientation changes in iOS.
    [ html
        [ lineHeight (num 1.15) -- 1
        , property "-webkit-text-size-adjust" "100%" -- 2
        ]
    ]



{- Sections
   ==========================================================================
-}


sections : List Snippet
sections =
    [ -- Remove the margin in all browsers.
      body
        [ margin zero ]

    -- Render the `main` element consistently in IE.
    , main_
        [ display block ]

    {- Correct the font size and margin on `h1` elements within `section` and
       `article` contexts in Chrome, Firefox, and Safari.
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
    [ -- 1. Add the correct box sizing in Firefox.
      -- 2. Show the overflow in Edge and IE.
      hr
        [ boxSizing contentBox -- 1
        , height zero -- 1
        , overflow visible -- 2
        ]

    -- 1. Correct the inheritance and scaling of font size in all browsers.
    -- 2. Correct the odd `em` font sizing in all browsers.
    , Css.Global.pre
        [ fontFamilies [ monospace.value, monospace.value ] -- 1
        , fontSize (Css.em 1) -- 2
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

    -- 1. Remove the bottom border in Chrome 57-
    -- 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
    , selector "abbr[title]"
        [ property "border-bottom" "none" -- 1
        , textDecoration underline -- 2
        , textDecoration2 underline dotted -- 2
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

    {- Prevent `sub` and `sup` elements from affecting the line height in
       all browsers.
    -}
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
    ]



{- Embedded content
   ========================================================================== */
-}


embeddedContent : List Snippet
embeddedContent =
    [ -- Remove the border on images inside links in IE 10-.
      img
        [ borderStyle none ]
    ]



{- Forms
   ========================================================================== */
-}


forms : List Snippet
forms =
    [ -- 1. Change the font styles in all browsers.
      -- 2. Remove the margin in Firefox and Safari.
      each
        [ button
        , input
        , optgroup
        , select
        , textarea
        ]
        [ fontFamily inherit -- 1
        , fontSize (pct 100) -- 1
        , lineHeight (num 1.15) -- 1
        , margin zero -- 2
        ]

    -- Show the overflow in IE.
    -- 1. Show the overflow in Edge.
    , each
        [ button
        , input -- 1
        ]
        [ overflow visible ]

    -- Remove the inheritance of text transform in Edge, Firefox, and IE.
    -- 1. Remove the inheritance of text transform in Firefox.
    , each
        [ button
        , select -- 1
        ]
        [ property "text-transform" "none" ]

    -- Correct the inability to style clickable types in iOS and Safari.
    , each
        [ button
        , selector "[type=\"button\"]"
        , selector "[type=\"reset\"]"
        , selector "[type=\"submit\"]"
        ]
        [ property "-webkit-appearance" "button" ]

    -- Remove the inner border and padding in Firefox.
    , each
        [ selector "button::-moz-focus-inner"
        , selector "[type=\"button\"]::-moz-focus-inner"
        , selector "[type=\"reset\"]::-moz-focus-inner"
        , selector "[type=\"submit\"]::-moz-focus-inner"
        ]
        [ borderStyle none
        , padding zero
        ]

    -- Restore the focus styles unset by the previous rule.
    , each
        [ selector "button:-moz-focusring"
        , selector "[type=\"button\"]:-moz-focusring"
        , selector "[type=\"reset\"]:-moz-focusring"
        , selector "[type=\"submit\"]:-moz-focusring"
        ]
        [ property "outline" "1px dotted ButtonText" ]

    -- Correct the padding in Firefox.
    , fieldset
        [ padding3 (Css.em 0.35) (Css.em 0.75) (Css.em 0.625) ]

    {- 1. Correct the text wrapping in Edge and IE.
       2. Correct the color inheritance from `fieldset` elements in IE.
       3. Remove the padding so developers are not caught out when they zero out
          `fieldset` elements in all browsers.
    -}
    , legend
        [ boxSizing borderBox -- 1
        , color inherit -- 2
        , display Css.table -- 1
        , maxWidth (pct 100) -- 1
        , padding zero -- 3
        , whiteSpace normal -- 1
        ]

    -- Add the correct vertical alignment in Chrome, Firefox, and Opera.
    , Css.Global.progress
        [ verticalAlign baseline ]

    -- Remove the default vertical scrollbar in IE 10+.
    , textarea
        [ overflow auto ]

    -- 1. Add the correct box sizing in IE 10.
    -- 2. Remove the padding in IE 10.
    , each
        [ selector "[type=\"checkbox\"]"
        , selector "[type=\"radio\"]"
        ]
        [ boxSizing borderBox -- 1
        , padding zero -- 2
        ]

    -- Correct the cursor style of increment and decrement buttons in Chrome.
    , each
        [ selector "[type=\"number\"]::-webkit-inner-spin-button"
        , selector "[type=\"number\"]::-webkit-outer-spin-button"
        ]
        [ height auto ]

    -- 1. Correct the odd appearance in Chrome and Safari.
    -- 2. Correct the outline style in Safari.
    , selector "[type=\"search\"]"
        [ property "-webkit-appearance" "textfield" -- 1
        , outlineOffset (px -2) -- 2
        ]

    -- Remove the inner padding in Chrome and Safari on macOS.
    , selector "[type=\"search\"]::-webkit-search-decoration"
        [ property "-webkit-appearance" "none" ]

    -- 1. Correct the inability to style clickable types in iOS and Safari.
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
    [ -- Add the correct display in Edge, IE 10+, and Firefox.
      details
        [ display block ]

    -- Add the correct display in all browsers.
    , summary
        [ display listItem ]
    ]



{- Misc
   ========================================================================== */
-}


misc : List Snippet
misc =
    [ -- Add the correct display in IE 10+.
      typeSelector "template"
        [ display none ]

    -- Add the correct display in IE 10.
    , selector "[hidden]"
        [ display none ]
    ]
