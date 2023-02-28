# Front End

As front end framework/library we are using [ReactJs](https://reactjs.org/).

You can check out the [about](../about/index.md#included-third-party-projects) page for a list of the **third party projects** being used.

### Global variables

The global variables can be found at `variables.css`. You can import it into your stylesheet using

```css
@import url(./variables.css);
```

## Component architecture

```mermaid
flowchart TD
    App --> MainPage
    App --> ExperimentPage
    MainPage --> SideBar
    SideBar --> Header
    MainPage --> Content
    Content --> Início
    Content --> Calibrar
    Content --> Controlar
    Content --> Config.
    Content --> Sobre

```

