---
banner:
  title: "Comma Agents"
  content: "Build and run AI agent workflows with TypeScript or declarative strategies. Use the terminal app for interactive work, embed Core in your own application, or compose specialized agents into repeatable flows."
  image: /images/big-logo.png
  button:
    label: Install CommaAgents
    link: "#quick-start"
    enable: true
quick_start:
  title: From install to your first strategy
  description: Install the standalone CLI for your platform, then define the same two-agent workflow in TypeScript or JSON.
  install:
    label: Step 1
    title: Install CommaAgents
    description: The installer downloads the standalone release, verifies its checksum, adds the comma command to your user PATH, and runs the initial setup.
    note: The standalone build includes its runtime, the CLI, terminal interface, daemon, and Core.
    macos_linux:
      label: macOS / Linux
      command: |
        curl -fsSL https://commaagents.com/install | bash
        comma
    windows:
      label: Windows
      command: |
        iwr https://commaagents.com/install-win -useb | iex
        comma
  strategy:
    label: Step 2
    title: Define a simple review strategy
    description: Both examples pass one prompt through an analyst and then a reviewer. They use openai/gpt-4o, so configure an OpenAI credential during setup or set OPENAI_API_KEY before running them.
    typescript:
      label: TypeScript
      filename: strategy.ts
      code: |
        import {
          createAgent,
          createSequentialFlow,
        } from "@comma-agents/core";

        const analyst = createAgent({
          name: "analyst",
          model: "openai/gpt-4o",
          systemPrompt: "Identify bugs and edge cases in the supplied code.",
        });

        const reviewer = createAgent({
          name: "reviewer",
          model: "openai/gpt-4o",
          systemPrompt: "Turn the analysis into concise, actionable fixes.",
        });

        const reviewStrategy = createSequentialFlow({
          name: "review-pipeline",
          steps: [analyst, reviewer],
        });

        const result = await reviewStrategy.call(
          "Review: function add(a, b) { return a + b; }",
        );

        console.log(result.text);
      command: |
        bun add @comma-agents/core@next
        bun run strategy.ts
    json:
      label: JSON strategy
      filename: .comma/strategies/review.json
      code: |
        {
          "name": "Review Pipeline",
          "version": "1.0",
          "agents": {
            "analyst": {
              "model": "openai/gpt-4o",
              "systemPrompt": "Identify bugs and edge cases in the supplied code."
            },
            "reviewer": {
              "model": "openai/gpt-4o",
              "systemPrompt": "Turn the analysis into concise, actionable fixes."
            }
          },
          "flow": {
            "name": "Review Pipeline",
            "type": "sequential",
            "steps": [
              { "agent": "analyst" },
              { "agent": "reviewer" }
            ]
          }
        }
      command: comma
benefits:
  title: Comma Agents At A Glance
  description: Comma Agents is a dynamic platform designed to revolutionize the way we interact with AI. At its core, it offers an innovative suite of tools that empower users to create, customize, and deploy intelligent agents. These agents, equipped with advanced generative AI capabilities, are tailored to perform a diverse range of tasks, from engaging in natural conversations to devising strategic solutions. Ideal for both enthusiasts and professionals, Comma Agents stands as a testament to the exciting possibilities of AI, making it accessible, versatile, and user-friendly for a global community.
  benefits_list:
    - title: "Enhanced AI Interactions"
      content: "Comma Agents facilitate more natural, intuitive AI conversations, improving user engagement and experience."
      color: "#1E90FF"
      icon: messageCircle
    - title: "Customization and Flexibility"
      content: "Users can tailor agents to specific needs, allowing for greater flexibility in a variety of applications."
      color: "#32CD32"
      icon: sliders
    - title: "Community Collaboration"
      content: "The Comma Agents Hub encourages collaborative development, fostering a community of innovation and shared expertise."
      color: "#FFA500"
      icon: users
    - title: "State-of-the-Art Technology"
      content: "Access to the latest in generative AI and AGI technologies, ensuring cutting-edge solutions from Hub creators."
      color: "#FFD700"
      icon: cpu
    - title: "Scalability"
      content: "Comma Agents are designed to scale with your project's needs, from small tasks to large, complex systems."
      color: "#8A2BE2"
      icon: trendingUp
    - title: "Ease of Use"
      content: "User-friendly interfaces and framework tools make it simple for both beginners and experts to create and manage AI agents."
      color: "#20B2AA"
      icon: tool
---
