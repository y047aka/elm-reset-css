module Css.Reset.Ress exposing
    ( v5, v4, v3, v2
    , latest
    )

{-|


# ress

@docs v5, v4, v3, v2
@docs latest

-}

import Css.Global exposing (Snippet)
import Css.Reset.Ress.V2 as V2
import Css.Reset.Ress.V3 as V3
import Css.Reset.Ress.V4 as V4
import Css.Reset.Ress.V5 as V5


{-| v5.0.2 (2022-03-09)
Filipe Linhares / MIT
<https://github.com/filipelinhares/ress>
-}
v5 : List Snippet
v5 =
    V5.snippets


{-| -}
v4 : List Snippet
v4 =
    V4.snippets


{-| <https://github.com/filipelinhares/ress/tree/3.0.0>
-}
v3 : List Snippet
v3 =
    V3.snippets


{-| <https://github.com/filipelinhares/ress/tree/2.0.4>
-}
v2 : List Snippet
v2 =
    V2.snippets


{-| Deprecated.
-}
latest : List Snippet
latest =
    v5
