module Css.Reset.Ress exposing (snippets)

{-| ress which was converted to [rtfeldman/elm-css](https://package.elm-lang.org/packages/rtfeldman/elm-css/latest/).

@docs snippets

-}

import Css.Global exposing (Snippet)
import Css.Reset.Ress.V4 as V4


{-| Compile it with your elm-css code.
-}
snippets : List Snippet
snippets =
    V4.snippets
