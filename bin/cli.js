#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const yargs = require('yargs');
const componentTemplates = require('./templates');
// Component templates

const argv = yargs
  .command('add <component>', 'Add a new component', yargs => {
    yargs.positional('component', {
      describe: 'Name of the component to add',
      type: 'string',
    });
  })
  .help().argv;

const command = argv._[0];
const componentName = argv.component;

if (command === 'add' && componentName) {
  const componentsJsonPath = path.join(process.cwd(), 'components.json');
  let componentsDir;

  if (!fs.existsSync(componentsJsonPath)) {
    console.log('components.json not found. Please run `npx shadcn-ui init`.');
    process.exit(1);
  } else {
    const componentsConfig = JSON.parse(
      fs.readFileSync(componentsJsonPath, 'utf-8')
    );
    componentsDir = componentsConfig.aliases.components;
    // if components dir starts with @/ assume src/components
    if (componentsDir.startsWith('@/')) {
      componentsDir = path.join('src', componentsDir.slice(2));
    }
  }

  const componentDir = path.join(process.cwd(), componentsDir, 'cutesy');
  const componentFile = path.join(componentDir, `${componentName}.tsx`);
  if (fs.existsSync(componentFile)) {
    console.log(
      `Component ${componentName}.tsx already exists in ${componentsDir}`
    );
    process.exit(1);
  }
  const componentContent = componentTemplates[componentName];

  if (componentContent) {
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    fs.writeFileSync(componentFile, componentContent.code.trim());

    console.log(
      `Component ${componentName}.tsx has been created in ${componentsDir}`
    );

    // Install dependencies
    const packageManager = fs.existsSync(path.join(process.cwd(), 'yarn.lock'))
      ? 'yarn'
      : fs.existsSync(path.join(process.cwd(), 'pnpm-lock.yaml'))
      ? 'pnpx'
      : fs.existsSync(path.join(process.cwd(), 'bun.lockb'))
      ? 'bun'
      : 'npx';

    componentContent.deps.forEach(dep => {
      console.log(`Installing dependency ${dep}...`);
      execSync(`${packageManager} shadcn-ui add ${dep}`, { stdio: 'inherit' });
    });
  } else {
    console.log(`No template found for component ${componentName}`);
  }
} else {
  console.log('Please provide a valid component name');
}
