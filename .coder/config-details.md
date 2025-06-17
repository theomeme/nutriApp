# Configuration for the Coder CLI.

## Options details:

```yml
coder:
    persona: The persona description for the AI assistant.
        Default: "You are an expert coder."

    model: The AI model for code generation and assistance.
        Options:
            - flow-openai-gpt-4o
            - flow-openai-gpt-4o-mini
            - flow-bedrock-claude-37-sonnet
            - flow-bedrock-nova-lite
            - flow-gemini-2.5-pro
            - flow-gemini-2.0-flash
            - flow-foundry-deepseek-r1

    context:
        mode: The level of detail for file contents.
            Options:
                - full: Includes complete file content.
                - compact: Includes a shrunk version of the file content (experimental).

        scope: The scope of files to include.
            Options:
                - all: Includes all files.
                - selected: Includes only selected files (experimental).

        selection:
            model: Model used to select files for context.
            step: Step for new file selection in each session run.
            limit: Limit for the number of selected files.
```

---

> **Deprecated models (Do not use more)**:
>
> - flow-bedrock-claude-35-sonnet
> - flow-gemini-1.5-pro
> - flow-gemini-1.5-flash

## Context Mode and Scope Combinations:

- **full/all**: Includes all files with complete content. Best for smaller repositories. Supports ~10k lines of code on GPT-4o.

- **full/selected**: Includes selected files with full content.

- **compact/all**: Includes all files with shrunk content.

- **compact/selected**: Includes selected files with shrunk content. Supports >200k lines of code on GPT-4o/Gemini-Flash (experimental).

**Choose based on your project's needs for precision and optimization.**

**For more documentation [click here](https://ciandtflow.featurebase.app/en/help/collections/2581078-coder)**

**For support, [join our chat](https://chat.google.com/room/AAAAuYIBiUU?cls=7)**
