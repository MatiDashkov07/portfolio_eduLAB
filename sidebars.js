// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  projectsSidebar: [
    {
      type: 'category',
      label: 'eduLAB Synthesis Engine',
      link: {
        type: 'doc',
        id: 'edulab-synthesis-engine/intro',
      },
      items: [
        'edulab-synthesis-engine/hardware-design',
        'edulab-synthesis-engine/software-architecture',
        'edulab-synthesis-engine/build-guide',
      ],
    },
    // Future projects will be added here
  ],
};

export default sidebars;
