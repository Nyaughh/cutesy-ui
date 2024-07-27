# Cutesy-UI

Cutesy-UI is a React component library featuring a collection of cute, ready-to-use components. This library aims to provide aesthetically pleasing and functional components that are easy to integrate into your React projects.

## Features

- **Cute and stylish designs**: Components are designed with a focus on aesthetics and usability.
- **Ready-to-use**: Easily integrate components into your projects with minimal configuration.
- **TypeScript support**: Built with TypeScript for type safety and improved developer experience.
- **Customizable**: Tailwind CSS allows for easy customization and styling.

## CLI

Cutesy-UI includes a CLI tool to help you quickly add components to your project.

### Add Components

To add a specific component to your project, use:

```bash
npx cutesy-ui add [component-name]
```

For example, to add the `Audio` component:

```bash
npx cutesy-ui add audio
```

## Usage

Import and use the components in your React project:

```tsx
"use client";
import Audio from "@/components/cutesy/audio";
export function AudioUsage() {
  return (
    <div className="h-[40rem] flex items-center justify-center w-full">
      <Audio src="audio.mp3" />
    </div>
  );
}
```

## Available Components

- `Audio`: An audio player component with play/pause, mute/unmute, and slider controls.
- *More components coming soon!*

## Customization

Cutesy-UI components are styled using Tailwind CSS, making them easily customizable. You can extend and override the default styles to fit your project's needs.

## Contributing

We welcome contributions to the Cutesy-UI library! If you have ideas for new components or improvements to existing ones, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
