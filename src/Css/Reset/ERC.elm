module Css.Reset.ERC exposing (hardReset, normalize)

{-| ElmResetCss which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).

@docs hardReset, normalize

-}

import Css exposing (..)
import Css.Global exposing (Snippet, each, everything, selector)


type ResetMode
    = HardReset
    | Normalize


type alias Options =
    { mode : ResetMode
    , root : ResetMode
    , heading : ResetMode
    , groupingContent : ResetMode
    , list : ResetMode
    , hr : ResetMode
    , textLevel : ResetMode
    , embeddedContent : ResetMode
    , table : ResetMode
    , formElements : ResetMode
    , interactive : ResetMode
    }


batchIf_HardReset : ResetMode -> List Style -> Style
batchIf_HardReset mode =
    batchIf (mode == HardReset)


batchIf_Normalize : ResetMode -> List Style -> Style
batchIf_Normalize mode =
    batchIf (mode == Normalize)


batchIf : Bool -> List Style -> Style
batchIf condition styles =
    if condition then
        batch styles

    else
        batch []


hardReset : List Snippet
hardReset =
    snippetsByResetMode HardReset


normalize : List Snippet
normalize =
    snippetsByResetMode Normalize


snippetsByResetMode : ResetMode -> List Snippet
snippetsByResetMode mode =
    snippetsWithOptions
        { mode = mode
        , root = mode
        , heading = mode
        , groupingContent = mode
        , list = mode
        , hr = mode
        , textLevel = mode
        , embeddedContent = mode
        , table = mode
        , formElements = mode
        , interactive = mode
        }


{-| Compile it with your elm-css code.
-}
snippetsWithOptions : Options -> List Snippet
snippetsWithOptions options =
    List.concat
        [ -- Document
          everythingResets options.mode
        , rootResets options.root

        -- Sections
        , bodyResets
        , verticalRhythm options.mode
        , headingsResets options.heading

        -- Grouping content
        , listResets options.list
        , hrResets options.hr
        , listInNavResets options.list
        , preResets options.groupingContent
        , addressResets options.groupingContent

        -- Text-level semantics
        , aResets options.textLevel
        , abbrResets
        , bAndStrongResets
        , codeAndKbdAndSampResets
        , smallResets
        , subAndSupResets options.textLevel

        -- Embedded content
        , embeddedContent options.embeddedContent
        , iframeResets options.embeddedContent
        , svgResets options.embeddedContent

        -- Tabular data
        , tableResets options.table
        , captionResets options.table
        , tableCellResets options.table

        -- Forms
        , fieldResets options.formElements
        , inputResets options.formElements
        , buttonResets options.formElements
        , focusringReset options.formElements
        , selectResets options.formElements
        , fieldsetResets options.formElements
        , progressResets
        , textareaResets options.formElements
        , searchResets options.formElements
        , spinButtonResets options.formElements
        , inputPlaceholderResets options.formElements
        , searchDecorationResets options.formElements
        , fileUploadButtonResets
        , labelResets options.formElements

        -- Interactive
        , dialogResets options.interactive
        , summaryDetailsResets options.interactive
        , contenteditableResets options.interactive

        -- Accessibility
        , accessibility
        ]



{- Document
   ==========================================================================
-}


everythingResets : ResetMode -> List Snippet
everythingResets mode =
    [ -- 1. Add border box sizing in all browsers (opinionated).
      -- 2. Backgrounds do not repeat by default (opinionated).
      each
        [ everything
        , selector "::before"
        , selector "::after"
        ]
        (case mode of
            HardReset ->
                [ boxSizing borderBox
                , borderStyle solid
                , borderWidth zero
                ]

            Normalize ->
                [ boxSizing borderBox -- 1
                , backgroundRepeat noRepeat --2
                ]
        )

    -- 1. Add text decoration inheritance in all browsers (opinionated).
    -- 2. Add vertical alignment inheritance in all browsers (opinionated).
    , each
        [ selector "::before"
        , selector "::after"
        ]
        [ batchIf_Normalize mode
            [ textDecoration inherit -- 1
            , property "vertical-align" "inherit" -- 2
            ]
        ]
    ]


rootResets : ResetMode -> List Snippet
rootResets mode =
    [ selector ":where(:root)" <|
        case mode of
            HardReset ->
                {- 1. Correct the line height in all browsers.
                   2. Prevent adjustments of font size after orientation changes in iOS.
                   3. Remove gray overlay on links for iOS.
                -}
                [ lineHeight (num 1.15) -- 1
                , property "-webkit-text-size-adjust" "100%" -- 2
                , property "-webkit-tap-highlight-color" "transparent" -- 3
                ]

            Normalize ->
                {- 1. Use the default cursor in all browsers (opinionated).
                   2. Change the line height in all browsers (opinionated).
                   3. Breaks words to prevent overflow in all browsers (opinionated).
                   4. Use a 4-space tab width in all browsers (opinionated).
                   5. Remove the grey highlight on links in iOS (opinionated).
                   6. Prevent adjustments of font size after orientation changes in iOS.
                -}
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


bodyResets : List Snippet
bodyResets =
    [ -- Remove the margin in all browsers (opinionated).
      selector ":where(body)"
        [ margin zero ]
    ]


verticalRhythm : ResetMode -> List Snippet
verticalRhythm mode =
    case mode of
        HardReset ->
            [ selector ":where(p, blockquote, form, figure)"
                [ margin zero ]
            ]

        Normalize ->
            []


headingsResets : ResetMode -> List Snippet
headingsResets mode =
    [ case mode of
        HardReset ->
            selector ":where(h1, h2, h3, h4, h5, h6)"
                [ fontSize inherit
                , fontWeight inherit
                , margin zero
                ]

        Normalize ->
            {- Correct the font size and margin on `h1` elements within `section` and
               `article` contexts in Chrome, Edge, Firefox, and Safari.
            -}
            selector ":where(h1)"
                [ fontSize (Css.em 2)
                , margin2 (Css.em 0.67) zero
                ]
    ]



{- Grouping content
   ==========================================================================
-}


listResets : ResetMode -> List Snippet
listResets mode =
    case mode of
        HardReset ->
            [ selector ":where(ul, ol)"
                [ margin zero
                , padding zero
                , listStyle none
                ]
            , selector ":where(dl)"
                [ margin zero ]
            , selector ":where(dt)"
                [ fontWeight bold ]
            , selector ":where(dd)"
                [ marginLeft zero ]
            ]

        Normalize ->
            -- Remove the margin on nested lists in Chrome, Edge, and Safari.
            [ selector ":where(dl, ol, ul) :where(dl, ol, ul)"
                [ margin zero ]
            ]


hrResets : ResetMode -> List Snippet
hrResets mode =
    [ {- 1. Correct the inheritance of border color in Firefox.
         2. Add the correct box sizing in Firefox.
      -}
      selector ":where(hr)"
        [ color inherit -- 1
        , height zero -- 2

        -- 2. Show the overflow in Edge and IE.
        , batchIf_HardReset mode
            [ boxSizing contentBox -- 1
            , overflow visible -- 2
            , borderWidth zero
            , borderTopWidth (px 1)
            , margin zero
            , property "clear" "both"
            ]
        ]
    ]


listInNavResets : ResetMode -> List Snippet
listInNavResets mode =
    case mode of
        HardReset ->
            []

        Normalize ->
            [ -- Remove the list style on navigation lists in all browsers (opinionated).
              selector ":where(nav) :where(ol, ul)"
                [ property "list-style-type" "none"
                , padding zero
                ]

            -- Prevent VoiceOver from ignoring list semantics in Safari (opinionated).
            , selector ":where(nav li)::before"
                [ property "content" "\\200B"
                , float left
                ]
            ]


preResets : ResetMode -> List Snippet
preResets mode =
    [ {- 1. Correct the inheritance and scaling of font size in all browsers.
         2. Correct the odd `em` font sizing in all browsers.
         3. Prevent overflow of the container in all browsers (opinionated).
      -}
      selector ":where(pre)"
        [ batchIf_HardReset mode
            [ margin zero ]
        , fontFamilies [ monospace.value, monospace.value ] -- 1
        , fontSize (Css.em 1) -- 2
        , batchIf_Normalize mode [ overflow auto ] -- 3
        ]
    ]


addressResets : ResetMode -> List Snippet
addressResets mode =
    case mode of
        HardReset ->
            [ selector ":where(address)"
                [ margin zero
                , fontStyle inherit
                ]
            ]

        Normalize ->
            []



{- Text-level semantics
   ==========================================================================
-}


aResets : ResetMode -> List Snippet
aResets mode =
    case mode of
        HardReset ->
            [ -- Remove the gray background on active links in IE 10.
              selector ":where(a)"
                [ backgroundColor transparent
                , textDecoration none
                , color inherit
                ]
            ]

        Normalize ->
            []


abbrResets : List Snippet
abbrResets =
    [ -- Add the correct text decoration in Safari.
      selector ":where(abbr[title])"
        [ textDecoration underline
        , textDecoration2 underline dotted
        ]
    ]


bAndStrongResets : List Snippet
bAndStrongResets =
    [ -- Add the correct font weight in Chrome, Edge, and Safari.
      selector ":where(b, strong)"
        [ fontWeight bolder ]
    ]


codeAndKbdAndSampResets : List Snippet
codeAndKbdAndSampResets =
    [ -- 1. Correct the inheritance and scaling of font size in all browsers.
      -- 2. Correct the odd `em` font sizing in all browsers.
      selector ":where(code, kbd, samp)"
        [ fontFamilies [ monospace.value, monospace.value ] -- 1
        , fontSize (Css.em 1) -- 2
        ]
    ]


smallResets : List Snippet
smallResets =
    [ -- Add the correct font size in all browsers.
      selector ":where(small)"
        [ fontSize (pct 80) ]
    ]


subAndSupResets : ResetMode -> List Snippet
subAndSupResets mode =
    case mode of
        HardReset ->
            [ -- Prevent `sub` and `sup` elements from affecting the line height in all browsers.
              selector ":where(sub, sup)"
                [ position relative
                , fontSize (pct 75)
                , lineHeight zero
                , verticalAlign baseline
                ]
            , selector ":where(sub)"
                [ bottom (Css.em -0.25) ]
            , selector ":where(sup)"
                [ top (Css.em -0.5) ]
            ]

        Normalize ->
            []



{- Embedded content
   ========================================================================== */
-}


embeddedContent : ResetMode -> List Snippet
embeddedContent mode =
    [ -- Prevent vertical alignment issues.
      selector ":where(svg, img, embed, object, iframe)"
        [ batchIf_HardReset mode
            [ verticalAlign bottom ]
        ]

    -- Change the alignment on media elements in all browsers (opinionated).
    , selector ":where(audio, canvas, iframe, img, svg, video)"
        [ batchIf_Normalize mode
            [ verticalAlign middle ]
        ]
    ]


iframeResets : ResetMode -> List Snippet
iframeResets mode =
    [ selector ":where(iframe)" <|
        case mode of
            HardReset ->
                [ margin zero ]

            -- Remove the border on iframes in all browsers (opinionated).
            Normalize ->
                [ borderStyle none ]
    ]


svgResets : ResetMode -> List Snippet
svgResets mode =
    [ -- Change the fill color to match the text color in all browsers (opinionated).
      selector ":where(svg:not([fill]))"
        [ batchIf_Normalize mode
            [ property "fill" "currentColor" ]
        ]
    ]



{- Tabular data
   ========================================================================== */
-}


tableResets : ResetMode -> List Snippet
tableResets mode =
    [ {- 1. Collapse border spacing in all browsers (opinionated).
         2. Correct table border color inheritance in all Chrome, Edge, and Safari.
         3. Remove text indentation from table contents in Chrome, Edge, and Safari.
      -}
      selector ":where(table)"
        [ batchIf_HardReset mode
            [ margin zero ]
        , batchIf_Normalize mode [ borderCollapse collapse ] -- 1
        , borderColor inherit -- 2
        , batchIf_Normalize mode [ textIndent zero ] -- 3
        ]
    ]


captionResets : ResetMode -> List Snippet
captionResets mode =
    case mode of
        HardReset ->
            [ selector ":where(caption)"
                [ textAlign left ]
            ]

        Normalize ->
            []


tableCellResets : ResetMode -> List Snippet
tableCellResets mode =
    case mode of
        HardReset ->
            [ selector ":where(td, th)"
                [ verticalAlign top
                , padding zero
                ]
            , selector ":where(th)"
                [ textAlign left
                , fontWeight bold
                ]
            ]

        Normalize ->
            []



{- Forms
   ========================================================================== */
-}


fieldResets : ResetMode -> List Snippet
fieldResets mode =
    case mode of
        HardReset ->
            [ {- Reset form fields to make them styleable.
                 1. Make form elements stylable across systems iOS especially.
                 2. Inherit text-transform from parent.
              -}
              selector ":where(button, input, optgroup, select, textarea)"
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
            ]

        Normalize ->
            [ -- Remove the margin on controls in Safari.
              selector ":where(button, input, select)"
                [ margin zero ]
            ]


inputResets : ResetMode -> List Snippet
inputResets mode =
    case mode of
        HardReset ->
            [ -- Reset radio and checkbox appearance to preserve their look in iOS.
              selector """:where([type="checkbox"])"""
                [ property "-webkit-appearance" "checkbox"
                , property "appearance" "checkbox"
                ]
            , selector """:where([type="radio"])"""
                [ property "-webkit-appearance" "radio"
                , property "appearance" "radio"
                ]
            ]

        Normalize ->
            []


buttonResets : ResetMode -> List Snippet
buttonResets mode =
    case mode of
        HardReset ->
            [ -- Correct cursors for clickable elements.
              selector """:where(button, [type="button"], [type="reset"], [type="submit"])"""
                [ cursor pointer ]
            , selector """:where(button:disabled, [type="button"]:disabled, [type="reset"]:disabled, [type="submit"]:disabled)"""
                [ cursor default ]
            ]

        Normalize ->
            [ -- Correct the inability to style buttons in iOS and Safari.
              selector """:where(button, [type="button" i], [type="reset" i], [type="submit" i])"""
                [ property "-webkit-appearance" "button" ]
            ]


focusringReset : ResetMode -> List Snippet
focusringReset mode =
    case mode of
        HardReset ->
            [ -- Improve outlines for Firefox and unify style with input elements & buttons.
              selector ":-moz-focusring"
                [ property "outline" "auto" ]
            ]

        Normalize ->
            []


selectResets : ResetMode -> List Snippet
selectResets mode =
    case mode of
        HardReset ->
            [ selector "select:disabled"
                [ opacity inherit ]

            -- Remove padding
            , selector ":where(option)"
                [ padding zero ]
            ]

        Normalize ->
            []


fieldsetResets : ResetMode -> List Snippet
fieldsetResets mode =
    [ -- Reset to invisible
      selector ":where(fieldset)" <|
        case mode of
            HardReset ->
                [ margin zero
                , padding zero
                , minWidth zero
                ]

            Normalize ->
                -- Change the inconsistent appearance in all browsers (opinionated).
                [ border3 (px 1) solid (hex "#a0a0a0") ]
    , selector ":where(legend)"
        [ batchIf_HardReset mode
            [ padding zero ]
        ]
    ]


progressResets : List Snippet
progressResets =
    [ -- Add the correct vertical alignment in Chrome, Edge, and Firefox.
      selector ":where(progress)"
        [ verticalAlign baseline ]
    ]


textareaResets : ResetMode -> List Snippet
textareaResets mode =
    [ selector ":where(textarea)" <|
        case mode of
            HardReset ->
                -- Remove the default vertical scrollbar in IE 10+.
                [ overflow auto ]

            Normalize ->
                {- 1. Remove the margin in Firefox and Safari.
                   3. Change the resize direction in all browsers (opinionated).
                -}
                [ margin zero -- 1
                , resize vertical -- 3
                ]
    ]


searchResets : ResetMode -> List Snippet
searchResets mode =
    case mode of
        HardReset ->
            [ -- 1. Correct the outline style in Safari.
              selector """:where([type="search"])"""
                [ outlineOffset (px -2) -- 1
                ]
            ]

        Normalize ->
            [ -- 1. Correct the odd appearance in Chrome, Edge, and Safari.
              -- 2. Correct the outline style in Safari.
              selector """:where([type="search" i])"""
                [ property "-webkit-appearance" "textfield" -- 1
                , outlineOffset (px -2) -- 2
                ]
            ]


spinButtonResets : ResetMode -> List Snippet
spinButtonResets mode =
    case mode of
        HardReset ->
            [ -- Correct the cursor style of increment and decrement buttons in Chrome.
              each
                [ selector """[type="number"]::-webkit-inner-spin-button"""
                , selector """[type="number"]::-webkit-outer-spin-button"""
                ]
                [ height auto ]
            ]

        Normalize ->
            [ -- Correct the cursor style of increment and decrement buttons in Safari.
              each
                [ selector "::-webkit-inner-spin-button"
                , selector "::-webkit-outer-spin-button"
                ]
                [ height auto ]
            ]


inputPlaceholderResets : ResetMode -> List Snippet
inputPlaceholderResets mode =
    case mode of
        HardReset ->
            []

        Normalize ->
            [ -- Correct the text style of placeholders in Chrome, Edge, and Safari.
              selector "::-webkit-input-placeholder"
                [ color inherit
                , opacity (num 0.54)
                ]
            ]


searchDecorationResets : ResetMode -> List Snippet
searchDecorationResets mode =
    case mode of
        HardReset ->
            [ -- Remove the inner padding in Chrome and Safari on macOS.
              selector """:where([type="search"]::-webkit-search-decoration)"""
                [ property "-webkit-appearance" "none" ]
            ]

        Normalize ->
            [ -- Remove the inner padding in Chrome, Edge, and Safari on macOS.
              selector "::-webkit-search-decoration"
                [ property "-webkit-appearance" "none" ]
            ]


fileUploadButtonResets : List Snippet
fileUploadButtonResets =
    [ -- 1. Correct the inability to style upload buttons in iOS and Safari.
      -- 2. Change font properties to `inherit` in Safari.
      selector "::-webkit-file-upload-button"
        [ property "-webkit-appearance" "button" -- 1
        , property "font" "inherit" -- 2
        ]
    ]


labelResets : ResetMode -> List Snippet
labelResets mode =
    case mode of
        HardReset ->
            [ -- Clickable labels
              selector ":where(label[for])"
                [ cursor pointer ]
            ]

        Normalize ->
            []



{- Interactive
   ========================================================================== */
-}


dialogResets : ResetMode -> List Snippet
dialogResets mode =
    case mode of
        HardReset ->
            []

        Normalize ->
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
            ]


summaryDetailsResets : ResetMode -> List Snippet
summaryDetailsResets mode =
    case mode of
        HardReset ->
            [ -- Add the correct display in Edge, IE 10+, and Firefox.
              selector ":where(details)"
                [ display block ]

            -- Add the correct display in all browsers.
            , selector ":where(summary)"
                [ display listItem ]
            ]

        Normalize ->
            [ -- Add the correct display in Safari.
              selector ":where(details > summary:first-of-type)"
                [ display listItem ]
            ]


contenteditableResets : ResetMode -> List Snippet
contenteditableResets mode =
    [ -- Remove outline for editable content.
      selector "[contenteditable]:focus"
        [ batchIf_HardReset mode
            [ property "outline" "auto" ]
        ]
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
