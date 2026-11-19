import React from 'react';

/** Straight quotes → curly quotes. Accepts messy input, returns clean typography. */
export function smartQuotes(s: string): string {
  return s
    .replace(/(^|[\s([{“—–\-])'/g, '$1‘')
    .replace(/'/g, '’')
    .replace(/(^|[\s([{‘—–\-])"/g, '$1“')
    .replace(/"/g, '”');
}

const ACRONYM = /\b([A-Z]{2,5})\b/g;

/**
 * Renders text with curly quotes. Acronym small caps are opt-in (`smallCaps`), because
 * Plus Jakarta Sans has no true small-cap glyphs and synthesised ones look uneven.
 */
export const Rich: React.FC<{ text: string; smallCaps?: boolean }> = ({ text, smallCaps = false }) => {
  const clean = smartQuotes(text);
  if (!smallCaps) return <>{clean}</>;
  const parts = clean.split(ACRONYM);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <abbr key={i} className="smallcaps" style={{ textDecoration: 'none' }}>
            {part}
          </abbr>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

/** Strip surrounding curly/straight quotes, for when we set the marks ourselves. */
export function unquote(s: string): string {
  return s.trim().replace(/^[“"‘']+/, '').replace(/[”"’']+$/, '');
}
