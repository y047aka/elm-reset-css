module Css.Reset.Destyle exposing
    ( v4, v3, v2
    , latest
    )

{-|


# destyle.css

@docs v4, v3, v2
@docs latest

-}

import Css.Global exposing (Snippet)
import Css.Reset.Destyle.V2 as V2
import Css.Reset.Destyle.V3 as V3
import Css.Reset.Destyle.V4 as V4


{-| v4.0.0 (2022-11-08)
Nicolas Cusan / MIT
<https://github.com/nicolas-cusan/destyle.css>
-}
v4 : List Snippet
v4 =
    V4.snippets


{-| <https://github.com/nicolas-cusan/destyle.css/tree/v3.0.2>
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
    v4
