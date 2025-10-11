# CSS Component Architecture

## Overview
Maximum modularization: Each visual component has its own dedicated CSS file for ultimate maintainability and organization.

## File Structure (15 CSS Files)

### Foundation (2 files)
1. **`base.css`** - Variables, reset, body, scanlines, typography, container
2. **`responsive.css`** - All media queries for different screen sizes

### Header & Navigation (3 files)
3. **`header.css`** - Header wrapper and layout
4. **`logo.css`** - Logo, subtitle, and login button styles
5. **`navigation.css`** - Nav menu, toggle, links, hover states

### Home Page Components (6 files)
6. **`main-content.css`** - Main content wrapper
7. **`hero.css`** - Hero section with title and subtitle
8. **`console.css`** - Animated Atari console illustration
9. **`features.css`** - Course overview and feature grid
10. **`lesson-cards.css`** - Lesson grid and card components
11. **`footer.css`** - Footer styles

### Lesson Page Components (3 files)
12. **`lesson-layout.css`** - Lesson page structure, sections, images
13. **`video.css`** - Responsive video container (16:9)
14. **`code-blocks.css`** - Code blocks, copy button, syntax highlighting

### Backup
15. **`style.css.old`** - Original monolithic file (backup)

## Import Strategy by Page

### index.html (Home Page)
```html
<!-- Base styles -->
<link rel="stylesheet" href="css/base.css">
<!-- Header components -->
<link rel="stylesheet" href="css/header.css">
<link rel="stylesheet" href="css/logo.css">
<link rel="stylesheet" href="css/navigation.css">
<!-- Page components -->
<link rel="stylesheet" href="css/main-content.css">
<link rel="stylesheet" href="css/hero.css">
<link rel="stylesheet" href="css/console.css">
<link rel="stylesheet" href="css/features.css">
<link rel="stylesheet" href="css/lesson-cards.css">
<link rel="stylesheet" href="css/footer.css">
<!-- Responsive -->
<link rel="stylesheet" href="css/responsive.css">
```

### lessons/lesson.html (Lesson Pages)
```html
<!-- Base styles -->
<link rel="stylesheet" href="../css/base.css">
<!-- Header components -->
<link rel="stylesheet" href="../css/header.css">
<link rel="stylesheet" href="../css/logo.css">
<link rel="stylesheet" href="../css/navigation.css">
<!-- Page components -->
<link rel="stylesheet" href="../css/main-content.css">
<link rel="stylesheet" href="../css/footer.css">
<!-- Lesson-specific -->
<link rel="stylesheet" href="../css/lesson-layout.css">
<link rel="stylesheet" href="../css/video.css">
<link rel="stylesheet" href="../css/code-blocks.css">
<!-- Responsive -->
<link rel="stylesheet" href="../css/responsive.css">
```

### login.html (Login Page)
```html
<!-- Base styles -->
<link rel="stylesheet" href="css/base.css">
<!-- Header components -->
<link rel="stylesheet" href="css/header.css">
<link rel="stylesheet" href="css/logo.css">
<link rel="stylesheet" href="css/navigation.css">
<!-- Page components -->
<link rel="stylesheet" href="css/main-content.css">
<link rel="stylesheet" href="css/footer.css">
<!-- Responsive -->
<link rel="stylesheet" href="css/responsive.css">
```

## Component Details

### base.css (Foundation)
- CSS custom properties (colors, fonts)
- Global reset (margin, padding, box-sizing)
- Body background gradient
- Scanlines animation effect
- Typography rules (pixel font vs readable font)
- Container max-width and centering

### header.css
- Header padding and border
- Brown translucent background
- Header-top flexbox layout
- Z-index layering

### logo.css
- Logo h1 styling with text-shadow
- Subtitle inline styling
- Login button (red background, yellow border)
- Hover effects with transform

### navigation.css
- Nav menu positioning
- Nav toggle button (mobile)
- Nav list grid (5 columns default)
- Nav link buttons with hover states
- Active link styling

### main-content.css
- Simple wrapper with vertical padding

### hero.css
- Centered text layout
- Large title with shadow
- Subtitle with readable font
- Radial gradient background

### console.css
- Animated Atari 2600 illustration
- Glow animation keyframes
- Console body gradient
- Switches and cartridge slot

### features.css
- Course overview heading
- Features grid (auto-fit minmax)
- Feature cards with hover lift
- Icons and typography

### lesson-cards.css
- Lesson grid layout
- Individual lesson cards
- Lesson number badge (circle)
- Card hover effects
- Lesson link button

### footer.css
- Footer centering and padding
- Orange border top
- Small text sizing

### lesson-layout.css
- Lesson content max-width (1500px)
- Lesson header and title
- Section spacing and borders
- Typography hierarchy
- Lesson images with sepia filter

### video.css
- Responsive 16:9 container (padding-bottom trick)
- Border and background
- Absolute positioned iframe

### code-blocks.css
- Dark code container
- Monospace pre formatting
- Copy button positioning
- Assembly syntax classes (colors for instructions, registers, etc.)

### responsive.css
- 1400px+: 7-column nav
- 1100-1399px: 5-column nav
- 900-1099px: 4-column nav
- 769-899px: 3-column nav
- ≤768px: Mobile (hamburger, single column grids)

## Benefits of This Architecture

✅ **Maximum Modularity** - Each component is isolated
✅ **Easy to Find** - Intuitive file names match components
✅ **Selective Loading** - Only load what each page needs
✅ **Parallel Development** - Multiple devs can edit simultaneously
✅ **Easy Testing** - Test/disable individual components
✅ **Clear Dependencies** - Import order shows relationships
✅ **Minimal Conflicts** - Isolated scopes reduce CSS specificity wars
✅ **Performance Ready** - Can lazy-load or bundle strategically
✅ **Documentation Built-in** - File structure IS the documentation

## Maintenance Guidelines

1. **One Component = One File** - Never mix unrelated components
2. **Keep Imports Organized** - Use HTML comments to group imports
3. **Load Order Matters** - base.css first, responsive.css last
4. **Shared Styles** - Go in base.css (variables, typography)
5. **Test After Changes** - Verify on all three page types
6. **Version Control** - Each file can be tracked independently

## Quick Reference: What Goes Where

| Need to change... | Edit this file... |
|-------------------|-------------------|
| Colors or fonts | `base.css` |
| Header layout | `header.css` |
| Logo appearance | `logo.css` |
| Navigation menu | `navigation.css` |
| Hero section | `hero.css` |
| Console animation | `console.css` |
| Feature cards | `features.css` |
| Lesson cards | `lesson-cards.css` |
| Footer | `footer.css` |
| Lesson page layout | `lesson-layout.css` |
| Video embeds | `video.css` |
| Code syntax | `code-blocks.css` |
| Mobile/tablet | `responsive.css` |

## File Sizes

- base.css: ~2.5 KB
- header.css: ~0.4 KB
- logo.css: ~1.1 KB
- navigation.css: ~1.6 KB
- main-content.css: ~0.1 KB
- hero.css: ~0.5 KB
- console.css: ~1.1 KB
- features.css: ~1.1 KB
- lesson-cards.css: ~1.9 KB
- footer.css: ~0.3 KB
- lesson-layout.css: ~1.5 KB
- video.css: ~0.5 KB
- code-blocks.css: ~1.3 KB
- responsive.css: ~2.5 KB

**Total: ~16.5 KB** (highly cacheable, individually versioned)

## Migration Notes

- Original `style.css` (663 lines) → 15 focused files
- No functionality lost - all styles preserved
- HTML updated with grouped imports
- Old file kept as `style.css.old` for reference
