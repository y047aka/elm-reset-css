module Css.Reset exposing
    ( ericMeyer, html5Doctor
    , normalize, sanitize, ress, destyle
    , theNewCssReset
    , erc_HardReset, erc_Normalize
    )

{-| Compile it with your [elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/) code.

    module Main exposing (main)

    import Browser
    import Css.Global
    import Css.Reset
    import Html.Styled exposing (..)


    main : Program Never Model Msg
    main =
        Browser.sandbox
            { init = init
            , update = update
            , view = view >> Html.Styled.toUnstyled
            }

    ...

    view : Model -> Html.Styled.Html Msg
    view model =
        div []
            [ Css.Global.global Css.Reset.sanitize
            , header [] [ text "My site." ]
            , main_ []
                [ article []
                    [ h1 [] [ text "Title" ]
                    , text "My contents."
                    ]
                ]
            , footer [] [ text "©2021 y047aka" ]
            ]


# Collection

  - [Eric Meyer’s Reset CSS (2008)](https://meyerweb.com/eric/tools/css/reset/)  
    v2.0 (2011-01-26)  
    Eric Meyer / none (public domain)

  - [html5doctor.com Reset Stylesheet (2009)](https://github.com/richclark/HTML5resetCSS)  
    v1.6.1 (2010-09-17)  
    Richard Clark / Free of charge under a CC0 Public Domain Dedication and MIT License

  - [Normalize.css (2011)](https://github.com/necolas/normalize.css)  
    v8.0.1 (2018-11-05)  
    Nicolas Gallagher / MIT

  - [sanitize.css (2012)](https://github.com/csstools/sanitize.css)  
    v13.0.0 (2021-09-14)  
    CSS Tools / CC0 1.0 Universal

  - [ress (2015)](https://github.com/filipelinhares/ress)  
    v4.0.0 (2021-04-21)  
    Filipe Linhares / MIT

  - [destyle.css (2019)](https://github.com/nicolas-cusan/destyle.css)  
    v3.0.0 (2021-09-06)  
    Nicolas Cusan / MIT

  - [The New CSS Reset (2021)](https://github.com/elad2412/the-new-css-reset)  
    v1.3.1 (2021-10-28)  
    Elad Shechter / MIT

@docs ericMeyer, html5Doctor
@docs normalize, sanitize, ress, destyle
@docs theNewCssReset
@docs erc_HardReset, erc_Normalize

-}

import Css.Global exposing (Snippet)
import Css.Reset.Destyle as Destyle
import Css.Reset.ERC as ERC
import Css.Reset.EricMeyer as EricMeyer
import Css.Reset.Html5Doctor as Html5Doctor
import Css.Reset.Normalize as Normalize
import Css.Reset.Ress as Ress
import Css.Reset.Sanitize as Sanitize
import Css.Reset.TheNewCssReset as TheNewCssReset


{-| -}
ericMeyer : List Snippet
ericMeyer =
    EricMeyer.snippets


{-| -}
html5Doctor : List Snippet
html5Doctor =
    Html5Doctor.snippets


{-| -}
normalize : List Snippet
normalize =
    Normalize.snippets


{-| -}
sanitize : List Snippet
sanitize =
    Sanitize.latest


{-| -}
ress : List Snippet
ress =
    Ress.latest


{-| -}
destyle : List Snippet
destyle =
    Destyle.snippets


{-| -}
theNewCssReset : List Snippet
theNewCssReset =
    TheNewCssReset.snippets


{-| -}
erc_HardReset : List Snippet
erc_HardReset =
    ERC.hardReset


{-| -}
erc_Normalize : List Snippet
erc_Normalize =
    ERC.normalize
