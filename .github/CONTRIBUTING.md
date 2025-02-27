# Contribution Guide

Thank you for your interest in contributing to the DuploJS examples! This document provides guidelines for contributing to the project.

## How to Contribute

### 1. Create an Issue

Before submitting a new example, first create an issue using the "New Example" template. This allows us to:

- Discuss the relevance of the example  
- Validate the technical aspects  
- Avoid duplicates  

### 2. Prepare Your Example

- Ensure your example is functional  
- Test it locally  
- Clearly document the code  
- Follow the naming conventions:  

```
  examples/
  └── example-name/
      ├── src/
      ├── package.json
      └── README.md
```

### 3. Submit a Pull Request

1. Fork the repository  
2. Create a branch: `git checkout -b example/example-name`  
3. Commit your changes: `git commit -am 'example: add example xxx'`  
4. Push to your fork: `git push origin example/example-name`  
5. Open a Pull Request using the provided template  

## Code Standards

### File Structure

- Each example should be in its own folder  
- Include a `README.md` describing:  
  - The purpose of the example  
  - How to run it  
  - The DuploJS concepts demonstrated  

### Commit Conventions

Follow the conventional commit format:

- `example:` for a new example  
- `fix:` for a bug fix

### Versioning

- Clearly specify the DuploJS version used  
- Keep dependencies up to date  
- Test with the latest stable version of DuploJS  

## Review Process

1. Maintainers will review your PR  
2. Changes may be requested  
3. Once approved, your example will be merged  

## Questions?

If you have any questions, feel free to:

- Open an issue  
- Ask for help in GitHub discussions  
- Check the [official documentation](https://docs.duplojs.dev/en/latest/)  

Thank you for helping make DuploJS more accessible to everyone! 🎉  
