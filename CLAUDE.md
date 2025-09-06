# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite web application for "Animal Tales" - appears to be a storytelling or educational app based on the assets directory containing various animal-themed images and app logos.

## Development Commands

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (runs TypeScript compiler then Vite build)
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

No test framework is currently configured.

## Tech Stack & Architecture

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.2 with SWC for fast refresh
- **Package Manager**: pnpm (based on pnpm-lock.yaml presence)
- **Linting**: ESLint 9.33.0 with TypeScript ESLint, React Hooks, and React Refresh plugins
- **TypeScript Config**: Uses project references with separate configs for app and node environments

## Code Structure

- `src/main.tsx` - Application entry point with React StrictMode
- `src/App.tsx` - Main application component (currently template boilerplate)
- `src/assets/` - Contains extensive multimedia assets including:
  - App logos and branding materials
  - Educational/tutorial videos
  - Various animal-themed images and graphics
  - Book/story-related graphics

## Development Notes

- Currently appears to be in early stages with standard Vite + React template structure
- Large assets directory suggests this will be a media-rich application
- No routing, state management, or testing setup yet
- ESLint configuration follows modern TypeScript patterns with flat config format
- Uses absolute imports for assets (e.g., `/vite.svg`)