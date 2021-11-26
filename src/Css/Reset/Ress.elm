module Css.Reset.Ress exposing (snippets, v3, v2)

{-|

@docs snippets, v3, v2

-}

import Css.Global exposing (Snippet)
import Css.Reset.Ress.V2 as V2
import Css.Reset.Ress.V3 as V3
import Css.Reset.Ress.V4 as V4


{-| v4.0.0
-}
snippets : List Snippet
snippets =
    V4.snippets


{-| v3.0.1
-}
v3 : List Snippet
v3 =
    V3.snippets


{-| v2.0.4
-}
v2 : List Snippet
v2 =
    V2.snippets
