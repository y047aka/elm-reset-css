module Css.Reset.Ress exposing (latest, v3, v2)

{-|


# ress

@docs latest, v3, v2

-}

import Css.Global exposing (Snippet)
import Css.Reset.Ress.V2 as V2
import Css.Reset.Ress.V3 as V3
import Css.Reset.Ress.V4 as V4


{-| v4.0.0 (2021-04-21)  
Filipe Linhares / MIT  
<https://github.com/filipelinhares/ress>
-}
latest : List Snippet
latest =
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
