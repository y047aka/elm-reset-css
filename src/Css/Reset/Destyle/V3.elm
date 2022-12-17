module Css.Reset.Destyle.V3 exposing (snippets)

{-|

@docs snippets

-}

import Css exposing (..)
import Css.Global exposing (..)


{-| -}
snippets : List Snippet
snippets =
    -- destyle.css v3.0.2 | MIT License | https://github.com/nicolas-cusan/destyle.css
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
        , replacedContent
        , forms
        , interactive
        , table
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
        [ textDecoration2 underline dotted -- 2
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



{- Replaced content
   ============================================
-}


replacedContent : List Snippet
replacedContent =
    [ -- Prevent vertical alignment issues.
      each
        [ svg
        , img
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
    [ {- Reset form fields to make them styleable.
         1. Make form elements stylable across systems iOS especially.
         2. Inherit text-transform from parent.
      -}
      each
        [ button
        , input
        , optgroup
        , select
        , textarea
        ]
        [ property "-webkit-appearance" "none" -- 1
        , property "appearance" "none"
        , verticalAlign middle
        , color inherit
        , property "font" "inherit"
        , property "background" "transparent"
        , padding zero
        , margin zero
        , borderRadius zero
        , property "text-align" "inherit"
        , textTransform inherit -- 2
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

    -- Correct cursors for clickable elements.
    , each
        [ button
        , selector """[type="button"]"""
        , selector """[type="reset"]"""
        , selector """[type="submit"]"""
        ]
        [ cursor pointer ]
    , each
        [ selector "button:disabled"
        , selector """[type="button"]:disabled"""
        , selector """[type="reset"]:disabled"""
        , selector """[type="submit"]:disabled"""
        ]
        [ cursor default ]

    -- Improve outlines for Firefox and unify style with input elements & buttons.
    , selector ":-moz-focusring"
        [ property "outline" "auto" ]

    --
    , selector "select:disabled"
        [ opacity inherit ]

    -- Remove padding
    , option
        [ padding zero ]

    -- Reset to invisible
    , fieldset
        [ margin zero
        , padding zero
        , minWidth zero
        ]

    --
    , legend
        [ padding zero ]

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
    -- 2. Fix font inheritance.
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
    , selector "[contenteditable]:focus"
        [ property "outline" "auto" ]
    ]



{- Tables
   ============================================
-}


table : List Snippet
table =
    [ -- 1. Correct table border color inheritance in all Chrome and Safari.
      Css.Global.table
        [ borderColor inherit -- 1
        , borderCollapse collapse
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
