module Css.Reset exposing
    ( erc_HardReset, erc_Normalize
    , ericMeyer, html5Doctor
    , normalize, sanitize, ress, destyle
    , theNewCssReset
    )

{-| This module helps you to reset base styles. Compile it with your elm-css code.

@docs erc_HardReset, erc_Normalize


# Collection

  - [Eric Meyer’s Reset CSS (2008)](https://meyerweb.com/eric/tools/css/reset/)  
    v2.0 (2011-01-26)  
    Eric Meyer / none (public domain)

  - [html5doctor.com Reset Stylesheet (2009)](https://github.com/richclark/HTML5resetCSS)  
    v1.6.1 (2010-09-17)  
    Richard Clark / Free of charge under a CC0 Public Domain Dedication and MIT License

  - [Normalize.css (2011)](https://github.com/necolas/normalize.css)  
    v8.0.1 (2018-11-05)  
    Nicolas Gallagher / MIT

  - [sanitize.css (2012)](https://github.com/csstools/sanitize.css)  
    v12.0.1 (2020-08-20)  
    CSS Tools / CC0 1.0 Universal

  - [ress (2015)](https://github.com/filipelinhares/ress)  
    v4.0.0 (2021-04-21)  
    Filipe Linhares / MIT

  - [destyle.css (2019)](https://github.com/nicolas-cusan/destyle.css)  
    v2.0.2 (2020-10-16)  
    Nicolas Cusan / MIT

  - [The New CSS Reset (2021)](https://github.com/elad2412/the-new-css-reset)  
    v1.3.1 (2021-10-28)  
    Elad Shechter / MIT

@docs ericMeyer, html5Doctor
@docs normalize, sanitize, ress, destyle
@docs theNewCssReset

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


{-| -}
ericMeyer : List Snippet
ericMeyer =
    EricMeyer.snippets


{-| -}
html5Doctor : List Snippet
html5Doctor =
    Html5Doctor.snippets


{-| -}
destyle : List Snippet
destyle =
    Destyle.snippets


{-| -}
normalize : List Snippet
normalize =
    Normalize.snippets


{-| -}
ress : List Snippet
ress =
    Ress.snippets


{-| -}
sanitize : List Snippet
sanitize =
    Sanitize.snippets


{-| -}
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
