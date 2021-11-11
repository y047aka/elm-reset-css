module Css.Reset.ElmResetCss exposing (ResetMode(..), snippets)

import Css exposing (..)
import Css.Global exposing (Snippet, each, everything, selector)


type ResetMode
    = HardReset
    | Normalize


batchIf : Bool -> List Style -> Style
batchIf condition styles =
    if condition then
        batch styles

    else
        batch []


{-| Compile it with your elm-css code.
-}
snippets : ResetMode -> List Snippet
snippets mode =
    let
        options =
            { marginAndPadding = mode
            , typography = mode
            , decoration = mode
            , heading = mode
            , list = mode
            , textLevel = mode
            , table = mode
            , formElements = mode
            }
    in
    List.concat
        [ -- Document
          everythingResets mode
        , rootResets mode options

        -- Sections
        , bodyResets
        , verticalRhythm options
        , headingsResets options

        -- Grouping content
        , listResets options
        , hrResets mode options
        , listInNavResets mode
        , preResets mode options
        , addressResets options

        -- Text-level semantics
        , aResets options
        , abbrResets
        , bAndStrongResets
        , codeAndKbdAndSampResets
        , smallResets
        , subAndSupResets options

        -- Embedded content
        , embeddedContent options
        , iframeResets options
        , svgResets mode

        -- Tabular data
        , tableResets options
        , captionResets options
        , tableCellResets options

        -- Forms
        , fieldResets options
        , inputResets options
        , buttonResets options
        , focusringReset mode
        , selectResets options
        , fieldsetResets options
        , progressResets
        , textareaResets options
        , searchResets options
        , spinButtonResets options
        , inputPlaceholderResets options
        , searchDecorationResets options
        , fileUploadButtonResets
        , labelResets options

        -- Interactive
        , dialogResets mode
        , summaryDetailsResets mode
        , contenteditableResets mode

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
        [ batchIf (mode == Normalize)
            [ textDecoration inherit -- 1
            , property "vertical-align" "inherit" -- 2
            ]
        ]
    ]


rootResets : ResetMode -> { a | typography : ResetMode } -> List Snippet
rootResets mode { typography } =
    [ selector ":where(:root)"
        [ {- 1. Correct the line height in all browsers.
             2. Prevent adjustments of font size after orientation changes in iOS.
             3. Remove gray overlay on links for iOS.
          -}
          batchIf (typography == HardReset)
            [ lineHeight (num 1.15) -- 1
            , property "-webkit-text-size-adjust" "100%" -- 2
            ]
        , batchIf (mode == HardReset)
            [ property "-webkit-tap-highlight-color" "transparent" -- 3
            ]

        {- 1. Use the default cursor in all browsers (opinionated).
           2. Change the line height in all browsers (opinionated).
           3. Breaks words to prevent overflow in all browsers (opinionated).
           4. Use a 4-space tab width in all browsers (opinionated).
           5. Remove the grey highlight on links in iOS (opinionated).
           6. Prevent adjustments of font size after orientation changes in iOS.
        -}
        , batchIf (mode == Normalize)
            [ cursor default -- 1
            , batchIf (typography == Normalize)
                [ lineHeight (num 1.5) -- 2
                ]
            , property "overflow-wrap" "break-word" -- 3
            , property "-moz-tab-size" "4" -- 4
            , property "tab-size" "4" -- 4
            , property "-webkit-tap-highlight-color" "transparent" -- 5
            , batchIf (typography == Normalize)
                [ property "-webkit-text-size-adjust" "100%" -- 6
                ]
            ]
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


verticalRhythm : { a | marginAndPadding : ResetMode } -> List Snippet
verticalRhythm { marginAndPadding } =
    [ selector ":where(p, blockquote, form, figure)"
        [ batchIf (marginAndPadding == HardReset)
            [ margin zero ]
        ]
    ]


headingsResets : { a | heading : ResetMode } -> List Snippet
headingsResets { heading } =
    [ case heading of
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


listResets : { a | marginAndPadding : ResetMode, list : ResetMode } -> List Snippet
listResets { marginAndPadding, list } =
    [ selector ":where(ul, ol)"
        [ batchIf (marginAndPadding == HardReset)
            [ margin zero ]
        , batchIf (list == HardReset)
            [ padding zero
            , listStyle none
            ]
        ]
    , selector ":where(dl)"
        [ batchIf (marginAndPadding == HardReset)
            [ margin zero ]
        ]
    , selector ":where(dt)"
        [ batchIf (list == HardReset)
            [ fontWeight bold ]
        ]
    , selector ":where(dd)"
        [ batchIf (list == HardReset)
            [ marginLeft zero ]
        ]

    -- Remove the margin on nested lists in Chrome, Edge, and Safari.
    , selector ":where(dl, ol, ul) :where(dl, ol, ul)"
        [ batchIf (list == Normalize)
            [ margin zero ]
        ]
    ]


hrResets : ResetMode -> { a | marginAndPadding : ResetMode, decoration : ResetMode } -> List Snippet
hrResets mode { marginAndPadding, decoration } =
    [ {- 1. Correct the inheritance of border color in Firefox.
         2. Add the correct box sizing in Firefox.
      -}
      selector ":where(hr)"
        [ color inherit -- 1
        , height zero -- 2

        -- 2. Show the overflow in Edge and IE.
        , batchIf (mode == HardReset)
            [ boxSizing contentBox -- 1
            , overflow visible -- 2
            ]
        , batchIf (decoration == HardReset)
            [ borderWidth zero
            , borderTopWidth (px 1)
            ]
        , batchIf (marginAndPadding == HardReset)
            [ margin zero ]
        , batchIf (mode == HardReset)
            [ property "clear" "both" ]
        ]
    ]


listInNavResets : ResetMode -> List Snippet
listInNavResets mode =
    [ -- Remove the list style on navigation lists in all browsers (opinionated).
      selector ":where(nav) :where(ol, ul)"
        [ batchIf (mode == Normalize)
            [ property "list-style-type" "none"
            , padding zero
            ]
        ]

    -- Prevent VoiceOver from ignoring list semantics in Safari (opinionated).
    , selector ":where(nav li)::before"
        [ batchIf (mode == Normalize)
            [ property "content" "\\200B"
            , float left
            ]
        ]
    ]


preResets : ResetMode -> { a | marginAndPadding : ResetMode } -> List Snippet
preResets mode { marginAndPadding } =
    [ {- 1. Correct the inheritance and scaling of font size in all browsers.
         2. Correct the odd `em` font sizing in all browsers.
         3. Prevent overflow of the container in all browsers (opinionated).
      -}
      selector ":where(pre)"
        [ batchIf (marginAndPadding == HardReset)
            [ margin zero ]
        , fontFamilies [ monospace.value, monospace.value ] -- 1
        , fontSize (Css.em 1) -- 2
        , batchIf (mode == Normalize) [ overflow auto ] -- 3
        ]
    ]


addressResets : { a | marginAndPadding : ResetMode, typography : ResetMode } -> List Snippet
addressResets { marginAndPadding, typography } =
    [ selector ":where(address)"
        [ batchIf (marginAndPadding == HardReset)
            [ margin zero ]
        , batchIf (typography == HardReset)
            [ fontStyle inherit ]
        ]
    ]



{- Text-level semantics
   ==========================================================================
-}


aResets : { a | textLevel : ResetMode } -> List Snippet
aResets { textLevel } =
    case textLevel of
        HardReset ->
            [ -- Remove the gray background on active links in IE 10.
              selector ":where(a)"
                [ batchIf (textLevel == HardReset)
                    [ backgroundColor transparent
                    , textDecoration none
                    , color inherit
                    ]
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


subAndSupResets : { a | textLevel : ResetMode } -> List Snippet
subAndSupResets { textLevel } =
    case textLevel of
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


embeddedContent : { a | typography : ResetMode } -> List Snippet
embeddedContent { typography } =
    [ -- Prevent vertical alignment issues.
      selector ":where(svg, img, embed, object, iframe)"
        [ batchIf (typography == HardReset)
            [ verticalAlign bottom ]
        ]

    -- Change the alignment on media elements in all browsers (opinionated).
    , selector ":where(audio, canvas, iframe, img, svg, video)"
        [ batchIf (typography == Normalize)
            [ verticalAlign middle ]
        ]
    ]


iframeResets : { a | marginAndPadding : ResetMode, decoration : ResetMode } -> List Snippet
iframeResets { marginAndPadding, decoration } =
    [ selector ":where(iframe)"
        [ batchIf (marginAndPadding == HardReset)
            [ margin zero ]

        -- Remove the border on iframes in all browsers (opinionated).
        , batchIf (decoration == Normalize)
            [ borderStyle none ]
        ]
    ]


svgResets : ResetMode -> List Snippet
svgResets mode =
    [ -- Change the fill color to match the text color in all browsers (opinionated).
      selector ":where(svg:not([fill]))"
        [ batchIf (mode == Normalize)
            [ property "fill" "currentColor" ]
        ]
    ]



{- Tabular data
   ========================================================================== */
-}


tableResets : { a | marginAndPadding : ResetMode, table : ResetMode } -> List Snippet
tableResets { marginAndPadding, table } =
    [ {- 1. Collapse border spacing in all browsers (opinionated).
         2. Correct table border color inheritance in all Chrome, Edge, and Safari.
         3. Remove text indentation from table contents in Chrome, Edge, and Safari.
      -}
      selector ":where(table)"
        [ batchIf (marginAndPadding == HardReset)
            [ margin zero ]
        , batchIf (table == Normalize) [ borderCollapse collapse ] -- 1
        , borderColor inherit -- 2
        , batchIf (table == Normalize) [ textIndent zero ] -- 3
        ]
    ]


captionResets : { a | table : ResetMode } -> List Snippet
captionResets { table } =
    case table of
        HardReset ->
            [ selector ":where(caption)"
                [ textAlign left ]
            ]

        Normalize ->
            []


tableCellResets : { a | table : ResetMode } -> List Snippet
tableCellResets { table } =
    case table of
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


fieldResets : { a | marginAndPadding : ResetMode, formElements : ResetMode } -> List Snippet
fieldResets { marginAndPadding, formElements } =
    [ {- Reset form fields to make them styleable.
         1. Make form elements stylable across systems iOS especially.
         2. Inherit text-transform from parent.
      -}
      selector ":where(button, input, optgroup, select, textarea)"
        [ batchIf (formElements == HardReset)
            [ property "-webkit-appearance" "none" -- 1
            , property "appearance" "none"
            , verticalAlign middle
            , color inherit
            , property "font" "inherit"
            , property "background" "transparent"
            , padding zero
            ]
        , batchIf ((marginAndPadding == HardReset) || (formElements == HardReset))
            [ margin zero ]
        , batchIf (formElements == HardReset)
            [ borderRadius zero
            , property "text-align" "inherit"
            , textTransform inherit -- 2
            ]
        ]

    -- Remove the margin on controls in Safari.
    , selector ":where(button, input, select)"
        [ batchIf (formElements == Normalize)
            [ margin zero ]
        ]
    ]


inputResets : { a | formElements : ResetMode } -> List Snippet
inputResets { formElements } =
    case formElements of
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


buttonResets : { a | formElements : ResetMode } -> List Snippet
buttonResets { formElements } =
    case formElements of
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


selectResets : { a | formElements : ResetMode } -> List Snippet
selectResets { formElements } =
    [ selector "select:disabled"
        [ batchIf (formElements == HardReset)
            [ opacity inherit ]
        ]

    -- Remove padding
    , selector ":where(option)"
        [ batchIf (formElements == HardReset)
            [ padding zero ]
        ]
    ]


fieldsetResets : { a | marginAndPadding : ResetMode, formElements : ResetMode } -> List Snippet
fieldsetResets { marginAndPadding, formElements } =
    [ -- Reset to invisible
      selector ":where(fieldset)"
        [ batchIf ((marginAndPadding == HardReset) || (formElements == HardReset))
            [ margin zero
            , padding zero
            ]
        , batchIf (formElements == HardReset)
            [ minWidth zero ]

        -- Change the inconsistent appearance in all browsers (opinionated).
        , batchIf (formElements == Normalize)
            [ border3 (px 1) solid (hex "#a0a0a0") ]
        ]
    , selector ":where(legend)"
        [ batchIf (formElements == HardReset)
            [ padding zero ]
        ]
    ]


progressResets : List Snippet
progressResets =
    [ -- Add the correct vertical alignment in Chrome, Edge, and Firefox.
      selector ":where(progress)"
        [ verticalAlign baseline ]
    ]


textareaResets : { a | formElements : ResetMode } -> List Snippet
textareaResets { formElements } =
    [ selector ":where(textarea)" <|
        case formElements of
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


searchResets : { a | formElements : ResetMode } -> List Snippet
searchResets { formElements } =
    case formElements of
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


spinButtonResets : { a | formElements : ResetMode } -> List Snippet
spinButtonResets { formElements } =
    case formElements of
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


inputPlaceholderResets : { a | formElements : ResetMode } -> List Snippet
inputPlaceholderResets { formElements } =
    case formElements of
        HardReset ->
            []

        Normalize ->
            [ -- Correct the text style of placeholders in Chrome, Edge, and Safari.
              selector "::-webkit-input-placeholder"
                [ color inherit
                , opacity (num 0.54)
                ]
            ]


searchDecorationResets : { a | formElements : ResetMode } -> List Snippet
searchDecorationResets { formElements } =
    case formElements of
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


labelResets : { a | formElements : ResetMode } -> List Snippet
labelResets { formElements } =
    case formElements of
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
        [ batchIf (mode == HardReset)
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
