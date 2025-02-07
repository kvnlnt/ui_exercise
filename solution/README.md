# Kevin Lint's OneMain UI Exercise Submission
March 12th, 2024

[View Submission](https://raw.githack.com/kvnlnt/ui_exercise/main/solution/public/index.html)

## Setup
```bash
npm i
npm start
```

Note: solution is served at [localhost:8080](http://localhost:8080/index.html) per [requirements](../README.md)

## Implementation Choices/Comments
- Dev env: pnpm, sirv, and esbuild for a fast, easy, and simple setup.
- DOM Framework: React with TypeScript.
- CSS Framework: None, but using the usehooks-ts lib hooks for responsive behaviors. In an enterprise setting, I would typically recommend a framework like Tailwind.
- Component Library: None. Most component libraries have a "look and feel" that may not match the designs. Additionally, I wanted to showcase my raw HTML/React skills. If I were to recommend a library, it would be ShadCDN.
- Form Library: react-hook-form. Forms are hard.
- File Structure: Simple as requested in requirements. Normally I would use a file structure that would properly separate out pages, features, modules, components, services, etc. (I use a "clean code"/Hex inspired architecture)