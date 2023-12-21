module Internal.Table exposing
    ( Table, init, table
    , browserDefault_table, hardReset_table, normalize_table
    )

{-|

@docs Table, init, table
@docs browserDefault_table, hardReset_table, normalize_table

-}

import Css exposing (BorderCollapse, ExplicitLength, FontWeight, IncompatibleUnits, Length, Style, Visibility)
import Css.Global exposing (Snippet)
import Internal exposing (whereIf)


type alias Table =
    { table : Table_
    , thOrTd : ThOrTd
    }


type alias Table_ =
    { borderCollapse : Maybe (BorderCollapse (Visibility {}))
    , borderSpacing : Maybe (Length {} {})
    }


type alias ThOrTd =
    { padding : Maybe (Length {} {})
    , textAlign : Maybe (ExplicitLength IncompatibleUnits -> Style)
    , verticalAlign : Maybe (ExplicitLength IncompatibleUnits -> Style)
    , fontWeight : Maybe (FontWeight {})
    , border : Maybe (Length {} {})
    }


init : Table
init =
    { table =
        { borderCollapse = Nothing
        , borderSpacing = Nothing
        }
    , thOrTd =
        { padding = Nothing
        , textAlign = Nothing
        , verticalAlign = Nothing
        , fontWeight = Nothing
        , border = Nothing
        }
    }


table : Table -> List Snippet
table t =
    [ (List.filterMap identity >> (\styles -> whereIf (List.isEmpty styles) "table" styles))
        [ Maybe.map Css.borderCollapse t.table.borderCollapse
        , Maybe.map Css.borderSpacing t.table.borderSpacing
        ]
    , (List.filterMap identity >> (\styles -> whereIf (List.isEmpty styles) "th, td" styles))
        [ Maybe.map Css.padding t.thOrTd.padding
        , Maybe.map Css.textAlign t.thOrTd.textAlign
        , Maybe.map Css.verticalAlign t.thOrTd.verticalAlign
        , Maybe.map Css.fontWeight t.thOrTd.fontWeight
        , Maybe.map Css.border t.thOrTd.border
        ]
    ]


browserDefault_table : Table
browserDefault_table =
    init


hardReset_table : Table
hardReset_table =
    let
        table_ =
            init.table
    in
    { init | table = { table_ | borderCollapse = Just Css.collapse } }


normalize_table : Table
normalize_table =
    let
        table_ =
            init.table
    in
    { init | table = { table_ | borderCollapse = Just Css.collapse } }
