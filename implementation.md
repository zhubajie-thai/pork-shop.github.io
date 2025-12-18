# Implementation Details - The Pork Barrel

## 1. Architectural Overview
The Pork Barrel is a modern React-based Single Page Application (SPA) designed for an upscale butcher shop experience. It leverages a component-based architecture for modularity and maintainability.

## 2. Technical Stack
- **Frontend Framework**: React 19 (via ESM imports)
- **Styling**: Tailwind CSS for rapid UI development and responsive design.
- **Icons**: Lucide React for consistent and accessible iconography.
- **AI Integration**: Google Gemini API (`@google/genai`) for conversational features and structured data generation.
- **Typography**: Google Fonts ('Playfair Display' for elegance, 'Inter' for readability).

## 3. Key Features & Implementation

### A. Product Catalog & Management
- **Data Structure**: Centralized in `constants.tsx` with strongly-typed interfaces in `types.ts`.
- **Filtering/Selection**: Handled via React state to trigger modals or add items to the cart.
- **Persistence**: Currently in-memory, but designed to easily integrate with a backend or localStorage.

### B. AI-Powered Butcher Assistant ("Pete")
- **Service**: `services/geminiService.ts`
- **Implementation**: Utilizes Gemini's Chat API (`ai.chats.create`) with a persistent `systemInstruction`.
- **Persona**: Custom persona "Old Man Pete" defined to provide a rustic, expert tone, enhancing user engagement.
- **State**: The `ButcherChat.tsx` component manages the local message history, updating UI optimistically during "typing" states.

### C. Dynamic Recipe Generation
- **Trigger**: Opening a product's details triggers a specific call to Gemini.
- **Structured Output**: Uses `responseSchema` to ensure the model returns valid JSON, which is then parsed into the `Recipe` interface.
- **Performance**: Fetched asynchronously to prevent UI blocking, with a custom pulse loader.

### D. Shopping Cart
- **Logic**: Implemented using React `useState` in the root `App.tsx` to allow global access to cart count (Header) and cart management (Product Cards & Drawer).
- **Checkout**: A placeholder workflow that simulates the transition from basket to purchase.

## 4. UI/UX Design Choices
- **Aesthetic**: "Rustic Upscale" using deep reds (#991b1b), dark stones, and high-quality food photography.
- **Responsiveness**: Fully adaptive layout (Mobile, Tablet, Desktop) using Tailwind's breakpoint system.
- **Interactions**: Framer-like transitions (via Tailwind transition classes) and interactive states for all buttons and cards.

## 5. Security & Configuration
- **API Security**: The Google GenAI client is initialized with `process.env.API_KEY`, ensuring sensitive credentials are never hardcoded.
- **Permissions**: `metadata.json` configured for potential future camera features (e.g., scanning QR codes in-store).
