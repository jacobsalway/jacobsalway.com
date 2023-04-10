"use client";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import docker from "react-syntax-highlighter/dist/esm/languages/prism/docker";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import toml from "react-syntax-highlighter/dist/esm/languages/prism/toml";
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";

SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("toml", toml);
SyntaxHighlighter.registerLanguage("docker", docker);
SyntaxHighlighter.registerLanguage("yaml", yaml);

export default SyntaxHighlighter;
