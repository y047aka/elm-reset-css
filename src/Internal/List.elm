module Internal.List exposing (..)

{-| -}

import Css exposing (ListStyle)
import Css.Global exposing (Snippet)
import Css.Reset.EricMeyer exposing (snippets)
import Internal exposing (whereIf)


type alias List_ =
    { olOrUl : OlOrUl
    , listItem : ListItem
    }


type alias OlOrUl =
    {}


type alias ListItem =
    { listStyle : Maybe (ListStyle {}) }


init : List_
init =
    { olOrUl = {}
    , listItem = { listStyle = Nothing }
    }


list : List_ -> List Snippet
list l =
    [ (List.filterMap identity >> whereIf (List.isEmpty snippets) "li")
        [ Maybe.map Css.listStyle l.listItem.listStyle ]
    ]
