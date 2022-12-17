module Css.Reset.Destyle exposing
    ( v3, v2
    , latest
    )

{-|


# destyle.css

@docs v3, v2
@docs latest

-}

import Css.Global exposing (Snippet)
import Css.Reset.Destyle.V2 as V2
import Css.Reset.Destyle.V3 as V3


{-| v3.0.2 (2021-12-07)
Nicolas Cusan / MIT
<https://github.com/nicolas-cusan/destyle.css>
-}
v3 : List Snippet
v3 =
    V3.snippets


{-| <https://github.com/nicolas-cusan/destyle.css/tree/v2.0.2>
-}
v2 : List Snippet
v2 =
    V2.snippets


{-| Deprecated.
-}
latest : List Snippet
latest =
    v3
