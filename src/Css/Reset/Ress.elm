module Css.Reset.Ress exposing
    ( v4, v3, v2
    , latest
    )

{-|


# ress

@docs v4, v3, v2
@docs latest

-}

import Css.Global exposing (Snippet)
import Css.Reset.Ress.V2 as V2
import Css.Reset.Ress.V3 as V3
import Css.Reset.Ress.V4 as V4


{-| v4.0.0 (2021-04-21)  
Filipe Linhares / MIT  
<https://github.com/filipelinhares/ress>
-}
v4 : List Snippet
v4 =
    V4.v4


{-| <https://github.com/filipelinhares/ress/tree/3.0.0>
-}
v3 : List Snippet
v3 =
    V3.v3


{-| <https://github.com/filipelinhares/ress/tree/2.0.4>
-}
v2 : List Snippet
v2 =
    V2.v2


{-| Deprecated.
-}
latest : List Snippet
latest =
    v4
