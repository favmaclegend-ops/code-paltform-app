# Contributing to CodePlatform

Thank you for your interest in contributing to CodePlatform! We appreciate your help in making this learning platform better for everyone. This guide will help you get started with contributing to the project.

## 🌟 Ways to Contribute

- 🐛 **Bug Reports** - Help us identify and fix issues
- ✨ **Feature Requests** - Suggest new functionality
- 💻 **Code Contributions** - Submit pull requests with improvements
- 📚 **Documentation** - Improve our docs and examples
- 🎨 **Design** - Enhance UI/UX and design system
- 🧪 **Testing** - Add tests and improve test coverage
- 💬 **Community** - Help answer questions and support users

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js** 18+ and npm
- **Python** 3.8+
- **Git** for version control
- A **GitHub account**
- Basic knowledge of **React/Next.js** and **FastAPI/Python**

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork the repo on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/code-platform-app.git
   cd code-platform-app
   ```

2. **Set up the backend**
   ```bash
   cd backend
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   pip install -r requirements.txt  # After we create requirements.txt
   python create_db.py
   python run.py
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

## 📝 Contribution Guidelines

### Code Style

#### Frontend (TypeScript/React)
- Use **TypeScript** for all new code
- Follow **ESLint** and **Prettier** configurations
- Use **functional components** with hooks
- Implement **proper error boundaries**
- Follow **accessibility best practices**

**Example component structure:**
```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { ComponentProps } from './types';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function MyComponent({ 
  title, 
  onAction, 
  variant = 'primary' 
}: MyComponentProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Effect logic here
  }, []);

  return (
    <div className="component-container">
      <h2 className="text-xl font-semibold">{title}</h2>
      {/* Component JSX */}
    </div>
  );
}
```

#### Backend (Python/FastAPI)
- Follow **PEP 8** style guidelines
- Use **type hints** for all functions
- Implement **proper error handling**
- Add **docstrings** for functions and classes
- Use **Pydantic models** for data validation

**Example API endpoint:**
```python
from fastapi import HTTPException, Depends
from pydantic import BaseModel
from typing import Optional

class UserRequest(BaseModel):
    username: str
    email: str
    role: str

@app.post("/api/users", response_model=UserResponse)
async def create_user(
    user_data: UserRequest,
    db: Session = Depends(get_db)
) -> UserResponse:
    """
    Create a new user account.
    
    Args:
        user_data: User registration data
        db: Database session
        
    Returns:
        UserResponse: Created user data
        
    Raises:
        HTTPException: If user already exists
    """
    try:
        # Implementation here
        return UserResponse(...)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
```

### Design System Guidelines

When contributing to the UI/UX:

#### Color Usage
```css
/* Use semantic color variables */
.button-primary {
  background: var(--primary-600);
  color: var(--primary-50);
}

.button-primary:hover {
  background: var(--primary-700);
}
```

#### Component Styling
- Use **Tailwind CSS** utility classes
- Follow the **design system** color palette
- Implement **dark mode** support for all components
- Add **smooth transitions** (200-300ms)
- Include **hover and focus states**

#### Typography
```tsx
// Use consistent text sizing
<h1 className="text-4xl font-bold">Main Heading</h1>
<h2 className="text-2xl font-semibold">Section Title</h2>
<p className="text-base text-secondary-600">Body text</p>
```

### Git Workflow

#### Commit Messages
Use conventional commit format:

```
type(scope): description

feat(auth): add JWT token refresh mechanism
fix(ui): resolve dark mode toggle animation
docs(readme): update installation instructions
style(components): improve button hover states
refactor(api): simplify user authentication flow
test(auth): add unit tests for login functionality
```

#### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Pull Request Process

1. **Before submitting**
   - ✅ Run tests: `npm test` (frontend) and `pytest` (backend)
   - ✅ Check linting: `npm run lint`
   - ✅ Ensure all commits follow convention
   - ✅ Update documentation if needed

2. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature  
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   - [ ] Unit tests pass
   - [ ] Integration tests pass
   - [ ] Manual testing completed

   ## Screenshots (if applicable)
   Before/after screenshots for UI changes

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex code
   - [ ] Documentation updated
   ```

3. **Review Process**
   - PRs require **1 review** for minor changes
   - PRs require **2 reviews** for major features
   - All **CI checks** must pass
   - **Conflicts** must be resolved

## 🧪 Testing Guidelines

### Frontend Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

**Example test structure:**
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Button from '../components/Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(
      <ThemeProvider>
        <Button>Click me</Button>
      </ThemeProvider>
    );
    
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(
      <ThemeProvider>
        <Button onClick={handleClick}>Click me</Button>
      </ThemeProvider>
    );
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Backend Testing
```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=.

# Run specific test file
pytest tests/test_auth.py
```

**Example test structure:**
```python
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_signup_success():
    """Test successful user signup."""
    response = client.post("/signup", json={
        "username": "testuser",
        "email": "test@example.com",
        "password": "TestPass123!",
        "role": "student"
    })
    
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "user_id" in data

def test_signup_duplicate_email():
    """Test signup with duplicate email."""
    # Create user first
    client.post("/signup", json={
        "username": "testuser",
        "email": "test@example.com", 
        "password": "TestPass123!",
        "role": "student"
    })
    
    # Try to create duplicate
    response = client.post("/signup", json={
        "username": "testuser2",
        "email": "test@example.com",
        "password": "TestPass123!",
        "role": "student"
    })
    
    assert response.status_code == 400
```

## 🐛 Bug Reports

When reporting bugs, please include:

### Bug Report Template
```markdown
**Bug Description**
A clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen

**Actual Behavior** 
What actually happened

**Screenshots**
If applicable, add screenshots

**Environment**
- OS: [e.g. iOS, Windows, Linux]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
- Node.js version:
- Python version:

**Additional Context**
Any other relevant information
```

## ✨ Feature Requests

For feature requests, please include:

### Feature Request Template
```markdown
**Feature Description**
Clear description of the feature

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this feature work?

**Alternatives Considered**
Other solutions you've considered

**Additional Context**
Mockups, examples, or related issues

**Implementation Ideas**
Technical suggestions (optional)
```

## 🎨 Design Contributions

### UI/UX Guidelines

1. **Follow the Design System**
   - Use established color palette
   - Maintain consistent spacing (4px grid)
   - Follow typography scale
   - Implement proper component states

2. **Accessibility First**
   - Maintain 4.5:1 contrast ratio
   - Include focus indicators
   - Support keyboard navigation
   - Add proper ARIA labels

3. **Mobile-First Design**
   - Start with mobile layouts
   - Use responsive breakpoints
   - Test on various screen sizes
   - Optimize touch targets (44px minimum)

4. **Animation Principles**
   - Use ease-out timing (200-300ms)
   - Prefer transform over layout changes
   - Add purposeful micro-interactions
   - Respect prefers-reduced-motion

### Design Tools
- **Figma** for design mockups
- **Storybook** for component documentation
- **Chrome DevTools** for responsive testing
- **axe-core** for accessibility testing

## 📚 Documentation

### Documentation Standards

1. **Code Comments**
   ```tsx
   /**
    * ThemeToggle component for switching between light, dark, and system themes
    * 
    * @param variant - Button or dropdown style
    * @param size - Component size (sm, md, lg)
    * @param showLabel - Whether to show text label
    */
   ```

2. **API Documentation**
   - Include request/response examples
   - Document all parameters
   - Add error response codes
   - Provide usage examples

3. **README Updates**
   - Keep installation steps current
   - Update feature lists
   - Add new configuration options
   - Include troubleshooting tips

## 🏆 Recognition

### Contributor Rewards

- 🌟 **First-time contributors** get a special mention
- 📜 **Regular contributors** are added to CONTRIBUTORS.md
- 🎯 **Major contributors** get collaborator access
- 💎 **Outstanding contributors** get special recognition

### Hall of Fame
We maintain a list of top contributors who've made significant impacts:

- **Feature Champions** - Built major features
- **Bug Hunters** - Found and fixed critical issues  
- **Design Masters** - Improved UI/UX significantly
- **Documentation Heroes** - Enhanced project documentation

## ❓ Getting Help

### Communication Channels

- 💬 **GitHub Discussions** - General questions and ideas
- 🐛 **GitHub Issues** - Bug reports and feature requests
- 📧 **Email** - For sensitive matters
- 💻 **Code Reviews** - Technical discussions on PRs

### Mentorship Program

New contributors can request mentorship:

1. **Comment on issues** tagged `good-first-issue`
2. **Tag a maintainer** for guidance
3. **Join our community** for ongoing support
4. **Participate in code reviews** to learn best practices

## 📋 Issue Labels

Understanding our label system:

### Priority
- 🔴 **critical** - Security issues, data loss
- 🟠 **high** - Important features, major bugs
- 🟡 **medium** - Standard features, minor bugs
- 🟢 **low** - Nice to have, documentation

### Type
- 🐛 **bug** - Something isn't working
- ✨ **enhancement** - New feature or improvement
- 📚 **documentation** - Docs improvements
- 🧪 **testing** - Test-related changes

### Difficulty
- 🌱 **good-first-issue** - Great for newcomers
- 🛠️ **intermediate** - Some experience needed
- 🔥 **advanced** - Complex, requires expertise

### Status
- 🎯 **in-progress** - Currently being worked on
- 🔍 **needs-review** - Waiting for code review
- ✅ **ready-to-merge** - Approved and ready
- ❓ **needs-discussion** - Requires planning

## 🎉 Thank You!

Every contribution, no matter how small, helps make CodePlatform better for everyone. Whether you're fixing a typo, adding a feature, or helping other users, your efforts are appreciated!

### Quick Start Checklist

- [ ] Fork and clone the repository
- [ ] Set up development environment  
- [ ] Read the code style guidelines
- [ ] Find or create an issue to work on
- [ ] Create a feature branch
- [ ] Make your changes with tests
- [ ] Submit a pull request
- [ ] Respond to review feedback

Happy coding! 🚀

---

**Questions?** Don't hesitate to ask in GitHub Discussions or comment on issues. We're here to help you contribute successfully to CodePlatform!
