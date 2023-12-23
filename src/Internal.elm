module Internal exposing (selectorIfNonEmpty, whereIfNonEmpty)

import Css exposing (Style, batch)
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


selectorIfNonEmpty : String -> List (Maybe Style) -> Snippet
selectorIfNonEmpty selectorStr styles =
    case List.filterMap identity styles of
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


whereIfNonEmpty : String -> List (Maybe Style) -> Snippet
whereIfNonEmpty selectorStr styles =
    case List.filterMap identity styles of
        [] ->
            each [] []

        nonEmpty ->
            where_ selectorStr nonEmpty
