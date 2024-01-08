module Html.ResetCss exposing
    ( ericMeyer
    , sanitize, ress, destyle
    , theNewCssReset
    )

{-| You can use them with elm/html.

    module Main exposing (main)

    import Browser
    import Html exposing (..)
    import Html.ResetCss

    main : Program Never Model Msg
    main =
        Browser.sandbox
            { init = init
            , update = update
            , view = view
            }

    ...

    view : Model -> Html Msg
    view model =
        div []
            [ Html.ResetCss.sanitize
            , header [] [ text "My site." ]
            , main_ []
                [ article []
                    [ h1 [] [ text "Title" ]
                    , text "My contents."
                    ]
                ]
            , footer [] [ text "©2021 y047aka" ]
            ]

@docs ericMeyer
@docs sanitize, ress, destyle
@docs theNewCssReset

-}

import Css.Global exposing (global)
import Css.Reset.Destyle as Destyle
import Css.Reset.EricMeyer as EricMeyer
import Css.Reset.Ress as Ress
import Css.Reset.Sanitize as Sanitize
import Css.Reset.TheNewCssReset as TheNewCssReset
import Html exposing (Html)
import Html.Styled exposing (toUnstyled)


{-| -}
ericMeyer : Html msg
ericMeyer =
    EricMeyer.snippets
        |> global
        |> toUnstyled


{-| -}
sanitize : Html msg
sanitize =
    Sanitize.v13
        |> global
        |> toUnstyled


{-| -}
ress : Html msg
ress =
    Ress.v5
        |> global
        |> toUnstyled


{-| -}
destyle : Html msg
destyle =
    Destyle.v4
        |> global
        |> toUnstyled


{-| -}
theNewCssReset : Html msg
theNewCssReset =
    TheNewCssReset.snippets
        |> global
        |> toUnstyled
