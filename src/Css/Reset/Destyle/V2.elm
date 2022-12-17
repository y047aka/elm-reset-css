module Css.Reset.Destyle.V2 exposing (snippets)

{-|

@docs snippets

-}

import Css exposing (..)
import Css.Global exposing (..)


{-| -}
snippets : List Snippet
snippets =
    -- destyle.css v2.0.2 | MIT License | https://github.com/nicolas-cusan/destyle.css
    List.concat
        [ resetBoxModelAndSetBorders
        , document
        , sections
        , verticalRhythm
        , headings
        , lists_enumeration
        , lists_definition
        , groupingContent
        , textLevelSemantics
        , embeddedContent
        , forms
        , interactive
        , table
        , misc
        ]



{- Reset box-model and set borders
   ============================================
-}


resetBoxModelAndSetBorders : List Snippet
resetBoxModelAndSetBorders =
    [ each
        [ everything
        , selector "::before"
        , selector "::after"
        ]
        [ boxSizing borderBox
        , borderStyle solid
        , borderWidth zero
        ]
    ]



{- Document
   ============================================
-}


document : List Snippet
document =
    [ {- 1. Correct the line height in all browsers.
         2. Prevent adjustments of font size after orientation changes in iOS.
         3. Remove gray overlay on links for iOS.
      -}
      html
        [ lineHeight (num 1.15) -- 1
        , property "-webkit-text-size-adjust" "100%" -- 2
        , property "-webkit-tap-highlight-color" "transparent" -- 3
        ]
    ]



{- Sections
   ============================================
-}


sections : List Snippet
sections =
    [ -- Remove the margin in all browsers.
      body
        [ margin zero ]

    -- Render the `main` element consistently in IE.
    , main_
        [ display block ]
    ]



{- Vertical rhythm
   ============================================
-}


verticalRhythm : List Snippet
verticalRhythm =
    [ each
        [ p
        , Css.Global.table
        , blockquote
        , typeSelector "address"
        , Css.Global.pre
        , typeSelector "iframe"
        , form
        , typeSelector "figure"
        , dl
        ]
        [ margin zero ]
    ]



{- Headings
   ============================================
-}


headings : List Snippet
headings =
    [ each
        [ h1
        , h2
        , h3
        , h4
        , h5
        , h6
        ]
        [ fontSize inherit
        , lineHeight inherit
        , fontWeight inherit
        , margin zero
        ]
    ]



{- Lists (enumeration)
   ============================================
-}


lists_enumeration : List Snippet
lists_enumeration =
    [ each
        [ ul
        , ol
        ]
        [ margin zero
        , padding zero
        , listStyle none
        ]
    ]



{- Lists (definition)
   ============================================
-}


lists_definition : List Snippet
lists_definition =
    [ dt
        [ fontWeight bold ]
    , dd
        [ marginLeft zero ]
    ]



{- Grouping content
   ============================================
-}


groupingContent : List Snippet
groupingContent =
    [ -- 1. Add the correct box sizing in Firefox.
      -- 2. Show the overflow in Edge and IE.
      hr
        [ boxSizing contentBox -- 1
        , height zero -- 1
        , overflow visible -- 2
        , borderTopWidth (px 1)
        , margin zero
        , property "clear" "both"
        , color inherit
        ]

    -- 1. Correct the inheritance and scaling of font size in all browsers.
    -- 2. Correct the odd `em` font sizing in all browsers.
    , Css.Global.pre
        [ fontFamilies [ monospace.value, monospace.value ] -- 1
        , fontSize inherit -- 2
        ]
    , typeSelector "address"
        [ fontStyle inherit ]
    ]



{- Text-level semantics
   ============================================
-}


textLevelSemantics : List Snippet
textLevelSemantics =
    [ -- Remove the gray background on active links in IE 10.
      a
        [ backgroundColor transparent
        , textDecoration none
        , color inherit
        ]

    -- 1. Remove the bottom border in Chrome 57-
    -- 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
    , selector "abbr[title]"
        [ textDecoration underline -- 2
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
        , fontSize inherit -- 2
        ]

    -- Add the correct font size in all browsers.
    , Css.Global.small
        [ fontSize (pct 80) ]

    -- Prevent `sub` and `sup` elements from affecting the line height in all browsers.
    , each
        [ typeSelector "sub"
        , typeSelector "sup"
        ]
        [ fontSize (pct 75)
        , lineHeight (num 0)
        , position relative
        , verticalAlign baseline
        ]
    , typeSelector "sub"
        [ bottom (Css.em -0.25) ]
    , typeSelector "sup"
        [ top (Css.em -0.5) ]
    ]



{- Embedded content
   ============================================
-}


embeddedContent : List Snippet
embeddedContent =
    [ -- Prevent vertical alignment issues.
      each
        [ img
        , typeSelector "embed"
        , typeSelector "object"
        , typeSelector "iframe"
        ]
        [ verticalAlign bottom ]
    ]



{- Forms
   ============================================
-}


forms : List Snippet
forms =
    [ -- Reset form fields to make them styleable
      each
        [ button
        , input
        , optgroup
        , select
        , textarea
        ]
        [ property "-webkit-appearance" "none"
        , property "appearance" "none"
        , verticalAlign middle
        , color inherit
        , property "font" "inherit"
        , property "background" "transparent"
        , padding zero
        , margin zero
        , outline zero
        , borderRadius zero
        , property "text-align" "inherit"
        ]

    -- Reset radio and checkbox appearance to preserve their look in iOS.
    , selector """[type="checkbox"]"""
        [ property "-webkit-appearance" "checkbox"
        , property "appearance" "checkbox"
        ]
    , selector """[type="radio"]"""
        [ property "-webkit-appearance" "radio"
        , property "appearance" "radio"
        ]

    -- Show the overflow in IE.
    -- 1. Show the overflow in Edge.
    , each
        [ button
        , input
        ]
        [ -- 1
          overflow visible
        ]

    -- Remove the inheritance of text transform in Edge, Firefox, and IE.
    -- 1. Remove the inheritance of text transform in Firefox.
    , each
        [ button
        , select
        ]
        [ -- 1
          textTransform none
        ]

    -- Correct the inability to style clickable types in iOS and Safari.
    , each
        [ button
        , selector """[type="button"]"""
        , selector """[type="reset"]"""
        , selector """[type="submit"]"""
        ]
        [ cursor pointer
        , property "-webkit-appearance" "none"
        , property "appearance" "none"
        ]
    , each
        [ selector "button[disabled]"
        , selector """[type="button"][disabled]"""
        , selector """[type="reset"][disabled]"""
        , selector """[type="submit"][disabled]"""
        ]
        [ cursor default ]

    -- Remove the inner border and padding in Firefox.
    , each
        [ selector "button::-moz-focus-inner"
        , selector """[type="button"]::-moz-focus-inner"""
        , selector """[type="reset"]::-moz-focus-inner"""
        , selector """[type="submit"]::-moz-focus-inner"""
        ]
        [ borderStyle none
        , padding zero
        ]

    -- Restore the focus styles unset by the previous rule.
    , each
        [ selector "button:-moz-focusring"
        , selector """[type="button"]:-moz-focusring"""
        , selector """[type="reset"]:-moz-focusring"""
        , selector """[type="submit"]:-moz-focusring"""
        ]
        [ property "outline" "1px dotted ButtonText" ]

    -- Remove arrow in IE10 & IE11
    , selector "select::-ms-expand"
        [ display none ]

    -- Remove padding
    , option
        [ padding zero ]

    -- Reset to invisible
    , fieldset
        [ margin zero
        , padding zero
        , minWidth zero
        ]

    {- 1. Correct the text wrapping in Edge and IE.
       2. Correct the color inheritance from `fieldset` elements in IE.
       3. Remove the padding so developers are not caught out when they zero out `fieldset` elements in all browsers.
    -}
    , legend
        [ color inherit -- 2
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

    -- Correct the cursor style of increment and decrement buttons in Chrome.
    , each
        [ selector """[type="number"]::-webkit-inner-spin-button"""
        , selector """[type="number"]::-webkit-outer-spin-button"""
        ]
        [ height auto ]

    -- 1. Correct the outline style in Safari.
    , selector """[type="search"]"""
        [ outlineOffset (px -2) -- 1
        ]

    -- Remove the inner padding in Chrome and Safari on macOS.
    , selector """[type="search"]::-webkit-search-decoration"""
        [ property "-webkit-appearance" "none" ]

    -- 1. Correct the inability to style clickable types in iOS and Safari.
    -- 2. Change font properties to `inherit` in Safari.
    , selector "::-webkit-file-upload-button"
        [ property "-webkit-appearance" "button" -- 1
        , property "font" "inherit" -- 2
        ]

    -- Clickable labels
    , selector "label[for]"
        [ cursor pointer ]
    ]



{- Interactive
   ============================================
-}


interactive : List Snippet
interactive =
    [ -- Add the correct display in Edge, IE 10+, and Firefox.
      details
        [ display block ]

    -- Add the correct display in all browsers.
    , summary
        [ display listItem ]

    -- Remove outline for editable content.
    , selector "[contenteditable]"
        [ outline none ]
    ]



{- Table
   ============================================
-}


table : List Snippet
table =
    [ Css.Global.table
        [ borderCollapse collapse
        , borderSpacing zero
        ]
    , caption
        [ textAlign left ]
    , each
        [ td
        , th
        ]
        [ verticalAlign top
        , padding zero
        ]
    , th
        [ textAlign left
        , fontWeight bold
        ]
    ]



{- Misc
   ============================================
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
