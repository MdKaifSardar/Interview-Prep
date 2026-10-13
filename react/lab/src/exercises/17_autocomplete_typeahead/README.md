# Drill 17: Accessible Search Autocomplete Component (Q64)

## Problem Statement
A typeahead component filters suggestions based on input, presents options, and handles selection.

## Task
Implement `<SearchAutocomplete items={items} onSelect={handleSelect} />` in `starter.jsx`.
- Input field (`data-testid="search-input"`).
- Filters `items` case-insensitively based on input value.
- Renders suggestions in list `<ul data-testid="suggestions-list">`.
- Clicking a suggestion (`data-testid={"suggestion-" + item}`) calls `onSelect(item)`, fills the input, and closes the suggestions list.

## Hint
Master Answer Reference: [09-practical-coding-exercises-and-scenario-drills.md](../../answers/09-practical-coding-exercises-and-scenario-drills.md#64-build-an-accessible-dynamic-search-autocomplete--typeahead-component-with-api-debouncing-and-keyboard-navigation)
