# Actual Interface Captures

These screenshots were captured from the integrated Vite production preview through the default checkout's embedded Orca browser on October 9, 2026. They show real application rendering with the fictional preset; they are not generated artwork.

- [desktop.png](desktop.png): 1361 × 948 CSS-pixel viewport, showing the inputs and profit breakdown. Profit is R$25.42; net revenue before costs is R$59.92.
- [mobile.png](mobile.png): 390 × 844 CSS-pixel narrow viewport, showing the introduction and editable inputs.
- [mobile-results.png](mobile-results.png): the same 390 × 844 viewport scrolled to the financial result and beginning of comparison.

The narrow captures use a desktop browser resized to mobile-width CSS dimensions at scale factor 1, not a physical phone. The document width equaled the viewport width (390 pixels), with no page-level horizontal overflow in this state. The interface remains Brazilian Portuguese.

The Orca iPhone 12 emulation and full-page capture attempts produced repeated image tiles; those defective captures were excluded. Viewport screenshots at scale factor 1 were visually inspected and retained without editing. Button behavior was checked using DOM activation through Orca because typed click/key activation did not fire in the tested embedded tab; screenshots do not establish native input-event or assistive-technology compatibility.

The coordinator's clearly labeled [conceptual cover](../images/README.md) is separate from these captures. Remaining presentation work: optionally, a genuine short comparison/inverse-pricing recording. Full-page/mobile-device, pointer/keyboard and screen-reader reviews remain separate follow-up checks.
