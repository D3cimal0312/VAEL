
import { useState } from "react";
import { BookOpen, User, AtSign, Link, Building } from "lucide-react";


const HTML_TAGS = [
  { code: "<b>text</b>",  preview: "Bold Text" },
  { code: "<i>text</i>",  preview: "Italic Text" },
  { code: "<br/>",         preview: "Line break" },
  { code: '<a href="">...</a>',   preview: "Link Text" },
  { code: "<p>...</p>",   preview: "Paragraph Text" },
];

const TIPS = [
  "Keep subject under 80 chars for best open rates",
  "Avoid ALL CAPS — triggers spam filters",
    "One clear call-to-action for all users. ",
  "Avoid using keywords such as discount, offer, free etc. in subject line. Instead you can use words like greeting, new collection, surprise etc.",
  "Always use inline Styles if needed."
];

export default function MailGuide() {


  return (
    <div className="w-full  bg-cream-light border border-offwhite rounded-xl p-4">

      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-offwhite">
        <BookOpen size={24} className="text-lux" strokeWidth={1.6} />
        <span className="text-sm font-medium text-hair-dark">Mail guide</span>
      </div>

      <p className="text-xs uppercase tracking-widest text-hair mb-2">
        Template variables
      </p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        
      </div>

      <p className="text-xs uppercase tracking-widest text-hair mb-2">
        HTML formatting
      </p>
      <div className="mb-5 divide-y divide-offwhite">
        {HTML_TAGS.map(({ code, preview }) => (
          <div key={code} className="flex items-center justify-between py-1.5">
            <code className="text-xs text-hair">{code}</code>
            <span className="text-xs text-hair opacity-60">{preview}</span>
          </div>
        ))}
      </div>

      <p className="text-xs uppercase tracking-widest text-hair mb-2">
        Tips
      </p>
      <ul className="list-disc pl-4 space-y-1 m-0">
        {TIPS.map((tip) => (
          <li key={tip} className="text-xs text-hair leading-relaxed">
            {tip}
          </li>
        ))}
      </ul>

      
    </div>
  );
}