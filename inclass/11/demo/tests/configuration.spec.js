import { describe, it, expect } from 'vitest';
import path from 'path';
import fs from 'fs';

describe('vitest.config.js', () => {
    it('should exist', () => {
        const configFile = path.resolve(process.cwd(), 'vitest.config.js');
        const exists = fs.existsSync(configFile);
        expect(exists).toBeTruthy();
    });
});
