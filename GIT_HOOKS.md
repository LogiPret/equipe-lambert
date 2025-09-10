# Git Hooks Setup 🪝

This project uses [Husky](https://typicode.github.io/husky/) to enforce code quality standards across the entire team.

## What happens automatically:

### Pre-commit Hook 🔍

- **Format Check**: Verifies all code is properly formatted with Prettier
- **Blocks commits** if formatting issues are found
- **Quick feedback**: Tells you to run `npm run format` to fix issues

### Pre-push Hook 🚀

- **Auto-format**: Runs Prettier to format all code
- **Build validation**: Runs `npm run build` to catch compilation errors
- **Auto-commit formatting**: If code gets formatted, changes are automatically added
- **Blocks broken pushes**: Only allows push if both formatting and build succeed

## Setup for new team members:

### Automatic Setup ✨

When you run `npm install` or `pnpm install`, Husky hooks are **automatically installed** thanks to the `prepare` script in `package.json`.

**No manual setup required!** 🎊

### Manual Commands Available:

```bash
# Format all code manually
npm run format

# Check if code is properly formatted (without changing files)
npm run format:check

# Build the project
npm run build
```

## Benefits:

- ✅ **Consistent code style** across the entire team
- ✅ **No build failures** in production
- ✅ **Zero configuration** for new team members
- ✅ **Automatic code cleanup** before every push
- ✅ **Prevents broken code** from reaching the repository

## Troubleshooting:

If hooks aren't working after cloning:

```bash
# Reinstall Husky hooks
npx husky install
```
