import { describe, it, expect } from 'vitest';
import project from '../package.json' assert { type: 'json' };
import path from 'path';

describe('package.json', () => {
    const repoFolder = path.basename(process.cwd());

    it('should exist', () => {
        expect(project).toBeDefined();
    });

    it.each(["vite","vitest", "jsdom"])
    ('should have %s as a developer dependency', (name) => {
        // Arrange/Act
        let actual = project?.devDependencies[name];

        // Assert
        expect(actual).toBeDefined();
    });

    it.each(["@picocss/pico"])
    ('should have %s as a regular dependency', (name) => {
        let actual = project?.dependencies[name];
        expect(actual).toBeDefined();
    });

    it.each([
        {scriptName: 'dev', command: 'vite' },
        {scriptName: 'test', command: 'vitest' },
    ])
    ('should have the correct command for the $scriptName script', ({scriptName, command}) => {
        let actual = project.scripts[scriptName];
        expect(actual, `The script "${scriptName}" does not exist`).toBeDefined();
        expect(actual.trim()).toBe(command);
    });
});
