module Css.Reset exposing
    ( ericMeyer, html5Doctor, destyle
    , normalize, ress, sanitize, theNewCssReset
    , erc_HardReset, erc_Normalize
    )

{-| This module helps you to reset base styles. Compile it with your elm-css code.

@docs ericMeyer, html5Doctor, destyle
@docs normalize, ress, sanitize, theNewCssReset
@docs erc_HardReset, erc_Normalize

-}

import Css.Global exposing (Snippet)
import Css.Reset.Destyle as Destyle
import Css.Reset.ERC as ERC
import Css.Reset.EricMeyer as EricMeyer
import Css.Reset.Html5Doctor as Html5Doctor
import Css.Reset.Normalize as Normalize
import Css.Reset.Ress as Ress
import Css.Reset.Sanitize as Sanitize
import Css.Reset.TheNewCssReset as TheNewCssReset


{-| <https://meyerweb.com/eric/tools/css/reset/>
-}
ericMeyer : List Snippet
ericMeyer =
    EricMeyer.snippets


{-| <https://github.com/richclark/HTML5resetCSS>
-}
html5Doctor : List Snippet
html5Doctor =
    Html5Doctor.snippets


{-| <https://github.com/nicolas-cusan/destyle.css>
-}
destyle : List Snippet
destyle =
    Destyle.snippets


{-| <https://github.com/necolas/normalize.css>
-}
normalize : List Snippet
normalize =
    Normalize.snippets


{-| <https://github.com/filipelinhares/ress>
-}
ress : List Snippet
ress =
    Ress.snippets


{-| <https://github.com/csstools/sanitize.css>
-}
sanitize : List Snippet
sanitize =
    Sanitize.snippets


{-| <https://github.com/elad2412/the-new-css-reset>
-}
theNewCssReset : List Snippet
theNewCssReset =
    TheNewCssReset.snippets


{-| ElmResetCss
-}
erc_HardReset : List Snippet
erc_HardReset =
    ERC.hardReset


{-| ElmResetCss
-}
erc_Normalize : List Snippet
erc_Normalize =
    ERC.normalize
