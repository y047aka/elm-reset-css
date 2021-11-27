module Css.Reset.Destyle exposing (latest, v2)

{-|


# destyle.css

@docs latest, v2

-}

import Css.Global exposing (Snippet)
import Css.Reset.Destyle.V2 as V2
import Css.Reset.Destyle.V3 as V3


{-| v3.0.0 (2021-09-06)  
Nicolas Cusan / MIT  
<https://github.com/nicolas-cusan/destyle.css>
-}
latest : List Snippet
latest =
    V3.v3


{-| <https://github.com/nicolas-cusan/destyle.css/tree/v2.0.2>
-}
v2 : List Snippet
v2 =
    V2.v2
