"use client";

interface ArticleContentProps {
  content: string;
  category: string;
}

// Category-specific images
const categoryImages: Record<string, string[]> = {
  "AI & Machine Learning": [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&q=80",
    "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=500&q=80",
  ],
  "Data Science": [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
  ],
  "Full Stack Development": [
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80",
  ],
  "Python Programming": [
    "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500&q=80",
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&q=80",
  ],
  "Career Guidance": [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&q=80",
  ],
  "Interview Preparation": [
    "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=500&q=80",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80",
  ],
  "Learning Resources": [
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&q=80",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&q=80",
  ],
  "Artificial Intelligence": [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&q=80",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&q=80",
  ],
};

// Parse inline markdown (bold)
function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={key++} className="font-semibold text-[#140D08]">
        {match[1]}
      </strong>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 0 ? [text] : parts;
}

export function ArticleContent({ content, category }: ArticleContentProps) {
  const sections = content.split("\n\n");
  const images = categoryImages[category] || categoryImages["Learning Resources"];
  let imageIndex = 0;
  let sectionCount = 0;

  return (
    <div className="space-y-3">
      {sections.map((section, index) => {
        const trimmed = section.trim();
        if (!trimmed) return null;

        // Main heading (## )
        if (trimmed.startsWith("## ")) {
          sectionCount++;
          const title = trimmed.replace("## ", "");
          const showImage = sectionCount === 1;
          const currentImage = showImage ? images[imageIndex++ % images.length] : null;

          return (
            <div key={index} className="mt-4 first:mt-0">
              {currentImage && (
                <div className="mb-3 rounded-lg overflow-hidden border border-[#E3CDB4]">
                  <img
                    src={currentImage}
                    alt={title}
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
              <h2 className="text-sm font-bold text-[#140D08] mb-2 flex items-center gap-2 border-l-3 border-[#FF6B1A] pl-2">
                {title}
              </h2>
            </div>
          );
        }

        // Subheading (### )
        if (trimmed.startsWith("### ")) {
          const title = trimmed.replace("### ", "");
          return (
            <h3 key={index} className="text-xs font-bold text-[#140D08] mt-3 mb-1.5 text-[#4A3626]">
              {title}
            </h3>
          );
        }

        // Bullet list - compact
        if (trimmed.includes("\n- ") || trimmed.startsWith("- ")) {
          const lines = trimmed.split("\n");
          const items = lines.filter((line) => line.trim().startsWith("- "));
          const title = lines[0].startsWith("- ") ? null : lines[0];

          return (
            <div key={index} className="my-2">
              {title && (
                <p className="text-[11px] font-semibold text-[#140D08] mb-1.5">
                  {parseInlineMarkdown(title)}
                </p>
              )}
              <div className="space-y-1">
                {items.map((item, i) => {
                  const text = item.replace(/^-\s*/, "").trim();
                  return (
                    <div key={i} className="flex items-start gap-2 text-[11px]">
                      <span className="w-1 h-1 rounded-full bg-[#FF6B1A] mt-1.5 flex-shrink-0" />
                      <span className="text-[#4A3626] leading-relaxed">
                        {parseInlineMarkdown(text)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        // Numbered list - compact
        if (trimmed.match(/^\d+\.\s/) || trimmed.includes("\n1. ")) {
          const lines = trimmed.split("\n");
          const items = lines.filter((line) => /^\d+\.\s/.test(line.trim()));

          return (
            <div key={index} className="my-2 space-y-1">
              {items.map((item, i) => {
                const text = item.replace(/^\d+\.\s*/, "").trim();
                return (
                  <div key={i} className="flex items-start gap-2 text-[11px]">
                    <span className="w-4 h-4 rounded-full bg-[#FF6B1A]/10 text-[#FF6B1A] text-[9px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-[#4A3626] leading-relaxed">
                      {parseInlineMarkdown(text)}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        }

        // Code block
        if (trimmed.startsWith("```")) {
          const code = trimmed.replace(/```\w*\n?/g, "").trim();
          return (
            <pre key={index} className="bg-[#140D08] text-[#FFF6EC] p-3 rounded-lg overflow-x-auto my-2 text-[10px] leading-relaxed">
              <code>{code}</code>
            </pre>
          );
        }

        // Table detection
        if (trimmed.includes("|") && trimmed.includes("---")) {
          const rows = trimmed.split("\n").filter(row => row.trim() && !row.includes("---"));
          return (
            <div key={index} className="my-2 overflow-x-auto">
              <table className="w-full text-[10px] border-collapse">
                {rows.map((row, rowIndex) => {
                  const cells = row.split("|").filter(cell => cell.trim());
                  const isHeader = rowIndex === 0;
                  return (
                    <tr key={rowIndex} className={isHeader ? "bg-[#140D08] text-white" : "bg-white"}>
                      {cells.map((cell, cellIndex) => (
                        isHeader ? (
                          <th key={cellIndex} className="px-2 py-1.5 text-left font-bold border border-[#E3CDB4]">
                            {cell.trim()}
                          </th>
                        ) : (
                          <td key={cellIndex} className="px-2 py-1.5 border border-[#E3CDB4] text-[#4A3626]">
                            {parseInlineMarkdown(cell.trim())}
                          </td>
                        )
                      ))}
                    </tr>
                  );
                })}
              </table>
            </div>
          );
        }

        // Horizontal rule
        if (trimmed === "---") {
          return <hr key={index} className="my-3 border-t border-[#E3CDB4]" />;
        }

        // Regular paragraph
        return (
          <p key={index} className="text-[11px] text-[#4A3626] leading-relaxed">
            {parseInlineMarkdown(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
