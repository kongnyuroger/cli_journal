function showHelp() {
  console.log(`
Developer Journal CLI – Usage
=============================
journal add               Create a new entry interactively
journal search [options]  Search entries
journal list [options]    List entries
journal --help            Show this help
journal
Search options:
  --keyword <text>        Free-text search in title/body
  --tag <tag>             Filter by tag
  --date <YYYY-MM-DD>     Exact date
  --from <YYYY-MM-DD> --to <YYYY-MM-DD>  Date range

List options:
  --limit <n>             Max rows to display (default: none)
`);
}

export default showHelp;