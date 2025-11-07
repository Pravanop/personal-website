const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Copy assets (images, CSS, etc.)
  eleventyConfig.addPassthroughCopy("assets");

  // Add a date filter for readable post dates
  eleventyConfig.addNunjucksGlobal("now", new Date());
  eleventyConfig.addNunjucksFilter("date", function (dateObj, format = "MMMM d, yyyy") {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });

  // Watch for file changes in the output
  eleventyConfig.setBrowserSyncConfig({
    files: "./_site/**/*",
  });

  // Define the "posts" collection
  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getFilteredByGlob("./posts/*.md");
  });

  // Return the directory structure and site options
  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
    pathPrefix: "/personal-website/", // 👈 add your repo name here
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};