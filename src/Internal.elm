module Internal exposing (whereIf, where_)

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
selectorIf bool selector_ styles =
    if bool then
        selector selector_ styles

    else
        each [] []


where_ : String -> List Style -> Snippet
where_ selector_ styles =
    selector (":where(" ++ selector_ ++ ")") styles


whereIf : Bool -> String -> List Style -> Snippet
whereIf bool selector_ styles =
    selectorIf bool (":where(" ++ selector_ ++ ")") styles
