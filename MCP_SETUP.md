# MCP Server Configuration

Guide for configuring and troubleshooting Model Context Protocol (MCP) servers in Claude Code CLI.

---

## Important: Claude Code CLI vs Claude Desktop

**Context**: MCP servers enable Claude Code to access external tools and services (documentation, browsers, design tools, databases, APIs, etc.)

**You are using Claude Code CLI** (terminal-based), NOT Claude Desktop (GUI app). These are separate applications with separate configurations.

**DO NOT** confuse with Claude Desktop:
- **Claude Desktop** (GUI app): Uses `/Users/chris/Library/Application Support/Claude/claude_desktop_config.json`
- **Claude Code CLI** (terminal): Uses `~/.claude.json`
- These are SEPARATE applications with SEPARATE configs

---

## Configuration Locations

MCP servers can be configured at three levels (in order of precedence):

1. **Project-scoped** (current project only):
   ```
   .mcp.json (in project root)
   ```

2. **User-scoped** (all your projects):
   ```
   ~/.claude.json
   ```

3. **Enterprise-managed** (if applicable):
   - macOS: `/Library/Application Support/ClaudeCode/managed-mcp.json`
   - Linux: `/etc/claude-code/managed-mcp.json`

**Primary config for this setup**: `~/.claude.json` (user-level, shared across all projects)

---

## Current Active MCP Servers

**Working** ✓:
- **mui-mcp**: Material-UI documentation access
- **context7**: Up-to-date library documentation (React, Next.js, etc.)
- **playwright**: Browser automation and testing (headless mode enabled)

**Configured but Failed** ✗:
- **github**: GitHub API (needs authentication)
- **figma variants**: Multiple figma MCP servers (6 failing, 1 needs auth)

---

## Configuration File Structure

### User-level (`~/.claude.json`)

```json
{
  "mcpServers": {
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "your-api-key"
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"],
      "env": {
        "HEADLESS": "true"
      }
    }
  }
}
```

### Project-level (`.mcp.json` in project root)

```json
{
  "mcpServers": {
    "project-specific-server": {
      "command": "npx",
      "args": ["-y", "some-mcp-package"]
    }
  }
}
```

---

## Managing MCP Servers

### Check Status

```bash
claude mcp list
```

### Add Server (User-level)

```bash
claude mcp add servername --scope user
```

### Edit Config Manually

```bash
# User-level (all projects)
open -e ~/.claude.json

# Project-level (current project only)
open -e .mcp.json
```

### Restart

Exit and restart Claude Code CLI after config changes.

---

## Common Issues & Solutions

### MCP Not Working

Check config JSON syntax with:
```bash
claude mcp list
```

### Permission Errors

Ensure command paths and file permissions are correct.

### Server Failed

Check if npm package exists and is compatible.

### Needs Authentication

Add required API keys in `env` or `headers` section.

---

## Best Practices

1. Use `~/.claude.json` for servers you want across all projects
2. Use `.mcp.json` for project-specific servers
3. Keep sensitive data (API tokens) in environment variables when possible
4. Test servers individually before adding multiple
5. Run `claude mcp list` to verify server health after changes
6. Remove failed/unused servers to keep config clean

---

## Playwright Headless Mode Configuration

To prevent Playwright from stealing focus with browser windows:

```json
"playwright": {
  "command": "npx",
  "args": ["@playwright/mcp@latest"],
  "env": {
    "HEADLESS": "true"
  }
}
```

This runs Playwright invisibly in the background while maintaining full automation capabilities (click, type, scroll, screenshots, etc.).

---

## Reference Documentation

- **Official Docs**: https://docs.claude.com/en/docs/claude-code/mcp
- **Available Servers**: Check npm for `@modelcontextprotocol/server-*` packages and MCP registry
- **Archived Docs**: `design-specs/archive/` contains older documentation (may be outdated)
