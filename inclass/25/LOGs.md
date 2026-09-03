# Testing Custom Elements

*At the end of this lesson, you should be able to*

1. Describe why browser-oriented code needs different testing tools than pure JavaScript functions.
1. Explain what JSDOM can test well and where its browser simulation has limits.
1. Use Vitest and JSDOM to test a feature-complete custom element.
1. Render a custom element in a test and assert content inside its Shadow DOM.
1. Test a custom element's public contract through properties, observed attributes, public methods, and custom events.
1. Explain why bubbling and composed custom events matter when an event crosses a Shadow DOM boundary.
1. Use Vitest Browser Mode with the preview provider to smoke-test a component in a real browser context.
1. Map third-party API data into the shape a component expects.
1. Stabilize random or live API data in tests with `vi.stubGlobal('fetch', ...)`.
1. Use MSW to mock an external HTTP request at the request boundary.
