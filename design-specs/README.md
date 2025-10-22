# Design Specifications

This folder contains design mockups, screenshots, and specifications for implementation.

## Folder Structure

```
design-specs/
├── components/     # Individual component designs
├── screens/        # Full screen layouts
└── flows/          # User journey and flow diagrams
```

## How to Use

### Adding Design Specs

1. **Export designs** from Figma as PNG or JPG (1x or 2x resolution)
2. **Name clearly**: `login-screen.png`, `button-primary.png`, `funding-form-step-1.png`
3. **Add to appropriate folder**:
   - Single components → `components/`
   - Full screens → `screens/`
   - User flows → `flows/`

### Implementation Workflow

1. **Add your design** to this folder
2. **Tell Claude**: `"Implement design-specs/screens/login.png"`
3. **Claude will**:
   - Read and analyze the image
   - Ask clarifying questions if needed
   - Implement using Tailwind + Base UI
   - Take a Playwright screenshot for review
4. **You review** the implementation screenshot
5. **Iterate** with feedback

## Design Maturity Levels

- **90-100% polished**: Ready for direct implementation
- **70-90% polished**: Implementation with clarifying questions
- **50-70% polished**: Implementation with UX suggestions

## Tips

- **Annotate** designs with notes, arrows, or specs if helpful
- **Include states**: Show hover, active, error states when relevant
- **Provide context**: Add a text file with additional requirements if needed
- **Version control**: Name files clearly to track iterations (v1, v2, final, etc.)

## What Gets Implemented

Claude implements designs using:
- Existing Tailwind + Base UI component foundation
- Design tokens from `src/design-system/tokens/`
- Component patterns from `src/components/`
- Production-ready, type-safe TypeScript code

## Examples

```
design-specs/
├── components/
│   ├── button-variants.png          # All button states
│   ├── input-validation.png         # Input with error/success
│   └── card-metric.png              # MetricCard component
├── screens/
│   ├── login-v2.png                 # Login screen design
│   ├── dashboard-desktop.png        # Dashboard layout
│   └── funding-form-step-1.png      # First step of application
└── flows/
    └── funding-journey.png           # Complete user flow
```

## Notes

- All designs should be in RGB color mode
- Minimum width: 1280px for desktop, 375px for mobile
- Include any specific font, color, or spacing requirements in a notes.txt file
