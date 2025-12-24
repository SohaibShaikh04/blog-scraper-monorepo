// ===== src/utils.js =====
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function truncate(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  console.log(`  ${title}`);
  console.log('='.repeat(60) + '\n');
}

function saveToFile(filename, data) {
  const fs = require('fs');
  const path = require('path');
  
  const outputDir = path.join(__dirname, '..', 'output');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const filepath = path.join(outputDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
  
  console.log(`💾 Saved to: ${filepath}`);
}

function printStats(stats) {
  console.log('\n📊 Statistics:');
  Object.entries(stats).forEach(([key, value]) => {
    console.log(`   ${key}: ${value}`);
  });
  console.log();
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function cleanText(text) {
  if (!text) return '';
  
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n\n')
    .replace(/[^\x00-\x7F]/g, '')
    .trim();
}

module.exports = {
  delay,
  formatDate,
  truncate,
  logSection,
  saveToFile,
  printStats,
  isValidUrl,
  cleanText
};