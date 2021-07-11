// Maybe use enum instead of literal string.
export enum ResourceState {
  "idle" = "idle",
  "loading" = "loading",
  "loaded" = "loaded",
  "error" = "error"
}

// Maybe add model instead of using dto directly.
// In this case, seems they are identical so probably fine.
