module Main exposing (Model, Msg(..), init, main, update, view)

import Browser exposing (Document)
import Css exposing (..)
import Css.Animations as Animations exposing (keyframes)
import Css.Global exposing (children, descendants, withAttribute)
import Css.Media as Media exposing (only, screen, withMedia)
import Data.ResetCss as ResetCss exposing (ResetCss(..))
import Data.Tag as Tag exposing (Tag(..))
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (attribute, css, value)
import Html.Styled.Events exposing (onInput)



-- MAIN


main : Program () Model Msg
main =
    Browser.document
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }



-- MODEL


type alias Model =
    { resetCss_1 : Maybe ResetCss
    , resetCss_2 : Maybe ResetCss
    , resetCss_3 : Maybe ResetCss
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { resetCss_1 = Nothing
      , resetCss_2 = Nothing
      , resetCss_3 = Nothing
      }
    , Cmd.none
    )



-- UPDATE


type Msg
    = SetResetCss Slot String


type Slot
    = Slot_1
    | Slot_2
    | Slot_3


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetResetCss Slot_1 str ->
            ( { model | resetCss_1 = ResetCss.fromString str }, Cmd.none )

        SetResetCss Slot_2 str ->
            ( { model | resetCss_2 = ResetCss.fromString str }, Cmd.none )

        SetResetCss Slot_3 str ->
            ( { model | resetCss_3 = ResetCss.fromString str }, Cmd.none )



-- VIEW


view : Model -> Document Msg
view model =
    { title = ""
    , body =
        [ main_ []
            [ header
                [ css
                    [ position sticky
                    , top zero
                    , displayFlex
                    , padding2 (px 10) zero
                    , backgroundColor (hsla 0 0 0 0.01)
                    , property "-webkit-backdrop-filter" "blur(15px)"
                    , property "backdrop-filter" "blur(15px)"
                    , children
                        [ Css.Global.div
                            [ width (pct 33.333)
                            , paddingLeft (px 15)
                            , withMedia [ only screen [ Media.maxWidth (px 767) ] ]
                                [ width (pct 100)
                                , nthChild "n+2" [ display none ]
                                ]
                            , withMedia [ only screen [ Media.minWidth (px 768), Media.maxWidth (px 1279) ] ]
                                [ width (pct 50)
                                , nthChild "n+3" [ display none ]
                                ]
                            ]
                        ]
                    ]
                ]
                (List.map resetCssSelector [ Slot_1, Slot_2, Slot_3 ])
            , preview model
            ]
        ]
    }
        |> (\{ title, body } -> { title = title, body = List.map toUnstyled (globalReset :: body) })


globalReset : Html msg
globalReset =
    Css.Global.global
        [ Css.Global.everything
            [ boxSizing borderBox ]
        , Css.Global.html
            [ height (pct 100) ]
        , Css.Global.body
            [ height (pct 100)
            , margin zero
            ]
        ]


resetCssSelector : Slot -> Html Msg
resetCssSelector slot =
    div []
        [ select [ onInput (SetResetCss slot) ] <|
            option [ value "" ] [ text "Browser Default" ]
                :: List.map
                    (\resetCss ->
                        option [ value (ResetCss.toString resetCss) ]
                            [ text <| .name <| ResetCss.toLibrary resetCss ]
                    )
                    ResetCss.all
        ]


preview : Model -> Html msg
preview { resetCss_1, resetCss_2, resetCss_3 } =
    div [] <|
        List.map
            (\tag ->
                details
                    [ attribute "open" ""
                    , css
                        [ borderBottom3 (px 1) solid (hex "#EEE")
                        , children
                            [ Css.Global.div
                                [ overflow hidden ]
                            ]
                        , withAttribute "open"
                            [ children
                                [ Css.Global.div
                                    [ let
                                        accordion =
                                            keyframes
                                                [ ( 0, [ Animations.custom "max-height" "0" ] )
                                                , ( 100, [ Animations.custom "max-height" "100vh" ] )
                                                ]
                                      in
                                      animationName accordion
                                    , animationDuration (ms 400)
                                    ]
                                ]
                            ]
                        ]
                    ]
                    [ summary
                        [ css
                            [ padding (px 15)
                            , fontSize (px 20)
                            , fontWeight bold
                            ]
                        ]
                        [ text (Tag.toString tag) ]
                    , div
                        [ css
                            [ displayFlex
                            , paddingBottom (px 20)
                            , children
                                [ Css.Global.div
                                    [ width (pct 33.333)
                                    , withMedia [ only screen [ Media.maxWidth (px 767) ] ]
                                        [ width (pct 100)
                                        , nthChild "n+2" [ display none ]
                                        ]
                                    , withMedia [ only screen [ Media.minWidth (px 768), Media.maxWidth (px 1279) ] ]
                                        [ width (pct 50)
                                        , nthChild "n+3" [ display none ]
                                        ]
                                    ]
                                ]
                            ]
                        ]
                        (List.map
                            (\resetCss ->
                                div
                                    [ css
                                        [ resetCss
                                            |> Maybe.map ResetCss.toSnippet
                                            |> Maybe.withDefault []
                                            |> descendants
                                        , padding2 zero (px 20)
                                        , nthChild "n+2"
                                            [ borderLeft3 (px 1) solid (hex "#EEE") ]
                                        ]
                                    ]
                                    [ Tag.renderer tag ]
                            )
                            [ resetCss_1, resetCss_2, resetCss_3 ]
                        )
                    ]
            )
            Tag.all
