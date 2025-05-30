# VS Code for Fiori - Portable Edition all-in-on downloader and installer

This project creates a portable VS Code for SAP Fiori development. A set of recommended VS Code extensions is added to the resulting portable version. The intended platform for the build script is Windows.

## Build

To start the build, install the npm dependencies and run the start script.

```sh
npm i
npm start
```

**Use Cases**

- A portable VS Code for Fiori developers including a set of (recommended) extensions. The application can be stored on a external drive.
- Citrix environment:
  - Citrix admins can add the portable version to a workstation and provide it to developers. Be aware that portable VS Code is not multi user ready.
  - "Shared" version: The portable version is provided on a central share and Citrix users store the personalization folder data in their %AppData% oder home drive folder. This allows to run VS Code portable by several users simultanously.

**Base VS Code version**

The starting point of every portable VS Code app generated is the official download page.

- [VS Code download](https://code.visualstudio.com/Download)

## VS Code portable mode
 
General information about [VS Code portable mode](https://code.visualstudio.com/docs/editor/portable). Adding the folder _data_ makes VS Code portable.

### Adding extensions

VS Code allows to add extensions using the [cli](https://code.visualstudio.com/docs/configure/command-line) when starting VS Code:

- --install-extension *extension id*

To add the provided extension its installation must be manually approved. This can be done automatically by adding this parameter:

- --force

Unfortunately, this seems not to work with portable VS Code. Therefore, the extensions are added through workspace recommendations. The sample project for this approach is in [folder](./project/) and the extensions are listed in file [extensions.json](./project/.vscode/extensions.json).

## Extensions

List of the installed extensions:

- Live Server ritwickdey.liveserver
- Markdown all in one yzhang.markdown-all-in-one
- Markdown Preview Mermaid Support bierner.markdown-mermaid
- Markdownlint davidanson.vscode-markdownlint
- Markmap gera2ld.markmap-vscode
- Prettier esbenp.prettier-vscode
- vscode-pdf tomoki1207.pdf
- yaml redhat.vscode-yaml
- vscode-icons vscode-icons-team.vscode-icons
- Debugger for Firefox firefox-devtools.vscode-firefox-debug
- SAP Fiori Tools - Extension Pack sapse.sap-ux-fiori-tools-extension-pack
- SAP Mobile Services OData CSDL modeler sapse.vsc-extension-odata-csdl-modeler
- VS Code extension for project "Credential Digger" saposs.vs-code-extension-for-project-credential-digger
- SAP CDS Language Support sapse.vscode-cds

## Build process

[Grunt](https://gruntjs.com). The individual steps are executed as GruntJS tasks. Several [Grunt Plugins](https://gruntjs.com/plugins) are used. To install GruntJS and the plugins, just run npm i. Running grunt can be done via npx.

```sh
npm i
npx grunt
```

This will start GruntJS and run the default tasks. That should be enough to get a working VS Code portable version. Each step of the workflow can be run individually by providing the task number. To run step 1, run grunt 1. To run the 3. step, run grunt 3.

```sh
grunt 1
grunt 2
grunt 3
```

All tasks run without user intercation, except step 5. At step 5, VS Code is started and the recommended extensions are installed. A human interaction is necessary to install the extensions.

Confirm that the folder content is trusted. In the project folder, the recommended extensions are read.

![](./images/5-1.png)

Confirm to install the recommended extensions.

![](./images/5-2.png)

Confirm that you trust the publishers of the extensions. Remember: the list of extensions to be installed can be adjusted by you. Add or remove extensions from the file project/.vscode/extensions.json

![](./images/5-3.png)

## Clean up

```sh
npx grunt clean
```

### Workflow

```mermaid
---
title: Workflow
---
stateDiagram-v2
    direction LR
    A: Preparation
    B: Download
    C: Unzip
    D: Add data folder
    E: Add extensions
    F: ZIP VS Code
    [*] --> A
    A --> B    
    B --> C
    C --> D
    D --> E
    E --> F
    F --> [*]
```

Several artefacts are going to be created during execution.

```mermaid
---
title: Workflow including artefacts
---
stateDiagram-v2
    direction LR
    A: Preparation
    B: Download VS Code portable
    C: Unzip VS Code
    D: Add data folder
    E: Run VS Code. Add suggested extensions from sample project
    F: ZIP VS Code
    [*] --> Step1
    state Step1 {
        Folders: Folders build/, dist/, downloads/ 
        A --> Folders
    }
    Step1 --> Step2
    state Step2 {
        Download: File downloads/vscode.zip
        B --> Download
    }
    Step2 --> Step3
    state Step3 {
        Unzip: Folder build/vscode
        C --> Unzip
    }
    Step3 --> Step4
    state Step4 {
        Data: Folder build/vscode/data
        D --> Data
    }
    Step4 --> Step5
    state Step5 {
        E
    }
    Step5 --> Step6
    state Step6 {
        Dist: File dist/vscode-dist.zip
        F --> Dist
    }
    Step6 --> [*]
```
