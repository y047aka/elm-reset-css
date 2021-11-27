module Css.Reset.Sanitize exposing (latest)

{-|


# sanitize.css

@docs latest

-}

import Css.Global exposing (Snippet)
import Css.Reset.Sanitize.V13 as V13


{-| v13.0.0 (2021-09-14)  
CSS Tools / CC0 1.0 Universal  
<https://github.com/csstools/sanitize.css>
-}
latest : List Snippet
latest =
    V13.v13
