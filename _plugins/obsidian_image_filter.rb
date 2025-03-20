Jekyll::Hooks.register :documents, :pre_render do |doc|
  if doc.output_ext == ".html"
    doc.content.gsub!(/!\s*\[\[\s*(.*?)\s*\]\]/, '![](/assets/images/\1)')
  end
end
