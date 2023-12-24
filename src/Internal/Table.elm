module Internal.Table exposing
    ( Table, init
    , browserDefault_table, hardReset_table, normalize_table
    )

{-|

@docs Table, init
@docs browserDefault_table, hardReset_table, normalize_table

-}

import Css exposing (BorderCollapse, ExplicitLength, FontWeight, IncompatibleUnits, Length, Style, Visibility)


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
