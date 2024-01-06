module Internal exposing (selectorIfNonEmpty, whereIfNonEmpty)

import Css exposing (Style, batch, property)
import Css.Global exposing (Snippet, each, selector)



-- HELPERS


batchIf : Bool -> List Style -> Style
batchIf bool styles =
    if bool then
        batch styles

    else
        batch []


selectorIf : Bool -> String -> List Style -> Snippet
selectorIf bool selectorStr styles =
    if bool then
        selector selectorStr styles

    else
        each [] []


selectorIfNonEmpty : String -> List ( String, Maybe String ) -> Snippet
selectorIfNonEmpty selectorStr styles =
    let
        fn ( propertyStr, maybeValue ) =
            maybeValue |> Maybe.map (property propertyStr)
    in
    case List.filterMap fn styles of
        [] ->
            each [] []

        nonEmpty ->
            selector selectorStr nonEmpty


where_ : String -> List Style -> Snippet
where_ selectorStr styles =
    selector (":where(" ++ selectorStr ++ ")") styles


whereIf : Bool -> String -> List Style -> Snippet
whereIf bool selectorStr styles =
    selectorIf bool (":where(" ++ selectorStr ++ ")") styles


whereIfNonEmpty : String -> List ( String, Maybe String ) -> Snippet
whereIfNonEmpty selectorStr styles =
    let
        fn ( propertyStr, maybeValue ) =
            maybeValue |> Maybe.map (property propertyStr)
    in
    case List.filterMap fn styles of
        [] ->
            each [] []

        nonEmpty ->
            where_ selectorStr nonEmpty
