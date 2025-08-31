# 🛠️ Tech Support – Ticket Creation Form (My Contribution)

This is **my personal contribution** to the class-wide project **SCE Playground – Tech Support System**:
a React form for creating new support tickets with validation, file uploads, previews, and urgency logic.

## ✨ What I built
- **Form state & validation**: user type, issue category, description (min length), error messages.
- **File uploads with previews**: up to 4 images, type & size validation, base64 encoding.
- **Urgency mapping** by category (e.g., Security concern → High).
- **Local persistence** (localStorage) for demo requests (optional, easily replaceable with API).
- **UX details**: success message, reset flow, “Back to My Requests” after submission.

## 🧩 Key files
- `TechSupportForm.jsx` – the main component (form logic).
- `tech-support.css` – scoped styling for the form and previews.

## ▶️ How to run (isolated demo)
1. Put `TechSupportForm.jsx` into a React app (e.g., `src/components/`).
2. Import the CSS: `import './tech-support.css';`
3. Render the component in any page:
   ```jsx
   import TechSupportForm from './components/TechSupportForm';
   export default function Page() { return <TechSupportForm />; }


🧠 Design choices

Clarity over complexity: no external libs required.

Safe defaults: strong client-side validation on length, type, and size.

Extensibility: replace localStorage with a POST request when backend is ready.

📸 Screenshots

![Form Screenshot](contact form.png)

# My Role in SCE Playground – Tech Support

- Implemented the **Ticket Creation Form** (React):
  - Form state & validation (`userType`, `issueCategory`, `description`).
  - Image uploads (≤4 files, ≤3MB each, type filter) + previews via FileReader.
  - Urgency mapping by category (High/Medium/Low).
  - Success flow + reset navigation.
- Wrote CSS for a clean, accessible UI.

**Why it matters:** demonstrates frontend engineering, UX decisions, and robust client-side validation ready to plug into a backend API.
