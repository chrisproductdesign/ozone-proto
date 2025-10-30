# MCP Server Configuration Guide (ARCHIVED - OUTDATED)

**⚠️ WARNING**: This document contains OUTDATED information for Claude Desktop.

**You are using Claude Code CLI**, not Claude Desktop. For current, correct information, see `/CLAUDE.md` in the project root.

---

## OUTDATED: Claude Desktop Configuration

**This section is for Claude Desktop (GUI app), NOT Claude Code CLI:**

Claude Desktop config location:
```
/Users/chris/Library/Application Support/Claude/claude_desktop_config.json
```

**For Claude Code CLI** (what you're actually using), use:
```
~/.claude.json (user-level)
.mcp.json (project-level)
```

**DO NOT** modify the GitHub claude-code repository for MCP configuration.

---

## ⚠️ STOP - Use Current Documentation

**See `/CLAUDE.md` for correct Claude Code CLI MCP setup instructions.**

---

# Original Archived Content Below:

## Current Configuration
Your current MCP config only has the filesystem server:
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/chris/Desktop",
        "/Users/chris/Downloads"
      ]
    }
  }
}
```

## Adding More MCP Servers
To add more MCP servers, edit the config file and add entries. Example:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/chris/Desktop",
        "/Users/chris/Downloads",
        "/Users/chris/Claude",
        "/Users/chris/Documents"
      ]
    },
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_TOKEN": "your-github-token-here"
      }
    },
    "unity": {
      "command": "python",
      "args": [
        "/Users/chris/.config/UnityMCP/UnityMcpServer/src/mcp_server.py"
      ]
    }
  }
}
```

## Available MCP Servers

### 1. Official MCP Servers
Install with npm/npx:
- `@modelcontextprotocol/server-filesystem` - File system access
- `@modelcontextprotocol/server-github` - GitHub integration
- `@modelcontextprotocol/server-gitlab` - GitLab integration
- `@modelcontextprotocol/server-google-drive` - Google Drive access
- `@modelcontextprotocol/server-postgres` - PostgreSQL database access
- `@modelcontextprotocol/server-sqlite` - SQLite database access
- `@modelcontextprotocol/server-slack` - Slack integration

### 2. Custom/Community Servers
- UnityMCP (already installed at `~/.config/UnityMCP/`)
- MUI MCP (for Material-UI documentation)
- Others from the MCP community

## Installation Steps

1. **Edit the config file**:
   ```bash
   open -e "/Users/chris/Library/Application Support/Claude/claude_desktop_config.json"
   ```

2. **Add server configurations** following the JSON format above

3. **Restart Claude Desktop** app for changes to take effect

4. **Verify** servers are working by checking if Claude can access them

## Troubleshooting

### If GitHub Desktop Shows "Branched Off"
This is likely because:
1. You have untracked files (`.DS_Store`) - these can be ignored
2. GitHub Desktop UI issue - try refreshing or restarting the app

To clean up:
```bash
cd /Users/chris/Documents/GitHub/claude-code
echo ".DS_Store" >> .gitignore
git add .gitignore
git commit -m "Add .DS_Store to gitignore"
```

### If MCP Servers Don't Work
1. Check the Claude Desktop logs
2. Verify the command paths are correct
3. Ensure required dependencies are installed
4. Check environment variables (especially for API tokens)

## Best Practices

1. **Never modify** the claude-code GitHub repository for MCP configuration
2. **Keep config** in the official location (`~/Library/Application Support/Claude/`)
3. **Use environment variables** for sensitive data like API tokens
4. **Test servers** individually before adding multiple at once
5. **Backup** your config file before making changes

## CLI Access to MCP Servers

When using Claude Code CLI, MCP servers configured in the desktop app should be available. The CLI reads from the same configuration file.

If you need CLI-specific configuration, you can create:
```
~/.config/claude/claude_desktop_config.json
```

But it's better to use the single configuration in Application Support for consistency.