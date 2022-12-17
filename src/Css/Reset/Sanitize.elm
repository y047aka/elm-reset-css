module Css.Reset.Sanitize exposing
    ( v13, v12
    , latest
    )

{-|


# sanitize.css

@docs v13, v12
@docs latest

-}

import Css.Global exposing (Snippet)
import Css.Reset.Sanitize.V12 as V12
import Css.Reset.Sanitize.V13 as V13


{-| v13.0.0 (2021-09-14)
CSS Tools / CC0 1.0 Universal
<https://github.com/csstools/sanitize.css>
-}
v13 : List Snippet
v13 =
    V13.snippets


{-| <https://github.com/csstools/sanitize.css/tree/12.0.1>
-}
v12 : List Snippet
v12 =
    V12.snippets


{-| Deprecated.
-}
latest : List Snippet
latest =
    v13
