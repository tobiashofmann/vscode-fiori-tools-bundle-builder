# VS Code for Fiori - Portable Edition all-in-on downloader and installer

This project creates a portable VS Code for SAP Fiori development. A set of recommended VS Code extensions is added to the resulting portable version. The intended platform for the build script is Windows.

## Build

To start the build, install the npm dependencies and run the start script.

```sh
npm i
npm start
```

During build, VS Code will start and ask you for confirmation to install the extensions. CTrust the publisher and accept to install the extensions.  When the extensions are installed you can close VS Code. The build script will continue with the next build step.

After the build process ends, the file dist/vscode-dist.zip contains the portable version of VS Code with the extensions.

**Use Cases**

- A portable VS Code for Fiori developers including a set of (recommended) extensions. The application can be stored on a external drive.
- Citrix environment:
  - Citrix admins can add the portable version to a workstation and provide it to developers. Be aware that portable VS Code is not multi user ready.
  - "Shared" version: The portable version is provided on a central share and Citrix users store the personalization folder data in their %AppData% oder home drive folder. This allows to run VS Code portable by several users simultanously.

## No Build Option

<summary>Installing the extensions to your VS Code installation.</summary>

<details>

In case you do not want to build a portable VS Code, but just add the included extensions to your VS Code installation: open the folder project in your VS Code. It will pick up .vscode/extensions.json file and asks to install the listed extensions. This will add them to your VS Code without having to build the portable version.

</details>

## Extensions

List of the included extensions:

|Extension | ID | Added with release
| :--- | :--- | ---: |
| Live Server | ritwickdey.liveserver | 2025.6 |
| Markdown all in one | yzhang.markdown-all-in-one | 2025.6 |
| Markdown Preview Mermaid Support | bierner.markdown-mermaid | 2025.6 |
| Markdownlint | davidanson.vscode-markdownlint | 2025.6 |
| Markmap | gera2ld.markmap-vscode | 2025.6 |
| vscode-pdf | tomoki1207.pdf | 2025.6 |
| yaml | redhat.vscode-yaml| 2025.6 |
| vscode-icons | vscode-icons-team.vscode-icons | 2025.6 |
| Debugger for Firefox | firefox-devtools.vscode-firefox-debug | 2025.6 |
| SAP Fiori Tools - Extension Pack | sapse.sap-ux-fiori-tools-extension-pack | 2025.6 |
| SAP Mobile Services OData CSDL modeler | sapse.vsc-extension-odata-csdl-modeler | 2025.6 |
| VS Code extension for project "Credential Digger" | saposs.vs-code-extension-for-project-credential-digger | 2025.6 |
| SAP CDS Language Support | sapse.vscode-cds | 2025.6 |
| Prettier| prettier.prettier-vscode replaces deprecated prettier esbenp.prettier-vscode | 2025.12    |
| SonarQube for IDE | sonarsource.sonarlint-vscode | 2025.12 |
| Connection Manager for SAP Systems | saposs.sap-ux-sap-systems-ext | 2025.12 |
| Coverage Gutters | ryanluker.vscode-coverage-gutters | 2025.12 |
| Playwright Test for VSCode | ms-playwright.playwright | 2025.12 |
| REST Client | humao.rest-client| 2025.12 |

## Build Information

### VS Code

#### Base VS Code version

The starting point of every portable VS Code app generated is the official download page.

- [VS Code download](https://code.visualstudio.com/Download)

#### VS Code portable mode
 
General information about [VS Code portable mode](https://code.visualstudio.com/docs/editor/portable). Adding the folder _data_ makes VS Code portable.

The download step will allways download the latest available VS Code version. The download is _not_ configured to download a specific version. Running the bundle builder at different days / months will result in a different VS Code version being used. The same for the inluded plugins. 

### Adding extensions

VS Code allows to add extensions using the [cli](https://code.visualstudio.com/docs/configure/command-line) when starting VS Code:

- --install-extension *extension id*

To add the provided extension its installation must be manually approved. This can be done automatically by adding this parameter:

- --force

Unfortunately, this seems not to work with portable VS Code. Therefore, the extensions are added through workspace recommendations. The sample project for this approach is in [folder](./project/) and the extensions are listed in file [extensions.json](./project/.vscode/extensions.json).

## Build process

To install GruntJS and the plugins, just run npm i. Running grunt can be done via npx.

```sh
npm i
npx grunt
```

<summary>

The individual steps are executed as [GruntJS](https://gruntjs.com) tasks. Several [Grunt Plugins](https://gruntjs.com/plugins) are used.</summary>

<details>
This will start GruntJS and run the default tasks. That should be enough to get a working VS Code portable version. Each step of the workflow can be run individually by providing the task number. To run step 1, run grunt 1. To run the 3. step, run grunt 3.

```sh
grunt 1
grunt 2
grunt 3
```
</details>

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

<summary>
Mermaid diagrams
</summary>

<details>

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

</details>

## Clean up

The goal of the build is to produce an artefact that is a portable VS Code in zip format: dist/vscode-dist.zip. All other files created during the build process can be deleted. This is done by running the grunt clean task

```sh
npx grunt clean
```