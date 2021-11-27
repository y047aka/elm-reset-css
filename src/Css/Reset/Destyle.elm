module Css.Reset.Destyle exposing (latest)

{-|


# destyle.css

@docs latest

-}

import Css.Global exposing (Snippet)
import Css.Reset.Destyle.V3 as V3


{-| v3.0.0 (2021-09-06)  
Nicolas Cusan / MIT  
<https://github.com/nicolas-cusan/destyle.css>
-}
latest : List Snippet
latest =
    V3.v3
