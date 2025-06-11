import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../../lastAnalyze.json');

export function saveLastAnalysis(data: any) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function loadLastAnalysis(): any | null {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
}