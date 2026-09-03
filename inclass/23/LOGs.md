# Custom Element Lifecycle and State Management

*At the end of this lesson, you should be able to*

1. Manage internal component state with class fields, methods, getters, and setters.
1. Use custom element lifecycle callbacks such as `connectedCallback()` and `disconnectedCallback()` to initialize and clean up behavior.
1. Communicate component state changes to the containing page with `CustomEvent`, `detail`, `bubbles`, and `composed`.
1. Explain when to use `connectedCallback()` instead of doing work in the constructor.
1. Synchronize observed attributes with component state using `attributeChangedCallback(name, oldValue, newValue)`.
1. Clean up component event listeners or resources in `disconnectedCallback()`.
1. Dispatch custom events that communicate state changes across the shadow DOM boundary.
