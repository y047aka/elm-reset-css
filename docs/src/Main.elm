module Main exposing (Model, Msg(..), init, main, update, view)

import Browser
import Browser.Navigation as Nav exposing (Key)
import Css exposing (..)
import Css.Animations as Animations exposing (keyframes)
import Css.Global exposing (children, descendants, withAttribute)
import Css.Media as Media exposing (only, screen, withMedia)
import Data.ResetCss as ResetCss exposing (ResetCss(..))
import Data.Tag as Tag exposing (Tag(..))
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (attribute, css, selected, value)
import Html.Styled.Events exposing (onInput)
import Url exposing (Url)
import Url.Parser as Parser exposing (Parser)



-- MAIN


main : Program () Model Msg
main =
    Browser.application
        { init = init
        , update = update
        , view =
            view
                >> (\{ title, body } ->
                        { title = title
                        , body = List.map toUnstyled (globalReset :: body)
                        }
                   )
        , subscriptions = \_ -> Sub.none
        , onUrlChange = UrlChanged
        , onUrlRequest = UrlRequested
        }


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



-- MODEL


type alias Model =
    { key : Key
    , page : Page
    , slots : List (Maybe ResetCss)
    }


type Page
    = NotFound
    | Top


init : () -> Url -> Key -> ( Model, Cmd Msg )
init _ url key =
    { key = key
    , page = Top
    , slots = [ Nothing, Nothing, Nothing ]
    }
        |> routing url



-- ROUTER


parser : Parser (Page -> a) a
parser =
    Parser.oneOf
        [ Parser.map Top Parser.top
        ]


routing : Url -> Model -> ( Model, Cmd Msg )
routing url model =
    Parser.parse parser url
        |> Maybe.withDefault NotFound
        |> (\page -> ( { model | page = page }, Cmd.none ))



-- UPDATE


type Msg
    = UrlRequested Browser.UrlRequest
    | UrlChanged Url
    | SetResetCss Int String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UrlRequested urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            routing url model

        SetResetCss target str ->
            ( { model
                | slots =
                    List.indexedMap
                        (\i previous ->
                            if i == target then
                                ResetCss.fromString str

                            else
                                previous
                        )
                        model.slots
              }
            , Cmd.none
            )



-- VIEW


view : Model -> { title : String, body : List (Html Msg) }
view model =
    case model.page of
        NotFound ->
            { title = ""
            , body = []
            }

        Top ->
            { title = ""
            , body = topPage model
            }


topPage : Model -> List (Html Msg)
topPage model =
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
            (List.indexedMap resetCssSelector model.slots)
        , div [] <|
            List.map
                (\tag ->
                    detailsWithSummary
                        (Tag.toString tag)
                        (accordionContent model.slots tag)
                )
                Tag.all
        ]
    ]


resetCssSelector : Int -> Maybe ResetCss -> Html Msg
resetCssSelector target current =
    div []
        [ select [ onInput (SetResetCss target) ] <|
            option
                [ value ""
                , selected (Maybe.withDefault True <| Maybe.map (always False) current)
                ]
                [ text "Browser Default" ]
                :: List.map
                    (\resetCss ->
                        option
                            [ value (ResetCss.toString resetCss)
                            , selected (current == Just resetCss)
                            ]
                            [ text <| .name <| ResetCss.toSummary resetCss ]
                    )
                    ResetCss.all
        ]


detailsWithSummary : String -> Html msg -> Html msg
detailsWithSummary label_ content =
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
            [ text label_ ]
        , content
        ]


accordionContent : List (Maybe ResetCss) -> Tag -> Html msg
accordionContent slots tag =
    let
        column resetCss =
            div
                [ css
                    [ resetCss
                        |> Maybe.map ResetCss.toRootStyles
                        |> Maybe.withDefault []
                        |> batch
                    , resetCss
                        |> Maybe.map ResetCss.toSnippet
                        |> Maybe.withDefault []
                        |> descendants
                    , padding2 zero (px 20)
                    , nthChild "n+2"
                        [ borderLeft3 (px 1) solid (hex "#EEE") ]
                    ]
                ]
                [ Tag.renderer tag ]
    in
    div
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
        (List.map column slots)
